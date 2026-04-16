import type {
  FreightRate,
  FreightIndex,
  SupplyDemandMetrics,
  GeopoliticalFactor,
  RouteData,
  MarketOverview,
  BookingRecommendation,
  ShippingLine,
  VesselSchedule,
  ForwarderRate,
  ProductQuote,
  RouteProductQuote,
  Surcharge,
  RouteSurcharge,
  RateComparison,
  TariffRate,
  CustomsPolicy,
  PriceReference,
  RouteRegion
} from '@/types';

// SCFI 指数历史数据（模拟）
export const generateSCFIHistory = () => {
  const history = [];
  const baseValue = 2100;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const value = baseValue + Math.sin(i / 5) * 150 + Math.random() * 100;
    history.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value)
    });
  }
  return history;
};

// CCFI 指数历史数据（模拟）
export const generateCCFIHistory = () => {
  const history = [];
  const baseValue = 1450;
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const value = baseValue + Math.cos(i / 7) * 100 + Math.random() * 80;
    history.push({
      date: date.toISOString().split('T')[0],
      value: Math.round(value)
    });
  }
  return history;
};

// 市场概览
export const marketOverview: MarketOverview = {
  totalIndex: 2147.86,
  totalIndexChange: 2.34,
  activeRoutes: 24,
  bullishSignals: 8,
  bearishSignals: 5,
  overallTrend: 'bullish'
};

// 运价指数
export const freightIndices: FreightIndex[] = [
  {
    name: '上海出口集装箱运价指数',
    code: 'SCFI',
    currentValue: 2147.86,
    previousValue: 2098.45,
    change: 49.41,
    changePercent: 2.35,
    trend: 'up',
    history: generateSCFIHistory()
  },
  {
    name: '中国出口集装箱运价指数',
    code: 'CCFI',
    currentValue: 1456.32,
    previousValue: 1432.18,
    change: 24.14,
    changePercent: 1.69,
    trend: 'up',
    history: generateCCFIHistory()
  },
  {
    name: '欧洲航线综合运价',
    code: 'EU',
    currentValue: 2850,
    previousValue: 2780,
    change: 70,
    changePercent: 2.52,
    trend: 'up',
    history: generateSCFIHistory().map(h => ({ ...h, value: h.value * 1.3 }))
  },
  {
    name: '美西航线综合运价',
    code: 'USWC',
    currentValue: 3200,
    previousValue: 3350,
    change: -150,
    changePercent: -4.48,
    trend: 'down',
    history: generateSCFIHistory().map(h => ({ ...h, value: h.value * 1.5 }))
  },
  {
    name: '美东航线综合运价',
    code: 'USEC',
    currentValue: 4200,
    previousValue: 4050,
    change: 150,
    changePercent: 3.70,
    trend: 'up',
    history: generateSCFIHistory().map(h => ({ ...h, value: h.value * 1.9 }))
  },
  {
    name: '地中海航线运价',
    code: 'MED',
    currentValue: 2650,
    previousValue: 2600,
    change: 50,
    changePercent: 1.92,
    trend: 'up',
    history: generateSCFIHistory().map(h => ({ ...h, value: h.value * 1.2 }))
  }
];

// 主要航线运价
export const mainRoutes: FreightRate[] = [
  {
    route: 'Shanghai-Rotterdam',
    routeName: '上海-鹿特丹',
    currentPrice: 2850,
    previousPrice: 2780,
    change: 70,
    changePercent: 2.52,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Shanghai-Los Angeles',
    routeName: '上海-洛杉矶',
    currentPrice: 3200,
    previousPrice: 3350,
    change: -150,
    changePercent: -4.48,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Shanghai-New York',
    routeName: '上海-纽约',
    currentPrice: 4200,
    previousPrice: 4050,
    change: 150,
    changePercent: 3.70,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Shanghai-Dubai',
    routeName: '上海-迪拜',
    currentPrice: 1450,
    previousPrice: 1420,
    change: 30,
    changePercent: 2.11,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Shanghai-Singapore',
    routeName: '上海-新加坡',
    currentPrice: 580,
    previousPrice: 560,
    change: 20,
    changePercent: 3.57,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Ningbo-Hamburg',
    routeName: '宁波-汉堡',
    currentPrice: 2750,
    previousPrice: 2680,
    change: 70,
    changePercent: 2.61,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Shenzhen-Antwerp',
    routeName: '深圳-安特卫普',
    currentPrice: 2900,
    previousPrice: 2820,
    change: 80,
    changePercent: 2.84,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Hong Kong-Santos',
    routeName: '香港-桑托斯',
    currentPrice: 1850,
    previousPrice: 1920,
    change: -70,
    changePercent: -3.65,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  },
  {
    route: 'Shenzhen-Djibouti',
    routeName: '深圳-吉布提',
    currentPrice: 1650,
    previousPrice: 1580,
    change: 70,
    changePercent: 4.43,
    unit: 'USD/TEU',
    lastUpdate: '2026-04-15'
  }
];

// 供需平衡指标
export const supplyDemandMetrics: SupplyDemandMetrics = {
  utilizationRate: 92.5,
  utilizationChange: 3.2,
  blankSailingRate: 4.8,
  blankSailingChange: -1.2,
  orderbookVolume: 4.2,
  newbuildingDeliveries: 1.8,
  scrapRate: 0.6
};

// 地缘政治因素
export const geopoliticalFactors: GeopoliticalFactor[] = [
  {
    id: 'red-sea-1',
    name: '红海危机',
    impact: 'negative',
    severity: 'high',
    description: '胡塞武装持续袭击商船，迫使船公司绕行好望角，大幅增加运输时间和成本',
    affectedRoutes: ['Shanghai-Rotterdam', 'Ningbo-Hamburg', 'Shenzhen-Antwerp', 'Shanghai-Dubai'],
    startDate: '2023-12-01',
    currentStatus: 'active'
  },
  {
    id: 'port-strike-1',
    name: '欧洲港口罢工',
    impact: 'negative',
    severity: 'medium',
    description: '德国港口工人罢工导致作业效率下降，预计影响汉堡、不来梅等港口',
    affectedRoutes: ['Ningbo-Hamburg', 'Shenzhen-Antwerp'],
    startDate: '2026-04-10',
    endDate: '2026-04-20',
    currentStatus: 'active'
  },
  {
    id: 'us-labor-1',
    name: '美国西海岸劳资谈判',
    impact: 'neutral',
    severity: 'medium',
    description: 'ILWU与 PMA 谈判进展缓慢，市场观望情绪浓厚',
    affectedRoutes: ['Shanghai-Los Angeles'],
    startDate: '2026-03-15',
    currentStatus: 'active'
  },
  {
    id: 'typhoon-1',
    name: '台风影响',
    impact: 'negative',
    severity: 'low',
    description: '菲律宾以东热带低压可能影响东亚航线船期',
    affectedRoutes: ['Shanghai-Singapore', 'Shanghai-Dubai'],
    startDate: '2026-04-14',
    endDate: '2026-04-17',
    currentStatus: 'active'
  },
  {
    id: 'suez-status',
    name: '苏伊士运河通行状况',
    impact: 'positive',
    severity: 'high',
    description: '苏伊士运河管理局加快通航效率，部分缓解红海绕行压力',
    affectedRoutes: ['Shanghai-Rotterdam', 'Ningbo-Hamburg', 'Shenzhen-Antwerp'],
    startDate: '2026-01-01',
    currentStatus: 'active'
  },
  {
    id: 'ethiopia-corridor',
    name: '埃塞俄比亚物流走廊',
    impact: 'positive',
    severity: 'medium',
    description: '埃塞俄比亚经吉布提港的进出口货物量持续增长，支撑航线运价稳定',
    affectedRoutes: ['Shenzhen-Djibouti'],
    startDate: '2026-01-01',
    currentStatus: 'active'
  }
];

