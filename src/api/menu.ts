import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type MenuResult = {
  success: boolean;
  data: Array<{
    id: number;
    name: string;
    type: number;
    typename?: string;
    path: string;
    api: string;
    method: string;
    children?: MenuResult["data"];
  }>;
};

/** 获取菜单列表 */
export const getMenuList = () => {
  return http.request<MenuResult>("get", baseUrlApi("menu"));
};

/** 删除菜单 */
export const deleteMenu = (id: number) => {
  return http.request("delete", baseUrlApi(`menu/${id}`));
};

/** 创建菜单 */
export const createMenu = (data: object) => {
  return http.request("post", baseUrlApi("menu"), { data });
};

/** 更新菜单 */
export const updateMenu = (id: number, data: object) => {
  return http.request("put", baseUrlApi(`menu/${id}`), { data });
};