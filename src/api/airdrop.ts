import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";
import { stringify } from "qs";

type airdrop_item = {
  id: string;
  code: string;
  collection_name: string;
  collection_id: string;
  create_time: string;
  exchange_time: string;
  member_id: string;
  member_name: string;
};

export type airdrops_result = {
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
    content: Array<airdrop_item>;
  };
};

export type result = {
  success: boolean;
  code: number;
  msg: string;
  timestamp: number;
};
export type module_airdrop = {
  collectionId: string;
  quantity: number;
};

export const getAirdrops = (params: any) => {
  // const params = {
  //   pageNum: 1,
  //   pageSize: 10
  // };
  return http.request<airdrops_result>(
    "get",
    baseUrlApi("exchangeCode/findExchangeCodeByPage"),
    { params }
  );
};

export const addAirdrop = (airdrop: module_airdrop) => {
  const formattedParams = stringify(airdrop); // 格式化数据
  const finalConfig = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    data: formattedParams
  };
  return http.request<result>(
    "post",
    baseUrlApi("exchangeCode/generateExchangeCode"),
    undefined,
    finalConfig
  );
};

export const delCreatorById = (id: string) => {
  return http.request<result>("delete", baseUrlApi("airdrop/") + id);
};
