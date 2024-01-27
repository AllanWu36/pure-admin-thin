import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";

type member_item = {
  id: string;
  name: string;
  lastest_login_time: string;
};

export type members_result = {
  status: internal;
  statusText: string;
  data: {
    pageNum: number;
    pageSiz: number;
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
  return http.request<members_result>("get", "/members");
};
