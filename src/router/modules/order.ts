// 最简代码，也就是这些字段必须有
export default {
  path: "/order",
  meta: {
    title: "购买记录"
  },
  children: [
    {
      path: "/order/index",
      name: "order",
      component: () => import("@/views/order/index.vue"),
      meta: {
        title: "购买记录"
      }
    }
  ]
};
