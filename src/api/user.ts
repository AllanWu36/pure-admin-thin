import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";

export type UserResult = {
  success: boolean;
  code: int;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** 按钮级别权限 */
    permissions: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("refresh-token"), {
    data
  });
};

/** 获取用户列表 */
export const getUserList = () => {
  return http.request<{ success: boolean; data: { items: Array<any> } }>(
    "get",
    baseUrlApi("user")
  );
};

/** 删除用户 */
export const deleteUser = (id: number) => {
  return http.request("delete", baseUrlApi(`user/${id}`), { data: { id } });
};

/** 创建用户 */
export const createUser = (data: object) => {
  return http.request("post", baseUrlApi("user"), { data });
};

/** 更新用户 */
export const updateUser = (id: number, data: object) => {
  return http.request("post", baseUrlApi(`user/${id}`), { data });
};