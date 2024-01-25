// 最简代码，也就是这些字段必须有
export default {
  path: "/member",
  meta: {
    title: "用户"
  },
  children: [
    {
      path: "/member/index",
      name: "member",
      component: () => import("@/views/member/index.vue"),
      meta: {
        title: "用户"
      }
    }
  ]
};
