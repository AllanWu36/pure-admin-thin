import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";

type order_item = {
  id: number;
  order_no: string;
  amount: number;
  member_name: string;
  state: number;
  issued_collection_id: string;
  issued_collection_name: string;
};

export type orders_result = {
  status: internal;
  statusText: string;
  data: {
    pageNum: number;
    pageSiz: number;
    totalPage: number;
    total: number;
    size: number;
    content: Array<order_item>;
  };
};

export type result = {
  status: internal;
  statusText: string;
};

export const getOrders = () => {
  return http.request<orders_result>("get", "/orders");
};
