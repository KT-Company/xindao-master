import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";
import store from "@/2d/store/index";
import router from "@/2d/router";
import { handleBackMap, handleBMenuBMap } from "./use3dhandle";
/** 底部菜单三维交互
 * @param  {object} item  一级菜单信息 (包括二级)
 * @param  {number} leve  当前点击菜单类型（1：一级菜单，2：二级菜单）
 * @param  {object} son   二级菜单信息
 */
function menuInteraction(item, leve, son) {
  store.commit('changeLevel', son !== undefined ? son.level : item.level)
  if (leve === 1) {
    if (item.name == "社会层") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          API.showIndustrialEconomy();
        },
      });
    } else if (item.name == "区域层") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.areaState,
        callback: () => {
          API.showEnterpriseIcons();
        },
      });
    } else if (item.name == "制造集团") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.zhizaojituan,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    } else if (item.name == "工商银行") {
      handleBackMap[4]()
    } else if (item.name == "政务服务") {
      handleBackMap[5]()
    } else if (item.name == "管委会") {
      // 无内部
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.guanweihui,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    } else if (item.name == "物流公司") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.wuliuqiye,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    } else if (item.name == "综合服务") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.zonghefuwulou,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    } else if (item.name == "销售公司") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.Xiao_Shou_Gong_Si,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    } else if (item.name == "供应企业") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.GongYingBanGongShi,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    } else if (item.name == "经销企业") {
      API.hideAll();
      API.showRoutes();
      API.showModels();
      API.showMirror()
      API.cameraAnimation({
        cameraState: STATE.enterpriseStates.JingXiaoBanGongShi,
        callback: () => {
          API.showEnterpriseIconByName(item.name);
        },
      });
    }
  } else {
    // 二级菜单点击事件
    // console.log('son.id', son.id)
    try {
      handleBMenuBMap[son.id](store.state.menuBid.includes(son.id));
    } catch (error) { }
  }
}

// 返回
function goBack() {
  const currentId = store.state.menuAid; // 当前激活的一级菜单id
  try {
    handleBackMap[currentId]();
  } catch (error) { }
}

const USE3D = {
  menuInteraction,
  goBack,
};
export default USE3D;
