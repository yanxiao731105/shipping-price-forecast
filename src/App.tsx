import { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Ship,
  Globe,
  AlertTriangle,
  Calendar,
  DollarSign,
  BarChart3,
  MapPin,
  Zap,
  Clock,
  Shield,
  Anchor,
  Users,
  Compass,
  Building2,
  Star,
  ChevronDown,
  ChevronUp,
  Phone,
  Package,
  FileText,
  Percent,
  AlertCircle,
  CheckCircle2,
  Info,
  RefreshCw
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';
import {
  marketOverview,
  freightIndices,
  mainRoutes,
  supplyDemandMetrics,
  geopoliticalFactors,
  routeForecastData,
  bookingRecommendations,
  vesselSchedules,
  forwarderRates,
  routeProductQuotes,
  routeSurcharges,
  rateComparisons,
  customsPolicies,
  priceReferences,
  routeClassifications,
  shippingLineDirectory
} from './data/mockData';
import { loadCombinedData, toFreightIndex, getDataTimestamp } from './services/dataService';
import type {
  FreightIndex,
  GeopoliticalFactor,
  BookingRecommendation,
  RouteData,
  VesselSchedule,
  ForwarderRate,
  ForwarderTier,
  CargoCategory
} from './types';
import type { LatestData } from './services/dataService';

function App() {
  const [selectedRoute, setSelectedRoute] = useState('EU');
  const [activeTab, setActiveTab] = useState<'overview' | 'forecast' | 'recommendation' | 'forwarder' | 'schedule' | 'quote' | 'customs'>('overview');
  const [latestData, setLatestData] = useState<LatestData | null>(null);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    loadCombinedData().then(({ static: data }) => {
      setLatestData(data);
      setDataLoading(false);
    });
  }, []);

  // 用实时数据覆盖 mock 数据
  const dynamicIndices: FreightIndex[] = latestData
    ? [toFreightIndex(latestData.indices.scfi), toFreightIndex(latestData.indices.ccfi), ...freightIndices.slice(2)]
    : freightIndices;

  const dynamicMarketOverview = latestData?.marketOverview || marketOverview;
  const dynamicMainRoutes = latestData?.mainRoutes?.length ? latestData.mainRoutes.map(r => ({ ...r, lastUpdate: latestData.meta.date })) : mainRoutes;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                <Ship className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">海运价预测系统</h1>
                <p className="text-sm text-slate-500">Shipping Rate Forecast Platform</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {dataLoading ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span className="text-sm font-medium">加载中...</span>
                </div>
              ) : latestData ? (
                <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="text-sm font-medium">数据已更新</span>
                </div>
              ) : (
                <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-lg border border-amber-200">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">离线模式</span>
                </div>
              )}
              <div className="text-right">
                <div className="text-sm font-semibold text-slate-700">
                  {new Date().toLocaleDateString('zh-CN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <div className="text-xs text-slate-500">
                  {latestData ? `数据更新: ${getDataTimestamp(latestData)}` : `系统时间: ${new Date().toLocaleTimeString('zh-CN')}`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {[
              { id: 'overview', label: '市场概览', icon: BarChart3 },
              { id: 'forecast', label: '运价预测', icon: TrendingUp },
              { id: 'recommendation', label: '订舱建议', icon: Calendar },
              { id: 'forwarder', label: '货代运价', icon: Building2 },
              { id: 'schedule', label: '船司+船期', icon: Anchor },
              { id: 'quote', label: '产品报价', icon: Package },
              { id: 'customs', label: '清关政策', icon: FileText }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                    : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-[1600px] mx-auto px-6 py-6 space-y-6">
        {activeTab === 'overview' && (
          <OverviewTab 
            indices={dynamicIndices} 
            marketOverview={dynamicMarketOverview}
            mainRoutes={dynamicMainRoutes}
            latestData={latestData}
          />
        )}
        {activeTab === 'forecast' && (
          <ForecastTab
            selectedRoute={selectedRoute}
            onRouteChange={setSelectedRoute}
          />
        )}
        {activeTab === 'recommendation' && <RecommendationTab />}
        {activeTab === 'forwarder' && <ForwarderTab />}
        {activeTab === 'schedule' && <ScheduleTab />}
        {activeTab === 'quote' && <QuoteTab />}
        {activeTab === 'customs' && <CustomsTab />}
      </main>

      {/* Footer 数据来源说明 */}
      {latestData && (
        <footer className="bg-white/60 border-t border-slate-200 py-4 mt-8">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span className="font-medium text-slate-600">数据来源：</span>
                <span>SCFI — {latestData.meta.dataSource.scfi}</span>
                <span>CCFI — {latestData.meta.dataSource.ccfi}</span>
                <span>BDI — {latestData.meta.dataSource.bdi}</span>
                <span>燃油 — {latestData.meta.dataSource.fuel}</span>
              </div>
              <span>{latestData.meta.dataSource.notes}</span>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

// Market Overview Tab（增强版：宏观数据）
function OverviewTab({ indices, marketOverview: mo, mainRoutes: mr, latestData }: { 
  indices: FreightIndex[]; 
  marketOverview: typeof marketOverview; 
  mainRoutes: typeof mainRoutes;
  latestData: LatestData | null;
}) {
  const bdiIndex: FreightIndex | undefined = latestData 
    ? { ...toFreightIndex(latestData.indices.bdi) }
    : undefined;

  return (
    <div className="space-y-6">
      {/* Market Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MarketCard
          title="SCFI 综合指数"
          value={mo.totalIndex.toFixed(2)}
          change={mo.totalIndexChange}
          trend="up"
          icon={Activity}
          color="blue"
        />
        <MarketCard
          title="BDI 干散货指数"
          value={bdiIndex?.currentValue?.toLocaleString() || '1,685'}
          change={bdiIndex?.change || -27}
          trend={bdiIndex?.trend || 'down'}
          icon={Ship}
          color="emerald"
        />
        <MarketCard
          title="看涨信号"
          value={mo.bullishSignals.toString()}
          subtitle="个"
          trend="up"
          icon={TrendingUp}
          color="green"
        />
        <MarketCard
          title="看跌信号"
          value={mo.bearishSignals.toString()}
          subtitle="个"
          trend="down"
          icon={TrendingDown}
          color="red"
        />
      </div>

      {/* 宏观指标行 */}
      {latestData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <MacroCard
            title="IFO 380 燃油"
            value={`$${latestData.macro.fuelPrice.ifo380}`}
            subtitle={latestData.macro.fuelPrice.unit}
            change={latestData.macro.fuelPrice.weekChange}
          />
          <MacroCard
            title="VLSFO 低硫油"
            value={`$${latestData.macro.fuelPrice.vlsfo}`}
            subtitle={latestData.macro.fuelPrice.unit}
            change={latestData.macro.fuelPrice.weekChange * 1.1}
          />
          <MacroCard
            title="USD/CNY 汇率"
            value={latestData.macro.exchangeRate.usdCny}
            subtitle={`${latestData.macro.exchangeRate.source?.includes('实时') ? '🔄' : '📌'} 中间价`}
            change={-0.12}
          />
          <MacroCard
            title="新箱价格 20GP"
            value={`$${latestData.macro.containerPrice.new20gp.toLocaleString()}`}
            subtitle={latestData.macro.containerPrice.unit}
            change={2.5}
          />
        </div>
      )}

      {/* Index Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">SCFI 上海出口集装箱运价指数</h3>
              <p className="text-sm text-slate-500 mt-1">Shanghai Container Freight Index</p>
            </div>
            <IndexBadge index={indices[0]} />
          </div>
          <div className="h-[300px]">
            {indices[0]?.history?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indices[0].history}>
                  <defs>
                    <linearGradient id="scfiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [Number(value).toLocaleString(), '指数值']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={2} fill="url(#scfiGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">暂无历史数据</div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">CCFI 中国出口集装箱运价指数</h3>
              <p className="text-sm text-slate-500 mt-1">China Container Freight Index</p>
            </div>
            <IndexBadge index={indices[1]} />
          </div>
          <div className="h-[300px]">
            {indices[1]?.history?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={indices[1].history}>
                  <defs>
                    <linearGradient id="ccfiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0891b2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#0891b2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => v.slice(5)} />
                  <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#64748b' }} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value) => [Number(value).toLocaleString(), '指数值']}
                  />
                  <Area type="monotone" dataKey="value" stroke="#0891b2" strokeWidth={2} fill="url(#ccfiGradient)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">暂无历史数据</div>
            )}
          </div>
        </div>
      </div>

      {/* Route Rates & Supply-Demand */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Rates Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">主要航线运价</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">航线</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">当前运价</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">周变化</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">涨跌幅</th>
                </tr>
              </thead>
              <tbody>
                {(mr.length ? mr : mainRoutes).map((route) => (
                  <tr key={route.route} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        <span className="font-medium text-slate-900">{route.routeName}</span>
                      </div>
                    </td>
                    <td className="text-right py-3 px-4 font-mono font-semibold text-slate-900">
                      ${route.currentPrice.toLocaleString()}
                    </td>
                    <td className={`text-right py-3 px-4 font-mono font-medium ${
                      route.change >= 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {route.change >= 0 ? '+' : ''}{route.change}
                    </td>
                    <td className={`text-right py-3 px-4 font-mono font-medium ${
                      route.changePercent >= 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {route.changePercent >= 0 ? '+' : ''}{route.changePercent.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Supply-Demand Metrics */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">供需平衡指标</h3>
          <div className="space-y-5">
            <MetricCard
              label="舱位利用率"
              value={supplyDemandMetrics.utilizationRate}
              unit="%"
              change={supplyDemandMetrics.utilizationChange}
              max={100}
              color="blue"
            />
            <MetricCard
              label="空班率"
              value={supplyDemandMetrics.blankSailingRate}
              unit="%"
              change={supplyDemandMetrics.blankSailingChange}
              max={20}
              color="amber"
            />
            <MetricCard
              label="新船订单量"
              value={supplyDemandMetrics.orderbookVolume}
              unit="M TEU"
              change={0.3}
              max={10}
              color="purple"
            />
            <MetricCard
              label="新船交付量"
              value={supplyDemandMetrics.newbuildingDeliveries}
              unit="M TEU"
              change={0.1}
              max={10}
              color="emerald"
            />
          </div>
        </div>
      </div>

      {/* Geopolitical Factors */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Globe className="w-6 h-6 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">地缘政治因素</h3>
          <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
            {geopoliticalFactors.filter(f => f.currentStatus === 'active').length} 个活跃事件
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {geopoliticalFactors.map((factor) => (
            <GeopoliticalCard key={factor.id} factor={factor} />
          ))}
        </div>
      </div>
    </div>
  );
}

// Forecast Tab
function ForecastTab({ selectedRoute, onRouteChange }: { selectedRoute: string; onRouteChange: (route: string) => void }) {
  const selectedData = routeForecastData.find(r => r.code === selectedRoute) || routeForecastData[0];
  
  return (
    <div className="space-y-6">
      {/* Route Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-4 overflow-x-auto scrollbar-hide">
          {routeForecastData.map((route) => (
            <button
              key={route.code}
              onClick={() => onRouteChange(route.code)}
              className={`px-5 py-3 rounded-xl font-medium transition-all cursor-pointer whitespace-nowrap ${
                selectedRoute === route.code
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {route.name}
            </button>
          ))}
        </div>
      </div>

      {/* Forecast Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Price Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">{selectedData.name} 运价预测</h3>
              <p className="text-sm text-slate-500">2-4周趋势预测</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-sm text-slate-600">历史</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="text-sm text-slate-600">预测</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={generateChartData(selectedData)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="week" tick={{ fontSize: 12, fill: '#64748b' }} />
                <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12, fill: '#64748b' }} tickFormatter={(v) => `$${v}`} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                  }}
                  formatter={(value, name) => [`$${Number(value).toLocaleString()}`, name === 'current' ? '当前运价' : '预测运价']}
                />
                <ReferenceLine y={selectedData.currentRate} stroke="#94a3b8" strokeDasharray="5 5" label={{ value: '当前价', fill: '#94a3b8', fontSize: 12 }} />
                <Line type="monotone" dataKey="current" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', strokeWidth: 2 }} />
                <Line type="monotone" dataKey="forecast" stroke="#f59e0b" strokeWidth={3} strokeDasharray="8 4" dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* FAK & Contract Rates */}
        <div className="space-y-6">
          {/* FAK Rates */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-slate-900">FAK 即期运价</h3>
            </div>
            <div className="space-y-3">
              <FAKRateRow container="20GP" price={selectedData.fakRate.price20gp} />
              <FAKRateRow container="40GP" price={selectedData.fakRate.price40gp} />
              <FAKRateRow container="40HQ" price={selectedData.fakRate.price40hq} />
            </div>
            <p className="text-xs text-slate-500 mt-4">更新于 {selectedData.fakRate.lastUpdate}</p>
          </div>

          {/* Contract Rates */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-5 h-5 text-emerald-600" />
              <h3 className="font-semibold text-slate-900">合约运价参考</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">季度合约</span>
                <span className="font-mono font-semibold text-slate-900">${selectedData.contractRate.quarterly.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-100">
                <span className="text-slate-600">年度合约</span>
                <span className="font-mono font-semibold text-slate-900">${selectedData.contractRate.annual.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-slate-600">即期溢价</span>
                <span className="font-mono font-semibold text-amber-600">+{selectedData.contractRate.premium}%</span>
              </div>
            </div>
          </div>

          {/* Forecast Summary */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-6 h-6" />
              <h3 className="font-semibold">预测摘要</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-blue-100">当前运价</span>
                <span className="font-mono font-bold">${selectedData.currentRate.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">4周预测</span>
                <span className="font-mono font-bold">
                  ${selectedData.forecast[3]?.predictedPrice.toLocaleString() || '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">预测趋势</span>
                <span className={`font-semibold px-2 py-0.5 rounded-full text-xs ${
                  selectedData.forecast[3]?.trend === 'up' ? 'bg-white/20' : selectedData.forecast[3]?.trend === 'down' ? 'bg-white/20' : 'bg-white/20'
                }`}>
                  {selectedData.forecast[3]?.trend === 'up' ? '↑ 看涨' : selectedData.forecast[3]?.trend === 'down' ? '↓ 看跌' : '→ 平稳'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-blue-100">预测置信度</span>
                <span className="font-semibold">{selectedData.forecast[3]?.confidence.toFixed(0) || 85}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Forecast Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">分周预测详情</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">周次</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">预测日期</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">预测运价</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">置信度</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">趋势</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">影响因素</th>
              </tr>
            </thead>
            <tbody>
              {selectedData.forecast.map((f) => (
                <tr key={f.week} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-slate-900">第{f.week}周</td>
                  <td className="py-3 px-4 text-slate-600">{f.date}</td>
                  <td className="text-right py-3 px-4 font-mono font-semibold text-slate-900">
                    ${f.predictedPrice.toLocaleString()}
                  </td>
                  <td className="text-right py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${f.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-mono text-slate-600">{f.confidence.toFixed(0)}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      f.trend === 'up' ? 'bg-red-100 text-red-700' : f.trend === 'down' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {f.trend === 'up' ? '↑ 上涨' : f.trend === 'down' ? '↓ 下跌' : '→ 平稳'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {f.factors.join('、')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// Recommendation Tab
function RecommendationTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {bookingRecommendations.map((rec, idx) => (
          <BookingCard key={idx} recommendation={rec} />
        ))}
      </div>

      {/* Decision Support Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-6">决策支持摘要</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DecisionSummaryCard
            title="立即订舱"
            count={bookingRecommendations.filter(r => r.action === 'book_now').length}
            description="市场趋势明确，建议锁定当前价格"
            color="blue"
          />
          <DecisionSummaryCard
            title="观望等待"
            count={bookingRecommendations.filter(r => r.action === 'wait').length}
            description="短期趋势向下，等待更好的订舱时机"
            color="emerald"
          />
          <DecisionSummaryCard
            title="分批对冲"
            count={bookingRecommendations.filter(r => r.action === 'hedge').length}
            description="不确定性较高，建议分散风险"
            color="amber"
          />
        </div>
      </div>
    </div>
  );
}

// Helper Components

// 宏观指标卡片
function MacroCard({ title, value, subtitle, change }: {
  title: string;
  value: string;
  subtitle?: string;
  change: number;
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-sm transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-slate-500">{title}</span>
        <span className={`text-xs font-medium ${change >= 0 ? 'text-red-500' : 'text-green-500'}`}>
          {change >= 0 ? '+' : ''}{change.toFixed(1)}%
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-lg font-bold text-slate-900 font-mono">{value}</span>
        {subtitle && <span className="text-xs text-slate-400 mb-0.5">{subtitle}</span>}
      </div>
    </div>
  );
}

function MarketCard({ title, value, change, trend, icon: Icon, color, subtitle }: {
  title: string;
  value: string;
  change?: number;
  trend: 'up' | 'down' | 'stable';
  icon: React.ElementType;
  color: string;
  subtitle?: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    red: 'bg-red-50 text-red-600 border-red-200',
    amber: 'bg-amber-50 text-amber-600 border-amber-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${colorMap[color]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
            trend === 'up' ? 'bg-red-50 text-red-600' : trend === 'down' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : trend === 'down' ? <TrendingDown className="w-3 h-3" /> : null}
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-slate-900 font-mono">{value}<span className="text-sm font-normal text-slate-500 ml-1">{subtitle}</span></div>
      <div className="text-sm text-slate-500 mt-1">{title}</div>
    </div>
  );
}

function IndexBadge({ index }: { index: FreightIndex }) {
  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
      index.trend === 'up' ? 'bg-red-50 text-red-600' : index.trend === 'down' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-600'
    }`}>
      {index.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : index.trend === 'down' ? <TrendingDown className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
      {index.changePercent >= 0 ? '+' : ''}{index.changePercent.toFixed(2)}%
    </div>
  );
}

function MetricCard({ label, value, unit, change, max, color }: {
  label: string;
  value: number;
  unit: string;
  change: number;
  max: number;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
    emerald: 'bg-emerald-500'
  };

  const percentage = (value / max) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-slate-600">{label}</span>
        <span className={`flex items-center gap-1 text-xs font-medium ${
          change >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {Math.abs(change)}%
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl font-bold text-slate-900 font-mono">{value}</span>
        <span className="text-sm text-slate-500 mb-1">{unit}</span>
      </div>
      <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colorMap[color]} transition-all duration-500`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
}

function GeopoliticalCard({ factor }: { factor: GeopoliticalFactor }) {
  const impactColors = {
    positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    negative: 'bg-red-50 text-red-700 border-red-200',
    neutral: 'bg-slate-50 text-slate-700 border-slate-200'
  };

  const severityColors = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-amber-100 text-amber-700',
    low: 'bg-slate-100 text-slate-700'
  };

  const statusColors = {
    active: 'bg-green-500',
    resolved: 'bg-slate-400',
    escalating: 'bg-red-500'
  };

  return (
    <div className={`p-4 rounded-xl border transition-all hover:shadow-md cursor-pointer ${impactColors[factor.impact]}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          <span className="font-semibold">{factor.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${severityColors[factor.severity]}`}>
            {factor.severity === 'high' ? '高' : factor.severity === 'medium' ? '中' : '低'}
          </span>
          <div className={`w-2 h-2 rounded-full ${statusColors[factor.currentStatus]} ${factor.currentStatus === 'active' ? 'animate-pulse' : ''}`} />
        </div>
      </div>
      <p className="text-sm mb-3 opacity-90">{factor.description}</p>
      <div className="flex flex-wrap gap-1">
        {factor.affectedRoutes.slice(0, 2).map((route) => (
          <span key={route} className="px-2 py-0.5 bg-white/50 rounded text-xs">
            {route}
          </span>
        ))}
        {factor.affectedRoutes.length > 2 && (
          <span className="px-2 py-0.5 bg-white/50 rounded text-xs">
            +{factor.affectedRoutes.length - 2}
          </span>
        )}
      </div>
    </div>
  );
}

function FAKRateRow({ container, price }: { container: string; price: number }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
      <span className="text-slate-600 font-medium">{container}</span>
      <span className="font-mono font-semibold text-slate-900">${price.toLocaleString()}/TEU</span>
    </div>
  );
}

function generateChartData(data: RouteData) {
  type ChartDataPoint = { week: string; current: number | null; forecast: number };
  const result: ChartDataPoint[] = [{ week: '当前', current: data.currentRate, forecast: data.currentRate }];
  data.forecast.forEach((f) => {
    result.push({
      week: `+${f.week}W`,
      current: null,
      forecast: f.predictedPrice
    });
  });
  return result;
}

function BookingCard({ recommendation }: { recommendation: BookingRecommendation }) {
  const actionConfig = {
    book_now: { label: '立即订舱', color: 'bg-blue-600', icon: Zap, bg: 'bg-blue-50 border-blue-200' },
    wait: { label: '观望等待', color: 'bg-emerald-600', icon: Clock, bg: 'bg-emerald-50 border-emerald-200' },
    hedge: { label: '分批对冲', color: 'bg-amber-600', icon: Shield, bg: 'bg-amber-50 border-amber-200' }
  };

  const config = actionConfig[recommendation.action];
  const Icon = config.icon;

  const riskColors = {
    low: 'bg-green-100 text-green-700',
    medium: 'bg-amber-100 text-amber-700',
    high: 'bg-red-100 text-red-700'
  };

  return (
    <div className={`rounded-2xl border p-6 ${config.bg} transition-all hover:shadow-lg cursor-pointer`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 text-lg">{recommendation.route}</h3>
          <p className="text-sm text-slate-600 mt-1">置信度 {recommendation.confidence}%</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-white text-sm font-medium ${config.color}`}>
          <Icon className="w-4 h-4" />
          {config.label}
        </div>
      </div>

      <p className="text-sm text-slate-700 mb-4">{recommendation.reason}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-slate-500 mb-1">最优时机</p>
          <p className="font-medium text-slate-900">{recommendation.optimalTiming}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 mb-1">风险等级</p>
          <span className={`px-2 py-0.5 rounded text-xs font-medium ${riskColors[recommendation.riskLevel]}`}>
            {recommendation.riskLevel === 'low' ? '低风险' : recommendation.riskLevel === 'medium' ? '中风险' : '高风险'}
          </span>
        </div>
      </div>

      <div className="bg-white/60 rounded-lg p-3">
        <p className="text-xs text-slate-500 mb-2">预测价格区间</p>
        <div className="flex items-center gap-2">
          <span className="font-mono font-semibold text-slate-900">${recommendation.priceRange.min.toLocaleString()}</span>
          <span className="text-slate-400">-</span>
          <span className="font-mono font-semibold text-slate-900">${recommendation.priceRange.max.toLocaleString()}</span>
          <span className="text-slate-400 mx-2">|</span>
          <span className="text-sm text-slate-600">预期</span>
          <span className="font-mono font-bold text-blue-600">${recommendation.priceRange.expected.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}

function DecisionSummaryCard({ title, count, description, color }: {
  title: string;
  count: number;
  description: string;
  color: string;
}) {
  const colorMap: Record<string, string> = {
    blue: 'bg-blue-100 text-blue-600',
    emerald: 'bg-emerald-100 text-emerald-600',
    amber: 'bg-amber-100 text-amber-600'
  };

  return (
    <div className="text-center p-6 rounded-xl bg-slate-50 border border-slate-200">
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${colorMap[color]} mb-3`}>
        <span className="text-2xl font-bold">{count}</span>
      </div>
      <h4 className="font-semibold text-slate-900 mb-1">{title}</h4>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 货代运价 Tab
// ─────────────────────────────────────────────────────────────────────────────
function ForwarderTab() {
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const routes = [
    { code: 'all', label: '全部航线' },
    { code: 'EU', label: '欧洲航线' },
    { code: 'USWC', label: '美西航线' },
    { code: 'USEC', label: '美东航线' },
    { code: 'MED', label: '地中海航线' },
    { code: 'DJI', label: '深圳-吉布提' }
  ];

  const filtered = selectedRoute === 'all'
    ? forwarderRates
    : forwarderRates.filter(r => r.route === selectedRoute);

  const topRates    = filtered.filter(r => r.tier === 'top');
  const midRates    = filtered.filter(r => r.tier === 'mid');
  const smallRates  = filtered.filter(r => r.tier === 'small');

  const tierConfig: Record<ForwarderTier, { label: string; badge: string; icon: string; border: string; bg: string }> = {
    top:   { label: '头部货代', badge: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: '🥇', border: 'border-yellow-200', bg: 'bg-yellow-50/30' },
    mid:   { label: '中等货代', badge: 'bg-blue-100 text-blue-700 border-blue-200',       icon: '🥈', border: 'border-blue-200',   bg: 'bg-blue-50/20' },
    small: { label: '普通货代', badge: 'bg-slate-100 text-slate-600 border-slate-200',    icon: '🥉', border: 'border-slate-200',  bg: 'bg-slate-50/30' }
  };

  return (
    <div className="space-y-6">
      {/* 说明横幅 */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-5 text-white flex items-start gap-4">
        <Building2 className="w-8 h-8 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-bold mb-1">货代公司运价参考</h2>
          <p className="text-sm text-indigo-100">
            按<strong>头部 / 中等 / 普通</strong>三个层级展示各货代当期报价，含与FAK即期运价的折溢价对比。
            价格仅供参考，以货代最终确认为准，有效期短（通常5-7天）。
          </p>
        </div>
      </div>

      {/* 航线筛选 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          {routes.map(r => (
            <button
              key={r.code}
              onClick={() => setSelectedRoute(r.code)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedRoute === r.code
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {r.label}
            </button>
          ))}
          <span className="ml-auto text-sm text-slate-400 whitespace-nowrap flex-shrink-0">
            共 {filtered.length} 家货代报价
          </span>
        </div>
      </div>

      {/* 数据更新时间提示 */}
      <div className="flex items-center gap-2 text-xs text-slate-400 px-1">
        <Clock className="w-3.5 h-3.5" />
        <span>报价更新时间：{new Date().toLocaleDateString('zh-CN')} &nbsp;|&nbsp; 有效期一般为 5-7 天，请以货代最终确认为准</span>
      </div>

      {/* 各层级分组展示 */}
      {([
        { tier: 'top' as ForwarderTier, data: topRates },
        { tier: 'mid' as ForwarderTier, data: midRates },
        { tier: 'small' as ForwarderTier, data: smallRates }
      ]).map(({ tier, data }) => data.length > 0 && (
        <div key={tier} className={`rounded-2xl border ${tierConfig[tier].border} ${tierConfig[tier].bg} overflow-hidden`}>
          {/* 分组标题 */}
          <div className="px-6 py-4 flex items-center gap-3 border-b border-slate-200/60">
            <span className="text-2xl">{tierConfig[tier].icon}</span>
            <h3 className="text-base font-bold text-slate-900">{tierConfig[tier].label}</h3>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${tierConfig[tier].badge}`}>
              {data.length} 家
            </span>
            <span className="ml-auto text-xs text-slate-400">
              {tier === 'top'
                ? '大型跨国物流集团 / 央企货代，舱位稳定，服务完整'
                : tier === 'mid'
                ? '区域性知名货代，专线能力强，性价比高'
                : '小型本地货代，价格灵活，适合小批量散货'}
            </span>
          </div>

          {/* 卡片网格 */}
          <div className="p-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map(rate => (
              <ForwarderRateCard
                key={rate.id}
                rate={rate}
                tier={tier}
                expanded={expandedId === rate.id}
                onToggle={() => setExpandedId(expandedId === rate.id ? null : rate.id)}
                fakPrice40gp={routeForecastData.find(r => r.code === rate.route)?.fakRate.price40gp}
              />
            ))}
          </div>
        </div>
      ))}

      {/* 价格对比表 */}
      {selectedRoute !== 'all' && (
        <ForwarderCompareTable route={selectedRoute} rates={filtered} />
      )}
    </div>
  );
}

// 货代运价卡片
function ForwarderRateCard({
  rate, tier, expanded, onToggle, fakPrice40gp
}: {
  rate: ForwarderRate;
  tier: ForwarderTier;
  expanded: boolean;
  onToggle: () => void;
  fakPrice40gp?: number;
}) {
  const tierBorderMap: Record<ForwarderTier, string> = {
    top:   'border-yellow-200 hover:shadow-yellow-100/60',
    mid:   'border-blue-200 hover:shadow-blue-100/60',
    small: 'border-slate-200 hover:shadow-slate-100/60'
  };

  const discountColor = rate.discount <= -5
    ? 'text-green-600 bg-green-50'
    : rate.discount <= 0
    ? 'text-emerald-600 bg-emerald-50'
    : 'text-red-500 bg-red-50';

  const discountLabel = rate.discount <= 0
    ? `低于FAK ${Math.abs(rate.discount).toFixed(1)}%`
    : `高于FAK ${rate.discount.toFixed(1)}%`;

  const diffVsFak = fakPrice40gp
    ? rate.price40gp - fakPrice40gp
    : null;

  return (
    <div className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-all cursor-pointer ${tierBorderMap[tier]}`}
      onClick={onToggle}>
      <div className="p-4">
        {/* 公司名 + 折扣标签 */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span className="font-semibold text-slate-900 text-sm leading-snug">{rate.company}</span>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold flex-shrink-0 ml-2 ${discountColor}`}>
            {discountLabel}
          </span>
        </div>

        {/* 航线 */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
          <MapPin className="w-3 h-3" />
          <span>{rate.routeName}</span>
          <span className="text-slate-300">|</span>
          <span>有效期至 {rate.validTo}</span>
        </div>

        {/* 报价网格 */}
        <div className="grid grid-cols-3 gap-2 bg-slate-50 rounded-lg p-3 mb-3">
          {[
            { label: '20GP', price: rate.price20gp },
            { label: '40GP', price: rate.price40gp },
            { label: '40HQ', price: rate.price40hq }
          ].map(({ label, price }) => (
            <div key={label} className="text-center">
              <div className="text-xs text-slate-500 mb-0.5">{label}</div>
              <div className="font-mono font-bold text-slate-900 text-sm">${price.toLocaleString()}</div>
            </div>
          ))}
        </div>

        {/* FAK 对比 */}
        {diffVsFak !== null && (
          <div className={`text-xs font-medium px-2 py-1 rounded flex items-center gap-1 mb-3 ${
            diffVsFak <= 0 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'
          }`}>
            {diffVsFak <= 0 ? <TrendingDown className="w-3 h-3" /> : <TrendingUp className="w-3 h-3" />}
            40GP 较 FAK 即期价
            {diffVsFak <= 0 ? ` 便宜 $${Math.abs(diffVsFak).toLocaleString()}` : ` 贵 $${diffVsFak.toLocaleString()}`}
          </div>
        )}

        {/* 服务特点 */}
        <div className="flex items-start gap-1.5">
          <Star className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
          <span className="text-xs text-slate-600">{rate.serviceLevel}</span>
        </div>

        {/* 展开收起 */}
        <div className="flex items-center justify-end mt-3 text-xs text-blue-500 gap-1">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          {expanded ? '收起' : '展开详情'}
        </div>
      </div>

      {/* 展开区 */}
      {expanded && (
        <div className="border-t border-slate-100 px-4 py-3 bg-slate-50/60 space-y-2" onClick={e => e.stopPropagation()}>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium text-slate-700">订舱联系：</span>
            <span className="font-mono">{rate.bookingContact}</span>
          </div>
          <div className="flex items-start gap-2 text-xs text-slate-600">
            <Shield className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span><span className="font-medium text-slate-700">备注：</span>{rate.remarks || '无'}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span>有效期：{rate.validFrom} ~ {rate.validTo}</span>
          </div>
        </div>
      )}
    </div>
  );
}

// 货代价格横向对比表（仅在选定单一航线时显示）
function ForwarderCompareTable({ route, rates }: { route: string; rates: ForwarderRate[] }) {
  const tierOrder: ForwarderTier[] = ['top', 'mid', 'small'];
  const tierLabels: Record<ForwarderTier, string> = { top: '🥇 头部', mid: '🥈 中等', small: '🥉 普通' };
  const tierBg: Record<ForwarderTier, string> = {
    top: 'bg-yellow-50',
    mid: 'bg-blue-50/50',
    small: 'bg-slate-50'
  };

  const fakEntry = routeForecastData.find(r => r.code === route)?.fakRate;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-5">
        <BarChart3 className="w-5 h-5 text-blue-600" />
        <h3 className="text-base font-semibold text-slate-900">货代运价横向对比</h3>
        <span className="text-xs text-slate-500">（单位：USD/箱，含 FAK 即期运价参考）</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-3 px-3 text-slate-600 font-semibold">层级</th>
              <th className="text-left py-3 px-3 text-slate-600 font-semibold">货代公司</th>
              <th className="text-right py-3 px-3 text-slate-600 font-semibold">20GP</th>
              <th className="text-right py-3 px-3 text-slate-600 font-semibold">40GP</th>
              <th className="text-right py-3 px-3 text-slate-600 font-semibold">40HQ</th>
              <th className="text-right py-3 px-3 text-slate-600 font-semibold">vs FAK(40GP)</th>
              <th className="text-left py-3 px-3 text-slate-600 font-semibold">服务特点</th>
            </tr>
          </thead>
          <tbody>
            {/* FAK 基准行 */}
            {fakEntry && (
              <tr className="border-b border-slate-200 bg-blue-600 text-white">
                <td className="py-2.5 px-3 font-semibold">FAK基准</td>
                <td className="py-2.5 px-3 text-blue-100">即期市场运价</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">${fakEntry.price20gp.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">${fakEntry.price40gp.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right font-mono font-bold">${fakEntry.price40hq.toLocaleString()}</td>
                <td className="py-2.5 px-3 text-right text-blue-100">—</td>
                <td className="py-2.5 px-3 text-blue-100 text-xs">市场即期报价，无服务附加</td>
              </tr>
            )}
            {tierOrder.map(tier =>
              rates.filter(r => r.tier === tier).map((rate, idx) => {
                const diff = fakEntry ? rate.price40gp - fakEntry.price40gp : null;
                return (
                  <tr
                    key={rate.id}
                    className={`border-b border-slate-100 hover:brightness-95 transition-all ${tierBg[tier]}`}
                  >
                    {idx === 0 && (
                      <td
                        className="py-2.5 px-3 font-semibold text-slate-700 align-middle"
                        rowSpan={rates.filter(r => r.tier === tier).length}
                      >
                        {tierLabels[tier]}
                      </td>
                    )}
                    <td className="py-2.5 px-3 text-slate-900 font-medium">{rate.company}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-900">${rate.price20gp.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-slate-900">${rate.price40gp.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-900">${rate.price40hq.toLocaleString()}</td>
                    <td className="py-2.5 px-3 text-right">
                      {diff !== null ? (
                        <span className={`font-mono text-xs font-semibold px-1.5 py-0.5 rounded ${
                          diff <= -200 ? 'bg-green-100 text-green-700' :
                          diff <= 0    ? 'bg-emerald-50 text-emerald-600' :
                          diff <= 200  ? 'bg-amber-50 text-amber-700' :
                                        'bg-red-50 text-red-600'
                        }`}>
                          {diff <= 0 ? `−$${Math.abs(diff).toLocaleString()}` : `+$${diff.toLocaleString()}`}
                        </span>
                      ) : '—'}
                    </td>
                    <td className="py-2.5 px-3 text-xs text-slate-500 max-w-[200px]">{rate.serviceLevel}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Schedule Tab - 船公司 + 船期（增强版：截关时间）
function ScheduleTab() {
  const [selectedRoute, setSelectedRoute] = useState('all');

  const filteredSchedules = selectedRoute === 'all'
    ? vesselSchedules
    : vesselSchedules.filter(s => s.route === selectedRoute);

  const uniqueRoutes = [...new Set(vesselSchedules.map(s => s.route))];

  return (
    <div className="space-y-6">
      {/* 航线分类卡片 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">航线分类</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {routeClassifications.map((region) => (
            <div key={region.id} className="p-3 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-slate-900">{region.name}</span>
              </div>
              <p className="text-xs text-slate-500">{region.code}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Lines */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">船公司名录</h3>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
            {shippingLineDirectory.length} 家
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shippingLineDirectory.map((line) => {
            const allianceColors: Record<string, string> = {
              '2M': 'bg-blue-100 text-blue-700',
              'Ocean Alliance': 'bg-green-100 text-green-700',
              'The Alliance': 'bg-purple-100 text-purple-700',
              '独立': 'bg-slate-100 text-slate-700'
            };
            return (
              <div key={line.code} className="p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <Ship className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">{line.code}</span>
                      <p className="text-xs text-slate-500">{line.nameEn}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${allianceColors[line.alliance]}`}>
                    {line.alliance}
                  </span>
                </div>
                <p className="text-sm text-slate-700 mb-2">{line.name}</p>
                <div className="flex flex-wrap gap-1">
                  {line.features.slice(0, 2).map(f => (
                    <span key={f} className="px-2 py-0.5 bg-slate-50 rounded text-xs text-slate-600">{f}</span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Vessel Schedules */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Compass className="w-6 h-6 text-slate-600" />
            <h3 className="text-lg font-semibold text-slate-900">船期表</h3>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
              {filteredSchedules.length} 艘船
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4 text-red-500" />
              <span>截关时间以当地时间为准</span>
            </div>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">全部航线</option>
              {uniqueRoutes.map((route) => {
                const schedule = vesselSchedules.find(s => s.route === route);
                return (
                  <option key={route} value={route}>
                    {schedule?.routeName || route}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Schedule Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">船名/航次</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">船司</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">航线</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">开航日期</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">到港日期</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">航程</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">可用舱位</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">运价</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-slate-600">状态</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-red-600">截关时间</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <VesselScheduleRow key={schedule.id} schedule={schedule} />
              ))}
            </tbody>
          </table>
        </div>

        {/* 说明 */}
        <div className="mt-4 p-3 bg-amber-50 rounded-lg flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-amber-800">
            <p><strong>舱位状态说明：</strong></p>
            <ul className="mt-1 space-y-0.5 text-amber-700">
              <li>• <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> 可订舱</span> - 舱位充足，可正常预订</li>
              <li>• <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> 即将满载</span> - 舱位紧张，建议尽快预订</li>
              <li>• <span className="inline-flex items-center gap-1"><span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span> 已满载</span> - 舱位已满，可加入等待队列</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function VesselScheduleRow({ schedule }: { schedule: VesselSchedule }) {
  const statusConfig = {
    open: { label: '可订舱', color: 'bg-green-100 text-green-700', dot: 'bg-green-500' },
    filling: { label: '即将满载', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
    full: { label: '已满载', color: 'bg-red-100 text-red-700', dot: 'bg-red-500' }
  };

  const status = statusConfig[schedule.status];
  const capacityPercent = (schedule.availableTeu / schedule.capacity) * 100;

  return (
    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
      <td className="py-4 px-4">
        <div>
          <p className="font-medium text-slate-900">{schedule.vesselName}</p>
          <p className="text-xs text-slate-500">{schedule.voyageNumber}</p>
        </div>
      </td>
      <td className="py-4 px-4">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm font-medium">
          {schedule.shippingLine}
        </span>
      </td>
      <td className="py-4 px-4">
        <div className="flex items-center gap-2">
          <span className="text-slate-700">{schedule.polName}</span>
          <span className="text-slate-400">→</span>
          <span className="text-slate-700">{schedule.podName}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-center">
        <span className="font-mono text-slate-700">{schedule.etd}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <span className="font-mono text-slate-700">{schedule.eta}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-sm font-medium">
          {schedule.transitDays} 天
        </span>
      </td>
      <td className="py-4 px-4 text-right">
        <div className="flex items-center justify-end gap-2">
          <div className="w-20 h-2 bg-slate-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${
                capacityPercent > 80 ? 'bg-red-500' : capacityPercent > 50 ? 'bg-amber-500' : 'bg-green-500'
              }`}
              style={{ width: `${capacityPercent}%` }}
            />
          </div>
          <span className="font-mono text-sm text-slate-700">{schedule.availableTeu}</span>
        </div>
      </td>
      <td className="py-4 px-4 text-right">
        <span className="font-mono font-semibold text-slate-900">${schedule.price}</span>
      </td>
      <td className="py-4 px-4 text-center">
        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${schedule.status === 'open' ? 'animate-pulse' : ''}`} />
          {status.label}
        </span>
      </td>
      {schedule.cutoffTime && (
        <td className="py-4 px-4 text-center">
          <span className="text-sm font-mono text-red-600">{schedule.cutoffTime}</span>
        </td>
      )}
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 产品报价 Tab
// ─────────────────────────────────────────────────────────────────────────────
function QuoteTab() {
  const [selectedRoute, setSelectedRoute] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState<CargoCategory | 'all'>('all');

  const categoryConfig: Record<string, { label: string; color: string; bg: string }> = {
    all: { label: '全部箱型', color: 'text-slate-600', bg: 'bg-slate-100' },
    general: { label: '普货', color: 'text-blue-700', bg: 'bg-blue-50' },
    dangerous: { label: '危险品', color: 'text-red-700', bg: 'bg-red-50' },
    oversize: { label: '超限货', color: 'text-amber-700', bg: 'bg-amber-50' }
  };

  return (
    <div className="space-y-6">
      {/* 说明 Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-5 text-white flex items-start gap-4">
        <Package className="w-8 h-8 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-bold mb-1">产品报价体系</h2>
          <p className="text-sm text-purple-100">
            包含普货、危险品、超限货三大类箱型报价，支持 20GP/40HQ/45HQ/20OT/40OT/20FR/40FR 等多种箱型，
            附加费明细透明化，支持多渠道运价对比
          </p>
        </div>
      </div>

      {/* 航线分类 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">航线分类</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {routeClassifications.map((region) => (
            <div key={region.id} className="p-4 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-center gap-2 mb-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <span className="font-semibold text-slate-900">{region.name}</span>
              </div>
              <p className="text-xs text-slate-500 mb-2">{region.countries.slice(0, 3).join('、')}</p>
              <div className="flex flex-wrap gap-1">
                {region.features.slice(0, 2).map(f => (
                  <span key={f} className="px-1.5 py-0.5 bg-white/60 rounded text-xs text-slate-600">{f}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 航线与货型筛选 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="text-xs text-slate-500 mb-2 block">选择航线</label>
            <select
              value={selectedRoute}
              onChange={(e) => setSelectedRoute(e.target.value)}
              className="px-4 py-2 bg-slate-100 border border-slate-200 rounded-lg text-sm font-medium text-slate-700"
            >
              <option value="all">全部航线</option>
              {routeProductQuotes.map(r => (
                <option key={r.route} value={r.route}>{r.routeName}</option>
              ))}
            </select>
          </div>
          <div className="flex items-end gap-2">
            {Object.entries(categoryConfig).map(([key, config]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key as CargoCategory | 'all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${selectedCategory === key ? `${config.bg} ${config.color}` : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {config.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 附加费明细 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-6 h-6 text-emerald-600" />
          <h3 className="text-lg font-semibold text-slate-900">附加费明细</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">附加费项目</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">英文名</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">费率</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">单位</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">说明</th>
              </tr>
            </thead>
            <tbody>
              {routeSurcharges.find(r => r.route === selectedRoute || selectedRoute === 'all')?.surcharges.map(s => (
                <tr key={s.id} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900">{s.name}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500">{s.nameEn}</td>
                  <td className="py-3 px-4 text-right">
                    <span className="font-mono font-semibold text-emerald-600">
                      {s.unit === 'percentage' ? `${s.amount}%` : `$${s.amount}`}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-500">
                    {s.unit === 'per_teu' ? '/TEU' : s.unit === 'per_container' ? '/箱' : s.unit === 'per_bill' ? '/票' : '%'}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">{s.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 多渠道运价对比 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">多渠道运价对比</h3>
          <span className="text-xs text-slate-400">船司官网 / 货代合作价 / 合约价</span>
        </div>
        <div className="space-y-6">
          {rateComparisons.filter(r => r.route === selectedRoute || selectedRoute === 'all').map((comparison) => (
            <div key={comparison.route}>
              <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-slate-400" />
                {comparison.routeName}
                <span className="text-xs font-normal text-slate-500 ml-2">基准价: ${comparison.basePrice}/TEU</span>
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600">渠道</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600">来源</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-slate-600">20GP</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-slate-600">40GP</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-slate-600">40HQ</th>
                      <th className="text-right py-2 px-3 text-xs font-semibold text-slate-600">vs 基准</th>
                      <th className="text-left py-2 px-3 text-xs font-semibold text-slate-600">服务</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparison.channels.map((channel) => {
                      const sourceColors: Record<string, string> = {
                        carrier: 'bg-blue-100 text-blue-700',
                        forwarder: 'bg-emerald-100 text-emerald-700',
                        contract: 'bg-purple-100 text-purple-700'
                      };
                      const sourceLabels: Record<string, string> = {
                        carrier: '船司官网',
                        forwarder: '货代合作',
                        contract: '合约价'
                      };
                      return (
                        <tr key={channel.id} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-2 px-3">
                            <span className="font-medium text-slate-900 text-sm">{channel.sourceName}</span>
                          </td>
                          <td className="py-2 px-3">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${sourceColors[channel.source]}`}>
                              {sourceLabels[channel.source]}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right font-mono text-sm">${channel.price20gp.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right font-mono font-semibold text-sm">${channel.price40gp.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right font-mono text-sm">${channel.price40hq.toLocaleString()}</td>
                          <td className="py-2 px-3 text-right">
                            <span className={`font-mono text-xs font-semibold px-1.5 py-0.5 rounded ${
                              channel.discount < 0 ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                            }`}>
                              {channel.discount > 0 ? `+${channel.discount}%` : `${channel.discount}%`}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-xs text-slate-500">{channel.serviceLevel}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 p-3 bg-green-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-slate-600">最优选择: <span className="font-semibold text-emerald-700">{comparison.bestChannel}</span></span>
                <span className="text-sm font-semibold text-emerald-700">节省 $${comparison.savings}/箱</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 价格参考维度 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 运价历史走势 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-slate-900">运价历史走势</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priceReferences.filter(r => r.route === selectedRoute || selectedRoute === 'all').map(r => ({
                name: r.routeName,
                current: r.historicalTrend.currentPrice,
                '1W前': r.historicalTrend.price1W,
                '1月前': r.historicalTrend.price1M,
                '1年前': r.historicalTrend.price1Y
              }))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
                <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
                <Bar dataKey="current" fill="#2563eb" name="当前" />
                <Bar dataKey="1W前" fill="#94a3b8" name="1周前" />
                <Bar dataKey="1月前" fill="#64748b" name="1月前" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 市场参考价 */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <Activity className="w-6 h-6 text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">近期市场价格参考</h3>
          </div>
          <div className="space-y-4">
            {priceReferences.filter(r => r.route === selectedRoute || selectedRoute === 'all').map((ref) => (
              <div key={ref.route} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-slate-900">{ref.routeName}</span>
                  <span className="text-xs text-slate-500">货量: {ref.marketReference.volume.toLocaleString()} TEU</span>
                </div>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">最低价</p>
                    <p className="font-mono font-semibold text-emerald-600">${ref.marketReference.lowestPrice.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">均价</p>
                    <p className="font-mono font-semibold text-slate-700">${ref.marketReference.averagePrice.toLocaleString()}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-slate-500 mb-1">最高价</p>
                    <p className="font-mono font-semibold text-red-600">${ref.marketReference.highestPrice.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-500">下周预测: <span className="font-semibold text-blue-600">${ref.forecast.nextWeek.toLocaleString()}</span></span>
                  <span className="text-slate-500">置信度: <span className="font-semibold text-slate-700">{ref.forecast.confidence}%</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 船公司名录 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Users className="w-6 h-6 text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">船公司名录</h3>
          <span className="text-xs text-slate-400">MSK / MSC / CMA / ONE / COSCO / HPL / EVG / YML / PIL / ZIM</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {shippingLineDirectory.map((line) => {
            const allianceColors: Record<string, string> = {
              '2M': 'bg-blue-100 text-blue-700',
              'Ocean Alliance': 'bg-green-100 text-green-700',
              'The Alliance': 'bg-purple-100 text-purple-700',
              '独立': 'bg-slate-100 text-slate-700'
            };
            return (
              <div key={line.code} className="p-4 rounded-xl border border-slate-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                      <Ship className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <span className="font-semibold text-slate-900">{line.code}</span>
                      <p className="text-xs text-slate-500">{line.nameEn}</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-slate-700 mb-2">{line.name}</p>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${allianceColors[line.alliance]}`}>
                  {line.alliance}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// 清关政策 Tab
// ─────────────────────────────────────────────────────────────────────────────
function CustomsTab() {
  const [selectedCountry, setSelectedCountry] = useState('all');

  const filteredPolicies = selectedCountry === 'all' ? customsPolicies : customsPolicies.filter(p => p.country === selectedCountry);
  const countries = [...new Set(customsPolicies.map(p => p.country))];

  const regionColors: Record<string, string> = {
    europe: 'bg-blue-100 text-blue-700',
    america: 'bg-emerald-100 text-emerald-700',
    middle_east: 'bg-amber-100 text-amber-700',
    south_america: 'bg-purple-100 text-purple-700',
    origin: 'bg-slate-100 text-slate-700'
  };

  const regionNames: Record<string, string> = {
    europe: '欧洲',
    america: '美洲',
    middle_east: '中东/非洲',
    south_america: '南美',
    origin: '中国出口'
  };

  return (
    <div className="space-y-6">
      {/* 说明 Banner */}
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-5 text-white flex items-start gap-4">
        <FileText className="w-8 h-8 flex-shrink-0 mt-0.5" />
        <div>
          <h2 className="text-lg font-bold mb-1">清关政策与关税</h2>
          <p className="text-sm text-amber-100">
            各国进口关税税率参考，包含关税率、增值税率、清关天数、特殊要求等关键信息。
            数据仅供参考，实际税率以各国海关官方公布为准
          </p>
        </div>
      </div>

      {/* 国家筛选 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3 overflow-x-auto">
          <button
            onClick={() => setSelectedCountry('all')}
            className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCountry === 'all' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            全部国家
          </button>
          {countries.map(country => (
            <button
              key={country}
              onClick={() => setSelectedCountry(country)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCountry === country ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {country}
            </button>
          ))}
        </div>
      </div>

      {/* 清关政策卡片 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPolicies.map((policy) => (
          <div key={`${policy.country}-${policy.port}`} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-slate-400" />
                  {policy.country} - {policy.port}
                </h3>
                <p className="text-sm text-slate-500">{policy.portCode}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${regionColors[policy.region]}`}>
                {regionNames[policy.region]}
              </span>
            </div>

            {/* 基本信息 */}
            <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-slate-50 rounded-lg">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">清关费用</p>
                <p className="font-mono font-semibold text-slate-900">${policy.customsClearanceFee}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">清关天数</p>
                <p className="font-mono font-semibold text-slate-900">{policy.clearanceDays}天</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">更新时间</p>
                <p className="font-mono font-semibold text-slate-900">{policy.lastUpdate}</p>
              </div>
            </div>

            {/* 特殊要求 */}
            {policy.specialRequirements && (
              <div className="mb-4 p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">{policy.specialRequirements}</p>
                </div>
              </div>
            )}

            {/* 关税税率表 */}
            <div>
              <h4 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                <Percent className="w-4 h-4" />
                关税税率参考
              </h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-2 px-2 text-xs font-semibold text-slate-600">HS编码</th>
                      <th className="text-left py-2 px-2 text-xs font-semibold text-slate-600">商品描述</th>
                      <th className="text-right py-2 px-2 text-xs font-semibold text-slate-600">关税率</th>
                      <th className="text-right py-2 px-2 text-xs font-semibold text-slate-600">增值税率</th>
                    </tr>
                  </thead>
                  <tbody>
                    {policy.tariffs.slice(0, 5).map((tariff, idx) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-2 px-2 font-mono text-xs text-slate-600">{tariff.hsCode}</td>
                        <td className="py-2 px-2 text-xs text-slate-700">{tariff.description}</td>
                        <td className="py-2 px-2 text-right">
                          <span className={`font-mono font-semibold ${tariff.dutyRate === 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                            {tariff.dutyRate}%
                          </span>
                        </td>
                        <td className="py-2 px-2 text-right font-mono text-slate-700">{tariff.vatRate}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 关税计算示例 */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold text-slate-900">关税计算示例</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">HS编码</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-600">商品</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">FOB货值</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">运费</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">保险费</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">关税</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">增值税</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">清关杂费</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-slate-600">合计成本</th>
              </tr>
            </thead>
            <tbody>
              {[
                { hs: '8471.30', name: '笔记本电脑', fob: 50000, freight: 2000, insurance: 500, duty: 0, vat: 6500, fee: 500 },
                { hs: '8517.12', name: '智能手机', fob: 30000, freight: 1500, insurance: 300, duty: 0, vat: 3900, fee: 500 },
                { hs: '6204.62', name: '棉质女裤', fob: 10000, freight: 500, insurance: 100, duty: 1200, vat: 1363, fee: 300 },
                { hs: '8703.23', name: '汽车(2000cc)', fob: 200000, freight: 8000, insurance: 2000, duty: 30000, vat: 29600, fee: 800 }
              ].map((item, idx) => {
                const cif = item.fob + item.freight + item.insurance;
                const total = cif + item.duty + item.vat + item.fee;
                return (
                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-mono text-sm text-slate-600">{item.hs}</td>
                    <td className="py-3 px-4 text-sm text-slate-900">{item.name}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">${item.fob.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">${item.freight.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm">${item.insurance.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-red-600">${item.duty.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-orange-600">${item.vat.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono text-sm text-slate-600">${item.fee.toLocaleString()}</td>
                    <td className="py-3 px-4 text-right font-mono font-semibold text-slate-900">${total.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-400 mt-3 flex items-center gap-1">
          <Info className="w-3 h-3" />
          关税 = (FOB + 运费 + 保险) × 关税率；增值税 = (CIF + 关税) × 增值税率
        </p>
      </div>
    </div>
  );
}

// Calculator icon helper (inline)
function Calculator({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2"/>
      <line x1="8" x2="16" y1="6" y2="6"/>
      <line x1="16" x2="16" y1="14" y2="18"/>
      <path d="M16 10h.01"/>
      <path d="M12 10h.01"/>
      <path d="M8 10h.01"/>
      <path d="M12 14h.01"/>
      <path d="M8 14h.01"/>
      <path d="M12 18h.01"/>
      <path d="M8 18h.01"/>
    </svg>
  );
}

export default App;
