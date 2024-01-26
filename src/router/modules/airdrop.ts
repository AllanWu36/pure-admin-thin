// 最简代码，也就是这些字段必须有
export default {
  path: "/airdrop",
  meta: {
    title: "空投管理"
  },
  children: [
    {
      path: "/airdrop/index",
      name: "airdrop",
      component: () => import("@/views/airdrop/index.vue"),
      meta: {
        title: "空投管理"
      }
    }
  ]
};
