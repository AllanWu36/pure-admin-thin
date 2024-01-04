// 最简代码，也就是这些字段必须有
export default {
  path: "/collection",
  meta: {
    title: "藏品管理"
  },
  children: [
    {
      path: "/collection/index",
      name: "collection",
      component: () => import("@/views/collection/index.vue"),
      meta: {
        title: "藏品管理"
      }
    }
  ]
};