// 航线预测数据
export const routeForecastData: RouteData[] = [
  {
    id: 'eu-route',
    name: '欧洲航线',
    code: 'EU',
    region: 'Europe',
    currentRate: 2850,
    forecast: generateForecast(2850, 'up', 4),
    fakRate: { price20gp: 2400, price40gp: 4200, price40hq: 4300, lastUpdate: '2026-04-15' },
    contractRate: { quarterly: 2600, annual: 2400, premium: 8.3 }
  },
  {
    id: 'uswc-route',
    name: '美西航线',
    code: 'USWC',
    region: 'North America',
    currentRate: 3200,
    forecast: generateForecast(3200, 'down', 4),
    fakRate: { price20gp: 2800, price40gp: 4800, price40hq: 4900, lastUpdate: '2026-04-15' },
    contractRate: { quarterly: 3000, annual: 2800, premium: 12.5 }
  },
  {
    id: 'usec-route',
    name: '美东航线',
    code: 'USEC',
    region: 'North America',
    currentRate: 4200,
    forecast: generateForecast(4200, 'up', 4),
    fakRate: { price20gp: 3600, price40gp: 6400, price40hq: 6600, lastUpdate: '2026-04-15' },
    contractRate: { quarterly: 3900, annual: 3600, premium: 14.3 }
  },
  {
    id: 'med-route',
    name: '地中海航线',
    code: 'MED',
    region: 'Mediterranean',
    currentRate: 2650,
    forecast: generateForecast(2650, 'stable', 4),
    fakRate: { price20gp: 2200, price40gp: 3800, price40hq: 3900, lastUpdate: '2026-04-15' },
    contractRate: { quarterly: 2500, annual: 2300, premium: 13.2 }
  },
  {
    id: 'djibouti-route',
    name: '深圳-吉布提',
    code: 'DJI',
    region: 'Red Sea / Africa',
    currentRate: 1650,
    forecast: generateForecast(1650, 'up', 4),
    fakRate: { price20gp: 1400, price40gp: 2400, price40hq: 2500, lastUpdate: '2026-04-15' },
    contractRate: { quarterly: 1550, annual: 1450, premium: 12.1 }
  }
];

// 生成预测数据
function generateForecast(basePrice: number, trend: 'up' | 'down' | 'stable', weeks: number) {
  type ForecastItem = { week: number; date: string; predictedPrice: number; confidence: number; trend: 'up' | 'down' | 'stable'; factors: string[] };
  const forecast: ForecastItem[] = [];
  const today = new Date();
  
  for (let i = 1; i <= weeks; i++) {
    const forecastDate = new Date(today);
    forecastDate.setDate(forecastDate.getDate() + i * 7);
    
    let changeRate = 0;
    if (trend === 'up') {
      changeRate = 0.02 + Math.random() * 0.02;
    } else if (trend === 'down') {
      changeRate = -0.02 - Math.random() * 0.02;
    }
    
    const predictedPrice = basePrice * (1 + changeRate * i);
    const itemTrend: 'up' | 'down' | 'stable' = changeRate > 0.01 ? 'up' : changeRate < -0.01 ? 'down' : 'stable';
    
    forecast.push({
      week: i,
      date: forecastDate.toISOString().split('T')[0],
      predictedPrice: Math.round(predictedPrice),
      confidence: 85 - i * 3 + Math.random() * 5,
      trend: itemTrend,
      factors: getForecastFactors(trend)
    });
  }
  
  return forecast;
}

// 获取预测因素
function getForecastFactors(trend: 'up' | 'down' | 'stable'): string[] {
  const factors: Record<string, string[]> = {
    up: ['舱位利用率上升', '红海危机持续', '燃油成本增加', '旺季备货需求'],
    down: ['新船交付增加', '淡季需求回落', '港口拥堵缓解', '供应链效率提升'],
    stable: ['市场供需平衡', '运力稳定', '地缘风险可控', '成本支撑较强']
  };
  
  return factors[trend].slice(0, 3);
}

// 订舱建议
export const bookingRecommendations: BookingRecommendation[] = [
  {
    route: '上海-鹿特丹',
    action: 'book_now',
    confidence: 82,
    reason: '红海危机持续推高运价，预计2周内仍有5-8%上涨空间，建议尽快锁定舱位',
    optimalTiming: '本周内',
    priceRange: { min: 2850, max: 3100, expected: 2950 },
    riskLevel: 'medium'
  },
  {
    route: '上海-洛杉矶',
    action: 'wait',
    confidence: 75,
    reason: '美西航线运价回调，短期趋势向下，建议观望2周等待更好的订舱窗口',
    optimalTiming: '4月底',
    priceRange: { min: 2900, max: 3200, expected: 3050 },
    riskLevel: 'low'
  },
  {
    route: '上海-纽约',
    action: 'book_now',
    confidence: 78,
    reason: '美东需求旺盛，舱位紧张，预计运价将继续上涨10%左右',
    optimalTiming: '本周内',
    priceRange: { min: 4200, max: 4600, expected: 4350 },
    riskLevel: 'medium'
  },
  {
    route: '地中海航线',
    action: 'hedge',
    confidence: 70,
    reason: '欧洲港口罢工影响不确定性较大，建议分批订舱对冲风险',
    optimalTiming: '分批执行',
    priceRange: { min: 2600, max: 2800, expected: 2700 },
    riskLevel: 'high'
  },
  {
    route: '深圳-吉布提',
    action: 'book_now',
    confidence: 80,
    reason: '埃塞俄比亚进口需求旺盛，吉布提港中转货物量增长，预计运价将继续上涨5-7%',
    optimalTiming: '本周内',
    priceRange: { min: 1650, max: 1780, expected: 1720 },
    riskLevel: 'low'
  }
];

// 船公司数据
export const shippingLines: ShippingLine[] = [
  {
    code: 'MSC',
    name: '地中海航运',
    alliance: '独立',
    marketShare: 19.5,
    vesselCount: 800,
    totalCapacity: 5.8,
    weeklySailings: 280
  },
  {
    code: 'Maersk',
    name: '马士基',
    alliance: '2M',
    marketShare: 16.8,
    vesselCount: 730,
    totalCapacity: 4.9,
    weeklySailings: 250
  },
  {
    code: 'CMA CGM',
    name: '达飞轮船',
    alliance: 'Ocean Alliance',
    marketShare: 12.5,
    vesselCount: 620,
    totalCapacity: 3.6,
    weeklySailings: 210
  },
  {
    code: 'COSCO',
    name: '中远海运',
    alliance: 'Ocean Alliance',
    marketShare: 11.2,
    vesselCount: 480,
    totalCapacity: 3.2,
    weeklySailings: 180
  },
  {
    code: 'Hapag-Lloyd',
    name: '赫伯罗特',
    alliance: 'The Alliance',
    marketShare: 7.8,
    vesselCount: 260,
    totalCapacity: 1.9,
    weeklySailings: 120
  },
  {
    code: 'ONE',
    name: '海洋网联',
    alliance: 'The Alliance',
    marketShare: 6.5,
    vesselCount: 210,
    totalCapacity: 1.5,
    weeklySailings: 95
  }
];

