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
  position: {
    x: 10478.659614781236,
    y: 37803.028468717326,
    z: 120977.37665805497,
  },
  target: { x: 1406.9879364323017, y: 0, z: 2940.559695509824 },
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
  position: {
    x: -9938.288809320029,
    y: 42407.784669488225,
    z: 18089.857058505946,
  },
  target: { x: -9821.88437918559, y: 0, z: 3037.7392860806394 },
};

// 摄像头垂直角度
const initialState = {
  position: {
    x: 7434.028334554503,
    y: 2834.2073350206824,
    z: 26447.912258023345,
  },
  target: {
    x: -2133.5462087425603,
    y: 0,
    z: 2556.7757758174635,
  },
};

// 经济板块摄像头角度
const industrialState = {
  position: {
    x: -10193.24420049027,
    y: 817.4223284548395,
    z: 5798.987933882156,
  },
  target: {
    x: -9821.88437918559,
    y: 0,
    z: 3037.7392860806385,
  },
};

// 交通出行摄像头角度
const trafficState = {
  position: {
    x: -10193.24420049027,
    y: 817.4223284548395,
    z: 5798.987933882156,
  },
  target: {
    x: -9821.88437918559,
    y: 0,
    z: 3037.7392860806385,
  },
};

// 环境人口摄像头角度
const environmentState = {
  position: {
    x: -10193.24420049027,
    y: 817.4223284548395,
    z: 5798.987933882156,
  },
  target: {
    x: -9821.88437918559,
    y: 0,
    z: 3037.7392860806385,
  },
};

// 教育医疗摄像头角度
const educationState = {
  position: {
    x: -10193.24420049027,
    y: 817.4223284548395,
    z: 5798.987933882156,
  },
  target: {
    x: -9821.88437918559,
    y: 0,
    z: 3037.7392860806385,
  },
};

// 能源角度
const energyState = {
  position: {
    x: -10193.24420049027,
    y: 817.4223284548395,
    z: 5798.987933882156,
  },
  target: {
    x: -9821.88437918559,
    y: 0,
    z: 3037.7392860806385,
  },
};

// 区域层角度
const areaState = {
  position: {
    x: -15515.614936773884, y: 12100.515066280692, z: 23637.00484955622
  },
  target: {
    x: -1503.202421042367, y: 0, z: 8708.97403091847
  },
}
/** 9个企业角度 start */
const enterpriseStates = {
  zhizaojituan: {
    position:{x: 1698.0219163614192, y: 3347.507529731886, z: 11075.291786464813},
    target:{x: 1729.0384800293295, y: 0, z: 8609.419361275015}
  },
  yinhangyuanqu:{
    position:{x: -2001.0582548446343, y: 3024.3244585998264, z: 1229.6111103333797},
    target:{x: -1940.5143632626123, y: 0, z: -2245.163672769586}
  },
  zhengwuzhongxin:{
    position:{x: 11757.536843246038, y: 4087.1587632330857, z: 15184.075636260884},
    target:{x: 11979.67870010836, y: 0, z: 10860.398765804988}
  },
  guanweihui:{//无内部
    position:{x: 7969.62641154124, y: 3399.1467161585538, z: 9583.093517111636},
    target:{x: 8194.780217777594, y: 0, z: 1280.2954376368739}
  },
  wuliuqiye:{
    position:{x: -3771.57677966697, y: 3472.5624968522243, z: 25499.65252037516},
    target:{x: -3721.834793653318, y: 0, z: 19067.57574426238}
  },
  zonghefuwulou:{
    position:{x: 2858.732343078326, y: 4561.789946341446, z: 21201.117386320308},
    target:{x: 2888.3197379596622, y: 0, z: 17375.2067088381}
  },
  Xiao_Shou_Gong_Si:{
    position:{x: -5309.102190849693, y: 4280.420809143024, z: 11239.135518697942},
    target:{x: -5316.331539890986, y: 0, z: 7541.822667685167}
  },
  GongYingBanGongShi:{
    position:{x: 19172.12744287263, y: 4066.3994675297135, z: 9243.519664808724},
    target:{x: 19199.289933790264, y: 0, z: 5731.170421302181}
  },
  JingXiaoBanGongShi:{
    position:{x: -10298.82204143777, y: 3488.332141950092, z: 5059.097839609528},
    target:{x: -10285.959692489916, y: 0, z: 606.7332641829053}
  }
}

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
]


