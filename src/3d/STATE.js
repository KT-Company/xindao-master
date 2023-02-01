let Bol3D = window.Bol3D;

// const DEV_ENV = '/demos'
// const DEV_ENV = '../../new_example/seentao' // 116 服务器
const DEV_ENV = window.publicPath; // 本地

const boundrayGeojson = DEV_ENV + "/assets/data/beijing/boundray.json";
const boundrayAllGeojson = DEV_ENV + "/assets/data/beijing/boundrayAll.json";
const trafficGeojson = DEV_ENV + "/assets/data/beijing/traffic.geojson";
const environmentJson = DEV_ENV + "/assets/data/beijing/environment.json";
const educationGeojson = DEV_ENV + "/assets/data/beijing/education.json";
const roadsjson = DEV_ENV + "/assets/data/beijing/roads.json";
const chinajson = DEV_ENV + "/assets/data/china.json";

// 摄像头球角度
const earthState = {
  position: { x: 8585.75108278727, y: 37022.15719543815, z: 84514.4442193541 },
  target: { x: 1437.3067533183694, y: 0, z: 1306.2103651974032 },
};

const earthState2 = {
  position: {
    x: 6038.900868824114,
    y: 22634.069559301177,
    z: 58460.17261231369,
  },
  target: {
    x: 607.3559339702609,
    y: -2.02729963303239e-15,
    z: -12212.829892818681,
  },
};

const earthState3 = {
  position: { x: 4810.181865734829, y: 17513.811563036084, z: 42472.59224154196 },
  target: { x: 607.3559339702609, y: 0, z: -12212.829892818681 },
};

const earthState4 = {
  position: { x: -21564.576862499416, y: 2427.612191163894, z: -21807.608889478353 },
  target: { x: -16380.8681176588, y: -2.5143477729579768e-14, z: -18368.511974345718 },
};

const earthState5 = {
  position: { x: 34549.93780007896, y: 18047.984489949766, z: -28496.504499292714 },
  target: { x: 19672.73913857679, y: 1.3232584298382194e-13, z: -12962.35405497491 },
};

const earthState6 = {
  position: { x: 21841.178098172502, y: 626.735157786962, z: -15078.044322007372 },
  target: { x: 19672.73913857679, y: 1.3232584298382194e-13, z: -12962.35405497491 },
};

const earthState7 = {
  position: { x: 25496.526983176598, y: 4794.497679541797, z: 14779.953276242231 },
  target: { x: 33255.87403837567, y: 4.730311950826609e-14, z: 48023.715174893114 },
};

// 初始角度
const initialState = {
  position: { x: 6689.731286907447, y: 23427.445121035962, z: 40696.65280135414 },
  target: { x: 0, y: 0, z: 0 },
};

const initialState2 = {
  position: { x: 22305.144957571472, y: 2128.2180967255827, z: -8059.417409565435 },
  target: { x: -9821.88437918559, y: 0, z: 3037.7392860806385 },
};


// 经济板块摄像头角度
const industrialState = {
  position: { x: -35601.01657544943, y: 5660.2046484694665, z: 28164.922484242572 },
  target: { x: -4282.960488408456, y: -3.651104997883275e-14, z: 2072.90884278651 },
};

// 交通出行摄像头角度
const trafficState = {
  position: { x: -41493.29262478442, y: 21836.694946018495, z: 4507.389427745726 },
  target: { x: -3915.367087432909, y: 1.1998562471585104e-13, z: 127.55006969957931 },
};

// 环境人口摄像头角度
const environmentState = {
  position: { x: 33699.19378343043, y: 4111.400455059309, z: -20502.416922664383 },
  target: { x: -1228.6784680935405, y: -4.66416189255705e-15, z: 1525.3533257694262 },
};

// 教育医疗摄像头角度
const educationState = {
  position: { x: 33699.19378343043, y: 4111.400455059309, z: -20502.416922664383 },
  target: { x: -1228.6784680935405, y: -4.66416189255705e-15, z: 1525.3533257694262 },
};

// 能源角度
const energyState = {
  position: { x: 28321.335973649308, y: 17754.31878184519, z: 34071.194874251494 },
  target: { x: 14329.812077278846, y: 4.168845175579688e-15, z: 6595.563294037233 },
};

// 区域层角度
const areaState = {
  position: {
    x: -15515.614936773884,
    y: 12100.515066280692,
    z: 23637.00484955622,
  },
  target: {
    x: -1503.202421042367,
    y: 0,
    z: 8708.97403091847,
  },
};
/** 9个企业角度 start */