// 船期数据（增强版：含截关时间）
export const vesselSchedules: VesselSchedule[] = [
  {
    id: 'vs001',
    vesselName: 'MSC GÜLSÜN',
    voyageNumber: 'WU261R',
    shippingLine: 'MSC',
    route: 'Shanghai-Rotterdam',
    routeName: '上海-鹿特丹',
    pol: 'CNSHA',
    polName: '上海港',
    pod: 'NLRTM',
    podName: '鹿特丹港',
    etd: '2026-04-18',
    eta: '2026-05-15',
    transitDays: 27,
    capacity: 23756,
    availableTeu: 850,
    price: 2850,
    status: 'open',
    cutoffTime: '04-15 18:00'
  },
  {
    id: 'vs002',
    vesselName: 'Maersk Mc-Kinney',
    voyageNumber: 'ME261A',
    shippingLine: 'Maersk',
    route: 'Shanghai-Los Angeles',
    routeName: '上海-洛杉矶',
    pol: 'CNSHA',
    polName: '上海港',
    pod: 'USLAX',
    podName: '洛杉矶港',
    etd: '2026-04-20',
    eta: '2026-05-08',
    transitDays: 18,
    capacity: 18270,
    availableTeu: 1200,
    price: 3200,
    status: 'open',
    cutoffTime: '04-17 18:00'
  },
  {
    id: 'vs003',
    vesselName: 'CMA CGM Antoine',
    voyageNumber: 'AX261B',
    shippingLine: 'CMA CGM',
    route: 'Shanghai-New York',
    routeName: '上海-纽约',
    pol: 'CNSHA',
    polName: '上海港',
    pod: 'USNYC',
    podName: '纽约港',
    etd: '2026-04-22',
    eta: '2026-05-28',
    transitDays: 36,
    capacity: 22920,
    availableTeu: 450,
    price: 4200,
    status: 'filling',
    cutoffTime: '04-19 18:00'
  },
  {
    id: 'vs004',
    vesselName: 'COSCO Universe',
    voyageNumber: 'CX261C',
    shippingLine: 'COSCO',
    route: 'Shanghai-Dubai',
    routeName: '上海-迪拜',
    pol: 'CNSHA',
    polName: '上海港',
    pod: 'AEJEA',
    podName: '杰贝阿里港',
    etd: '2026-04-19',
    eta: '2026-05-05',
    transitDays: 16,
    capacity: 20119,
    availableTeu: 2100,
    price: 1450,
    status: 'open',
    cutoffTime: '04-16 18:00'
  },
  {
    id: 'vs005',
    vesselName: 'Hapag-Lloyd Berlin',
    voyageNumber: 'HL261D',
    shippingLine: 'Hapag-Lloyd',
    route: 'Ningbo-Hamburg',
    routeName: '宁波-汉堡',
    pol: 'CNNBO',
    polName: '宁波港',
    pod: 'DEHAM',
    podName: '汉堡港',
    etd: '2026-04-21',
    eta: '2026-05-22',
    transitDays: 31,
    capacity: 13198,
    availableTeu: 680,
    price: 2750,
    status: 'open',
    cutoffTime: '04-18 18:00'
  },
  {
    id: 'vs006',
    vesselName: 'MSC Ambra',
    voyageNumber: 'WB261E',
    shippingLine: 'MSC',
    route: 'Shenzhen-Djibouti',
    routeName: '深圳-吉布提',
    pol: 'CNSZX',
    polName: '深圳港',
    pod: 'DJJIB',
    podName: '吉布提港',
    etd: '2026-04-23',
    eta: '2026-05-18',
    transitDays: 25,
    capacity: 14700,
    availableTeu: 320,
    price: 1650,
    status: 'filling',
    cutoffTime: '04-20 18:00'
  },
  {
    id: 'vs007',
    vesselName: 'ONE Innovation',
    voyageNumber: 'OI261F',
    shippingLine: 'ONE',
    route: 'Shenzhen-Antwerp',
    routeName: '深圳-安特卫普',
    pol: 'CNSZX',
    polName: '深圳港',
    pod: 'BEANR',
    podName: '安特卫普港',
    etd: '2026-04-24',
    eta: '2026-05-30',
    transitDays: 36,
    capacity: 14070,
    availableTeu: 950,
    price: 2900,
    status: 'open',
    cutoffTime: '04-21 18:00'
  },
  {
    id: 'vs008',
    vesselName: 'Maersk Seletar',
    voyageNumber: 'MS261G',
    shippingLine: 'Maersk',
    route: 'Shanghai-Singapore',
    routeName: '上海-新加坡',
    pol: 'CNSHA',
    polName: '上海港',
    pod: 'SGSIN',
    podName: '新加坡港',
    etd: '2026-04-17',
    eta: '2026-04-23',
    transitDays: 6,
    capacity: 16552,
    availableTeu: 4200,
    price: 580,
    status: 'open',
    cutoffTime: '04-16 12:00'
  }
];

