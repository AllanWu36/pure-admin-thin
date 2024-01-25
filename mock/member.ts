// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    // 获取用户列表
    url: "/members",
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
              nick_name: "白露为霜",
              registered_time: "2024-01-18 14:00",
              block_chain_txid: "39fd9b1283c44957819d479f20483f34",
              block_chain_cert_name: "06058da372",
              lately_login_time: "2024-01-25 11:19:09"
            },
            {
              id: "1747885806883700736",
              nick_name: "白露为霜",
              registered_time: "2024-01-18 14:00",
              block_chain_txid: "39fd9b1283c44957819d479f20483f34",
              block_chain_cert_name: "06058da372",
              lately_login_time: "2024-01-25 11:19:09"
            }
          ]
        }
      };
    }
  },
  {
    // 修改用户信息
    url: /\/member\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  }
] as MockMethod[];
