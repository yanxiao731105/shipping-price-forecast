/**
 * 数据更新脚本 — 从公开数据源拉取最新数据
 *
 * 真实数据源：
 * 1. USD/CNY 汇率 — exchangerate-api.com（免费，无需 key）
 * 2. BDI 指数 — Yahoo Finance（免费，通过 scrape）
 * 3. 燃油价格 — 基于 IFO380/VLSFO 市场参考（定期手动校准）
 * 4. SCFI / CCFI — 上海航运交易所无公开 API，保持模拟 + 明确标注
 *
 * 运行方式：node data/update-data.mjs
 * 生成文件：public/latest-data.json（前端运行时加载）
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const now = new Date();
const today = now.toISOString().split('T')[0];
const timestamp = now.toISOString();

async function fetchJSON(url, opts = {}) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ShippingForecastBot/1.0', ...opts.headers },
      signal: AbortSignal.timeout(15000)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (e) {
    console.warn(`  ⚠️ 获取失败: ${url} — ${e.message}`);
    return null;
  }
}

// ── 确定性随机数 ──
function seededRandom(seed) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

// ── 指数历史生成 ──
function generateIndexHistory(baseValue, days, prefix) {
  const history = [];
  const seeds = { scfi: 2100, ccfi: 1450, bdi: 2500 };
  const seed = seeds[prefix] || baseValue;

  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const wave1 = Math.sin(i / 8 + (prefix === 'bdi' ? 1.5 : 0)) * (baseValue * 0.06);
    const wave2 = Math.cos(i / 15 + 0.5) * (baseValue * 0.03);
    const noise = (seededRandom(i + prefix.charCodeAt(0)) - 0.5) * (baseValue * 0.02);
    const value = Math.round(seed + (baseValue - seed) * (1 - i / days) + wave1 + wave2 + noise);

    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;
    if (prefix !== 'bdi' && dow !== 5) continue;
    if (prefix === 'bdi' && dow !== 1 && dow !== 3 && dow !== 5) continue;

    history.push({ date: date.toISOString().split('T')[0], value });
  }
  return history;
}

async function main() {
  console.log('🚢 海运价预测系统 — 数据更新');
  console.log(`📅 ${today}\n`);

  // ── 1. 汇率数据（真实） ──
  console.log('💱 获取 USD/CNY 汇率...');
  const cnyData = await fetchJSON('https://api.exchangerate-api.com/v4/latest/USD');
  const usdCny = cnyData?.rates?.CNY ? cnyData.rates.CNY.toFixed(4) : null;
  const eurCny = cnyData?.rates?.EUR ? (cnyData.rates.CNY / cnyData.rates.EUR).toFixed(4) : null;
  console.log(`   ✅ USD/CNY = ${usdCny || '获取失败，使用默认值'}`);
  console.log(`   ✅ EUR/CNY = ${eurCny || '获取失败'}`);

  // ── 2. BDI 波罗的海干散货指数 ──
  console.log('📊 获取 BDI 指数...');
  let bdiValue = 2523;    // 2026-04-16 最新值（智通财经）
  let bdiChange = 39;     // +1.57%
  let bdiChangePercent = 1.57;
  let bdiSource = '波罗的海交易所（模拟）';

  // 尝试从 Yahoo Finance 获取 BDI
  const yahooBDI = await fetchJSON('https://query1.finance.yahoo.com/v8/finance/chart/%5EBDI?interval=1d&range=5d');
  if (yahooBDI?.chart?.result?.[0]?.indicators?.quote?.[0]?.close) {
    const closes = yahooBDI.chart.result[0].indicators.quote[0].close.filter(v => v !== null);
    if (closes.length >= 2) {
      bdiValue = Math.round(closes[closes.length - 1]);
      bdiChange = Math.round(closes[closes.length - 1] - closes[closes.length - 2]);
      bdiChangePercent = parseFloat(((bdiChange / closes[closes.length - 2]) * 100).toFixed(2));
      bdiSource = 'Yahoo Finance';
      console.log(`   ✅ BDI = ${bdiValue} (${bdiChange >= 0 ? '+' : ''}${bdiChange})`);
    }
  } else {
    console.log('   ⚠️ Yahoo Finance 获取失败，使用模拟值');
  }

  // ── 3. 燃油价格（参考市场报价，定期手动校准） ──
  console.log('⛽ 燃油价格参考...');
  // 注：IFO380/VLSFO 无稳定免费 API，使用合理市场参考值
  // 实际生产环境建议接入 BunkerEx / Ship & Bunker 等付费 API
  const fuelPrice = {
    ifo380: 612,    // IFO 380 USD/MT（2026年4月参考价）
    vlsfo: 685,     // VLSFO 0.5% USD/MT
    unit: 'USD/MT',
    trend: 'stable',
    weekChange: -3.2,
    source: '市场参考价（需定期校准）'
  };
  console.log(`   ℹ️ IFO380: $${fuelPrice.ifo380}, VLSFO: $${fuelPrice.vlsfo} (${fuelPrice.source})`);

  // ── 4. SCFI / CCFI（模拟，无公开 API） ──
  console.log('📊 SCFI / CCFI 指数（模拟）...');
  const scfiValue = 2148;
  const scfiPrev = 2098;
  const ccfiValue = 1456;
  const ccfiPrev = 1432;

  // ── 5. 集装箱价格参考 ──
  const containerPrice = {
    new20gp: 2350,
    new40hq: 3850,
    used20gp: 1650,
    used40hq: 2800,
    unit: 'USD'
  };

  // ── 组装数据 ──
  const latestData = {
    meta: {
      updatedAt: timestamp,
      date: today,
      version: '2.1',
      dataSource: {
        scfi: '上海航运交易所（模拟·无公开API）',
        ccfi: '交通运输部（模拟·无公开API）',
        bdi: bdiSource,
        fuel: fuelPrice.source,
        cny: usdCny ? 'exchangerate-api.com' : '中国人民银行中间价（默认值）',
        container: '市场参考价（需定期校准）',
        freightRates: '市场综合参考价（FAK）',
        notes: 'SCFI/CCFI 无公开API，使用模拟值；BDI/汇率来自公开API；运价数据以船公司/货代最终确认为准'
      }
    },
    indices: {
      scfi: {
        name: '上海出口集装箱运价指数',
        code: 'SCFI',
        currentValue: scfiValue,
        previousValue: scfiPrev,
        change: scfiValue - scfiPrev,
        changePercent: parseFloat((((scfiValue - scfiPrev) / scfiPrev) * 100).toFixed(2)),
        trend: scfiValue >= scfiPrev ? 'up' : 'down',
        history: generateIndexHistory(scfiValue, 60, 'scfi'),
        source: '上海航运交易所（模拟）',
        note: '每周五发布，无公开API'
      },
      ccfi: {
        name: '中国出口集装箱运价指数',
        code: 'CCFI',
        currentValue: ccfiValue,
        previousValue: ccfiPrev,
        change: ccfiValue - ccfiPrev,
        changePercent: parseFloat((((ccfiValue - ccfiPrev) / ccfiPrev) * 100).toFixed(2)),
        trend: ccfiValue >= ccfiPrev ? 'up' : 'down',
        history: generateIndexHistory(ccfiValue, 60, 'ccfi'),
        source: '交通运输部（模拟）',
        note: '每周五发布，无公开API'
      },
      bdi: {
        name: '波罗的海干散货指数',
        code: 'BDI',
        currentValue: bdiValue,
        previousValue: bdiValue - bdiChange,
        change: bdiChange,
        changePercent: bdiChangePercent,
        trend: bdiChange >= 0 ? 'up' : 'down',
        history: generateIndexHistory(bdiValue, 60, 'bdi'),
        source: bdiSource,
        note: '每个工作日发布'
      }
    },
    macro: {
      fuelPrice: {
        ifo380: fuelPrice.ifo380,
        vlsfo: fuelPrice.vlsfo,
        unit: fuelPrice.unit,
        trend: fuelPrice.trend,
        weekChange: fuelPrice.weekChange,
        source: fuelPrice.source
      },
      exchangeRate: {
        usdCny: usdCny || '7.2436',
        eurCny: eurCny,
        date: today,
        source: usdCny ? 'exchangerate-api.com' : '默认值'
      },
      containerPrice
    },
    marketOverview: {
      totalIndex: scfiValue,
      totalIndexChange: parseFloat((((scfiValue - scfiPrev) / scfiPrev) * 100).toFixed(2)),
      activeRoutes: 24,
      bullishSignals: 8,
      bearishSignals: 5,
      overallTrend: scfiValue >= scfiPrev ? 'bullish' : 'bearish'
    },
    mainRoutes: [
      { route: 'EU', routeName: '欧洲航线', currentPrice: 2850, previousPrice: 2780, change: 70, changePercent: 2.52, unit: 'USD/TEU', fak20gp: 1850, fak40gp: 3200, fak40hq: 3350 },
      { route: 'USWC', routeName: '美西航线', currentPrice: 3200, previousPrice: 3350, change: -150, changePercent: -4.48, unit: 'USD/TEU', fak20gp: 2200, fak40gp: 3850, fak40hq: 4000 },
      { route: 'USEC', routeName: '美东航线', currentPrice: 4200, previousPrice: 4050, change: 150, changePercent: 3.70, unit: 'USD/TEU', fak20gp: 2800, fak40gp: 4650, fak40hq: 4850 },
      { route: 'SEA', routeName: '东南亚航线', currentPrice: 580, previousPrice: 560, change: 20, changePercent: 3.57, unit: 'USD/TEU', fak20gp: 380, fak40gp: 650, fak40hq: 700 },
      { route: 'MED', routeName: '地中海航线', currentPrice: 2650, previousPrice: 2600, change: 50, changePercent: 1.92, unit: 'USD/TEU', fak20gp: 1750, fak40gp: 3000, fak40hq: 3100 },
      { route: 'MDE', routeName: '中东航线', currentPrice: 1450, previousPrice: 1420, change: 30, changePercent: 2.11, unit: 'USD/TEU', fak20gp: 900, fak40gp: 1600, fak40hq: 1680 },
      { route: 'SA', routeName: '南美航线', currentPrice: 1850, previousPrice: 1920, change: -70, changePercent: -3.65, unit: 'USD/TEU', fak20gp: 1200, fak40gp: 2100, fak40hq: 2200 },
      { route: 'DJI', routeName: '深圳-吉布提', currentPrice: 1650, previousPrice: 1580, change: 70, changePercent: 4.43, unit: 'USD/TEU', fak20gp: 1050, fak40gp: 1850, fak40hq: 1920 }
    ]
  };

  // 保存到 public 目录
  const outPath = path.join(__dirname, '..', 'public', 'latest-data.json');
  fs.writeFileSync(outPath, JSON.stringify(latestData, null, 2));
  console.log(`\n✅ 数据文件已生成: ${outPath}`);
  console.log(`   更新时间: ${timestamp}`);
  console.log(`   数据版本: 2.1`);
  console.log(`   真实数据源: 汇率(${usdCny ? '✅' : '❌'}) BDI(${bdiSource.includes('Yahoo') ? '✅' : '❌'})`);
}

main().catch(console.error);
