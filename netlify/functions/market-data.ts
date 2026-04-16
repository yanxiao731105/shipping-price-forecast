import { Handler } from "@netlify/functions";

// 缓存：减少重复请求
let cachedData = null;
let lastFetch = 0;
const CACHE_TTL = 30 * 60 * 1000; // 30 分钟

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Content-Type": "application/json",
};

export const handler: Handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: CORS_HEADERS, body: "" };
  }

  try {
    const now = Date.now();

    // 有缓存且未过期
    if (cachedData && now - lastFetch < CACHE_TTL) {
      return {
        statusCode: 200,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          ...cachedData,
          _meta: { fromCache: true, cachedAt: lastFetch },
        }),
      };
    }

    // ── 1. 汇率 ──
    const cnyRes = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      signal: AbortSignal.timeout(10000),
    });
    const cnyData = cnyRes.ok ? await cnyRes.json() : null;
    const usdCny = cnyData?.rates?.CNY || null;
    const eurCny = cnyData?.rates?.EUR
      ? (cnyData.rates.CNY / cnyData.rates.EUR).toFixed(4)
      : null;

    // ── 2. 组装数据 ──
    const timestamp = new Date().toISOString();
    const today = timestamp.split("T")[0];

    cachedData = {
      meta: {
        updatedAt: timestamp,
        date: today,
        version: "2.1",
        dataSource: {
          scfi: "上海航运交易所（模拟·无公开API）",
          ccfi: "交通运输部（模拟·无公开API）",
          bdi: "波罗的海交易所",
          fuel: "市场参考价",
          cny: usdCny ? "exchangerate-api.com" : "默认值",
          notes: "汇率实时获取；BDI参考最新资讯；SCFI/CCFI无公开API",
        },
      },
      macro: {
        exchangeRate: {
          usdCny: usdCny ? usdCny.toFixed(4) : "7.2436",
          eurCny,
          date: today,
          live: !!usdCny,
        },
      },
    };

    lastFetch = now;

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        ...cachedData,
        _meta: { fromCache: false, fetchedAt: timestamp },
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: "数据获取失败", message: String(error) }),
    };
  }
};
