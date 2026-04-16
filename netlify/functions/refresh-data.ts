import { Handler, ScheduledEvent } from "@netlify/functions";

/**
 * Netlify Scheduled Function — 每天自动更新数据
 * 
 * 触发条件：在 Netlify 控制台设置 @daily schedule
 * 或者手动调用：netlify functions invoke refresh-data
 */
export const handler: Handler<ScheduledEvent> = async () => {
  try {
    console.log("🔄 开始每日数据刷新...");

    // 1. 获取汇率
    const cnyRes = await fetch("https://api.exchangerate-api.com/v4/latest/USD", {
      signal: AbortSignal.timeout(15000),
    });
    const cnyData = cnyRes.ok ? await cnyRes.json() : null;
    const usdCny = cnyData?.rates?.CNY;

    console.log(`   💱 USD/CNY: ${usdCny ? usdCny.toFixed(4) : "获取失败"}`);

    // 2. 这里可以添加更多数据源...
    // - BDI 从资讯 API 抓取
    // - 燃油价格从市场报价更新
    // - SCFI/CCFI 目前无公开 API

    console.log("✅ 每日数据刷新完成");

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "数据刷新完成",
        timestamp: new Date().toISOString(),
        data: {
          usdCny: usdCny ? usdCny.toFixed(4) : null,
        },
      }),
    };
  } catch (error) {
    console.error("❌ 数据刷新失败:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: String(error),
      }),
    };
  }
};