// 货代公司运价数据
export const forwarderRates: ForwarderRate[] = [
  // ── 头部货代 ──────────────────────────────────────────────────────
  {
    id: 'fw-top-01',
    company: '中外运（Sinotrans）',
    tier: 'top',
    route: 'EU',
    routeName: '欧洲航线',
    price20gp: 2200,
    price40gp: 3850,
    price40hq: 3950,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '优先放舱 · 全程追踪 · VIP客服',
    bookingContact: 'booking-eu@sinotrans.com',
    discount: -8.3,
    remarks: '可叠加门到门服务，含一次免费改港'
  },
  {
    id: 'fw-top-02',
    company: '中外运（Sinotrans）',
    tier: 'top',
    route: 'DJI',
    routeName: '深圳-吉布提',
    price20gp: 1280,
    price40gp: 2200,
    price40hq: 2280,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '优先放舱 · 全程追踪 · VIP客服',
    bookingContact: 'booking-africa@sinotrans.com',
    discount: -8.6,
    remarks: '深圳港固定舱位，截关前72小时确认'
  },
  {
    id: 'fw-top-03',
    company: '中远海运货代（COSCO Logistics）',
    tier: 'top',
    route: 'USWC',
    routeName: '美西航线',
    price20gp: 2580,
    price40gp: 4400,
    price40hq: 4550,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '优先仓位 · 电子提单 · 清关协助',
    bookingContact: 'booking-us@cosco-logistics.com',
    discount: -7.5,
    remarks: '与母公司中远海运绑定排舱，舱位稳定性高'
  },
  {
    id: 'fw-top-04',
    company: '嘉里物流（Kerry Logistics）',
    tier: 'top',
    route: 'USEC',
    routeName: '美东航线',
    price20gp: 3280,
    price40gp: 5800,
    price40hq: 5950,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '全程可视化 · 危化品资质 · 美国清关',
    bookingContact: 'booking-usec@kerrylogistics.com',
    discount: -9.4,
    remarks: '含美国ISF申报，可提供保税仓转运'
  },
  {
    id: 'fw-top-05',
    company: '德迅（Kuehne+Nagel）',
    tier: 'top',
    route: 'MED',
    routeName: '地中海航线',
    price20gp: 2000,
    price40gp: 3450,
    price40hq: 3550,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '多船司比价 · 港口直客价 · SLA保障',
    bookingContact: 'booking-med@kuehne-nagel.com.cn',
    discount: -10.1,
    remarks: '依托欧洲本地网络，目的港有自营仓库'
  },
  // ── 中等货代 ──────────────────────────────────────────────────────
  {
    id: 'fw-mid-01',
    company: '新海丰物流（SITC Logistics）',
    tier: 'mid',
    route: 'EU',
    routeName: '欧洲航线',
    price20gp: 2380,
    price40gp: 4100,
    price40hq: 4200,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '集拼拼箱优势 · 快速出提单',
    bookingContact: 'sales-eu@sitclogistics.com',
    discount: -2.8,
    remarks: '擅长LCL拼箱，FCL也可接'
  },
  {
    id: 'fw-mid-02',
    company: '万邦物流（Wanbo Logistics）',
    tier: 'mid',
    route: 'DJI',
    routeName: '深圳-吉布提',
    price20gp: 1350,
    price40gp: 2320,
    price40hq: 2400,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '非洲港口熟悉 · 出口退税协助',
    bookingContact: 'africa@wanbo-logistics.com',
    discount: -3.4,
    remarks: '在吉布提有合作清关行，通关经验丰富'
  },
  {
    id: 'fw-mid-03',
    company: '锦程国际物流',
    tier: 'mid',
    route: 'USWC',
    routeName: '美西航线',
    price20gp: 2720,
    price40gp: 4650,
    price40hq: 4750,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '快速回价 · 本地提货 · 报关一体',
    bookingContact: '0755-88887777',
    discount: -3.1,
    remarks: '擅长AMS/ISF申报，可代办美国清关'
  },
  {
    id: 'fw-mid-04',
    company: '安能物流国际部',
    tier: 'mid',
    route: 'USEC',
    routeName: '美东航线',
    price20gp: 3450,
    price40gp: 6050,
    price40hq: 6200,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '末端派送资源 · FBA头程经验',
    bookingContact: 'intl@anneng.com',
    discount: -3.7,
    remarks: '专注跨境电商FBA头程，可做亚马逊仓发'
  },
  {
    id: 'fw-mid-05',
    company: '上海骏丰货代',
    tier: 'mid',
    route: 'MED',
    routeName: '地中海航线',
    price20gp: 2150,
    price40gp: 3700,
    price40hq: 3800,
    validFrom: '2026-04-14',
    validTo: '2026-04-27',
    serviceLevel: '欧洲仓储合作 · 返程货优先',
    bookingContact: 'junfeng-med@126.com',
    discount: -5.8,
    remarks: '与土耳其清关行深度合作，伊斯坦布尔目的港熟悉'
  },
  // ── 普通货代 ──────────────────────────────────────────────────────
  {
    id: 'fw-sml-01',
    company: '深圳顺通货运代理',
    tier: 'small',
    route: 'EU',
    routeName: '欧洲航线',
    price20gp: 2500,
    price40gp: 4300,
    price40hq: 4400,
    validFrom: '2026-04-15',
    validTo: '2026-04-21',
    serviceLevel: '价格灵活 · 小批量接单',
    bookingContact: '0755-66665555',
    discount: 2.2,
    remarks: '适合小批量散货，接单灵活，截关时间宽松'
  },
  {
    id: 'fw-sml-02',
    company: '吉布提之路货代（深圳）',
    tier: 'small',
    route: 'DJI',
    routeName: '深圳-吉布提',
    price20gp: 1420,
    price40gp: 2450,
    price40hq: 2530,
    validFrom: '2026-04-15',
    validTo: '2026-04-21',
    serviceLevel: '专线非洲 · 私人微信群通知',
    bookingContact: 'WeChat: djiboutiline',
    discount: 1.5,
    remarks: '专做吉布提专线，可接危险品（限部分品类）'
  },
  {
    id: 'fw-sml-03',
    company: '鸿运国际货运代理',
    tier: 'small',
    route: 'USWC',
    routeName: '美西航线',
    price20gp: 2820,
    price40gp: 4800,
    price40hq: 4900,
    validFrom: '2026-04-15',
    validTo: '2026-04-21',
    serviceLevel: '价格最低 · 基础服务',
    bookingContact: '13800138000',
    discount: 0.8,
    remarks: '无额外服务，自行报关；适合有经验的自营客户'
  },
  {
    id: 'fw-sml-04',
    company: '广州昱海货运',
    tier: 'small',
    route: 'USEC',
    routeName: '美东航线',
    price20gp: 3600,
    price40gp: 6300,
    price40hq: 6450,
    validFrom: '2026-04-15',
    validTo: '2026-04-21',
    serviceLevel: '快速订舱 · 无最低箱量',
    bookingContact: 'yuhai-gz@qq.com',
    discount: 2.9,
    remarks: '1箱起订，灵活方便，适合零散出口客户'
  },
  {
    id: 'fw-sml-05',
    company: '远东福运货代',
    tier: 'small',
    route: 'MED',
    routeName: '地中海航线',
    price20gp: 2280,
    price40gp: 3920,
    price40hq: 4020,
    validFrom: '2026-04-15',
    validTo: '2026-04-21',
    serviceLevel: '价格透明 · 微信实时反馈',
    bookingContact: 'WeChat: fuyun_med',
    discount: -0.5,
    remarks: '报价含港杂，无隐性收费，适合新出口商'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 产品报价体系
// ─────────────────────────────────────────────────────────────────────────────

// 航线区域配置
export const routeRegions: Record<RouteRegion, { name: string; routes: string[] }> = {
  origin: { name: '中国出口', routes: ['CNSHA', 'CNNBO', 'CNSZX'] },
  southeast_asia: { name: '东南亚', routes: ['SGSIN', 'MYTPP', 'VNHPH', 'THLCH'] },
  europe: { name: '欧洲', routes: ['NLRTM', 'DEHAM', 'BEANR', 'GBFXT'] },
  america: { name: '美线', routes: ['USLAX', 'USNYC', 'USHOU'] },
  middle_east: { name: '中东', routes: ['AEJEA', 'SAJED', 'IRBND'] },
  mediterranean: { name: '地中海', routes: ['ITGOA', 'ESALG', 'GRPIR'] },
  south_america: { name: '南美', routes: ['BRSSZ', 'CLSAI', 'PECAL'] }
};

// 生成产品报价数据
function generateProductQuotes(route: string, basePrice: number): ProductQuote[] {
  const today = new Date();
  const validTo = new Date(today);
  validTo.setDate(validTo.getDate() + 7);

  return [
    // 普货
    { id: `${route}-general-20gp`, category: 'general', categoryName: '普货', containerType: '20GP', containerCategory: 'dry', basePrice, currentPrice: basePrice, previousPrice: basePrice * 0.97, change: basePrice * 0.03, changePercent: 3.0, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0] },
    { id: `${route}-general-40hq`, category: 'general', categoryName: '普货', containerType: '40HQ', containerCategory: 'dry', basePrice, currentPrice: basePrice * 1.08, previousPrice: basePrice * 1.05, change: basePrice * 0.03, changePercent: 2.86, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0] },
    { id: `${route}-general-45hq`, category: 'general', categoryName: '普货', containerType: '45HQ', containerCategory: 'dry', basePrice, currentPrice: basePrice * 1.35, previousPrice: basePrice * 1.32, change: basePrice * 0.03, changePercent: 2.27, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0] },
    // 危险品
    { id: `${route}-dangerous-20gp`, category: 'dangerous', categoryName: '危险品', containerType: '20GP', containerCategory: 'dry', basePrice, currentPrice: basePrice * 1.45, previousPrice: basePrice * 1.40, change: basePrice * 0.05, changePercent: 3.57, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '需提供危包证/MSDS' },
    { id: `${route}-dangerous-40hq`, category: 'dangerous', categoryName: '危险品', containerType: '40HQ', containerCategory: 'dry', basePrice, currentPrice: basePrice * 1.55, previousPrice: basePrice * 1.50, change: basePrice * 0.05, changePercent: 3.33, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '需提供危包证/MSDS' },
    { id: `${route}-dangerous-45hq`, category: 'dangerous', categoryName: '危险品', containerType: '45HQ', containerCategory: 'dry', basePrice, currentPrice: basePrice * 1.75, previousPrice: basePrice * 1.70, change: basePrice * 0.05, changePercent: 2.94, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '需提供危包证/MSDS' },
    // 超限货
    { id: `${route}-oversize-20ot`, category: 'oversize', categoryName: '超限货', containerType: '20OT', containerCategory: 'special', basePrice, currentPrice: basePrice * 1.60, previousPrice: basePrice * 1.55, change: basePrice * 0.05, changePercent: 3.23, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '框架箱，适合超限货物' },
    { id: `${route}-oversize-40ot`, category: 'oversize', categoryName: '超限货', containerType: '40OT', containerCategory: 'special', basePrice, currentPrice: basePrice * 1.80, previousPrice: basePrice * 1.75, change: basePrice * 0.05, changePercent: 2.86, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '框架箱，适合超限货物' },
    { id: `${route}-oversize-20fr`, category: 'oversize', categoryName: '超限货', containerType: '20FR', containerCategory: 'special', basePrice, currentPrice: basePrice * 1.70, previousPrice: basePrice * 1.65, change: basePrice * 0.05, changePercent: 3.03, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '平板箱，适合车辆/机械' },
    { id: `${route}-oversize-40fr`, category: 'oversize', categoryName: '超限货', containerType: '40FR', containerCategory: 'special', basePrice, currentPrice: basePrice * 1.95, previousPrice: basePrice * 1.90, change: basePrice * 0.05, changePercent: 2.63, unit: 'USD/TEU', validFrom: today.toISOString().split('T')[0], validTo: validTo.toISOString().split('T')[0], remarks: '平板箱，适合大型机械/工程项目' }
  ];
}

