import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";
import store from "@/2d/store";
import * as TU from '@/3d/threeUtils.js'

const myFocus = (position, obj) => {
  // API.cameraAnimation({
  //   cameraState: position,
  //   callback: () => {
  //     CACHE.container.cameraFocus({
  //       target: [obj.position.x, obj.position.y, obj.position.z],
  //       distance: 2000,
  //     })
  //   },
  //   delayTime: 0,
  //   duration: 0,
  // });
  TU.focus(Object.values(obj.position), Object.values(position))
}

// 二级菜单事件
const handleBMenuBMap = {
  // ******* 社会层 start *******
  "1-1": () => {
    // 产业经济
    API.hideAll();
    API.showMirror()
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.industrialState,
      callback: () => {
        API.showIndustrialEconomy();
      },
    });
  },
  "1-2": () => {
    // 能源碳排放
    API.hideAll();
    API.showMirror()
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.energyState,
      callback: () => {
        API.showEnergy();
      },
    });
  },
  "1-3": () => {
    // 交通出行
    API.hideAll();
    API.showMirror()
    API.showRoutes();
    API.showModels();
    API.cameraAnimation({
      cameraState: STATE.trafficState,
      callback: () => {
        API.showTraffics();
      },
    });
  },
  "1-4": () => {
    // 环境人口
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.beforeShowEnvironments();
    API.hideAreaModels();
    API.cameraAnimation({
      cameraState: STATE.environmentState,
      callback: () => {
        API.showEnvironments();
      },
    });
  },
  "1-5": () => {
    // 教育医疗
    API.hideAll();
    API.showRoutes();
    API.showModels();
    API.beforeShowEducations();
    API.cameraAnimation({
      cameraState: STATE.educationState,
      callback: () => {
        API.showEducations();
      },
    });
  },
  // ******* 社会层 end *******
  // ******* 区域层 start *******
  "2-1": (isPick) => {
    API.showEnterpriseIcons()
    API.hideEnterpriseIconPopups();
    API.hideThreeFlows()
    isPick ? API.showThreeCircles() : API.hideThreeCircles()
  },
  "2-2": (isPick) => {
    API.showEnterpriseIcons()
    API.hideEnterpriseIconPopups();
    API.hideThreeCircles()
    API.hideThreeFlows()
    if (store.state.menuBid.includes('2-2')) API.showThreeFlowsByType('money')
    if (store.state.menuBid.includes('2-3')) API.showThreeFlowsByType('logistics')
    if (store.state.menuBid.includes('2-4')) API.showThreeFlowsByType('information')
  },
  "2-3": (isPick) => {
    API.showEnterpriseIcons()
    API.hideEnterpriseIconPopups();
    API.hideThreeCircles()
    API.hideThreeFlows()
    if (store.state.menuBid.includes('2-2')) API.showThreeFlowsByType('money')
    if (store.state.menuBid.includes('2-3')) API.showThreeFlowsByType('logistics')
    if (store.state.menuBid.includes('2-4')) API.showThreeFlowsByType('information')
  },
  "2-4": (isPick) => {
    API.showEnterpriseIcons()
    API.hideEnterpriseIconPopups();
    API.hideThreeCircles()
    API.hideThreeFlows()
    if (store.state.menuBid.includes('2-2')) API.showThreeFlowsByType('money')
    if (store.state.menuBid.includes('2-3')) API.showThreeFlowsByType('logistics')
    if (store.state.menuBid.includes('2-4')) API.showThreeFlowsByType('information')
  },
  // ******* 区域层 end *******
  // ******* 制造集团 start *******
  "3-0": () => {
    // 整体布局
    API.hideAll()
    API.showEnterpriseByName('zhizaojituanbangongshi')
    API.showEnterpriseIconInnerByType('zhizaojituanbangongshi')
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.zhizaojituan,
    // });
    TU.focus(
      [
        1729,
        0,
        8609,
      ], [
      1698.0219163614192,
      3347.507529731886,
      11075.291786464813,
    ])
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
    API.selectEnterpriseInnerIcon('zhizaojituanbangongshi', "企业管理部")
    // CACHE.container.cameraFocus({
    //   target: [obj.position.x, obj.position.y, obj.position.z],
    //   distance: 2000,
    // });
    TU.focus([
      187,
      550,
      8807
    ],
      [
        172,
        2160,
        9993
      ])
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
    API.selectEnterpriseInnerIcon('zhizaojituanbangongshi', "人力资源部")
    // CACHE.container.cameraFocus({
    //   target: [obj.position.x, obj.position.y, obj.position.z],
    //   distance: 2000,
    // });
    TU.focus([
      983,
      550,
      9403
    ],
      [
        968,
        2160,
        10589
      ])
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
    API.selectEnterpriseInnerIcon('zhizaojituanbangongshi', "财务部")
    // CACHE.container.cameraFocus({
    //   target: [obj.position.x, obj.position.y, obj.position.z],
    //   distance: 2000,
    // });
    TU.focus([
      1748,
      550,
      9395
    ],
      [
        1733,
        2160,
        10581
      ])
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
    API.selectEnterpriseInnerIcon('zhizaojituanbangongshi', "采购部")
    // CACHE.container.cameraFocus({
    //   target: [obj.position.x, obj.position.y, obj.position.z],
    //   distance: 2000,
    // });
    TU.focus([
      2567,
      550,
      9416
    ],
      [
        2552,
        2160,
        10603
      ])
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
    API.selectEnterpriseInnerIcon('zhizaojituanbangongshi', "营销部")
    // CACHE.container.cameraFocus({
    //   target: [obj.position.x, obj.position.y, obj.position.z],
    //   distance: 2000,
    // });
    TU.focus([
      985,
      550,
      8046
    ],
      [
        970,
        2160,
        9232
      ])
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
    API.selectEnterpriseInnerIcon('zhizaojituanbangongshi', "生产部")
    // CACHE.container.cameraFocus({
    //   target: [obj.position.x, obj.position.y, obj.position.z],
    //   distance: 2000,
    // });
    TU.focus([
      1748,
      550,
      8029
    ],
      [
        1733,
        2160,
        9215
      ])
  },
  // ******* 制造集团 end *******
  '4-1': () => {
    API.hideAll()
    API.showRoutes();
    API.showModels();
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.yinhangyuanqu,
    //   callback: () => {
    //     API.hideAll();
    //     API.showEnterpriseByName('yinghang')
    //     API.showMirror()
    //   },
    // });
    TU.focus(
      [
        -1941,
        0,
        -2245
      ],
      [
        -2001,
        3024,
        1230
      ]
      , 1000,
      () => {
        API.hideAll();
        API.showEnterpriseByName('yinghang')
        API.showMirror()
      }
    )
  },
  '5-1': () => {
    API.hideAll()
    API.showRoutes();
    API.showModels();
    API.showMirror()
    API.cameraAnimation({
      cameraState: STATE.enterpriseInnerStates.zhengwuzhongxin,
      callback: () => {
        API.hideAll();
        API.showEnterpriseByName('zhengwuzhongxinbangongshi')
        API.showMirror()
      },
    });
  },
  // ******* 物流公司 start *******
  "7-0": () => {
    // 整体布局
    API.hideAll()
    API.showEnterpriseByName('wuliubangongshi')
    API.showEnterpriseIconInnerByType('wuliubangongshi')
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.wuliuqiye,
    // });
    TU.focus([
      -3721.834793653318,
      0,
      19067.57574426238
    ], [
      -3771.57677966697,
      3472.5624968522243,
      25499.65252037516,
    ])
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
    API.selectEnterpriseInnerIcon('wuliubangongshi', "企业管理部")
    TU.focus([
      -3666,
      500,
      18071
    ],
      [
        -3679,
        1450,
        19831
      ])
    // myFocus(STATE.enterpriseInnerStates.wuliuqiye, obj)
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
    API.selectEnterpriseInnerIcon('wuliubangongshi', "业务部")
    // myFocus(STATE.enterpriseInnerStates.wuliuqiye, obj)
    TU.focus([
      -5280,
      500,
      18693
    ],
      [
        -5293,
        1450,
        20453
      ])
  },
  // ******* 物流公司 end *******
  // ******* 综合服务 start *******
  "8-0": () => {
    API.hideAll()
    API.showEnterpriseByName('zonghefuwulou')
    API.showEnterpriseIconInnerByType('zonghefuwulou')
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.zonghefuwulou,
    // });
    TU.focus([
      2888.3197379596622,
      0,
      17375.2067088381,
    ],
      [2858.732343078326,
        4561.789946341446,
        21201.117386320308,])
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
    API.selectEnterpriseInnerIcon('zonghefuwulou', "企业管理部")
    // myFocus(STATE.enterpriseInnerStates.zonghefuwulou, obj)
    TU.focus([
      3920,
      850,
      15818
    ],
      [
        3910,
        2382,
        17103
      ])
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
    API.selectEnterpriseInnerIcon('zonghefuwulou', "业务部")
    // myFocus(STATE.enterpriseInnerStates.zonghefuwulou, obj)
    TU.focus([
      4568,
      850,
      17766
    ],
      [
        4558,
        2382,
        19051
      ])
  },
  // ******* 综合服务 end *******
  // ******* 销售公司 start *******
  "9-0": () => {
    API.hideAll()
    API.showEnterpriseByName('Xiao_Shou_Gong_Si')
    API.showEnterpriseIconInnerByType('Xiao_Shou_Gong_Si')
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.Xiao_Shou_Gong_Si,
    // });
    TU.focus([-5316,
      0,
      7541], [-5309.102190849693,
      4280.420809143024,
      11239.135518697942,])
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
    API.selectEnterpriseInnerIcon('Xiao_Shou_Gong_Si', "企业管理部")
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.Xiao_Shou_Gong_Si,
    //   callback: () => {
    //     CACHE.container.cameraFocus({
    //       target: [obj.position.x, obj.position.y, obj.position.z],
    //       distance: 2000,
    //     });
    //   },
    //   delayTime: 0,
    //   duration: 0,
    // });
    TU.focus([
      -3140,
      1000,
      5714
    ],
      [
        -3137,
        2514,
        7021
      ])
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
    API.selectEnterpriseInnerIcon('Xiao_Shou_Gong_Si', "行政部")
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.Xiao_Shou_Gong_Si,
    //   callback: () => {
    //     CACHE.container.cameraFocus({
    //       target: [obj.position.x, obj.position.y, obj.position.z],
    //       distance: 2000,
    //     });
    //   },
    //   delayTime: 0,
    //   duration: 0,
    // });
    TU.focus(
      [
        -5011,
        1000,
        6237
      ],
      [
        -5026,
        2425,
        7640
      ]
    )
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
    API.selectEnterpriseInnerIcon('Xiao_Shou_Gong_Si', "业务部")
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.Xiao_Shou_Gong_Si,
    //   callback: () => {
    //     CACHE.container.cameraFocus({
    //       target: [obj.position.x, obj.position.y, obj.position.z],
    //       distance: 2000,
    //     });
    //   },
    //   delayTime: 0,
    //   duration: 0,
    // });
    TU.focus([
      -6698,
      1000,
      6256
    ],
      [
        -6695,
        2514,
        7564
      ])
  },
  "9-4": () => {
    // 财务部
    API.hideAll()
    API.showEnterpriseByName('Xiao_Shou_Gong_Si')
    API.showEnterpriseIconInnerByType('Xiao_Shou_Gong_Si')
    API.showMirror()
    const obj = API.findEnterpriseInnerIconByName(
      STATE.enterprisesInnerIcons["Xiao_Shou_Gong_Si"],
      "财务部"
    );
    API.selectEnterpriseInnerIcon('Xiao_Shou_Gong_Si', "财务部")
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.Xiao_Shou_Gong_Si,
    //   callback: () => {
    //     CACHE.container.cameraFocus({
    //       target: [obj.position.x, obj.position.y, obj.position.z],
    //       distance: 2000,
    //     });
    //   },
    //   delayTime: 0,
    //   duration: 0,
    // });
    TU.focus([
      -3145,
      1000,
      6548
    ],
      [
        -3142,
        2514,
        7856
      ])
  },
  // ******* 销售公司 end *******
  // ******* 供应企业 start *******
  "10-0": () => {
    API.hideAll()
    API.showEnterpriseByName('GongYingBanGongShi')
    API.showEnterpriseIconInnerByType('GongYingBanGongShi')
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.GongYingBanGongShi,
    // });
    TU.focus(
      [
        19199,
        0,
        5731
      ],
      [
        19172,
        4066,
        9243
      ]
    )
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
    API.selectEnterpriseInnerIcon('GongYingBanGongShi', "企业管理部")
    // myFocus(STATE.enterpriseInnerStates.GongYingBanGongShi, obj)
    TU.focus([
      21341,
      850,
      3500
    ],
      [
        21331,
        2364,
        4807
      ])
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
    API.selectEnterpriseInnerIcon('GongYingBanGongShi', "财务部")
    // myFocus(STATE.enterpriseInnerStates.GongYingBanGongShi, obj)
    TU.focus([
      21347,
      850,
      4464
    ],
      [
        21337,
        2364,
        5771
      ])
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
    API.selectEnterpriseInnerIcon('GongYingBanGongShi', "业务部")
    // myFocus(STATE.enterpriseInnerStates.GongYingBanGongShi, obj)
    TU.focus([
      18376,
      850,
      3967
    ],
      [
        18365,
        2364,
        5275
      ])
  },
  // ******* 供应企业 end *******
  // ******* 经销企业 start *******
  "11-0": () => {
    API.hideAll()
    API.showEnterpriseByName('JingXiaoBanGongShi')
    API.showEnterpriseIconInnerByType('JingXiaoBanGongShi')
    API.showMirror()
    // API.cameraAnimation({
    //   cameraState: STATE.enterpriseInnerStates.JingXiaoBanGongShi,
    // });
    TU.focus([
      -10286,
      0,
      607
    ],
      [
        -10299,
        3488,
        5059
      ])
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
    API.selectEnterpriseInnerIcon('JingXiaoBanGongShi', "企业管理部")
    // myFocus(STATE.enterpriseInnerStates.JingXiaoBanGongShi, obj)
    TU.focus(
      [
        -8275,
        0,
        -2479
      ],
      [
        -8321,
        1745,
        423
      ]
    )
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
    API.selectEnterpriseInnerIcon('JingXiaoBanGongShi', "财务部")
    // myFocus(STATE.enterpriseInnerStates.JingXiaoBanGongShi, obj)
    TU.focus(
      [
        -9510,
        0,
        -2482
      ],
      [
        -9500,
        1782,
        397
      ]
    )
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
    API.selectEnterpriseInnerIcon('JingXiaoBanGongShi', "采购部")
    // myFocus(STATE.enterpriseInnerStates.JingXiaoBanGongShi, obj)
    TU.focus(
      [
        -10664,
        0,
        -2426
      ],
      [
        -10635,
        1801,
        442
      ]
    )
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
    API.selectEnterpriseInnerIcon('JingXiaoBanGongShi', "营销部")
    // myFocus(STATE.enterpriseInnerStates.JingXiaoBanGongShi, obj)
    TU.focus(
      [
        -12093,
        0,
        -891
      ],
      [
        -12064,
        1801,
        1977
      ]
    )
  },
  // ******* 经销企业 end *******
};

export default handleBMenuBMap;
