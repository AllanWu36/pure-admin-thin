// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    // 获取收藏列表
    url: "/collections",
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
              name: "化屋·云海仙境",
              cover: "https://hwnft.j9meta.cn/staticfiles/云海封面.jpg",
              price: 0.01,
              quantity: 10,
              stock: 10,
              saleTime: "2024-01-18 14:00",
              creatorName: "化屋村",
              creatorAvatar: "https://hwnft.j9meta.cn/staticfiles/null",
              pickFlag: false
            },
            {
              id: "1746788356039114752",
              name: "化屋·春瑞吉祥",
              cover: "https://hwnft.j9meta.cn/staticfiles/苗绣封面裁剪版.jpg",
              price: 0.1,
              quantity: 20,
              stock: 15,
              saleTime: "2024-01-15 14:00",
              creatorName: "化屋村",
              creatorAvata: "https://hwnft.j9meta.cn/staticfiles/null",
              pickFlag: false
            },
            {
              id: "1747084251200749568",
              name: "化屋·小黄姜",
              cover: "https://hwnft.j9meta.cn/staticfiles/苗绣封面裁剪版.jpg",
              price: 0.1,
              quantity: 5,
              stock: 0,
              saleTime: "2024-01-15 14:00",
              creatorName: "化屋村",
              creatorAvata: "https://hwnft.j9meta.cn/staticfiles/null",
              pickFlag: true
            }
          ]
        }
      };
    }
  },
  {
    // 获取藏品story
    // url: "/collection/story/1",
    url: /\/collection\/story\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "get",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK",
        data: {
          imgs: [
            {
              id: 1,
              name: "1.jpg",
              url: "https://hwnft.j9meta.cn/staticfiles/1_01.jpg"
            },
            {
              id: 2,
              name: "2.jpg",
              url: "https://hwnft.j9meta.cn/staticfiles/1_02.jpg"
            },
            {
              id: 3,
              name: "3.jpg",
              url: "https://hwnft.j9meta.cn/staticfiles/1_03.jpg"
            },
            {
              id: 4,
              name: "4.jpg",
              url: "https://hwnft.j9meta.cn/staticfiles/1_04.jpg"
            },
            {
              id: 5,
              name: "5.jpg",
              url: "https://hwnft.j9meta.cn/staticfiles/1_05.jpg"
            },
            {
              id: 6,
              name: "6.jpg",
              url: "https://hwnft.j9meta.cn/staticfiles/1_06.jpg"
            }
          ]
        }
      };
    }
  },
  {
    // 新增藏品
    url: "/collection",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    // 修改藏品story
    url: "/collection/story/",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    // 铸造藏品
    url: "/collection/mint/",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    // 立即发布藏品
    url: "/collection/publish/",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    // 定时发布藏品
    url: "/collection/schedule/",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    // 取消发布藏品
    url: "/collection/cancel/",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  }
] as MockMethod[];