// 内部
const enterpriseInnerStates = {
  zhizaojituan: {
    position: {
      x: 1698.0219163614192,
      y: 3347.507529731886,
      z: 11075.291786464813,
    },
    target: { x: 1729.0384800293295, y: 0, z: 8609.419361275015 },
  },
  yinhangyuanqu: {
    position: {
      x: -2001.0582548446343,
      y: 3024.3244585998264,
      z: 1229.6111103333797,
    },
    target: { x: -1940.5143632626123, y: 0, z: -2245.163672769586 },
  },
  zhengwuzhongxin: {
    position: {
      x: 11757.536843246038,
      y: 4087.1587632330857,
      z: 15184.075636260884,
    },
    target: { x: 11979.67870010836, y: 0, z: 10860.398765804988 },
  },
  guanweihui: {
    //无内部
    position: {
      x: 7969.62641154124,
      y: 3399.1467161585538,
      z: 9583.093517111636,
    },
    target: { x: 8194.780217777594, y: 0, z: 1280.2954376368739 },
  },
  wuliuqiye: {
    position: {
      x: -3771.57677966697,
      y: 3472.5624968522243,
      z: 25499.65252037516,
    },
    target: { x: -3721.834793653318, y: 0, z: 19067.57574426238 },
  },
  zonghefuwulou: {
    position: {
      x: 2858.732343078326,
      y: 4561.789946341446,
      z: 21201.117386320308,
    },
    target: { x: 2888.3197379596622, y: 0, z: 17375.2067088381 },
  },
  Xiao_Shou_Gong_Si: {
    position: {
      x: -5309.102190849693,
      y: 4280.420809143024,
      z: 11239.135518697942,
    },
    target: { x: -5316.331539890986, y: 0, z: 7541.822667685167 },
  },
  GongYingBanGongShi: {
    position: {
      x: 19172.12744287263,
      y: 4066.3994675297135,
      z: 9243.519664808724,
    },
    target: { x: 19199.289933790264, y: 0, z: 5731.170421302181 },
  },
  JingXiaoBanGongShi: {
    position: {
      x: -10298.82204143777,
      y: 3488.332141950092,
      z: 5059.097839609528,
    },
    target: { x: -10285.959692489916, y: 0, z: 606.7332641829053 },
  },
};

// 外部
const enterpriseStates = {
  zhizaojituan: {
    position: { x: 2316.4496155673637, y: 273.9217141815714, z: 9248.650103658982 },
    target: { x: 1351.9770113675402, y: 2.525342066939244e-15, z: 8248.760898136521 },
  },
  yinhangyuanqu: {
    // position: { x: -2423.8055099569733, y: 210.66388904907504, z: -1855.258846173214 },
    // target: { x: -1045.5933629498784, y: 1.0195968424216527e-15, z: -2102.5864356455913 },
    position: { x: -2389, y: 182, z: -1931 },
    target: { x: -1077, y: 0, z: -2167 },
  },
  zhengwuzhongxin: {
    // position: {x: 12247.145333224285, y: 428.3484228722898, z: 11220.88540100983},
    // target: { x: 12057.163459434247, y: 0, z: 8502.60942212603 },
    position: { x: -10321.260858083548, y: 98.13507429757074, z: 711.8341356661394 },
    target: { x: -10277.92577527996, y: -2.529389089482726e-19, z: -1775.2813930664197 },
  },
  guanweihui: {
    //无内部
    // position: { x: 8560.936019844008, y: 424.8171384138537, z: 3956.603969676288 },
    // target: { x: 8353.696436761853, y: -3.2451589011441017e-16, z: 1760.1789875892105 },
    position: { x: 8364, y: 248, z: 3481 },
    target: { x: 8354, y: 0, z: 1760 },
  },
  wuliuqiye: {
    // position: { x: -3053.7847965415367, y: 198.71631071954803, z: 20111.495556497466 },
    // target: { x: -4418.708735921996, y: 6.279955201484174e-16, z: 18338.02578910454 },
    position: { x: 2919.9703519302006, y: 165.13393432554335, z: 17725.444326215606 },
    target: { x: 2828.777717483803, y: 2.602361743549215e-18, z: 15486.669130378981 },
  },
  zonghefuwulou: {
    // position: { x: 2919.9703519302006, y: 165.13393432554335, z: 17725.444326215606 },
    // target: { x: 2828.777717483803, y: 2.602361743549215e-18, z: 15486.669130378981 },
    position: { x: -3549, y: 118, z: 20025 },
    target: { x: -4494, y: 0, z: 18351 },
  },
  Xiao_Shou_Gong_Si: {
    // position: {x: -5340.467360427358, y: 187.79511006305972, z: 7284.066691511527 },
    // target: {x: -5344.624481416113, y: 2.3867026161143805e-19, z: 5157.975536245758},
    position: { x: 12180, y: 161, z: 10893 },
    target: { x: 12175, y: 0, z: 8534 },
  },
  GongYingBanGongShi: {
    // position: { x: 19268.276217638224, y: 154.87666099163937, z: 5442.492613349783 },
    // target: { x: 19346.595775875296, y: 3.175922184296228e-16, z: 3315.1871363579135 },
    position: { x: -5355, y: 159, z: 7286 },
    target: { x: -5345, y: 0, z: 5158 },
  },
  JingXiaoBanGongShi: {
    // position: { x: -10321.260858083548, y: 98.13507429757074, z: 711.8341356661394 },
    // target: { x: -10277.92577527996, y: -2.529389089482726e-19, z: -1775.2813930664197 },
    position: { x: 19268.276217638224, y: 154.87666099163937, z: 5442.492613349783 },
    target: { x: 19346.595775875296, y: 3.175922184296228e-16, z: 3315.1871363579135 },
  },
};

