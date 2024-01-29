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
  price: number;
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
  cover: string;
  price: number;
  quantity: number;
  creator: number;
  saleTime: string;
  creatorid: number;
};

// type module_story = {
//   img: Array<img_item>;
// };
type Collection = {
  name: string;
  cover: string;
  price: number;
  quantity: number;
  saleTime: string;
  creatorId: number;
  pic_id: number;
  creator: string;
  pub_datetime: string;
};
// 获取收藏列表
export const getCollections = (currPage = 0, pageSize: number) => {
  const params = {
    pageNum: currPage,
    pageSize: pageSize
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
export const addCollection = (collection: Collection) => {
  const data = {
    name: collection.name,
    cover: collection.pic_id,
    price: collection.price,
    quantity: collection.quantity,
    saleTime: collection.pub_datetime,
    creatorId: collection.creator
  };
  return http.request<CommonResult>(
    "post",
    baseUrlApi("collection/addCollection"),
    {
      data
    }
  );
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
