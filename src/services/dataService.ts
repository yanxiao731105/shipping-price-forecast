/**
 * 数据服务层 — 加载最新数据，区分实时数据和模拟数据
 */

import type { FreightIndex, FreightRate, MarketOverview } from '@/types';

export interface LatestDataMeta {
  updatedAt: string;
  date: string;
  version: string;
  dataSource: Record<string, string>;
}

export interface IndexData {
  name: string;
  code: string;
  currentValue: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: string;
  history: { date: string; value: number }[];
  source: string;
  note: string;
}

export interface LatestData {
  meta: LatestDataMeta;
  indices: {
    scfi: IndexData;
    ccfi: IndexData;
    bdi: IndexData;
  };
  macro: {
    fuelPrice: {
      ifo380: number;
      vlsfo: number;
      unit: string;
      trend: string;
      weekChange: number;
    };
    exchangeRate: {
      usdCny: string;
      eurCny: string | null;
      date: string;
    };
    containerPrice: {
      new20gp: number;
      new40hq: number;
      used20gp: number;
      used40hq: number;
      unit: string;
    };
  };
  marketOverview: MarketOverview;
  mainRoutes: FreightRate[];
}

let cachedData: LatestData | null = null;

/**
 * 加载最新数据
 * 优先从 /latest-data.json 加载，失败时返回 fallback
 */
export async function loadLatestData(): Promise<LatestData> {
  if (cachedData) return cachedData;

  try {
    const res = await fetch('/latest-data.json?' + new Date().toISOString().slice(0, 10));
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cachedData = await res.json();
    return cachedData!;
  } catch (e) {
    console.warn('⚠️ 加载 latest-data.json 失败，使用内置数据:', e);
    return getFallbackData();
  }
}

/**
 * 将 IndexData 转为 FreightIndex 类型
 */
export function toFreightIndex(data: IndexData): FreightIndex {
  return {
    name: data.name,
    code: data.code,
    currentValue: data.currentValue,
    previousValue: data.previousValue,
    change: data.change,
    changePercent: data.changePercent,
    trend: data.trend as 'up' | 'down' | 'stable',
    history: data.history
  };
}

/**
 * 获取数据更新时间展示文本
 */
export function getDataTimestamp(data: LatestData): string {
  const d = new Date(data.meta.updatedAt);
  return d.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function getFallbackData(): LatestData {
  const today = new Date().toISOString().split('T')[0];
  return {
    meta: {
      updatedAt: new Date().toISOString(),
      date: today,
      version: '1.0',
      dataSource: {
        scfi: '内置模拟数据',
        ccfi: '内置模拟数据',
        bdi: '内置模拟数据',
        fuel: '内置模拟数据',
        cny: '内置模拟数据',
        freightRates: '内置模拟数据',
        notes: '无法连接数据服务，显示内置数据'
      }
    },
    indices: {
      scfi: { name: '上海出口集装箱运价指数', code: 'SCFI', currentValue: 2148, previousValue: 2098, change: 50, changePercent: 2.38, trend: 'up', history: [], source: '模拟', note: '' },
      ccfi: { name: '中国出口集装箱运价指数', code: 'CCFI', currentValue: 1456, previousValue: 1432, change: 24, changePercent: 1.68, trend: 'up', history: [], source: '模拟', note: '' },
      bdi: { name: '波罗的海干散货指数', code: 'BDI', currentValue: 1685, previousValue: 1712, change: -27, changePercent: -1.58, trend: 'down', history: [], source: '模拟', note: '' }
    },
    macro: { fuelPrice: { ifo380: 612, vlsfo: 685, unit: 'USD/MT', trend: 'stable', weekChange: -3.2 }, exchangeRate: { usdCny: '7.2436', eurCny: null, date: today }, containerPrice: { new20gp: 2350, new40hq: 3850, used20gp: 1650, used40hq: 2800, unit: 'USD' } },
    marketOverview: { totalIndex: 2148, totalIndexChange: 2.38, activeRoutes: 24, bullishSignals: 8, bearishSignals: 5, overallTrend: 'bullish' },
    mainRoutes: []
  };
}