/** 9个企业角度 end */

const modelThreshold = {
  fuwugongsi: 1,
  gongyingqiye: 1,
  guanweihui: 1,
  jingxiaoqiye: 1,
  wuliuqiye: 1,
  xiaoshougongsi: 1,
  yinhangyuanqu: 1,
  zhengwuzhongxin: 1,
  zhizaojituan: 1,
};

const modelExclude = [
  "fuwugongsi",
  "gongyingqiye",
  "guanweihui",
  "jingxiaoqiye",
  "wuliuqiye",
  "xiaoshougongsi",
  "yinhangyuanqu",
  "zhengwuzhongxin",
  "zhizaojituan",
];

const modelSeperate = [
  "fuwugongsi_s",
  "gongyingqiye_s",
  "guanweihui_s",
  "jingxiaoqiye_s",
  "wuliuqiye_s",
  "xiaoshougongsi_s",
  "yinhangyuanqu_s",
  "zhengwuzhongxin_s",
  "zhizaojituan_s",
];

const enterprisesNames = [
  "GongYingBanGongShi",
  "JingXiaoBanGongShi",
  "Xiao_Shou_Gong_Si",
  "yinghang",
  "zhengwuzhongxinbangongshi",
  "zhizaojituanbangongshi",
  "zonghefuwulou",
  "wuliubangongshi",
];
const enterprisesStates = {
  // 企业内部模型位置
  GongYingBanGongShi: { x: 19248.103132661443, y: 10, z: 4954.823308964046 },
  JingXiaoBanGongShi: { x: -10287.40256572037, y: 10, z: 233.8936394619204 },
  Xiao_Shou_Gong_Si: { x: -5372.648725912452, y: 10, z: 6895.494659472656 },
  yinghang: { x: -1605.626010147031, y: 10, z: -2124.3371874043587 },
  zhengwuzhongxinbangongshi: {
    x: 12172.6232505863,
    y: 10,
    z: 10489.113002582086,
  },
  zhizaojituanbangongshi: {
    x: 1675.3892046318097,
    y: 10,
    z: 8728.292905219469,
  },
  zonghefuwulou: { x: 2835.441504939446, y: 10, z: 16897.858815489963 },
  wuliubangongshi: { x: -3773.1485368738836, y: 10, z: 19631.761207797565 },
};
const enterpriseIconNames = [
  "供应企业",
  "经销企业",
  "销售公司",
  "工商银行",
  "政务服务",
  "制造集团",
  "综合服务",
  "物流公司",
  "管委会",
];
const enterprisesIcons = [
  {
    name: "供应企业",
    // position: { x: 19248.103132661443, y: 10, z: 4954.823308964046 },
    // popupPosition: { x: 0, y: .05, z: 0 },
    position: { x: -5372.648725912452, y: 10, z: 6895.494659472656 },
    popupPosition: { x: 0.01, y: 0.05, z: 0 },
    inner: true,
    type: "GongYingBanGongShi",
    content:
      "供应企业是制造集团的供应商，主要负责制造集团生产所需原材料的供应工作，在商业社会中是所有业务的源头。供应企业的采购主要是向虚拟的原材料市场进行采购。主要业务包括销售业务、采购业务、人力资源业务、会计核算业务、财务管理业务、企业管理业务等。供应企业设置3各部门，4个岗位。3个部门分别是：企业管理部、财务部、业务部。其中的人力资源业务、企业管理业务归企业管理部管理。市场营销、销售业务、采购业务（含仓储业务）归业务部管理。会计核算业务、财务管理业务归财务部管理。",
  },
  {
    name: "经销企业",
    // position: { x: -10287.40256572037, y: 10, z: 233.8936394619204 },
    // popupPosition: { x: 0, y: .06, z: 0 },
    position: { x: 19248.103132661443, y: 10, z: 4954.823308964046 },
    popupPosition: { x: 0, y: .05, z: 0 },
    inner: true,
    type: "JingXiaoBanGongShi",
    content:
      "经销企业是销售公司的客户，是销售公司销售渠道的重要客户。在商业社会中经销企业主要业务是将销售公司的产品通过经销企业的渠道销售到全国各地，主要业务包括销售业务、采购业务、人力资源业务、会计核算业务、财务管理业务、企业管理业务等。经销企业设置4个部门，6个岗位。4个部门分别为：企业管理部、营销部、采购部、财务部。其中的人力资源业务、企业管理业务归企业管理部管理。市场营销、销售业务归营销部管理。采购业务（含仓储业务）归采购部管理。会计核算业务、财务管理业务归财务部管理。",
  },
  {
    name: "销售公司",
    // position: { x: -5372.648725912452, y: 10, z: 6895.494659472656 },
    // popupPosition: { x: 0, y: .1, z: 0 },
    position: { x: 12172.6232505863, y: 10, z: 10489.113002582086 },
    popupPosition: { x: 0, y: 0.08, z: 0 },
    inner: true,
    type: "Xiao_Shou_Gong_Si",
    content:
      "销售公司是制造集团的子公司，是制造集团的销售业务中心，主要负责本制造集团的销售工作，包括销售业务、采购业务、人力资源业务、会计核算业务、财务管理业务、企业管理业务等。销售公司设置3个部门，6个岗位。3个部门分别为：企业管理部、业务部、财务部，其中的人力资源业务、企业管理业务归企业管理部管理。销售业务、采购业务归业务部管理。会计核算业务、财务管理业务归财务部管理。",
  },
  {
    name: "工商银行",
    position: { x: -1605.626010147031, y: 10, z: -2124.3371874043587 },
    popupPosition: { x: 0, y: .1, z: 0 },
    inner: true,
    type: "yinhangyuanqu",
    content:
      "工商银行在商业社会中提供基础金融服务，主要业务包括对公业务转账、信用贷款、代发企业工资、委托收款（增值税、个人所得税、社会保险、住房公积金等）。",
  },
  {
    name: "政务服务",
    // position: { x: 12172.6232505863, y: 10, z: 10489.113002582086 },
    // popupPosition: { x: 0, y: .12, z: 0 },
    position: { x: -10287.40256572037, y: 10, z: 233.8936394619204 },
    popupPosition: { x: -0.01, y: .06, z: 0 },
    inner: true,
    type: "zhengwuzhongxin",
    content:
      "政务服务中心在商业社会中提供基础的政务服务和监管工作。人社局主要负责社会保险和住房公积金的申报、缴款、稽查等工作；国税局主要负责增值税、个人所得税等税种的发票管理、申报、缴款、认证、稽核等工作；市监局主要负责企业年报、商标注册、企业经营巡查等工作。",
  },
  {
    name: "制造集团",
    position: { x: 1675.3892046318097, y: 10, z: 8728.292905219469 },
    popupPosition: { x: 0, y: .05, z: 0 },
    inner: true,
    type: "zhizaojituan",
    content:
      "商业社会的核心企业，主要负责商业社会的生产制造，其中包括销售业务、生产业务、采购业务、人力资源业务、会计核算业务、财务管理业务、企业管理业务等。制造集团设置7个部门，13个岗位。7个部门分别为：企业管理部、人力资源部、财务部、营销部、采购部、生产部、组装车间。",
  },
  {
    name: "综合服务",
    // position: { x: 2835.441504939446, y: 10, z: 16897.858815489963 },
    // popupPosition: { x: 0, y: .1, z: 0 },
    position: { x: -3773.1485368738836, y: 10, z: 19631.761207797565 },
    popupPosition: { x: 0, y: .05, z: 0 },
    inner: true,
    type: "zonghefuwulou",
    content:
      "综合服务公司在商业社会中提供围绕企业经营，所需要的各种认证、代理的服务型企业。主要业务包括资质认证、业务代理（固定资产采购、人员找解聘、代收水电费等）、市场开拓、广告投放等业务。",
  },
  {
    name: "物流公司",
    // position: { x: -3773.1485368738836, y: 10, z: 19631.761207797565 },
    // popupPosition: { x: 0, y: .05, z: 0 },
    position: { x: 2835.441504939446, y: 10, z: 16897.858815489963 },
    popupPosition: { x: 0, y: .1, z: 0 },
    inner: true,
    type: "wuliuqiye",
    content:
      "物流企业是提供物流运输的服务型企业，是商业社会中商品流转的主要途径。主要负责制造集团、销售公司、经销企业三个类型企业的物流运输工作。主要业务包括物流合同、订单处理、物流运输、运单跟踪、订单开票、收款核销等。物流企业设置2各部门，3个岗位。其中的物流合同、订单处理、物流运输、运单跟踪归业务部管理。订单开票、收款核销归企业管理部管理。",
  },
  {
    name: "管委会",
    position: { x: 8338.327547500401, y: 10, z: 3007.024347085281 },
    popupPosition: { x: .01, y: .1, z: 0 },
    inner: false,
    type: "guanweihui",
    content:
      "管委会在商业社会中提供基础的政务服务和监管工作。人社局主要负责社会保险和住房公积金的申报、缴款、稽查等工作；国税局主要负责增值税、个人所得税等税种的发票管理、申报、缴款、认证、稽核等工作；市监局主要负责企业年报、商标注册、企业经营巡查等工作。",
  },
];
const enterprisesInnerIcons = {
  zonghefuwulou: [
    // 综合服务
    {
      name: "财务部",
      position: { x: 5169.5080784391475, y: 850, z: 15812.12472431732 },
    },
    {
      name: "企业管理部",
      position: { x: 3919.565251248053, y: 850, z: 15817.646633978142 },
      id: '8-1'
    },
    {
      name: "会议室",
      position: { x: 2448.6124323592308, y: 850, z: 15862.929211528779 },
    },
    {
      name: "业务部",
      position: { x: 4567.742180370165, y: 850, z: 17766.248766547214 },
      id: '8-2'
    },
    {
      name: "行政部",
      position: { x: 2484.5646837703143, y: 850, z: 17762.746822474088 },
    },
  ],
  GongYingBanGongShi: [
    // 供应企业
    {
      name: "业务部",
      position: { x: 18375.50779580549, y: 850, z: 3967.3926511880813 },
      id: '10-3'
    },
    {
      name: "会议室",
      position: { x: 17185.204441518366, y: 850, z: 6237.574032866109 },
    },
    {
      name: "企业管理部",
      position: { x: 21341.40739748559, y: 850, z: 3500.153580788229 },
      id: '10-1'
    },
    {
      name: "财务部",
      position: { x: 21347.058190231615, y: 850, z: 4463.885834850727 },
      id: '10-2'
    },
    {
      name: "行政部",
      position: { x: 21330.072687504413, y: 850, z: 5316.165834380619 },
    },
  ],
  JingXiaoBanGongShi: [
    // 经销企业
    {
      name: "会议室",
      position: { x: -12094.468412614213, y: 650, z: -1397.9004618250003 },
    },
    {
      name: "采购部",
      position: { x: -10621.677739611709, y: 650, z: -1415.8606783448477 },
      id: '11-3'
    },
    {
      name: "财务部",
      position: { x: -9450.419654442285, y: 650, z: -1398.044262846015 },
      id: '11-2'
    },
    {
      name: "企业管理部",
      position: { x: -8208.787918720287, y: 650, z: -1380.3654654700797 },
      id: '11-1'
    },
    {
      name: "营销部",
      position: { x: -11980.617255870626, y: 650, z: 270.7444486735394 },
      id: '11-4'
    },
    {
      name: "行政部",
      position: { x: -8481.039521511275, y: 650, z: 776.6251058202891 },
    },
  ],
  wuliubangongshi: [
    // 物流企业
    {
      name: "会议室",
      position: { x: -2063.7735464221532, y: 500, z: 18541.286079605074 },
    },
    {
      name: "企业管理部",
      position: { x: -3665.732312774057, y: 500, z: 18071.250764634267 },
      id: "7-1"
    },
    {
      name: "财务部",
      position: { x: -3688.3006560450794, y: 500, z: 19130.28858724848 },
    },
    {
      name: "会客室",
      position: { x: -3644.409126684405, y: 500, z: 20156.60177285536 },
    },
    {
      name: "业务部",
      position: { x: -5279.762855219847, y: 500, z: 18693.135366419516 },
      id: "7-2"
    },
    {
      name: "行政部",
      position: { x: -5415.180605918095, y: 500, z: 20760.749251920042 },
    },
  ],
  Xiao_Shou_Gong_Si: [
    //销售公司
    {
      name: "业务部",
      position: { x: -6697.8290513419215, y: 1000, z: 6256.49074400574 },
      id: "9-3"
    },
    {
      name: "行政部",
      position: { x: -5010.82077991694, y: 1000, z: 6236.846351613146 },
    },
    {
      name: "企业管理部",
      position: { x: -3139.856069852616, y: 1000, z: 5713.811608332197 },
      id: "9-1"
    },
    {
      name: "财务部",
      position: { x: -3144.764221830271, y: 1000, z: 6548.306346194357 },
      id: "9-4"
    },
    {
      name: "会议室",
      position: { x: -3148.9772602869543, y: 1000, z: 7337.729156477428 },
    },
  ],
  zhizaojituanbangongshi: [
    // 制造集团
    {
      name: "企业管理部",
      position: { x: 186.87588317351174, y: 550, z: 8806.624992775201 },
      id: "3-1"
    },
    {
      name: "人力资源部",
      position: { x: 983.3798891539435, y: 550, z: 9402.85209883289 },
      id: "3-2"
    },
    {
      name: "财务部",
      position: { x: 1748.3814025866116, y: 550, z: 9395.193685913731 },
      id: "3-3"
    },
    {
      name: "采购部",
      position: { x: 2566.989925203354, y: 550, z: 9416.378724330836 },
      id: "3-4"
    },
    {
      name: "营销部",
      position: { x: 985.1498023699143, y: 550, z: 8045.725951083245 },
      id: "3-5"
    },
    {
      name: "生产部",
      position: { x: 1747.6064922979315, y: 550, z: 8028.821021854147 },
      id: "3-6"
    },
    {
      name: "仓储部",
      position: { x: 2556.6825808168037, y: 550, z: 8041.546855593286 },
    },
  ],
};

