// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    // 获取兑换码列表
    url: "/airdrops",
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
              code: "0h29nuoi",
              collection_name: "化屋·云海仙境",
              collection_id: "1750001952978108416",
              create_time: "2024-01-18 14:00",
              exchange_time: "2024-01-25 11:18:17",
              member_id: "1748294988912918528",
              member_name: "韦小宝"
            },
            {
              id: "1747885806883700736",
              code: "4vuwrccg",
              collection_name: "化屋·云海仙境",
              collection_id: "1750001952978108416",
              create_time: "2024-01-18 14:00",
              exchange_time: "",
              member_id: "",
              member_name: ""
            },
            {
              id: "1747885806883700736",
              code: "iq63novs",
              collection_name: "化屋·云海仙境",
              collection_id: "1750001952978108416",
              create_time: "2024-01-18 14:00",
              exchange_time: "",
              member_id: "",
              member_name: ""
            }
          ]
        }
      };
    }
  },
  {
    // 修改兑换码
    url: /\/airdrop\/(\d+)/, // 使用正则表达式匹配 URL 和路径参数
    method: "post",
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
    // 新增兑换码
    url: "/airdrop",
    method: "post",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  },
  {
    // 删除兑换码
    url: /\/airdrop\/(\d+)/,
    method: "delete",
    response: ({ body }) => {
      return {
        status: 200,
        statusText: "OK"
      };
    }
  }
] as MockMethod[];
