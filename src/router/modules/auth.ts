// 最简代码，也就是这些字段必须有
export default {
  path: "/auth",
  meta: {
    title: "系统管理"
  },
  children: [
    {
      path: "/sys/index",
      name: "admin",
      component: () => import("@/views/sys/index.vue"),
      meta: {
        title: "管理员管理"
      }
    },
    {
      path: "/sys/role",
      name: "role",
      component: () => import("@/views/sys/role.vue"),
      meta: {
        title: "角色管理"
      }
    }
  ]
};