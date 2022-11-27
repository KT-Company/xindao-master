import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: '/',
    redirect: '/Home'
  },
  { // 空白页
    path: "/Home",
    name: "Home",
    component: () => import("@/2d/views/Home.vue"),
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
  // { // 区域层-老版
  //   path: "/AreaOld",
  //   name: "AreaOld",
  //   component: () => import("@/2d/views/AreaOld.vue"),
  // },
  // *************************************************************** 企业层（未开发） ***************************************************************
  {
    // 制造集团
    path: "/Manufacture",
    name: "Manufacture",
    component: () => import("@/2d/views/Manufacture.vue"),
  },
  {
    // 工商银行
    path: "/ICBC",
    name: "ICBC",
    component: () => import("@/2d/views/ICBC.vue"),
  },
  { // 政务服务
    path: "/Government",
    name: "Government",
    component: () => import("@/2d/views/Government.vue"),
  },
  // { // 管委会
  //   path: "/Management",
  //   name: "Management",
  //   component: () => import("@/2d/views/Management.vue"),
  // },
  { // 物流公司
    path: "/Logistics",
    name: "Logistics",
    component: () => import("@/2d/views/Logistics.vue"),
  },
  { // 综合服务
    path: "/Comprehensive",
    name: "Comprehensive",
    component: () => import("@/2d/views/Comprehensive.vue"),
  },
  { // 业务部
    path: '/Business',
    name: "Business",
    component: () => import("@/2d/views/Business.vue"),
  },
  { // 营销部
    path: '/Market',
    name: "Market",
    component: () => import("@/2d/views/Market.vue"),
  },
  { // 采购部
    path: '/Procurement',
    name: "Procurement",
    component: () => import("@/2d/views/Procurement.vue"),
  },
  { // 企管部
    path: '/Corporate',
    name: "Corporate",
    component: () => import("@/2d/views/Corporate.vue"),
  },
  { // 生产部
    path: '/Production',
    name: "Production",
    component: () => import("@/2d/views/Production.vue"),
  },
  { // 集团营销 
    path: '/GroupMarketing',
    name: "GroupMarketing",
    component: () => import("@/2d/views/GroupMarketing.vue"),
  }, 
  { // 财务部 
    path: '/Financial',
    name: "Financial",
    component: () => import("@/2d/views/Financial.vue"),
  },
  // { // 销售公司
  //   path: "/Sales",
  //   name: "Sales",
  //   component: () => import("@/2d/views/Sales.vue"),
  // },
  // { // 供应企业
  //   path: "/Supply",
  //   name: "Supply",
  //   component: () => import("@/2d/views/Supply.vue"),
  // },
  // { // 经销企业
  //   path: "/Distribution",
  //   name: "Distribution",
  //   component: () => import("@/2d/views/Distribution.vue"),
  // },
  { // 人力资源部 ()
    path: "/HR",
    name: "HR",
    component: () => import("@/2d/views/HR.vue"),
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});

export default router;
