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
  ForwarderRate
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

// 船期数据
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
    status: 'open'
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
    status: 'open'
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
    status: 'filling'
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
    status: 'open'
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
    status: 'open'
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
    status: 'filling'
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
    status: 'open'
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
    status: 'open'
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
