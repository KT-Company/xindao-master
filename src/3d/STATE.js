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
    position:{x: -1980.6804179278756, y: 2006.3986366823592, z: 60.072912468945106},
    target:{x: -1940.514363262612, y: 0, z: -2245.163672769586}
  },
  zhengwuzhongxin:{
    position:{x: 11757.536843246038, y: 4087.1587632330857, z: 15184.075636260884},
    target:{x: 11979.67870010836, y: 0, z: 10860.398765804988}
  },
  guanweihui:{//无内部
    position:{x: 7969.62641154124, y: 3399.1467161585538, z: 9583.093517111636},
    target:{x: 8194.780217777594, y: 0, z: 1280.2954376368739}
  },
  wuliuqiye:{//无内部
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


const enterprisesNames = ['GongYingBanGongShi','JingXiaoBanGongShi', 'Xiao_Shou_Gong_Si', 'yinghang', 'zhengwuzhongxinbangongshi', 'zhizaojituanbangongshi', 'zonghefuwulou']
const enterprisesStates = {
  GongYingBanGongShi: { x: 19248.103132661443,  y: 10, z: 4954.823308964046,  },
  JingXiaoBanGongShi: { x: -10287.40256572037, y: 10, z: 233.8936394619204  },
  Xiao_Shou_Gong_Si: {x: -5372.648725912452, y: 10, z: 6895.494659472656},
  yinghang: {x: -1605.626010147031, y: 10, z: -2124.3371874043587},
  zhengwuzhongxinbangongshi: {x: 12172.6232505863, y: 10, z: 10489.113002582086},
  zhizaojituanbangongshi: {x: 1675.3892046318097, y: 10, z: 8728.292905219469},
  zonghefuwulou: {x: 2835.441504939446, y: 10, z: 16897.858815489963}
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
    inner: false
  },
  {
    name: '管委会',
    position: {x: 8338.327547500401, y: 10, z: 3007.024347085281},
    inner: false
  },
]


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
  chinajson,
  isAnimating,
  RADIUS,
  CAMERA_BOUNDS,
  enterprisesStates,
  enterprisesNames,
  enterprisesIcons,
  enterpriseIconNames,
  areaState,
  enterpriseStates
};
