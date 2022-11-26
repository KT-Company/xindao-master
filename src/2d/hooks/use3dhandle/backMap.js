import { API } from '@/3d/API'
import { STATE } from '@/3d/STATE'
// 三维返回事件
const handleBackMap = {
  3: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zhizaojituan,
      callback: () => {
        API.showEnterpriseIconByName('制造集团');
      },
    });
  },
  4: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.yinhangyuanqu,
      callback: () => {
        API.showEnterpriseIconByName('工商银行');
      },
    });
  },
  5: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zhengwuzhongxin,
      callback: () => {
        API.showEnterpriseIconByName('政务服务');
      },
    });
  },
  7: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.wuliuqiye,
      callback: () => {
        API.showEnterpriseIconByName('物流公司');
      },
    });
  },
  8: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zonghefuwulou,
      callback: () => {
        API.showEnterpriseIconByName('综合服务');
      },
    });
  },
  9: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.Xiao_Shou_Gong_Si,
      callback: () => {
        API.showEnterpriseIconByName('销售公司');
      },
    });
  },
  10: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.GongYingBanGongShi,
      callback: () => {
        API.showEnterpriseIconByName('供应企业');
      },
    });
  },
  11: () => {
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.JingXiaoBanGongShi,
      callback: () => {
        API.showEnterpriseIconByName('经销企业');
      },
    });
  },
}

export default handleBackMap