// 根据角色动态生成路由
import { MockMethod } from "vite-plugin-mock";

export default [
  {
    url: "/collection/img",
    method: "get",
    response: ({ body }) => {
      return {
        success: true,
        data: {
          imgs: [
            {
              people: "cn",
              id: 1,
              name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
            },
            {
              people: "cn",
              id: 2,
              name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
            },
            {
              people: "cn",
              id: 3,
              name: "https://imagecdn.cqliving.com/images/app_29/cms/202305/6a71758d6b27cf9c2f854d0b0df826201d031cff.jpg?x-oss-process=image%2Fresize%2Cm_lfit%2Cw_720%2Ch_16384"
            },
            {
              people: "cn",
              id: 4,
              name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
            },
            {
              people: "cn",
              id: 5,
              name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
            },
            {
              people: "cn",
              id: 6,
              name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
            },
            {
              people: "cn",
              id: 7,
              name: "https://p1.itc.cn/q_70/images03/20230531/c4a2b095c3bd41b59783b12c02c50d3b.png"
            }
          ]
        }
      };
    }
  }
] as MockMethod[];
