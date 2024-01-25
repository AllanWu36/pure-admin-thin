import { http } from "@/utils/http";
import internal from "stream";

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
  status: internal;
  statusText: string;
  data: {
    /** 图片url */
    pageNum: number;
    pageSiz: number;
    totalPage: number;
    total: number;
    size: number;
    content: Array<airdrop_item>;
  };
};

export type result = {
  status: internal;
  statusText: string;
};
export type module_airdrop = {
  name: string;
  img: string;
};

export const getAirdrops = () => {
  return http.request<airdrops_result>("get", "/airdrops");
};

export const addAirdrop = (airdrop: module_airdrop) => {
  const data = {
    ...airdrop
  };
  return http.request<result>("post", "/airdrop/", { data });
};

export const delCreatorById = (id: string) => {
  return http.request<result>("delete", "/airdrop/" + id);
};
