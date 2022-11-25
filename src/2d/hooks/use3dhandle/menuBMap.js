import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";

// 二级菜单事件
const handleBMenuBMap = {
  // ******* 社会层 start *******
  "1-1": () => {
    // 产业经济
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.showIndustrialEconomy();
  },
  "1-2": () => {
    // 能源碳排放
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.showEnergy();
  },
  "1-3": () => {
    // 交通出行
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.showTraffics();
  },
  "1-4": () => {
    // 环境人口
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.beforeShowEnvironments();
    API.hideAreaModels();
    API.showEnvironments();
  },
  "1-5": () => {
    // 教育医疗
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.beforeShowEducations();
    API.showEducations();
  },
  // ******* 社会层 end *******
  // ******* 区域层 start *******
  "2-1": (isPick) => {
    // alert('三圈关系' + isPick)
  },
  "2-2": (isPick) => {
    // alert('资金流关系' + isPick)
  },
  "2-3": (isPick) => {
    // alert('物流关系' + isPick)
  },
  "2-4": (isPick) => {
    // alert('信息流关系' + isPick)
  },
  // ******* 区域层 end *******
  // ******* 制造集团 start *******
  "3-0": () => {
    // 整体布局
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zhizaojituan,
    });
  },
  "3-1": () => {
    // 企业管理部
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zhizaojituanbangongshi"],
      "企业管理部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "3-2": () => {
    // 人力资源部
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zhizaojituanbangongshi"],
      "人力资源部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "3-3": () => {
    // 财务部
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zhizaojituanbangongshi"],
      "财务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "3-4": () => {
    // 采购部
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zhizaojituanbangongshi"],
      "采购部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "3-5": () => {
    // 营销部
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zhizaojituanbangongshi"],
      "营销部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "3-6": () => {
    // 生产部
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zhizaojituanbangongshi"],
      "生产部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  // ******* 制造集团 end *******
  // ******* 物流公司 start *******
  "7-0": () => {
    // 整体布局
    API.hideAll()
    API.showEnterpriseByName('wuliubangongshi')
    API.showEnterpriseIconInnerByType('wuliubangongshi')
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.wuliuqiye,
    });
  },
  "7-1": () => {
    // 企业管理部
    API.hideAll()
    API.showEnterpriseByName('wuliubangongshi')
    API.showEnterpriseIconInnerByType('wuliubangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["wuliubangongshi"],
      "企业管理部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "7-2": () => {
    // 业务部
    API.hideAll()
    API.showEnterpriseByName('wuliubangongshi')
    API.showEnterpriseIconInnerByType('wuliubangongshi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["wuliubangongshi"],
      "业务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  // ******* 物流公司 end *******
  // ******* 综合服务 start *******
  "8-0": () => {
    API.hideAll()
    API.showEnterpriseByName('zonghefuwulou')
    API.showEnterpriseIconInnerByType('zonghefuwulou')
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zonghefuwulou,
    });
  },
  "8-1": () => {
    // 企业管理部
    API.hideAll()
    API.showEnterpriseByName('zonghefuwulou')
    API.showEnterpriseIconInnerByType('zonghefuwulou')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zonghefuwulou"],
      "企业管理部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "8-2": () => {
    // 业务部
    API.hideAll()
    API.showEnterpriseByName('zonghefuwulou')
    API.showEnterpriseIconInnerByType('zonghefuwulou')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["zonghefuwulou"],
      "业务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  // ******* 综合服务 end *******
  // ******* 销售公司 start *******
  "9-0": () => {
    API.hideAll()
    API.showEnterpriseByName('Xiao_Shou_Gong_Si')
    API.showEnterpriseIconInnerByType('Xiao_Shou_Gong_Si')
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.Xiao_Shou_Gong_Si,
    });
  },
  "9-1": () => {
    // 企业管理部
    API.hideAll()
    API.showEnterpriseByName('Xiao_Shou_Gong_Si')
    API.showEnterpriseIconInnerByType('Xiao_Shou_Gong_Si')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["Xiao_Shou_Gong_Si"],
      "企业管理部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "9-2": () => {
    // 行政部
    API.hideAll()
    API.showEnterpriseByName('Xiao_Shou_Gong_Si')
    API.showEnterpriseIconInnerByType('Xiao_Shou_Gong_Si')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["Xiao_Shou_Gong_Si"],
      "行政部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "9-3": () => {
    // 业务部
    API.hideAll()
    API.showEnterpriseByName('Xiao_Shou_Gong_Si')
    API.showEnterpriseIconInnerByType('Xiao_Shou_Gong_Si')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["Xiao_Shou_Gong_Si"],
      "业务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  // ******* 销售公司 end *******
  // ******* 供应企业 start *******
   "10-0": () => {
    API.hideAll()
    API.showEnterpriseByName('GongYingBanGongShi')
    API.showEnterpriseIconInnerByType('GongYingBanGongShi')
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.GongYingBanGongShi,
    });
  },
  "10-1": () => {
    // 企业管理部
    API.hideAll()
    API.showEnterpriseByName('GongYingBanGongShi')
    API.showEnterpriseIconInnerByType('GongYingBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["GongYingBanGongShi"],
      "企业管理部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "10-2": () => {
    // 财务部
    API.hideAll()
    API.showEnterpriseByName('GongYingBanGongShi')
    API.showEnterpriseIconInnerByType('GongYingBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["GongYingBanGongShi"],
      "财务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "10-3": () => {
    // 业务部
    API.hideAll()
    API.showEnterpriseByName('GongYingBanGongShi')
    API.showEnterpriseIconInnerByType('GongYingBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["GongYingBanGongShi"],
      "业务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  // ******* 供应企业 end *******
  // ******* 经销企业 start *******
  "11-0": () => {
    API.hideAll()
    API.showEnterpriseByName('JingXiaoBanGongShi')
    API.showEnterpriseIconInnerByType('JingXiaoBanGongShi')
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.JingXiaoBanGongShi,
    });
  },
  "11-1": () => {
    // 企业管理部
    API.hideAll()
    API.showEnterpriseByName('JingXiaoBanGongShi')
    API.showEnterpriseIconInnerByType('JingXiaoBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["JingXiaoBanGongShi"],
      "企业管理部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "11-2": () => {
    // 财务部
    API.hideAll()
    API.showEnterpriseByName('JingXiaoBanGongShi')
    API.showEnterpriseIconInnerByType('JingXiaoBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["JingXiaoBanGongShi"],
      "财务部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "11-3": () => {
    // 采购部
    API.hideAll()
    API.showEnterpriseByName('JingXiaoBanGongShi')
    API.showEnterpriseIconInnerByType('JingXiaoBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["JingXiaoBanGongShi"],
      "采购部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  "11-4": () => {
    // 营销部
    API.hideAll()
    API.showEnterpriseByName('JingXiaoBanGongShi')
    API.showEnterpriseIconInnerByType('JingXiaoBanGongShi')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["JingXiaoBanGongShi"],
      "营销部"
    );
    CACHE.container.cameraFocus({
      target: [obj.position.x, obj.position.y, obj.position.z],
      distance: 2000,
    });
  },
  // ******* 经销企业 end *******
};

export default handleBMenuBMap;