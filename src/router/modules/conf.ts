// 最简代码，也就是这些字段必须有
export default {
  path: "/conf",
  meta: {
    title: "平台配置"
  },
  children: [
    {
      path: "/conf/index",
      name: "conf",
      component: () => import("@/views/conf/index.vue"),
      meta: {
        title: "平台配置"
      }
    }
  ]
};