const enterprisesNames = ['GongYingBanGongShi','JingXiaoBanGongShi', 'Xiao_Shou_Gong_Si', 'yinghang', 'zhengwuzhongxinbangongshi', 'zhizaojituanbangongshi', 'zonghefuwulou' , 'wuliubangongshi'] 
const enterprisesStates = {
  GongYingBanGongShi: { x: 19248.103132661443,  y: 10, z: 4954.823308964046,  },
  JingXiaoBanGongShi: { x: -10287.40256572037, y: 10, z: 233.8936394619204  },
  Xiao_Shou_Gong_Si: {x: -5372.648725912452, y: 10, z: 6895.494659472656},
  yinghang: {x: -1605.626010147031, y: 10, z: -2124.3371874043587},
  zhengwuzhongxinbangongshi: {x: 12172.6232505863, y: 10, z: 10489.113002582086},
  zhizaojituanbangongshi: {x: 1675.3892046318097, y: 10, z: 8728.292905219469},
  zonghefuwulou: {x: 2835.441504939446, y: 10, z: 16897.858815489963},
  wuliubangongshi:  {x: -3773.1485368738836, y: 10, z: 19631.761207797565}
};
const enterpriseIconNames = ['供应企业', '经销企业', '销售公司', '工商银行', '政务服务', '制造集团', '综合服务', '物流公司', '管委会']
const enterprisesIcons = [
  {
    name: '供应企业',
    position: {x: 19248.103132661443,  y: 10, z: 4954.823308964046,},
    inner: true
  },
  {
    name: '经销企业',
    position: { x: -10287.40256572037, y: 10, z: 233.8936394619204},
    inner: true
  },
  {
    name: '销售公司',
    position: {x: -5372.648725912452, y: 10, z: 6895.494659472656},
    inner: true
  },
  {
    name: '工商银行',
    position: {x: -1605.626010147031, y: 10, z: -2124.3371874043587},
    inner: true
  },
  {
    name: '政务服务',
    position: {x: 12172.6232505863, y: 10, z: 10489.113002582086},
    inner: true
  },
  {
    name: '制造集团',
    position: {x: 1675.3892046318097, y: 10, z: 8728.292905219469},
    inner: true
  },
  {
    name: '综合服务',
    position: {x: 2835.441504939446, y: 10, z: 16897.858815489963},
    inner: true
  },
  {
    name: '物流公司',
    position: {x: -3773.1485368738836, y: 10, z: 19631.761207797565},
    inner: true
  },
  {
    name: '管委会',
    position: {x: 8338.327547500401, y: 10, z: 3007.024347085281},
    inner: false
  },
]
const enterprisesInnerIcons = {
  zonghefuwulou:[ // 综合服务
    {
      name: '财务部',
      position: {x: 5169.5080784391475, y: 850, z: 15812.12472431732}
    },
    {
      name: '企业管理部',
      position: {x: 3919.565251248053, y: 850, z: 15817.646633978142}
    },
    {
      name: '会议室',
      position: {x: 2448.6124323592308, y: 850, z: 15862.929211528779}
    },
    {
      name: '业务部',
      position: {x: 4567.742180370165, y: 850, z: 17766.248766547214}
    },
    {
      name: '行政部',
      position: {x: 2484.5646837703143, y: 850, z: 17762.746822474088}
    }
  ],
  GongYingBanGongShi:[ // 供应企业
    {
      name: '业务部',
      position: {x: 18375.50779580549, y: 850, z: 3967.3926511880813}
    },
    {
      name: '会议室',
      position: {x: 17185.204441518366, y: 850, z: 6237.574032866109}
    },
    {
      name: '企业管理部',
      position: {x: 21341.40739748559, y: 850, z: 3500.153580788229}
    },
    {
      name: '财务部',
      position: {x: 21347.058190231615, y: 850, z: 4463.885834850727}
    },
    {
      name: '行政部',
      position: {x: 21330.072687504413, y: 850, z: 5316.165834380619}
    }
  ],
  JingXiaoBanGongShi:[ // 经销企业
    {
      name: '会议室',
      position: {x: -12094.468412614213, y: 650, z: -1397.9004618250003}
    },
    {
      name: '采购部',
      position: {x: -10621.677739611709, y: 650, z: -1415.8606783448477}
    },
    {
      name: '财务部',
      position: {x: -9450.419654442285, y: 650, z: -1398.044262846015}
    },
    {
      name: '企业管理部',
      position: {x: -8208.787918720287, y: 650, z: -1380.3654654700797}
    },
    {
      name: '营销部',
      position: {x: -11980.617255870626, y: 650, z: 270.7444486735394}
    },
    {
      name: '行政部',
      position: {x: -8481.039521511275, y: 650, z: 776.6251058202891}
    }
  ],
  wuliubangongshi: [ // 物流企业
    {
      name: '会议室',
      position: {x: -2063.7735464221532, y: 500, z: 18541.286079605074}
    },
    {
      name: '企业管理部',
      position: {x: -3665.732312774057, y: 500, z: 18071.250764634267}
    },
    {
      name: '财务部',
      position: {x: -3688.3006560450794, y: 500, z: 19130.28858724848}
    },
    {
      name: '会客室',
      position: {x: -3644.409126684405, y: 500, z: 20156.60177285536}
    },
    {
      name: '业务部',
      position: {x: -5279.762855219847, y: 500, z: 18693.135366419516}
    },
    {
      name: '行政部',
      position: {x: -5415.180605918095, y: 500, z: 20760.749251920042}
    }
  ],
  Xiao_Shou_Gong_Si: [//销售公司
    {
      name: '业务部',
      position: {x: -6697.8290513419215, y: 1000, z: 6256.49074400574}
    },
    {
      name: '行政部',
      position: {x: -5010.82077991694, y: 1000, z: 6236.846351613146}
    },
    {
      name: '企业管理部',
      position: {x: -3139.856069852616, y: 1000, z: 5713.811608332197}
    },
    {
      name: '财务部',
      position: {x: -3144.764221830271, y: 1000, z: 6548.306346194357}
    },
    {
      name: '会议室',
      position: {x: -3148.9772602869543, y: 1000, z: 7337.729156477428}
    }
  ], 
  zhizaojituanbangongshi: [ // 制造集团
    {
      name: '企业管理部',
      position: {x: 186.87588317351174, y: 550, z: 8806.624992775201}
    },
    {
      name: '人力资源部',
      position: {x: 983.3798891539435, y: 550, z: 9402.85209883289}
    },
    {
      name: '财务部',
      position: {x: 1748.3814025866116, y: 550, z: 9395.193685913731}
    },
    {
      name: '采购部',
      position: {x: 2566.989925203354, y: 550, z: 9416.378724330836}
    },
    {
      name: '营销部',
      position: {x: 985.1498023699143, y: 550, z: 8045.725951083245}
    },
    {
      name: '生产部',
      position: {x: 1747.6064922979315, y: 550, z: 8028.821021854147}
    },
    {
      name: '仓储部',
      position: {x: 2556.6825808168037, y: 550, z: 8041.546855593286}
    }
  ]
}

const isAnimating = false;

const RADIUS = 55000;
const CAMERA_BOUNDS = 48000;

export const STATE = {
  DEV_ENV,
  boundrayGeojson,
  boundrayAllGeojson,
  trafficGeojson,
  environmentJson,
  roadsjson,
  initialState,
  industrialState,
  trafficState,
  environmentState,
  educationState,
  energyState,
  earthState,
  earthState2,
  earthState3,
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
  enterpriseStates
};
