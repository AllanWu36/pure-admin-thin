import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";

type creator_item = {
  /** 图片url */
  name: string;
  createTime: string;
  lastModifyTime: string;
};
// type creator_result = {
//   status: internal;
//   statusText: string;
//   data: {
//     items: Array<creator_item>;
//   };
// };

type creator_result = {
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
    content: Array<creator_item>;
  };
};

type result = {
  status: internal;
  statusText: string;
};
type module_creator = {
  name: string;
  img: string;
};

export const getCreator = () => {
  const params = {
    pageNum: 1,
    pageSize: 10
  };
  return http.request<creator_result>(
    "get",
    baseUrlApi("creator/findCreatorByPage"),
    { params }
  );
};

export const addCreator = (creator: module_creator) => {
  const data = {
    ...creator // 这里假设creator是一个对象，包含了你想发送的数据
  };
  return http.request<result>("post", "/creator/", { data });
  // const params = {
  //   ...creator // 这里假设creator是一个对象，包含了你想发送的数据
  // };
  // return http.request<result>("post", "/creator", { params });
};

export const getCreatorById = (id: string) => {
  return http.request<creator_result>("get", "/creator/" + id);
};

export const updateCreatorById = (id: string, creator: module_creator) => {
  const data = {
    ...creator // 这里假设creator是一个对象，包含了你想发送的数据
  };
  return http.request<creator_result>("post", "/creator/" + id, { data });
};

export const delCreatorById = (id: string) => {
  return http.request<result>("delete", "/creator/" + id);
};
