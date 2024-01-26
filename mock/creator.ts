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
              name: "贵州中科享链云科技有限公司",
              id: 1,
              block_chain_credit_code: "kHkCw0E5U9ma7w==",
              nft_account: "95318e58769b6105118380cba7cd89c04f981452ca020fb72666550bcfa00f290d35"
            },
            {
              name: "测试发行商",
              id: 2,
              block_chain_credit_code: "QSbN3GuNP2w9vg==",
              nft_account: "935786fe8efa692d1cb383cfe6b953b1edc827cd979fe33255515d5ba231e8134463"
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