// 3圈
const threeCirclesStates = [
  {
    position: { x: -1739.853061932303, y: 10, z: 7960.497399094458 },
    color: "#2f1f04",
    edgeColor: "#f5440e",
    size: 8950,
  },
  {
    position: { x: 3683, y: 10, z: 6246 },
    color: "#002a2a",
    edgeColor: "#00c2ff",
    size: 22840,
  },
  {
    position: { x: 2556.815927083342, y: 10, z: 6718.3825791989 },
    color: "#131372",
    edgeColor: "#0b24ff",
    size: 15000,
  },
];

// 3流
// information: 信息
// logistics: 物流
// money: 资金
const ZWFU = { x: -10305.641433782135, y: 0, z: 206.79537057630375 } // 政务服务
const GYQY = { x: -5367.972654446802, y: 0, z: 6866.902969751581 }   // 供应企业
const XSGS = { x: 12123.12663383788, y: 0, z: 10382.038777730813 }   // 销售公司
const JXQY = { x: 19240.340636414505, y: 0, z: 4986.610391430886 }   // 经销企业
const WLGS = { x: 2818.300879174196, y: 0, z: 17041.397810063867 }   // 物流公司
const ZHFU = { x: -3798.6116421710212, y: 0, z: 19600.964542769874 } // 综合服务
const threeFlowsStates = [
  {
    startPoint: WLGS,
    endPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    path: ["物流公司", "制造集团"],
    type: "logistics",
    title: "采购入库",
    height: 5000,
  },
  {
    startPoint: WLGS,
    endPoint: XSGS,
    path: ["物流公司", "销售公司"],
    type: "logistics",
    title: "采购入库",
    height: 5000,
  },
  {
    startPoint: WLGS,
    endPoint: JXQY,
    path: ["物流公司", "经销企业"],
    type: "logistics",
    title: "采购入库",
    height: 5000,
  },
  {
    startPoint: GYQY,
    endPoint: WLGS,
    path: ["供应企业", "物流公司"],
    type: "logistics",
    title: "销售出库",
    height: 8000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: WLGS,
    path: ["制造集团", "物流公司"],
    type: "logistics",
    title: "销售出库",
    height: 8000,
  },
  {
    startPoint: XSGS,
    endPoint: WLGS,
    path: ["销售公司", "物流公司"],
    type: "logistics",
    title: "销售出库",
    height: 8000,
  },
  {
    startPoint: ZHFU,
    endPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    path: ["综合服务", "制造集团"],
    type: "information",
    title: "认证办理",
    height: 5000,
  },
  {
    startPoint: ZHFU,
    endPoint: JXQY,
    path: ["综合服务", "经销企业"],
    type: "information",
    title: "市场开拓办理",
    height: 5000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: ZHFU,
    path: ["制造集团", "综合服务"],
    type: "information",
    title: "认证申请",
    height: 8000,
  },
  {
    startPoint: JXQY,
    endPoint: ZHFU,
    path: ["经销企业", "综合服务"],
    type: "information",
    title: "市场开拓申请",
    height: 8000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: GYQY,
    path: ["制造集团", "供应企业"],
    type: "information",
    title: "采购",
    height: 5000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: XSGS,
    path: ["制造集团", "销售公司"],
    type: "information",
    title: "销售",
    height: 5000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: ZWFU,
    path: ["制造集团", "政务服务"],
    type: "information",
    title: "税务申报",
    height: 5000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: ZWFU,
    path: ["制造集团", "政务服务"],
    type: "information",
    title: "社保增减员",
    height: 8000,
  },
  {
    startPoint: GYQY,
    endPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    path: ["供应企业", "制造集团"],
    type: "information",
    title: "销售",
    height: 8000,
  },
  {
    startPoint: XSGS,
    endPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    path: ["销售公司", "制造集团"],
    type: "information",
    title: "采购",
    height: 8000,
  },
  {
    startPoint: XSGS,
    endPoint: JXQY,
    path: ["销售公司", "经销企业"],
    type: "information",
    title: "销售",
    height: 5000,
  },
  {
    startPoint: JXQY,
    endPoint: XSGS,
    path: ["经销企业", "销售公司"],
    type: "information",
    title: "采购",
    height: 8000,
  },
  {
    startPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    endPoint: ZHFU,
    path: ["工商银行", "综合服务"],
    type: "money",
    title: "收开拓款",
    height: 5000,
  },
  {
    startPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    endPoint: ZHFU,
    path: ["工商银行", "综合服务"],
    type: "money",
    title: "收认证款",
    height: 8000,
  },
  {
    startPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    endPoint: GYQY,
    path: ["工商银行", "供应企业"],
    type: "money",
    title: "销售收款",
    height: 5000,
  },
  {
    startPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    endPoint: ZWFU,
    path: ["工商银行", "政务服务"],
    type: "money",
    title: "税务收款",
    height: 5000,
  },
  {
    startPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    endPoint: ZWFU,
    path: ["工商银行", "政务服务"],
    type: "money",
    title: "社保收款",
    height: 8000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    path: ["制造集团", "工商银行"],
    type: "money",
    title: "税务缴款",
    height: 5000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    path: ["制造集团", "工商银行"],
    type: "money",
    title: "支付采购款",
    height: 8000,
  },
  {
    startPoint: { x: 1639.351515070567, y: 0, z: 8676.171284592438 },
    endPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    path: ["制造集团", "工商银行"],
    type: "money",
    title: "社保缴款",
    height: 11000,
  },
  {
    startPoint: JXQY,
    endPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    path: ["经销企业", "工商银行"],
    type: "money",
    title: "支付开拓款",
    height: 5000,
  },
  {
    startPoint: JXQY,
    endPoint: { x: -1562.682763937144, y: 0, z: -2148.783631431948 },
    path: ["经销企业", "工商银行"],
    type: "money",
    title: "支付认证款",
    height: 8000,
  },
];

