// 最简代码，也就是这些字段必须有
export default {
  path: "/artist",
  meta: {
    title: "艺术家"
  },
  children: [
    {
      path: "/artist/index",
      name: "artist",
      component: () => import("@/views/artist/index.vue"),
      meta: {
        title: "艺术家"
      }
    }
  ]
};
