import { MockMethod } from "vite-plugin-mock";

// 模拟刷新token接口
export default [
  {
    url: "/creator",
    method: "get",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK",
        data: {
          items: [
            {
              name: "cn",
              id: 1,
              block_chain_credit_code: "asdfbwer",
              nft_account: "1233"
            },
            {
              name: "cn",
              id: 2,
              block_chain_credit_code: "asdfbwer",
              nft_account: "1233"
            }
          ]
        }
      };
    }
  },
  {
    url: /\/creator\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "get",
    response: ({ url }) => {
      const match = url.match(/\/creator\/(\d+)/); // 从 URL 中提取参数
      if (match && match[1]) {
        const id = match[1]; // 获取 id 参数

        // 根据 id 返回不同的数据
        return {
          success: true,
          data: {
            id,
            message: `获取到的数据，ID: ${id}`
          }
        };
      }
    }
  },
  {
    url: "/creator",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    url: /\/update_creator\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "post",
    response: ({ url }) => {
      const match = url.match(/\/update_creator\/(\d+)/); // 从 URL 中提取参数
      if (match && match[1]) {
        const id = match[1]; // 获取 id 参数
      }
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    url: /\/creator\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "delete",
    response: ({ url }) => {
      const match = url.match(/\/creator\/(\d+)/); // 从 URL 中提取参数
      if (match && match[1]) {
        const id = match[1]; // 获取 id 参数
      }
      return {
        status: 200,
        statusText: `delet ${id} OK`
      };
    }
  }
] as MockMethod[];
