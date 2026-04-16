// 海运运价数据类型
export interface FreightRate {
  route: string;
  routeName: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  unit: string;
  lastUpdate: string;
}

// 运价指数数据
export interface FreightIndex {
  name: string;
  code: string;
  currentValue: number;
  previousValue: number;
  change: number;
  changePercent: number;
  trend: 'up' | 'down' | 'stable';
  history: IndexHistory[];
}

// 指数历史数据
export interface IndexHistory {
  date: string;
  value: number;
}

// 供需平衡指标
export interface SupplyDemandMetrics {
  utilizationRate: number;      // 舱位利用率
  utilizationChange: number;    // 利用率变化
  blankSailingRate: number;     // 空班率
  blankSailingChange: number;   // 空班率变化
  orderbookVolume: number;      // 新船订单量
  newbuildingDeliveries: number; // 新船交付量
  scrapRate: number;            // 拆船率
}

// 地缘政治因素
export interface GeopoliticalFactor {
  id: string;
  name: string;
  impact: 'positive' | 'negative' | 'neutral';
  severity: 'high' | 'medium' | 'low';
  description: string;
  affectedRoutes: string[];
  startDate: string;
  endDate?: string;
  currentStatus: 'active' | 'resolved' | 'escalating';
}

// 航线数据
export interface RouteData {
  id: string;
  name: string;
  code: string;
  region: string;
  currentRate: number;
  forecast: RouteForecast[];
  fakRate: FAKRate;
  contractRate: ContractRate;
}

// FAK运价
export interface FAKRate {
  price20gp: number;
  price40gp: number;
  price40hq: number;
  lastUpdate: string;
}

// 合约运价
export interface ContractRate {
  quarterly: number;
  annual: number;
  premium: number;
}

// 运价预测
export interface RouteForecast {
  week: number;
  date: string;
  predictedPrice: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
  factors: string[];
}

// 订舱决策建议
export interface BookingRecommendation {
  route: string;
  action: 'book_now' | 'wait' | 'hedge';
  confidence: number;
  reason: string;
  optimalTiming: string;
  priceRange: {
    min: number;
    max: number;
    expected: number;
  };
  riskLevel: 'low' | 'medium' | 'high';
}

// 市场概览
export interface MarketOverview {
  totalIndex: number;
  totalIndexChange: number;
  activeRoutes: number;
  bullishSignals: number;
  bearishSignals: number;
  overallTrend: 'bullish' | 'bearish' | 'neutral';
}

// 时间范围
export type TimeRange = '1W' | '1M' | '3M' | '6M' | '1Y' | 'ALL';

// 航线选项
export type RouteOption = 'ALL' | 'SCFI' | 'CCFI' | 'European' | 'Mediterranean' | 'American' | 'Asian';

// 船公司
export interface ShippingLine {
  code: string;
  name: string;
  alliance: string;
  marketShare: number;
  vesselCount: number;
  totalCapacity: number;
  weeklySailings: number;
}

// 货代公司等级
export type ForwarderTier = 'top' | 'mid' | 'small';

// 货代公司运价
export interface ForwarderRate {
  id: string;
  company: string;        // 公司名称
  tier: ForwarderTier;    // 头部 / 中等 / 普通
  route: string;          // 航线代码
  routeName: string;      // 航线名称
  price20gp: number;      // 20GP 报价
  price40gp: number;      // 40GP 报价
  price40hq: number;      // 40HQ 报价
  validFrom: string;      // 有效期起
  validTo: string;        // 有效期止
  serviceLevel: string;   // 服务特点
  bookingContact: string; // 订舱联系方式
  discount: number;       // 较FAK折扣率（负数为优惠）
  remarks?: string;       // 备注
}

// 船期
export interface VesselSchedule {
  id: string;
  vesselName: string;
  voyageNumber: string;
  shippingLine: string;
  route: string;
  routeName: string;
  pol: string;
  polName: string;
  pod: string;
  podName: string;
  etd: string;
  eta: string;
  transitDays: number;
  capacity: number;
  availableTeu: number;
  price: number;
  status: 'open' | 'filling' | 'full';
}
