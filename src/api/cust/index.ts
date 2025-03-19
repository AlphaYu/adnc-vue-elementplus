import request from "@/utils/request";

const CUST_BASE_URL = "/cust/customers";

const CustAPI = {
  /**
   * 添加客户
   *
   * @param data 用户表单数据
   */
  add(data: CutomerForm) {
    return request({
      url: `${CUST_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 添加客户
   *
   * @param data 用户表单数据
   */
  update(id: number, data: CutomerForm) {
    return request({
      url: `${CUST_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 充值
   *
   * @param id 用户ID
   * @param balance 金额
   */
  recharge(id: number, balance: number) {
    return request({
      url: `${CUST_BASE_URL}/${id}/balance`,
      method: "patch",
      params: { balance: balance },
    });
  },

  /**
   * 批量删除客户，多个以英文逗号(,)分割
   *
   * @param ids 用户ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${CUST_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /**
   * 获取客户分页列表
   *
   * @param queryParams 查询参数
   */
  getPage(queryParams: CustomerPageQuery) {
    return request<any, PageResult<CustmerPageVO[]>>({
      url: `${CUST_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取客户充值分页列表
   *
   * @param queryParams 查询参数
   */
  getTransactionLogsPage(queryParams: TransactionLogPageQuery) {
    return request<any, PageResult<TransactionLogVO[]>>({
      url: `${CUST_BASE_URL}/page/transactionlogs`,
      method: "get",
      params: queryParams,
    });
  },
};

export default CustAPI;

/**
 * 客户分页查询对象
 */
export interface CustomerPageQuery extends PageQuery {
  /** 搜索关键字 */
  keywords?: string;

  /** 开始时间 */
  createTime?: [string, string];
}

/**
 * 客户充值记录分页查询对象
 */
export interface TransactionLogPageQuery extends PageQuery {
  /** 搜索关键字 */
  keywords?: string;

  /** 开始时间 */
  createTime?: [string, string];
}

/** 客户表单类型 */
export interface CutomerForm {
  id?: number;
  account?: string;
  nickname?: string;
  realname?: string;
}

/** 客户分页对象 */
export interface CustmerPageVO {
  id: number;
  account?: string;
  nickname?: string;
  realname?: string;
  balance?: number;
  createTime?: string;
}

/** 客户充值记录分页对象 */
export interface TransactionLogVO {
  id?: number;
  customerId: number;
  account: string;
  exchangeType: number;
  exchangeTypeName: string;
  exchageStatus: number;
  exchageStatusName: string;
  changingAmount: number;
  amount: number;
  changedAmount: number;
  remark: string;
  createTime?: string;
}
