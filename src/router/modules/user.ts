// 最简代码，也就是这些字段必须有
export default {
  path: "/user",
  meta: {
    title: "用户"
  },
  children: [
    {
      path: "/user/index",
      name: "user",
      component: () => import("@/views/user/index.vue"),
      meta: {
        title: "用户"
      }
    }
  ]
};
