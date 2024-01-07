import { http } from "@/utils/http";

export type img_item = {
  id: number;
  img_url: string;
  img_name: string;
};
// 这里定义返回值类型，使接口拥有良好的类型推导
export type ImgsResult = {
  /** 是否请求成功 */
  success: boolean;
  data: {
    /** 图片url */
    imgs: Array<img_item>;
  };
};

/** 登录接口 */
export const getImgs = (params?: object) => {
  return http.request<ImgsResult>("get", "/collection/img", { params });
};
