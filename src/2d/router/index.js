import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: '/',
    redirect: '/IndustrialEconomy'
  },
  { // 空白页
    path: "/Replace",
    name: "Replace",
    component: () => import("@/2d/views/Replace.vue"),
    meta: {
      title: '用于同路由刷新'
    }
  },
  { // 产业经济
    path: "/IndustrialEconomy",
    name: "IndustrialEconomy",
    component: () => import("@/2d/views/IndustrialEconomy.vue"),
  },
  { // 环境人口
    path: "/Environmental",
    name: "Environmental",
    component: () => import("@/2d/views/Environmental.vue"),
  },
  { // 教育医疗
    path: "/Education",
    name: "Education",
    component: () => import("@/2d/views/Education.vue"),
  },
  { // 能源碳排放
    path: "/Energy",
    name: "Energy",
    component: () => import("@/2d/views/Energy.vue"),
  },
  { // 交通出行
    path: "/Transportation",
    name: "Transportation",
    component: () => import("@/2d/views/Transportation.vue"),
  },
  // *************************************************************** 区域层 ***************************************************************
  { // 区域层
    path: "/Area",
    name: "Area",
    component: () => import("@/2d/views/Area.vue"),
  },
  // *************************************************************** 企业层 ***************************************************************
  // { // 综合服务中心 
  //   path: "/Comprehensive",
  //   name: "Comprehensive",
  //   component: () => import("@/2d/views/Comprehensive.vue"),
  // },
  // { // 政务中心
  //   path: "/Government",
  //   name: "Government",
  //   component: () => import("@/2d/views/Government.vue"),
  // },
  // { // 人力资源部
  //   path: "/HR",
  //   name: "HR",
  //   component: () => import("@/2d/views/HR.vue"),
  // }, {
  //   // 制造集团
  //   path: "/Manufacture",
  //   name: "Manufacture",
  //   component: () => import("@/2d/views/Manufacture.vue"),
  // }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
