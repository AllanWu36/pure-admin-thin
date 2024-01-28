import { http } from "@/utils/http";
import { dateType } from "@pureadmin/utils";
import { baseUrlApi } from "./utils";

export type img_item = {
  id: number;
  name: string;
  picLink: string;
};
export type collection_item = {
  id: string;
  name: string;
  cover: string;
  price: float;
  quantity: number;
  stock: number;
  saleTime: string;
  createTime: string;
  creatorName: string;
  creatorAvatar: string;
  collectionStorys: Array<img_item>;
};

// 这里定义返回值类型，使接口拥有良好的类型推导
export type CommonResult = {
  /** 是否请求成功 */
  success: boolean;
  code: number;
  msg: string;
  timestamp: number;
};

// 这里定义返回值类型，使接口拥有良好的类型推导
export type CollectionStoryResult = {
  /** 是否请求成功 */
  status: number;
  statusText: string;
  data: {
    /** 图片url */
    imgs: Array<img_item>;
  };
};

// 这里定义返回值类型，使接口拥有良好的类型推导
export type CollectionsResult = {
  /** 是否请求成功 */
  success: boolean;
  code: number;
  msg: string;
  timestamp: number;
  data: {
    /** 图片url */
    pageNum: number;
    pageSize: number;
    totalPage: number;
    total: number;
    size: number;
    content: Array<collection_item>;
  };
};

type module_collection = {
  name: string;
  img: string;
};

type module_story = {
  img: Array<img_item>;
};

// 获取收藏列表
export const getCollections = () => {
  const params = {
    pageNum: 1,
    pageSize: 10
  };
  return http.request<CollectionsResult>(
    "get",
    baseUrlApi("collection/findCollectionByPage"),
    { params }
  );
};

// 获取收藏story
export const getCollectionStory = (id: string) => {
  return http.request<CollectionStoryResult>(
    "get",
    baseUrlApi("collection/story/") + id
  );
};

// 新增藏品
export const addCollection = (collection: module_collection) => {
  const data = {
    ...collection
  };
  return http.request<CommonResult>("post", baseUrlApi("collection"), {
    data
  });
};

// 修改藏品
export const updateCollection = (id: string, collection: module_collection) => {
  const data = {
    ...collection
  };
  return http.request<CommonResult>("post", baseUrlApi("collection") + id, {
    data
  });
};

// 更新收藏story
export const updateCollectionStory = (id: string, storys: Array<img_item>) => {
  const data = {
    ...storys
  };
  return http.request<CommonResult>(
    "post",
    baseUrlApi("collection/story") + id,
    { data }
  );
};

// 铸造藏品
export const mintCollection = (id: number) => {
  const data = {
    id: id
  };
  return http.request<CommonResult>("post", baseUrlApi("collection/mint"), {
    data
  });
};

// 立即发布藏品
export const publishCollection = (id: number) => {
  const data = {
    collectionid: id
  };
  return http.request<CommonResult>("post", baseUrlApi("collection/publish/"), {
    data
  });
};

// 定时发布藏品
export const scheduleCollection = (id: number, saleTime: dateType) => {
  const data = {
    collectionid: id,
    publis_time: saleTime
  };
  return http.request<CommonResult>(
    "post",
    baseUrlApi("collection/schedule/"),
    {
      data
    }
  );
};

// 取消发布藏品
export const cancelPublishCollection = (id: number) => {
  const params = {
    id: id
  };
  return http.request<CommonResult>(
    "get",
    baseUrlApi("/collection/delCollection"),
    { params }
  );
};
