import request from "@/utils/request";

const USER_BASE_URL = "/usr/users";

const UserAPI = {
  /**
   * 获取当前登录用户信息
   *
   * @returns 登录用户昵称、头像信息，包括角色和权限
   */
  getInfo() {
    return request<any, UserInfo>({
      url: `${USER_BASE_URL}/userinfo`,
      method: "get",
    });
  },

  /**
   * 重置密码
   *
   * @param id 用户ID
   * @param password 新密码
   */
  resetPassword(id: number, password: string) {
    return request({
      url: `${USER_BASE_URL}/${id}/password`,
      method: "put",
      params: { password: password },
    });
  },

  /**
   * 获取用户分页列表
   *
   * @param queryParams 查询参数
   */
  getPage(queryParams: UserPageQuery) {
    return request<any, PageResult<UserPageVO[]>>({
      url: `${USER_BASE_URL}/page`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取用户表单详情
   *
   * @param userId 用户ID
   * @returns 用户表单详情
   */
  getFormData(userId: number) {
    return request<any, UserForm>({
      url: `${USER_BASE_URL}/${userId}`,
      method: "get",
    });
  },

  /**
   * 添加用户
   *
   * @param data 用户表单数据
   */
  add(data: UserForm) {
    return request({
      url: `${USER_BASE_URL}`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改用户
   *
   * @param id 用户ID
   * @param data 用户表单数据
   */
  update(id: number, data: UserForm) {
    return request({
      url: `${USER_BASE_URL}/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 批量删除用户，多个以英文逗号(,)分割
   *
   * @param ids 用户ID字符串，多个以英文逗号(,)分割
   */
  deleteByIds(ids: string) {
    return request({
      url: `${USER_BASE_URL}/${ids}`,
      method: "delete",
    });
  },

  /** 下载用户导入模板 */
  downloadTemplate() {
    return request({
      url: `${USER_BASE_URL}/template`,
      method: "get",
      responseType: "blob",
    });
  },

  /**
   * 导出用户
   *
   * @param queryParams 查询参数
   */
  export(queryParams: UserPageQuery) {
    return request({
      url: `${USER_BASE_URL}/export`,
      method: "get",
      params: queryParams,
      responseType: "blob",
    });
  },

  /**
   * 导入用户
   *
   * @param deptId 部门ID
   * @param file 导入文件
   */
  import(deptId: number, file: File) {
    const formData = new FormData();
    formData.append("file", file);
    return request<any, ExcelResult>({
      url: `${USER_BASE_URL}/import`,
      method: "post",
      params: { deptId: deptId },
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  /**
   *  获取用户下拉列表
   */
  getOptions() {
    return request<any, OptionType[]>({
      url: `${USER_BASE_URL}/options`,
      method: "get",
    });
  },
};

export default UserAPI;

/** 登录用户信息 */
export interface UserInfo {
  /** 用户ID */
  id?: number;

  /** 用户名 */
  account?: string;

  /** 昵称 */
  name?: string;

  /** 头像URL */
  avatar?: string;

  /** 角色 */
  roles: string[];

  /** 权限 */
  perms: string[];
}

/**
 * 用户分页查询对象
 */
export interface UserPageQuery extends PageQuery {
  /** 搜索关键字 */
  keywords?: string;

  /** 用户状态 */
  status?: boolean;

  /** 部门ID */
  deptId?: number;

  /** 开始时间 */
  createTime?: [string, string];
}

/** 用户分页对象 */
export interface UserPageVO {
  /** 用户ID */
  id: number;
  /** 用户头像URL */
  avatar?: string;
  /** 创建时间 */
  createTime?: Date;
  /** 部门名称 */
  deptName?: string;
  /** 用户邮箱 */
  email?: string;
  /** 性别 */
  gender?: number;
  /** 手机号 */
  mobile?: string;
  /** 用户昵称 */
  name?: string;
  /** 角色名称，多个使用英文逗号(,)分割 */
  roleNames?: string;
  /** 用户状态(1:启用;0:禁用) */
  status?: boolean;
  /** 用户名 */
  account?: string;
}

/** 用户表单类型 */
export interface UserForm {
  /** 用户头像 */
  avatar?: string;
  /** 部门ID */
  deptId?: number;
  /** 邮箱 */
  email?: string;
  /** 性别 */
  gender?: number;
  /** 用户ID */
  id?: number;
  /** 手机号 */
  mobile?: string;
  /** 昵称 */
  name?: string;
  /** 角色ID集合 */
  roleIds?: number[];
  /** 用户状态(1:正常;0:禁用) */
  status?: boolean;
  /** 用户名 */
  account?: string;
}
