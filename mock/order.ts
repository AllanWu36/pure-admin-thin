// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    // 获取用户列表
    url: "/orders",
    method: "get",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK",
        data: {
          pageNum: 1,
          pageSize: 10,
          totalPage: 1,
          total: 2,
          size: 2,
          content: [
            {
              id: "1747885806883700736",
              order_no: "39fd9b1283c44957819d479f20483f34",
              amount: "2024-01-18 14:00",
              member_name: "白露为霜",
              issued_collection_id: "06058da372",
              issued_collection_name: "测试藏品2",
              state: "2024-01-25 11:19:09"
            },
            {
              id: "1747885806883700736",
              order_no: "39fd9b1283c44957819d479f20483f34",
              amount: "2024-01-18 14:00",
              member_name: "白露为霜",
              issued_collection_id: "06058da372",
              issued_collection_name: "测试藏品2",
              state: "2024-01-25 11:19:09"
            }
          ]
        }
      };
    }
  }
] as MockMethod[];
