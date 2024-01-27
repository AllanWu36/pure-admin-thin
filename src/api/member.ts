import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";

type member_item = {
  id: string;
  nick_name: string;
  registered_time: string;
  block_chain_txid: string;
  block_chain_cert_name: string;
  lately_login_time: string;
};

export type members_result = {
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
    content: Array<member_item>;
  };
};

export type result = {
  status: internal;
  statusText: string;
};

export const getMembers = () => {
  const params = {
    pageNum: 1,
    pageSize: 10
  };
  return http.request<members_result>(
    "get",
    baseUrlApi("member/findMemberByPage"),
    { params }
  );
};
