import { http } from "@/utils/http";

export type img_item = {
  id: number;
  img_url: string;
  img_name: string;
};
export type collection_item = {
  id: number;
  name: string;
  pubtime: string;
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

// 这里定义返回值类型，使接口拥有良好的类型推导
export type CollectionsResult = {
  /** 是否请求成功 */
  success: boolean;
  data: {
    /** 图片url */
    collections: Array<collection_item>;
  };
};

/** 藏品list接口 */
export const getCollections = () => {
  return http.request<CollectionsResult>("get", "/collection");
};

/** 藏品图片接口 */
export const getImgs = (params?: object) => {
  return http.request<ImgsResult>("get", "/collection/img", { params });
};