// 航线产品报价
export const routeProductQuotes: RouteProductQuote[] = [
  { route: 'EU', routeName: '欧洲航线', region: 'europe', quotes: generateProductQuotes('EU', 2850) },
  { route: 'USWC', routeName: '美西航线', region: 'america', quotes: generateProductQuotes('USWC', 3200) },
  { route: 'USEC', routeName: '美东航线', region: 'america', quotes: generateProductQuotes('USEC', 4200) },
  { route: 'SEA', routeName: '东南亚航线', region: 'southeast_asia', quotes: generateProductQuotes('SEA', 580) },
  { route: 'MED', routeName: '地中海航线', region: 'mediterranean', quotes: generateProductQuotes('MED', 2650) },
  { route: 'MDE', routeName: '中东航线', region: 'middle_east', quotes: generateProductQuotes('MDE', 1450) },
  { route: 'SA', routeName: '南美航线', region: 'south_america', quotes: generateProductQuotes('SA', 1850) },
  { route: 'DJI', routeName: '深圳-吉布提', region: 'middle_east', quotes: generateProductQuotes('DJI', 1650) }
];

// ─────────────────────────────────────────────────────────────────────────────
// 附加费明细
// ─────────────────────────────────────────────────────────────────────────────

// 通用附加费定义
export const surchargeDefinitions: Surcharge[] = [
  { id: 'baf', type: 'baf', name: '燃油附加费', nameEn: 'Bunker Adjustment Factor', description: '燃油价格波动补偿', unit: 'per_teu', amount: 150, currency: 'USD', effectiveDate: '2026-04-01', lastUpdate: '2026-04-10', remarks: '每月更新，根据油价浮动' },
  { id: 'caf', type: 'caf', name: '货币附加费', nameEn: 'Currency Adjustment Factor', description: '汇率波动补偿', unit: 'percentage', amount: 5, currency: 'USD', effectiveDate: '2026-04-01', lastUpdate: '2026-04-10', remarks: '美元兑人民币汇率波动超过3%时调整' },
  { id: 'war', type: 'war', name: '战争附加费', nameEn: 'War Risk Surcharge', description: '战争风险区域附加费', unit: 'per_teu', amount: 80, currency: 'USD', effectiveDate: '2026-03-15', lastUpdate: '2026-04-08', remarks: '红海地区额外加收' },
  { id: 'pcs', type: 'pcs', name: '港口拥挤附加费', nameEn: 'Port Congestion Surcharge', description: '港口拥堵导致的额外成本', unit: 'per_teu', amount: 50, currency: 'USD', effectiveDate: '2026-02-01', lastUpdate: '2026-04-05' },
  { id: 'thc', type: 'thc', name: '码头操作费', nameEn: 'Terminal Handling Charge', description: '码头装卸操作费用', unit: 'per_container', amount: 280, currency: 'CNY', effectiveDate: '2026-01-01', lastUpdate: '2026-04-01' },
  { id: 'ebs', type: 'ebs', name: '紧急燃油附加费', nameEn: 'Emergency Bunker Surcharge', description: '燃油价格急剧上涨时临时征收', unit: 'per_teu', amount: 60, currency: 'USD', effectiveDate: '2026-04-08', lastUpdate: '2026-04-10', remarks: '临时性，已包含在BAF中' },
  { id: 'cic', type: 'cic', name: '集装箱不平衡附加费', nameEn: 'Container Imbalance Charge', description: '回程空箱调运成本', unit: 'per_teu', amount: 30, currency: 'USD', effectiveDate: '2026-03-01', lastUpdate: '2026-04-01' },
  { id: 'seal', type: 'seal', name: '封条费', nameEn: 'Seal Charge', description: '集装箱封条费用', unit: 'per_container', amount: 25, currency: 'CNY', effectiveDate: '2026-01-01', lastUpdate: '2026-01-01' },
  { id: 'ams', type: 'ams', name: '美国自动舱单系统费', nameEn: 'AMS Filing Fee', description: '美国海关舱单申报费用', unit: 'per_bill', amount: 35, currency: 'USD', effectiveDate: '2026-01-01', lastUpdate: '2026-01-01', remarks: '仅美线需要' },
  { id: 'isf', type: 'isf', name: '美国进口安全申报费', nameEn: 'ISF Filing Fee', description: '美国进口安全申报费用', unit: 'per_bill', amount: 40, currency: 'USD', effectiveDate: '2026-01-01', lastUpdate: '2026-01-01', remarks: '仅美线需要' },
  { id: 'customs', type: 'customs', name: '清关代理费', nameEn: 'Customs Clearance Fee', description: '目的港清关代理服务费', unit: 'per_bill', amount: 150, currency: 'USD', effectiveDate: '2026-01-01', lastUpdate: '2026-01-01', remarks: '视目的港而定' }
];

