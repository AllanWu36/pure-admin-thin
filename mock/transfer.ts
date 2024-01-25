// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    // 获取用户列表
    url: "/transfers",
    method: "get",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK",
        data: {
          pageNum: 1,
          pageSiz: 10,
          totalPage: 1,
          total: 2,
          size: 2,
          content: [
            {
              id: "1747885806883700736",
              give_from_id: "111",
              give_time: "2024-01-18 14:00",
              give_to_id: "222",
              order_no: "06058da372",
              txid: "39fd9b1283c44957819d479f20483f34"
            },
            {
              id: "1747885806883700736",
              give_from_id: "111",
              give_time: "2024-01-18 14:00",
              give_to_id: "222",
              order_no: "06058da372",
              txid: "39fd9b1283c44957819d479f20483f34"
            }
          ]
        }
      };
    }
  }
] as MockMethod[];
