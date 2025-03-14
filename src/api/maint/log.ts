import request from "@/utils/request";

const LOG_BASE_URL = "/maint/operationlogs";
const LOGIN_LOG_BASE_URL = "/maint/loginlogs";

const LogAPI = {
  /**
   * 获取操作日志分页列表
   *
   * @param queryParams 查询参数
   */
  getOperationLogPage(queryParams: LogPageQuery) {
    return request<any, PageResult<LogPageVO[]>>({
      url: `${LOG_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },
  /**
   * 获取登录日志分页列表
   *
   * @param queryParams 查询参数
   */
  getLoginLogPage(queryParams: LogPageQuery) {
    return request<any, PageResult<LoginLogPageVO[]>>({
      url: `${LOGIN_LOG_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取访问趋势
   *
   * @param queryParams
   * @returns
   */
  getVisitTrend(queryParams: VisitTrendQuery) {
    return request<any, VisitTrendVO>({
      url: `${LOG_BASE_URL}/visittrend`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取访问统计
   *
   * @param queryParams
   * @returns
   */
  getVisitStats() {
    return request<any, VisitStatsVO>({
      url: `${LOG_BASE_URL}/visitstats`,
      method: "get",
    });
  },
};

export default LogAPI;

/**
 * 日志分页查询对象
 */
export interface LogPageQuery extends PageQuery {
  /** 搜索关键字 */
  keywords?: string;
  /** 操作时间 */
  createTime?: [string, string];
}

/**
 * 操作日志分页VO
 */
export interface LogPageVO {
  /** 主键 */
  id: number;
  /** 日志模块 */
  logname: string;
  /** 日志内容 */
  message: string;
  /** 操作类名 */
  className: string;
  /** 请求方法 */
  method: string;
  /** IP 地址 */
  remoteIpAddress: string;
  /** 执行时间(毫秒) */
  executionTime: number;
  /** 操作人账号 */
  account: string;
  /** 操作人 */
  name: string;
  /** 是否成功 */
  succeed: boolean;
  /** 创建时间 */
  createTime: string;
}

/**
 * 登录日志分页VO
 */
export interface LoginLogPageVO {
  /** 主键 */
  id: number;
  /** 登录设备 */
  device: string;
  /** 日志内容 */
  message: string;
  /** 状态码 */
  statusCode: number;
  /** 用户id */
  userId: number;
  /** IP 地址 */
  remoteIpAddress: string;
  /** 执行时间(毫秒) */
  executionTime: number;
  /** 操作人账号 */
  account: string;
  /** 操作人 */
  name: string;
  /** 是否成功 */
  succeed: boolean;
  /** 创建时间 */
  createTime: string;
}

/**  访问趋势视图对象 */
export interface VisitTrendVO {
  /** 日期列表 */
  dates: string[];
  /** 浏览量(PV) */
  pvList: number[];
  /** 访客数(UV) */
  uvList: number[];
  /** IP数 */
  ipList: number[];
}

/** 访问趋势查询参数 */
export interface VisitTrendQuery {
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate: string;
}

/**  访问统计 */
export interface VisitStatsVO {
  /** 今日访客数(UV) */
  todayUvCount: number;
  /** 总访客数 */
  totalUvCount: number;
  /** 访客数同比增长率（相对于昨天同一时间段的增长率） */
  uvGrowthRate: number;
  /** 今日浏览量(PV) */
  todayPvCount: number;
  /** 总浏览量 */
  totalPvCount: number;
  /** 同比增长率（相对于昨天同一时间段的增长率） */
  pvGrowthRate: number;
}
