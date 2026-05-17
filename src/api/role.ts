import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type RoleResult = {
  success: boolean;
  data: {
    items: Array<{
      id: number;
      name: string;
      remark: string;
      created: string;
    }>;
  };
};

/** 获取角色列表 */
export const getRoleList = () => {
  return http.request<RoleResult>("get", baseUrlApi("role"));
};

/** 删除角色 */
export const deleteRole = (id: number) => {
  return http.request("delete", baseUrlApi(`role/${id}`));
};

/** 创建角色 */
export const createRole = (data: { name: string; remark: string; menus: number[] }) => {
  return http.request("post", baseUrlApi("role"), { data });
};

/** 更新角色权限 */
export const updateRoleMenus = (rid: number, menus: number[]) => {
  return http.request("post", baseUrlApi(`role/${rid}/menu`), { data: { menus } });
};

/** 获取角色菜单 */
export const getRoleMenus = (rid: number) => {
  return http.request<{ success: boolean; data: Array<any> }>("get", baseUrlApi(`role/${rid}/menu`));
};

/** 更新角色 */
export const updateRole = (id: number, data: { name: string; remark: string }) => {
  return http.request("post", baseUrlApi(`role/${id}`), { data });
};