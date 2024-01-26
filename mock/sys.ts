// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    // 获取用户列表
    url: "/sys_admins",
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
              name: "admin",
              lastest_login_time: "2024-01-18 14:00",
            },
            {
              id: "1747885806883700736",
              name: "test",
              lastest_login_time: "2024-01-26 17:23",
            }
          ]
        }
      };
    }
  },
  {
    // 修改用户信息
    url: /\/sys_admin\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  }
] as MockMethod[];
