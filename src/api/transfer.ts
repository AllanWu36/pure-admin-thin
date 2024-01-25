import { http } from "@/utils/http";
import internal from "stream";

type transfer_item = {
  id: number;
  give_from_id: string;
  give_time: string;
  give_to_id: string;
  order_no: string;
  txid: string;
};

export type transfers_result = {
  status: internal;
  statusText: string;
  data: {
    pageNum: number;
    pageSiz: number;
    totalPage: number;
    total: number;
    size: number;
    content: Array<transfer_item>;
  };
};

export type result = {
  status: internal;
  statusText: string;
};

export const getTransfers = () => {
  return http.request<transfers_result>("get", "/transfers");
};