// modelExcludeMap
const modelExcludeMap = {
  zhizaojituan: "zhizaojituan",
  yinhangyuanqu: "yinhangyuanqu",
  zhengwuzhongxin: "zhengwuzhongxin",
  guanweihui: "guanweihui",
  wuliuqiye: "wuliuqiye",
  fuwugongsi: "zonghefuwulou",
  xiaoshougongsi: "Xiao_Shou_Gong_Si",
  gongyingqiye: "GongYingBanGongShi",
  jingxiaoqiye: "JingXiaoBanGongShi",
};
// threeflowsMap
const threeFlowsMap = {
  GongYingBanGongShi: "供应企业",
  JingXiaoBanGongShi: "经销企业",
  Xiao_Shou_Gong_Si: "销售公司",
  yinhangyuanqu: "工商银行",
  zhengwuzhongxin: "政务服务",
  zhizaojituan: "制造集团",
  zonghefuwulou: "综合服务",
  wuliuqiye: "物流公司",
  guanweihui: "管委会"
}

const isAnimating = false;

const RADIUS = 55000;
const CAMERA_BOUNDS = 48000;

const enterpriseInnerMap = {
  zhizaojituan: {
    hasInnerIcon: true,
    name: 'zhizaojituanbangongshi',
    id: 3,
    cid: 0,
    path: '/Manufacture',
  },
  yinhangyuanqu: {
    hasInnerIcon: false,
    name: 'yinghang',
    id: 4,
    cid: 1,
    path: '/ICBC',
  },
  zhengwuzhongxin: {
    hasInnerIcon: false,
    name: 'zhengwuzhongxinbangongshi',
    id: 5,
    cid: 1,
    path: '/Government',
  },
  wuliuqiye: {
    hasInnerIcon: true,
    name: 'wuliubangongshi',
    id: 7,
    cid: 0,
    path: '/Logistics',
  },
  zonghefuwulou: {
    hasInnerIcon: true,
    name: 'zonghefuwulou',
    id: 8,
    cid: 0,
    path: "/Comprehensive",
  },
  Xiao_Shou_Gong_Si: {
    hasInnerIcon: true,
    name: 'Xiao_Shou_Gong_Si',
    id: 9,
    cid: 0,
    path: '/Manufacture',
  },
  GongYingBanGongShi: {
    hasInnerIcon: true,
    name: 'GongYingBanGongShi',
    id: 10,
    cid: 0,
    path: '/Manufacture',
  },
  JingXiaoBanGongShi: {
    hasInnerIcon: true,
    name: 'JingXiaoBanGongShi',
    id: 11,
    cid: 0,
    path: '/Manufacture',
  }
}

