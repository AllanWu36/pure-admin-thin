import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";

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

export const getAirdrops = () => {
  const params = {
    pageNum: 1,
    pageSize: 10
  };
  return http.request<airdrops_result>(
    "get",
    baseUrlApi("exchangeCode/findExchangeCodeByPage"),
    { params }
  );
};

export const addAirdrop = (airdrop: module_airdrop) => {
  const data = {
    ...airdrop
  };
  return http.request<result>(
    "post",
    baseUrlApi("exchangeCode/generateExchangeCode"),
    { data }
  );
};

export const delCreatorById = (id: string) => {
  return http.request<result>("delete", baseUrlApi("airdrop/") + id);
};
