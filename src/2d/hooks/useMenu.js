import { ref, watch } from 'vue'
import router from '@/2d/router'
export const menu = ref([
    {
        id: 1,
        name: "社会层",
        isPick: true,
        icon: require('@/2d/assets/images/shehui.png'),
        children: [
            { id: "1-1", name: "产业经济", isPick: true, path: "/IndustrialEconomy" },
            { id: "1-3", name: "交通出行", isPick: false, path: "/Transportation" },
            { id: "1-4", name: "环境人口", isPick: false, path: "/Environmental" },
            { id: "1-5", name: "教育医疗", isPick: false, path: "/Education" },
            { id: "1-2", name: "能源碳排放", isPick: false, path: "/Energy" },
        ],
    },
    {
        id: 2,
        name: "区域层",
        isPick: false,
        icon: require('@/2d/assets/images/quyu.png'),
        children: [
            { id: "2-1", name: "三圈关系", isPick: false },
            { id: "2-2", name: "资金流关系", isPick: false },
            { id: "2-3", name: "物流关系", isPick: false },
            { id: "2-4", name: "信息流关系", isPick: false },
        ],
    },
    {
        id: 3,
        name: "制造集团",
        isPick: false,
        children: [
            { id: "3-1", name: "企管部", isPick: false },
            { id: "3-2", name: "人力资源部", isPick: false },
            { id: "3-3", name: "财务部", isPick: false },
            { id: "3-4", name: "采购部", isPick: false },
            { id: "3-5", name: "营销部", isPick: false },
            { id: "3-6", name: "生产部", isPick: false },
        ],
    },
    { id: 4, name: "工商银行", isPick: false, children: [] },
    { id: 5, name: "政务服务", isPick: false, children: [] },
    { id: 6, name: "管委会", isPick: false, children: [] },
    {
        id: 7,
        name: "物流公司",
        isPick: false,
        children: [
            { id: "7-1", name: "企管部", isPick: false },
            { id: "7-2", name: "业务部", isPick: false },
        ],
    },
    {
        id: 8,
        name: "综合服务",
        isPick: false,
        children: [
            { id: "8-1", name: "企管部", isPick: false },
            { id: "8-2", name: "业务部", isPick: false },
        ],
    },
    {
        id: 9,
        name: "销售公司",
        isPick: false,
        children: [
            { id: "9-1", name: "企管部", isPick: false },
            { id: "9-2", name: "财务部", isPick: false },
        ],
    },
    {
        id: 10,
        name: "供应企业",
        isPick: false,
        children: [
            { id: "10-1", name: "企管部", isPick: false },
            { id: "10-2", name: "财务部", isPick: false },
            { id: "10-1", name: "业务部", isPick: false },
        ],
    },
    {
        id: 11,
        name: "经销企业",
        isPick: false,
        children: [
            { id: "11-1", name: "企管部", isPick: false },
            { id: "11-2", name: "财务部", isPick: false },
            { id: "11-1", name: "采购部", isPick: false },
            { id: "11-2", name: "营销部", isPick: false },
        ],
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