const baseModelNames = ['Aqu', 'Bqu', 'Cqu', 'Dqu', 'Equ', 'Fqu', 'Aqu-1']
const areaModelNames = ['qiyezhulou', 'qiyepeilou']

const areaModelMap = {
  'wuliuqiye': ['WLBGL01_BanGongLou', 'WLCK01_Cangku_R', 'WLCK01_S_Cangku'],
  'jingxiaoqiye': ['jingxiaobangonglou'],
  'gongyingqiye': ['GYBGL_Wall'],
  'yinhangyuanqu': ['YHDL_Qiang'],
  'xiaoshougongsi': ['xiaoshougongsidalou'],
  'zhengwuzhongxin': ['ZWDL_DaLou'],
  'zhizaojituan': ['zhizaojituan-BanGongLou', 'zhizaojituan-chejianlou', 'BanChengPinCangKu'],
  'fuwugongsi': ['zonghefuwulou'],
  'guanweihui': ['guanweihuidalou'],
}
const areaModelData = {
  'WLBGL01_BanGongLou': { // 物流 1
    // position: {x: -3450, y: 18,z: 19650},
    position: { x: 3150, y: 0, z: 17110 },
    scale: { x: 1.5, y: 1.5, z: 1.5 }
  },
  'WLCK01_Cangku_R': { // 物流 2
    // position: {x: -3800, y: 0,z: 19650},
    position: { x: 2800, y: 0, z: 17110 },
    scale: { x: 1.7, y: 1.7, z: 1.7 }
  },
  'WLCK01_S_Cangku': { // 物流 3
    // position: {x: -3455, y: 0,z: 19500},
    position: { x: 3155, y: 0, z: 16960 },
    scale: { x: 1.2, y: 1.2, z: 1.2 }
  },
  'jingxiaobangonglou': { // 经销
    // position: {x: -10310, y: 45, z: 210},
    position: { x: 19249, y: 0, z: 4991 },
    scale: { x: 3.5, y: 3.5, z: 3.5 }
  },
  'GYBGL_Wall': { // 供应企业
    // position: {x: 19249, y: 0, z: 4991},
    position: { x: -5345, y: 0, z: 6875 },
    scale: { x: 2, y: 2, z: 2 }
  },
  'YHDL_Qiang': { // 银行
    position: { x: -1956, y: 90.5, z: -2000 },
    scale: { x: 5, y: 5, z: 5 }
  },
  'xiaoshougongsidalou': { // 销售
    // position: {x: -5345, y: 65, z: 6875},
    position: { x: 12170, y: 57, z: 10484 },
    scale: { x: 3, y: 3, z: 3 }
  },
  'ZWDL_DaLou': { // 政务服务
    // position: {x: 12170, y: 57, z: 10484},
    position: { x: -10310, y: 45, z: 210 },
    scale: { x: 7, y: 7, z: 7 }
  },
  'zhizaojituan-BanGongLou': {
    position: { x: 1680, y: 0, z: 8720 },
    scale: { x: 2.5, y: 2.5, z: 2.5 }
  },
  'zhizaojituan-chejianlou': {
    position: { x: 1590, y: 0, z: 8550 },
    scale: { x: 2, y: 2, z: 2 }
  },
  'BanChengPinCangKu': {
    position: { x: 1790, y: 0, z: 8570 },
    scale: { x: 1.8, y: 1.8, z: 1.8 }
  },
  'zonghefuwulou': { // 综合服务
    // position: {x: 2800, y: 53, z: 17110},
    position: { x: -3800, y: 0, z: 19650 },
    scale: { x: 4.63291692, y: 5.677104, z: 4.90535 }
  },
  'guanweihuidalou': {
    position: { x: 8350, y: 85, z: 3000 },
    scale: { x: .5, y: .5, z: .5 }
  }
}

export const STATE = {
  DEV_ENV,
  boundrayGeojson,
  boundrayAllGeojson,
  trafficGeojson,
  environmentJson,
  roadsjson,
  initialState,
  initialState2,
  industrialState,
  trafficState,
  environmentState,
  educationState,
  energyState,
  earthState,
  earthState2,
  earthState3,
  earthState4,
  earthState5,
  earthState6,
  earthState7,
  educationGeojson,
  modelThreshold,
  modelExclude,
  modelSeperate,
  chinajson,
  isAnimating,
  RADIUS,
  CAMERA_BOUNDS,
  enterprisesStates,
  enterprisesNames,
  enterprisesIcons,
  enterprisesInnerIcons,
  enterpriseIconNames,
  areaState,
  enterpriseStates,
  enterpriseInnerStates,
  threeCirclesStates,
  threeFlowsStates,
  modelExcludeMap,
  threeFlowsMap,
  enterpriseInnerMap,
  baseModelNames,
  areaModelNames,
  areaModelMap,
  areaModelData
};
