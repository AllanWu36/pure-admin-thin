// 最简代码，也就是这些字段必须有
export default {
  path: "/auth",
  meta: {
    title: "系统管理"
  },
  children: [
    {
      path: "/sys/index",
      name: "sys",
      component: () => import("@/views/sys/index.vue"),
      meta: {
        title: "系统管理"
      }
    }
  ]
};
