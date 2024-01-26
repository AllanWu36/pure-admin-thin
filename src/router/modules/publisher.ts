// 最简代码，也就是这些字段必须有
export default {
  path: "/publisher",
  meta: {
    title: "发行商管理"
  },
  children: [
    {
      path: "/publisher/index",
      name: "publisher",
      component: () => import("@/views/publisher/index.vue"),
      meta: {
        title: "发行商管理"
      }
    }
  ]
};
