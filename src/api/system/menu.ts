import request from "@/utils/request";
// 菜单基础URL
const MENU_BASE_URL = "/usr";

const MenuAPI = {
  /**
   * 获取当前用户的路由列表
   * <p/>
   * 无需传入角色，后端解析token获取角色自行判断是否拥有路由的权限
   *
   * @returns 路由列表
   */
  getRoutes() {
    return request<any, RouteVO[]>({
      url: `${MENU_BASE_URL}/menus/routers`,
      method: "get",
    });
  },

  /**
   * 获取菜单树形列表
   *
   * @param queryParams 查询参数
   * @returns 菜单树形列表
   */
  getList(queryParams: MenuQuery) {
    return request<any, MenuVO[]>({
      url: `${MENU_BASE_URL}/menus`,
      method: "get",
      params: queryParams,
    });
  },

  /**
   * 获取菜单下拉数据源
   *
   * @returns 菜单下拉数据源
   */
  getOptions(onlyParent?: boolean) {
    return request<any, OptionType[]>({
      url: `${MENU_BASE_URL}/menus/options`,
      method: "get",
      params: { onlyParent: onlyParent },
    });
  },

  /**
   * 获取菜单表单数据
   *
   * @param id 菜单ID
   */
  getFormData(id: number) {
    return request<any, MenuForm>({
      url: `${MENU_BASE_URL}/menus/${id}`,
      method: "get",
    });
  },

  /**
   * 添加菜单
   *
   * @param data 菜单表单数据
   * @returns 请求结果
   */
  add(data: MenuForm) {
    return request({
      url: `${MENU_BASE_URL}/menus`,
      method: "post",
      data: data,
    });
  },

  /**
   * 修改菜单
   *
   * @param id 菜单ID
   * @param data 菜单表单数据
   * @returns 请求结果
   */
  update(id: number, data: MenuForm) {
    return request({
      url: `${MENU_BASE_URL}/menus/${id}`,
      method: "put",
      data: data,
    });
  },

  /**
   * 删除菜单
   *
   * @param id 菜单ID
   * @returns 请求结果
   */
  deleteById(id: number) {
    return request({
      url: `${MENU_BASE_URL}/menus/${id}`,
      method: "delete",
    });
  },
};

export default MenuAPI;

import type { MenuTypeEnum } from "@/enums/MenuTypeEnum";

/** 菜单查询参数 */
export interface MenuQuery {
  /** 搜索关键字 */
  keywords?: string;
}

/** 菜单视图对象 */
export interface MenuVO {
  /** 子菜单 */
  children?: MenuVO[];
  /** 组件路径 */
  component?: string;
  /** ICON */
  icon?: string;
  /** 菜单ID */
  id?: number;
  /** 菜单名称 */
  name?: string;
  /** 父菜单ID */
  parentId?: number;
  /** 按钮权限标识 */
  perm?: string;
  /** 跳转路径 */
  redirect?: string;
  /** 路由名称 */
  routeName?: string;
  /** 路由相对路径 */
  routePath?: string;
  /** 菜单排序(数字越小排名越靠前) */
  ordinal?: number;
  /** 菜单 */
  type?: MenuTypeEnum;
  /** 菜单是否可见(1:显示;0:隐藏) */
  visible?: boolean;
}

/** 菜单表单对象 */
export interface MenuForm {
  /** 菜单ID */
  id?: number;
  /** 父菜单ID */
  parentId?: number;
  /** 菜单名称 */
  name?: string;
  /** 菜单是否可见(1-是 0-否) */
  visible: boolean;
  /** ICON */
  icon?: string;
  /** 排序 */
  ordinal?: number;
  /** 路由名称 */
  routeName?: string;
  /** 路由路径 */
  routePath?: string;
  /** 组件路径 */
  component?: string;
  /** 跳转路由路径 */
  redirect?: string;
  /** 菜单 */
  type?: MenuTypeEnum;
  /** 权限标识 */
  perm?: string;
  /** 【菜单】是否开启页面缓存 */
  keepAlive?: boolean;
  /** 【目录】只有一个子路由是否始终显示 */
  alwaysShow?: boolean;
  /** 参数 */
  params?: KeyValue[];
}

interface KeyValue {
  key: string;
  value: string;
}

/** RouteVO，路由对象 */
export interface RouteVO {
  /** 子路由列表 */
  children: RouteVO[];
  /** 组件路径 */
  component?: string;
  /** 路由属性 */
  meta?: Meta;
  /** 路由名称 */
  name?: string;
  /** 路由路径 */
  path?: string;
  /** 跳转链接 */
  redirect?: string;
}

/** Meta，路由属性 */
export interface Meta {
  /** 【目录】只有一个子路由是否始终显示 */
  alwaysShow?: boolean;
  /** 是否隐藏(true-是 false-否) */
  hidden?: boolean;
  /** ICON */
  icon?: string;
  /** 【菜单】是否开启页面缓存 */
  keepAlive?: boolean;
  /** 路由title */
  title?: string;
}
