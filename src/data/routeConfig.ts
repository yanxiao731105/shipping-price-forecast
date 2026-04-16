/**
 * 航线统一配置 — 所有模块共用同一套航线定义
 *
 * 8 条标准航线：
 *   EU   — 欧洲航线
 *   USWC — 美西航线
 *   USEC — 美东航线
 *   SEA  — 东南亚航线
 *   MED  — 地中海航线
 *   MDE  — 中东航线
 *   SA   — 南美航线
 *   DJI  — 深圳-吉布提（红海/非洲）
 */

export interface RouteDef {
  /** 航线代码，全局唯一标识 */
  code: string;
  /** 中文显示名 */
  name: string;
  /** 英文显示名 */
  nameEn: string;
  /** 所属区域 */
  region: string;
  /** 代表性港口对（城市对英文代码） */
  representativeRoutes: string[];
  /** 代表性港口对（中文） */
  representativeRouteNames: string[];
}

/** 8 条标准航线定义 */
export const ROUTE_LIST: RouteDef[] = [
  {
    code: 'EU',
    name: '欧洲航线',
    nameEn: 'Europe Route',
    region: 'europe',
    representativeRoutes: ['Shanghai-Rotterdam', 'Ningbo-Hamburg', 'Shenzhen-Antwerp'],
    representativeRouteNames: ['上海-鹿特丹', '宁波-汉堡', '深圳-安特卫普'],
  },
  {
    code: 'USWC',
    name: '美西航线',
    nameEn: 'US West Coast Route',
    region: 'america',
    representativeRoutes: ['Shanghai-Los Angeles'],
    representativeRouteNames: ['上海-洛杉矶'],
  },
  {
    code: 'USEC',
    name: '美东航线',
    nameEn: 'US East Coast Route',
    region: 'america',
    representativeRoutes: ['Shanghai-New York'],
    representativeRouteNames: ['上海-纽约'],
  },
  {
    code: 'SEA',
    name: '东南亚航线',
    nameEn: 'Southeast Asia Route',
    region: 'southeast_asia',
    representativeRoutes: ['Shanghai-Singapore'],
    representativeRouteNames: ['上海-新加坡'],
  },
  {
    code: 'MED',
    name: '地中海航线',
    nameEn: 'Mediterranean Route',
    region: 'mediterranean',
    representativeRoutes: ['Shanghai-Genoa'],
    representativeRouteNames: ['上海-热那亚'],
  },
  {
    code: 'MDE',
    name: '中东航线',
    nameEn: 'Middle East Route',
    region: 'middle_east',
    representativeRoutes: ['Shanghai-Dubai'],
    representativeRouteNames: ['上海-迪拜'],
  },
  {
    code: 'SA',
    name: '南美航线',
    nameEn: 'South America Route',
    region: 'south_america',
    representativeRoutes: ['Hong Kong-Santos'],
    representativeRouteNames: ['香港-桑托斯'],
  },
  {
    code: 'DJI',
    name: '深圳-吉布提',
    nameEn: 'Shenzhen-Djibouti Route',
    region: 'africa',
    representativeRoutes: ['Shenzhen-Djibouti'],
    representativeRouteNames: ['深圳-吉布提'],
  },
];

/** 按 code 快速查找 */
export const ROUTE_MAP = Object.fromEntries(ROUTE_LIST.map(r => [r.code, r])) as Record<string, RouteDef>;

/** 所有航线代码 */
export const ROUTE_CODES = ROUTE_LIST.map(r => r.code);

/** 主要航线运价（市场概览表格用，每个区域取一条代表性航线） */
export const MAIN_ROUTE_PRICES = [
  { route: 'EU', routeName: '欧洲航线', representative: 'Shanghai-Rotterdam', representativeName: '上海-鹿特丹' },
  { route: 'USWC', routeName: '美西航线', representative: 'Shanghai-Los Angeles', representativeName: '上海-洛杉矶' },
  { route: 'USEC', routeName: '美东航线', representative: 'Shanghai-New York', representativeName: '上海-纽约' },
  { route: 'SEA', routeName: '东南亚航线', representative: 'Shanghai-Singapore', representativeName: '上海-新加坡' },
  { route: 'MED', routeName: '地中海航线', representative: 'Shanghai-Genoa', representativeName: '上海-热那亚' },
  { route: 'MDE', routeName: '中东航线', representative: 'Shanghai-Dubai', representativeName: '上海-迪拜' },
  { route: 'SA', routeName: '南美航线', representative: 'Hong Kong-Santos', representativeName: '香港-桑托斯' },
  { route: 'DJI', routeName: '深圳-吉布提', representative: 'Shenzhen-Djibouti', representativeName: '深圳-吉布提' },
];
