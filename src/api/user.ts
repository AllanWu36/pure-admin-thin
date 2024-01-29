import { http } from "@/utils/http";
import { baseUrlApi } from "./utils";
import { stringify } from "qs";

export type UserResult = {
  success: boolean;
  msg: string;
  code: number;
  data: {
    /** 用户名 */
    tokenName: string;
    /** 当前登陆用户的角色 */
    // roles: Array<string>;
    /** `token` */
    tokenValue: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    // refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    // expires: Date;
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
  const formattedParams = stringify(data); // 格式化数据
  const finalConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formattedParams
  };
  return http.request<UserResult>(
    "post",
    baseUrlApi("login"),
    undefined,
    finalConfig
  );
  // return http.request<UserResult>("post", baseUrlApi("login"), { data });
};

/** 刷新token */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", baseUrlApi("refreshToken"), {
    data
  });
};
