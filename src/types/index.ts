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
  cutoffTime?: string; // 截关时间
  containerType?: ContainerCategory; // 箱型类别
}

// ─────────────────────────────────────────────────────────────────────────────
// 产品报价体系
// ─────────────────────────────────────────────────────────────────────────────

// 货品类别
export type CargoCategory = 'general' | 'dangerous' | 'oversize';

// 箱型类别
export type ContainerType = '20GP' | '40GP' | '40HQ' | '45HQ' | '20OT' | '40OT' | '20FR' | '40FR';

// 箱型分类
export type ContainerCategory = 'dry' | 'reefer' | 'special';

// 产品报价
export interface ProductQuote {
  id: string;
  category: CargoCategory;
  categoryName: string;
  containerType: ContainerType;
  containerCategory: ContainerCategory;
  basePrice: number;        // 基准运价
  currentPrice: number;      // 当前运价
  previousPrice: number;      // 上期运价
  change: number;            // 变化金额
  changePercent: number;      // 变化百分比
  unit: string;              // 单位
  validFrom: string;         // 有效期起
  validTo: string;           // 有效期止
  remarks?: string;          // 备注
}

// 航线产品报价
export interface RouteProductQuote {
  route: string;
  routeName: string;
  region: RouteRegion;
  quotes: ProductQuote[];
}

// 航线区域
export type RouteRegion = 'southeast_asia' | 'europe' | 'america' | 'middle_east' | 'mediterranean' | 'south_america' | 'origin';

// ─────────────────────────────────────────────────────────────────────────────
// 附加费明细
// ─────────────────────────────────────────────────────────────────────────────

// 附加费类型
export type SurchargeType = 'baf' | 'caf' | 'war' | 'pcs' | 'thc' | 'ebs' | 'cic' | 'seal' | 'ams' | 'isf' | 'customs';

// 附加费
export interface Surcharge {
  id: string;
  type: SurchargeType;
  name: string;
  nameEn: string;
  description: string;
  unit: 'per_teu' | 'per_container' | 'per_bill' | 'percentage';
  amount: number;             // 金额
  currency: string;           // 币种
  effectiveDate: string;      // 生效日期
  lastUpdate: string;        // 更新日期
  remarks?: string;           // 备注
}

// 航线附加费
export interface RouteSurcharge {
  route: string;
  routeName: string;
  region: RouteRegion;
  surcharges: Surcharge[];
  totalSurcharge: number;     // 附加费合计
  totalPrice: number;         // 含附加费总价
}

// ─────────────────────────────────────────────────────────────────────────────
// 多渠道运价对比
// ─────────────────────────────────────────────────────────────────────────────

// 运价来源
export type RateSource = 'carrier' | 'forwarder' | 'contract';

// 运价渠道
export interface RateChannel {
  id: string;
  source: RateSource;
  sourceName: string;
  sourceNameEn: string;
  price20gp: number;
  price40gp: number;
  price40hq: number;
  discount: number;            // 较基准折扣
  validFrom: string;
  validTo: string;
  serviceLevel: string;        // 服务等级
  contact?: string;           // 联系方式
}

// 运价对比
export interface RateComparison {
  route: string;
  routeName: string;
  basePrice: number;           // FAK基准价
  channels: RateChannel[];
  bestPrice: number;           // 最低价
  bestChannel: string;         // 最低价来源
  savings: number;            // 节省金额
}

// ─────────────────────────────────────────────────────────────────────────────
// 清关政策
// ─────────────────────────────────────────────────────────────────────────────

// 关税税率
export interface TariffRate {
  hsCode: string;             // HS编码
  description: string;         // 商品描述
  dutyRate: number;           // 关税率 %
  vatRate: number;            // 增值税率 %
  additionalNotes?: string;   // 补充说明
}

// 清关政策
export interface CustomsPolicy {
  country: string;
  countryCode: string;
  region: RouteRegion;
  port: string;
  portCode: string;
  tariffs: TariffRate[];
  customsClearanceFee: number;  // 清关费用
  clearanceDays: number;        // 清关天数
  specialRequirements?: string; // 特殊要求
  lastUpdate: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// 价格参考维度
// ─────────────────────────────────────────────────────────────────────────────

// 价格参考
export interface PriceReference {
  route: string;
  routeName: string;
  historicalTrend: {
    currentPrice: number;
    price1W: number;      // 1周前
    price1M: number;      // 1月前
    price3M: number;      // 3月前
    price6M: number;      // 6月前
    price1Y: number;      // 1年前
  };
  marketReference: {
    lowestPrice: number; // 市场最低价
    averagePrice: number; // 市场平均价
    highestPrice: number; // 市场最高价
    volume: number;       // 货量
  };
  forecast: {
    nextWeek: number;     // 下周预测
    nextMonth: number;    // 下月预测
    confidence: number;  // 预测置信度
  };
}
