import { ref, watch } from 'vue'
import router from '@/2d/router'
export const menu = ref([
    {
        id: 1,
        name: "社会层",
        path: '/IndustrialEconomy',
        isPick: true, // 没得卵用，但是就是不删
        icon: require('@/2d/assets/images/shehui.png'),
        children: [
            { id: "1-1", name: "产业经济", isPick: true, path: "/IndustrialEconomy", level: 1 },
            { id: "1-3", name: "交通出行", isPick: false, path: "/Transportation", level: 1 },
            { id: "1-4", name: "环境人口", isPick: false, path: "/Environmental", level: 1 },
            { id: "1-5", name: "教育医疗", isPick: false, path: "/Education", level: 1 },
            { id: "1-2", name: "能源碳排放", isPick: false, path: "/Energy", level: 1 },
        ],
        level: 1
    },
    {
        id: 2,
        name: "区域层",
        path: '/Area',
        isPick: false,
        icon: require('@/2d/assets/images/quyu.png'),
        children: [
            { id: "2-1", name: "产业分布", isPick: false, level: 2 },
            { id: "2-2", name: "资金流关系", isPick: false, level: 2 },
            { id: "2-3", name: "物流关系", isPick: false, level: 2 },
            { id: "2-4", name: "信息流关系", isPick: false, level: 2 },
        ],
        level: 2
    },
    // *********************************************************************** 企业层 ***********************************************************************
    {
        id: 3,
        name: "制造集团",
        path: '/Manufacture',
        isPick: false,
        children: [
            { id: "3-0", name: "整体布局", isPick: false, level: 4 },
            { id: "3-1", name: "企管部", isPick: false, level: 4, path: '/Corporate' },
            { id: "3-2", name: "人力资源部", isPick: false, level: 4, path: "/HR" },
            { id: "3-3", name: "财务部", isPick: false, level: 4, path: "/Financial" },
            { id: "3-4", name: "采购部", isPick: false, level: 4, path: '/Procurement' },
            { id: "3-5", name: "营销部", isPick: false, level: 4, path: '/GroupMarketing' },
            { id: "3-6", name: "生产部", isPick: false, level: 4, path: '/Production' },
        ],
        level: 3,
    },
    {
        id: 9,
        name: "销售公司",
        path: '/Manufacture',
        // path: "/Sales",
        isPick: false,
        children: [
            { id: "9-0", name: "整体布局", isPick: false, level: 4 },
            { id: "9-1", name: "企管部", isPick: false, level: 4, path: '/Corporate' },
            { id: "9-4", name: "财务部", isPick: false, level: 4, path: "/Financial" },
            { id: "9-3", name: "业务部", isPick: false, level: 4, path: '/Business' },
            // { id: "9-2", name: "行政部", isPick: false, level: 4 },
        ],
        level: 3
    },
    {
        id: 11,
        name: "经销企业",
        path: '/Manufacture',
        // path: "/Distribution",
        isPick: false,
        children: [
            { id: "11-0", name: "整体布局", isPick: false, level: 4 },
            { id: "11-1", name: "企管部", isPick: false, level: 4, path: '/Corporate' },
            { id: "11-3", name: "采购部", isPick: false, level: 4, path: '/Procurement' },
            { id: "11-2", name: "财务部", isPick: false, level: 4, path: "/Financial" },
            { id: "11-4", name: "营销部", isPick: false, level: 4, path: '/Market' },
        ],
        level: 3
    },
    {
        id: 10,
        name: "供应企业",
        path: '/Manufacture',
        // path: "/Supply",
        isPick: false,
        children: [
            { id: "10-0", name: "整体布局", isPick: false, level: 4 },
            { id: "10-1", name: "企管部", isPick: false, level: 4, path: '/Corporate' },
            { id: "10-2", name: "财务部", isPick: false, level: 4, path: "/Financial" },
            { id: "10-3", name: "业务部", isPick: false, level: 4, path: '/Business' },
        ],
        level: 3
    },
    {
        id: 7,
        name: "物流公司",
        path: '/Logistics',
        isPick: false,
        children: [
            { id: "7-0", name: "整体布局", isPick: false, level: 4 },
            { id: "7-1", name: "企管部", isPick: false, level: 4, },
            { id: "7-2", name: "业务部", isPick: false, level: 4 },
        ],
        level: 3
    },
    {
        id: 8,
        name: "综合服务",
        path: "/Comprehensive",
        isPick: false,
        children: [
            { id: "8-0", name: "整体布局", isPick: false, level: 4 },
            { id: "8-1", name: "企管部", isPick: false, level: 4 },
            { id: "8-2", name: "业务部", isPick: false, level: 4 },
        ],
        level: 3
    },
    {
        id: 4,
        name: "工商银行",
        path: '/ICBC',
        isPick: false,
        children: [
            { id: '4-1', name: '营业大厅', isPick: false, level: 4 }
        ],
        level: 3
    },
    {
        id: 5,
        name: "政务服务",
        path: '/Government',
        isPick: false,
        children: [
            { id: '5-1', name: '服务大厅', isPick: false, level: 4 }],
        level: 3
    },
    {
        id: 6,
        name: "管委会",
        path: '/Management',
        isPick: false,
        children: [],
        level: 3
    },
]);


watch(
    () => router.currentRoute.value.path,
    (a) => {
        menu.value[0].children.forEach(v => {
            if (v.path === a) v.isPick = true
            else v.isPick = false
        })
    },
    { deep: true }
)