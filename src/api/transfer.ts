import { http } from "@/utils/http";
import internal from "stream";
import { baseUrlApi } from "./utils";

type transfer_item = {
  id: number;
  give_from_id: string;
  give_time: string;
  give_to_id: string;
  order_no: string;
  txid: string;
};

export type transfers_result = {
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
    content: Array<transfer_item>;
  };
};

export type result = {
  status: internal;
  statusText: string;
};

export const getTransfers = () => {
  const params = {
    pageNum: 1,
    pageSize: 10
  };
  return http.request<transfers_result>(
    "get",
    baseUrlApi("collectionGiveRecord/findCollectionGiveRecordByPage"),
    { params }
  );
};