// 航线附加费
export const routeSurcharges: RouteSurcharge[] = [
  {
    route: 'EU', routeName: '欧洲航线', region: 'europe',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[2], // War Risk
      surchargeDefinitions[3], // PCS
      surchargeDefinitions[4], // THC
      surchargeDefinitions[6], // CIC
      surchargeDefinitions[7]  // Seal
    ],
    totalSurcharge: 365, totalPrice: 3215
  },
  {
    route: 'USWC', routeName: '美西航线', region: 'america',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[4], // THC
      surchargeDefinitions[6], // CIC
      surchargeDefinitions[7], // Seal
      surchargeDefinitions[8], // AMS
      surchargeDefinitions[9]  // ISF
    ],
    totalSurcharge: 400, totalPrice: 3600
  },
  {
    route: 'USEC', routeName: '美东航线', region: 'america',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[4], // THC
      surchargeDefinitions[6], // CIC
      surchargeDefinitions[7], // Seal
      surchargeDefinitions[8], // AMS
      surchargeDefinitions[9]  // ISF
    ],
    totalSurcharge: 410, totalPrice: 4610
  },
  {
    route: 'MED', routeName: '地中海航线', region: 'mediterranean',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[2], // War Risk
      surchargeDefinitions[4], // THC
      surchargeDefinitions[6], // CIC
      surchargeDefinitions[7]  // Seal
    ],
    totalSurcharge: 355, totalPrice: 3005
  },
  {
    route: 'MDE', routeName: '中东航线', region: 'middle_east',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[2], // War Risk
      surchargeDefinitions[4], // THC
      surchargeDefinitions[7]  // Seal
    ],
    totalSurcharge: 305, totalPrice: 1755
  },
  {
    route: 'SEA', routeName: '东南亚航线', region: 'southeast_asia',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[4], // THC
      surchargeDefinitions[7]  // Seal
    ],
    totalSurcharge: 185, totalPrice: 765
  },
  {
    route: 'SA', routeName: '南美航线', region: 'south_america',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[4], // THC
      surchargeDefinitions[7], // Seal
      surchargeDefinitions[10] // Customs
    ],
    totalSurcharge: 375, totalPrice: 2225
  },
  {
    route: 'DJI', routeName: '深圳-吉布提', region: 'middle_east',
    surcharges: [
      surchargeDefinitions[0], // BAF
      surchargeDefinitions[1], // CAF
      surchargeDefinitions[2], // War Risk
      surchargeDefinitions[4], // THC
      surchargeDefinitions[7]  // Seal
    ],
    totalSurcharge: 325, totalPrice: 1975
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 多渠道运价对比
// ─────────────────────────────────────────────────────────────────────────────

export const rateComparisons: RateComparison[] = [
  {
    route: 'EU', routeName: '欧洲航线', basePrice: 4200,
    channels: [
      { id: 'carrier-msc', source: 'carrier', sourceName: 'MSC官网', sourceNameEn: 'MSC Direct', price20gp: 2450, price40gp: 4300, price40hq: 4400, discount: 2.4, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · 标准服务' },
      { id: 'carrier-cma', source: 'carrier', sourceName: 'CMA官网', sourceNameEn: 'CMA CGM Direct', price20gp: 2400, price40gp: 4250, price40hq: 4350, discount: 3.6, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · 标准服务' },
      { id: 'carrier-cosco', source: 'carrier', sourceName: 'COSCO官网', sourceNameEn: 'COSCO Direct', price20gp: 2380, price40gp: 4200, price40hq: 4300, discount: 4.3, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · 合约客户优先' },
      { id: 'fw-top-sinotrans', source: 'forwarder', sourceName: '中外运', sourceNameEn: 'Sinotrans', price20gp: 2200, price40gp: 3850, price40hq: 3950, discount: -8.3, validFrom: '2026-04-14', validTo: '2026-04-27', serviceLevel: '优先放舱 · 全程追踪 · VIP客服', contact: 'booking-eu@sinotrans.com' },
      { id: 'fw-mid-sitc', source: 'forwarder', sourceName: '新海丰', sourceNameEn: 'SITC', price20gp: 2380, price40gp: 4100, price40hq: 4200, discount: -2.8, validFrom: '2026-04-14', validTo: '2026-04-27', serviceLevel: '集拼拼箱优势 · 快速出提单', contact: 'sales-eu@sitclogistics.com' },
      { id: 'contract-yearly', source: 'contract', sourceName: '年度合约', sourceNameEn: 'Annual Contract', price20gp: 2100, price40gp: 3650, price40hq: 3750, discount: -13.1, validFrom: '2026-01-01', validTo: '2026-12-31', serviceLevel: '锁定运价 · 全年有效 · 最低价' },
      { id: 'contract-quarterly', source: 'contract', sourceName: '季度合约', sourceNameEn: 'Quarterly Contract', price20gp: 2280, price40gp: 3950, price40hq: 4050, discount: -5.9, validFrom: '2026-04-01', validTo: '2026-06-30', serviceLevel: '季度锁定 · 灵活调整' }
    ],
    bestPrice: 3650, bestChannel: '年度合约', savings: 550
  },
  {
    route: 'DJI', routeName: '深圳-吉布提', basePrice: 2400,
    channels: [
      { id: 'carrier-cma-dji', source: 'carrier', sourceName: 'CMA官网', sourceNameEn: 'CMA CGM Direct', price20gp: 1450, price40gp: 2500, price40hq: 2580, discount: 4.2, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · 标准服务' },
      { id: 'carrier-cosco-dji', source: 'carrier', sourceName: 'COSCO官网', sourceNameEn: 'COSCO Direct', price20gp: 1400, price40gp: 2450, price40hq: 2530, discount: 6.3, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · 中非专线' },
      { id: 'fw-top-sinotrans-dji', source: 'forwarder', sourceName: '中外运', sourceNameEn: 'Sinotrans', price20gp: 1280, price40gp: 2200, price40hq: 2280, discount: -8.6, validFrom: '2026-04-14', validTo: '2026-04-27', serviceLevel: '优先放舱 · 全程追踪 · 吉布提专线', contact: 'booking-africa@sinotrans.com' },
      { id: 'fw-mid-wanbo-dji', source: 'forwarder', sourceName: '万邦物流', sourceNameEn: 'Wanbo', price20gp: 1350, price40gp: 2320, price40hq: 2400, discount: -3.4, validFrom: '2026-04-14', validTo: '2026-04-27', serviceLevel: '非洲港口熟悉 · 出口退税协助', contact: 'africa@wanbo-logistics.com' },
      { id: 'contract-dji', source: 'contract', sourceName: '年度合约', sourceNameEn: 'Annual Contract', price20gp: 1200, price40gp: 2100, price40hq: 2180, discount: -12.5, validFrom: '2026-01-01', validTo: '2026-12-31', serviceLevel: '锁定运价 · 全年有效' }
    ],
    bestPrice: 2100, bestChannel: '年度合约', savings: 300
  },
  {
    route: 'USWC', routeName: '美西航线', basePrice: 4800,
    channels: [
      { id: 'carrier-maersk-us', source: 'carrier', sourceName: '马士基官网', sourceNameEn: 'Maersk Direct', price20gp: 2850, price40gp: 4900, price40hq: 5050, discount: 2.1, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · Maersk Spot' },
      { id: 'carrier-msc-us', source: 'carrier', sourceName: 'MSC官网', sourceNameEn: 'MSC Direct', price20gp: 2750, price40gp: 4800, price40hq: 4950, discount: 4.2, validFrom: '2026-04-14', validTo: '2026-04-21', serviceLevel: '官网直订 · 标准服务' },
      { id: 'fw-top-cosco-us', source: 'forwarder', sourceName: '中远海运货代', sourceNameEn: 'COSCO Logistics', price20gp: 2580, price40gp: 4400, price40hq: 4550, discount: -7.5, validFrom: '2026-04-14', validTo: '2026-04-27', serviceLevel: '优先仓位 · 电子提单 · 清关协助', contact: 'booking-us@cosco-logistics.com' },
      { id: 'contract-us', source: 'contract', sourceName: '年度合约', sourceNameEn: 'Annual Contract', price20gp: 2450, price40gp: 4200, price40hq: 4350, discount: -12.5, validFrom: '2026-01-01', validTo: '2026-12-31', serviceLevel: '锁定运价 · 全年有效' }
    ],
    bestPrice: 4200, bestChannel: '年度合约', savings: 600
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 清关政策
// ─────────────────────────────────────────────────────────────────────────────

// 关税税率数据
export const tariffRates: TariffRate[] = [
  { hsCode: '8471.30', description: '自动数据处理设备（电脑/服务器）', dutyRate: 0, vatRate: 13, additionalNotes: '进口零关税，需3C认证' },
  { hsCode: '8517.12', description: '手机/移动通信设备', dutyRate: 0, vatRate: 13, additionalNotes: '需电信设备进网许可' },
  { hsCode: '6204.62', description: '棉制女式长裤/短裤', dutyRate: 12, vatRate: 13 },
  { hsCode: '8471.50', description: '计算机处理部件', dutyRate: 0, vatRate: 13 },
  { hsCode: '9503.00', description: '玩具/游戏品', dutyRate: 0, vatRate: 13, additionalNotes: '需3C认证，安全标准' },
  { hsCode: '8408.10', description: '压燃式内燃发动机（柴油机）', dutyRate: 5, vatRate: 13, additionalNotes: '需进口许可' },
  { hsCode: '8703.23', description: '乘用车（1500-3000cc）', dutyRate: 15, vatRate: 13, additionalNotes: '排量大税率高' },
  { hsCode: '8528.72', description: '电视机/显示器', dutyRate: 15, vatRate: 13, additionalNotes: '需3C认证，能效标识' },
  { hsCode: '6402.19', description: '橡胶/塑料鞋靴', dutyRate: 10, vatRate: 13 },
  { hsCode: '9401.61', description: '软垫座椅（木材框架）', dutyRate: 0, vatRate: 13 },
  { hsCode: '7113.19', description: '贵金属首饰', dutyRate: 20, vatRate: 13, additionalNotes: '奢侈品税率较高' },
  { hsCode: '2204.21', description: '葡萄酒（小包装）', dutyRate: 14, vatRate: 13, additionalNotes: '需进口食品检验检疫' },
  { hsCode: '0901.11', description: '咖啡（未烘焙）', dutyRate: 8, vatRate: 9 },
  { hsCode: '5201.00', description: '未梳棉', dutyRate: 40, vatRate: 9, additionalNotes: '配额内/配额外差异' },
  { hsCode: '8704.21', description: '货运车辆（柴油，5吨以下）', dutyRate: 15, vatRate: 13, additionalNotes: '需CCC认证' },
  { hsCode: '8528.72', description: 'LCD/LED电视', dutyRate: 15, vatRate: 13, additionalNotes: '中国-东盟FTA税率0%' },
  { hsCode: '0306.13', description: '冻虾', dutyRate: 5, vatRate: 9, additionalNotes: '需进口食品检验检疫' },
  { hsCode: '2933.59', description: '化工原料（医药中间体）', dutyRate: 6.5, vatRate: 13, additionalNotes: '危险化学品需许可' },
  { hsCode: '8443.32', description: '打印机', dutyRate: 0, vatRate: 13, additionalNotes: '政府协议税率' },
  { hsCode: '6110.20', description: '棉质针织套头衫', dutyRate: 14, vatRate: 13 }
];

// 清关政策
export const customsPolicies: CustomsPolicy[] = [
  {
    country: '中国', countryCode: 'CN', region: 'origin',
    port: '深圳港', portCode: 'CNSZX',
    tariffs: tariffRates.slice(0, 5),
    customsClearanceFee: 500, clearanceDays: 1,
    specialRequirements: '出口货物需提前申报，商检产品需提前办理换证凭单',
    lastUpdate: '2026-04-10'
  },
  {
    country: '荷兰', countryCode: 'NL', region: 'europe',
    port: '鹿特丹港', portCode: 'NLRTM',
    tariffs: tariffRates.slice(0, 8),
    customsClearanceFee: 350, clearanceDays: 2,
    specialRequirements: '欧盟统一关税，EORI号必须，REACH法规适用化学品',
    lastUpdate: '2026-04-10'
  },
  {
    country: '德国', countryCode: 'DE', region: 'europe',
    port: '汉堡港', portCode: 'DEHAM',
    tariffs: tariffRates.slice(0, 6),
    customsClearanceFee: 380, clearanceDays: 2,
    specialRequirements: '欧盟统一关税，需EORI号，包装法规compliance',
    lastUpdate: '2026-04-10'
  },
  {
    country: '美国', countryCode: 'US', region: 'america',
    port: '洛杉矶港', portCode: 'USLAX',
    tariffs: tariffRates.slice(0, 10),
    customsClearanceFee: 450, clearanceDays: 3,
    specialRequirements: 'ISF提前申报，FDA产品需注册，301关税排除需申请',
    lastUpdate: '2026-04-10'
  },
  {
    country: '美国', countryCode: 'US', region: 'america',
    port: '纽约港', portCode: 'USNYC',
    tariffs: tariffRates.slice(0, 8),
    customsClearanceFee: 480, clearanceDays: 3,
    specialRequirements: '东海岸清关，ISF申报，AES出口申报配合',
    lastUpdate: '2026-04-10'
  },
  {
    country: '阿联酋', countryCode: 'AE', region: 'middle_east',
    port: '杰贝阿里港', portCode: 'AEJEA',
    tariffs: tariffRates.slice(0, 5),
    customsClearanceFee: 280, clearanceDays: 2,
    specialRequirements: '自由区货物与本地货物分类，关税按FOB计算',
    lastUpdate: '2026-04-10'
  },
  {
    country: '吉布提', countryCode: 'DJ', region: 'middle_east',
    port: '吉布提港', portCode: 'DJJIB',
    tariffs: [
      { hsCode: '8471.30', description: '计算机设备', dutyRate: 10, vatRate: 0, additionalNotes: '埃塞俄比亚转运货物免税' },
      { hsCode: '8703.23', description: '汽车配件', dutyRate: 15, vatRate: 10 },
      { hsCode: '8408.10', description: '发电机组', dutyRate: 5, vatRate: 10, additionalNotes: '项目物资可申请免税' },
      { hsCode: '5201.00', description: '棉花', dutyRate: 0, vatRate: 0, additionalNotes: '转口贸易免税' }
    ],
    customsClearanceFee: 200, clearanceDays: 3,
    specialRequirements: '中转货物需过境签证明，亚吉铁路联运便利化',
    lastUpdate: '2026-04-10'
  },
  {
    country: '沙特阿拉伯', countryCode: 'SA', region: 'middle_east',
    port: '吉达港', portCode: 'SAJED',
    tariffs: tariffRates.slice(0, 4),
    customsClearanceFee: 320, clearanceDays: 4,
    specialRequirements: 'SASO认证必需，女性进口限制，宗教产品需许可',
    lastUpdate: '2026-04-10'
  },
  {
    country: '巴西', countryCode: 'BR', region: 'south_america',
    port: '桑托斯港', portCode: 'BRSSZ',
    tariffs: tariffRates.slice(0, 6),
    customsClearanceFee: 400, clearanceDays: 5,
    specialRequirements: 'SISCOMEX系统申报，进口许可(IN)，税率按FOB+运费计算',
    lastUpdate: '2026-04-10'
  },
  {
    country: '智利', countryCode: 'CL', region: 'south_america',
    port: '圣安东尼奥港', portCode: 'CLSAI',
    tariffs: tariffRates.slice(0, 5),
    customsClearanceFee: 300, clearanceDays: 2,
    specialRequirements: '中国-智利FTA零关税，产地证Required(Form F)',
    lastUpdate: '2026-04-10'
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 价格参考维度
// ─────────────────────────────────────────────────────────────────────────────

export const priceReferences: PriceReference[] = [
  {
    route: 'EU', routeName: '欧洲航线',
    historicalTrend: { currentPrice: 2850, price1W: 2780, price1M: 2650, price3M: 2480, price6M: 2180, price1Y: 1920 },
    marketReference: { lowestPrice: 2650, averagePrice: 2850, highestPrice: 3100, volume: 158000 },
    forecast: { nextWeek: 2900, nextMonth: 3050, confidence: 78 }
  },
  {
    route: 'USWC', routeName: '美西航线',
    historicalTrend: { currentPrice: 3200, price1W: 3350, price1M: 3480, price3M: 3200, price6M: 2850, price1Y: 2450 },
    marketReference: { lowestPrice: 2900, averagePrice: 3150, highestPrice: 3500, volume: 185000 },
    forecast: { nextWeek: 3150, nextMonth: 3050, confidence: 72 }
  },
  {
    route: 'USEC', routeName: '美东航线',
    historicalTrend: { currentPrice: 4200, price1W: 4050, price1M: 3850, price3M: 3600, price6M: 3200, price1Y: 2800 },
    marketReference: { lowestPrice: 3900, averagePrice: 4150, highestPrice: 4500, volume: 98000 },
    forecast: { nextWeek: 4300, nextMonth: 4450, confidence: 75 }
  },
  {
    route: 'DJI', routeName: '深圳-吉布提',
    historicalTrend: { currentPrice: 1650, price1W: 1580, price1M: 1520, price3M: 1480, price6M: 1350, price1Y: 1180 },
    marketReference: { lowestPrice: 1500, averagePrice: 1620, highestPrice: 1750, volume: 42000 },
    forecast: { nextWeek: 1700, nextMonth: 1780, confidence: 80 }
  },
  {
    route: 'MED', routeName: '地中海航线',
    historicalTrend: { currentPrice: 2650, price1W: 2600, price1M: 2550, price3M: 2400, price6M: 2150, price1Y: 1880 },
    marketReference: { lowestPrice: 2500, averagePrice: 2620, highestPrice: 2850, volume: 78000 },
    forecast: { nextWeek: 2680, nextMonth: 2750, confidence: 70 }
  },
  {
    route: 'SEA', routeName: '东南亚航线',
    historicalTrend: { currentPrice: 580, price1W: 560, price1M: 550, price3M: 520, price6M: 480, price1Y: 420 },
    marketReference: { lowestPrice: 480, averagePrice: 560, highestPrice: 620, volume: 320000 },
    forecast: { nextWeek: 590, nextMonth: 610, confidence: 82 }
  },
  {
    route: 'SA', routeName: '南美航线',
    historicalTrend: { currentPrice: 1850, price1W: 1920, price1M: 1880, price3M: 1750, price6M: 1580, price1Y: 1380 },
    marketReference: { lowestPrice: 1680, averagePrice: 1820, highestPrice: 1980, volume: 55000 },
    forecast: { nextWeek: 1820, nextMonth: 1900, confidence: 68 }
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 航线分类
// ─────────────────────────────────────────────────────────────────────────────

export const routeClassifications = [
  {
    id: 'southeast_asia',
    name: '东南亚',
    code: 'SEA',
    ports: ['新加坡港 SGSIN', '巴生港 MYTPP', '海防港 VNHPH', '林查班港 THLCH', '雅加达港 IDJKT'],
    countries: ['新加坡', '马来西亚', '越南', '泰国', '印度尼西亚', '菲律宾'],
    features: ['航程短(3-7天)', '班次密集', '价格稳定', 'RCEP优惠']
  },
  {
    id: 'europe',
    name: '欧洲',
    code: 'EU',
    ports: ['鹿特丹港 NLRTM', '汉堡港 DEHAM', '安特卫普港 BEANR', '费利克斯托港 GBFXT', '勒阿弗尔港 FRLEH'],
    countries: ['荷兰', '德国', '比利时', '英国', '法国', '西班牙', '意大利'],
    features: ['航程长(28-35天)', '红海绕行影响', '旺季明显', '货值较高']
  },
  {
    id: 'america',
    name: '美线',
    code: 'US',
    ports: ['洛杉矶港 USLAX', '长滩港 USLGB', '纽约港 USNYC', '休斯顿港 USHOU', '奥克兰港 USOAK'],
    countries: ['美国', '加拿大', '墨西哥'],
    features: ['美西(15-20天)', '美东(30-35天)', 'FBA头程需求大', '关税政策影响大']
  },
  {
    id: 'middle_east',
    name: '中东',
    code: 'MDE',
    ports: ['杰贝阿里港 AEJEA', '吉达港 SAJED', '阿布扎比港 AEAUH', '多哈港 QADOH'],
    countries: ['阿联酋', '沙特阿拉伯', '卡塔尔', '科威特', '巴林'],
    features: ['航程适中(12-18天)', '清真认证需求', '转运业务活跃', '斋月影响']
  },
  {
    id: 'mediterranean',
    name: '地中海',
    code: 'MED',
    ports: ['热那亚港 ITGOA', '巴塞罗那港 ESALG', '比雷埃夫斯港 GRPIR', '伊斯坦布尔港 TRIST'],
    countries: ['意大利', '西班牙', '希腊', '土耳其', '埃及'],
    features: ['航程长(28-35天)', '地中海联运便利', '文化多元', '旺季9-12月']
  },
  {
    id: 'south_america',
    name: '南美',
    code: 'SA',
    ports: ['桑托斯港 BRSSZ', '圣安东尼奥港 CLSAI', '卡亚俄港 PECAL', '布宜诺斯艾利斯港 ARBUE'],
    countries: ['巴西', '智利', '秘鲁', '阿根廷', '哥伦比亚'],
    features: ['航程长(30-40天)', '旺季12-3月', '汇率风险大', '清关较复杂']
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// 船公司扩展名录
// ─────────────────────────────────────────────────────────────────────────────

export const shippingLineDirectory = [
  { code: 'MSK', name: '马士基', nameEn: 'Maersk', alliance: '2M', headquarters: '丹麦哥本哈根', website: 'www.maersk.com', features: ['全球最大船公司', '数字化程度高', '冷链领先', '马士基航空货运'] },
  { code: 'MSC', name: '地中海航运', nameEn: 'MSC', alliance: '独立', headquarters: '瑞士日内瓦', website: 'www.msc.com', features: ['全球运力第一', '运力扩张快', '价格竞争力强', '垂直整合仓储'] },
  { code: 'CMA', name: '达飞轮船', nameEn: 'CMA CGM', alliance: 'Ocean Alliance', headquarters: '法国马赛', website: 'www.cmacgm-group.com', features: ['地中海起家', '电子商务物流', '南极服务', 'CEVA物流整合'] },
  { code: 'COSCO', name: '中远海运', nameEn: 'COSCO Shipping', alliance: 'Ocean Alliance', headquarters: '中国上海', website: 'www.coscoshipping.com', features: ['中国最大船司', '亚非航线强', '港口投资布局', '丝路海运品牌'] },
  { code: 'ONE', name: '海洋网联', nameEn: 'Ocean Network Express', alliance: 'The Alliance', headquarters: '新加坡', website: 'www.one-line.com', features: ['日本三大合并', '亚洲-北美强', '数字平台', 'REeco Ship认证'] },
  { code: 'HPL', name: '赫伯罗特', nameEn: 'Hapag-Lloyd', alliance: 'The Alliance', headquarters: '德国汉堡', website: 'www.hapag-lloyd.com', features: ['德国老牌船司', '德语区服务优', '特种箱领先', '可持续发展'] },
  { code: 'EVG', name: '长荣海运', nameEn: 'Evergreen Marine', alliance: '独立', headquarters: '中国台湾', website: 'www.evergreen-marine.com', features: ['台湾最大船司', '灵活定价', '东南亚航线强', '新型大船布局'] },
  { code: 'YML', name: '阳明海运', nameEn: 'Yang Ming', alliance: 'The Alliance', headquarters: '中国台湾', website: 'www.yangming.com', features: ['台湾第二大', '绿色船舶', '运力更新中', '亚洲近洋强'] },
  { code: 'PIL', name: '太平船务', nameEn: 'Pacific International Lines', alliance: '独立', headquarters: '新加坡', website: 'www.pilship.com', features: ['新加坡本土', '东南亚专线', '非洲航线', '家族企业'] },
  { code: 'ZIM', name: '以星航运', nameEn: 'ZIM Integrated Shipping', alliance: '独立', headquarters: '以色列海法', website: 'www.zim.com', features: ['以色列国家航运', '快航服务', '数字化创新', '美线服务强'] }
];
