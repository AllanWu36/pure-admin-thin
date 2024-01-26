// 最简代码，也就是这些字段必须有
export default {
  path: "/transfer",
  meta: {
    title: "转赠管理"
  },
  children: [
    {
      path: "/transfer/index",
      name: "transfer",
      component: () => import("@/views/transfer/index.vue"),
      meta: {
        title: "转赠管理"
      }
    }
  ]
};
