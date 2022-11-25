let Bol3D = window.Bol3D
let container = null;

const industries = [];
const traffics = [];
const environment = [];
let environmentAnimateIndex = -1;
const completeBoundrays = {};
let educationAnimateIndex = -1;
const education = [];
const energy = [];
const icons = [];
const earth = [];
const lines = [];
const linesBottom = [];
const models = [];
const energyIcons = [];
let floor = null;
let floorMirror = null;
const earthGroup = new Bol3D.Group();
const earthLines = [];
const earthLinesBottom = [];
const earthIcons = [];
const earthTitles = [];
const earthVics = [];
const earthCircles = [];
let earthAnimationIndex = -1;
const cities = [];   // 白模1
const cities2 = [];  // 白模2： 带企业
const innerEnterprises = [] // 企业内部
const enterpriseIcons = [] // 企业标签
const seperateModels = [] // 单体化模型
const educationModels = [] // 单体化模型： 教育/医疗
let heatmap = null // 能源： 热力图
const enterpriseIconsInner = {
  zonghefuwulou: [],
  GongYingBanGongShi: [],
  JingXiaoBanGongShi: [],
  wuliubangongshi: [],
  Xiao_Shou_Gong_Si: [],
  zhizaojituanbangongshi: []
}

export const CACHE = {
  container,
  industries,
  traffics,
  environment,
  environmentAnimateIndex,
  education,
  educationAnimateIndex,
  energy,
  enterpriseIcons,
  icons,
  earth,
  lines,
  models,
  energyIcons,
  linesBottom,
  completeBoundrays,
  floor,
  floorMirror,
  earthGroup,
  earthLinesBottom,
  earthLines,
  earthAnimationIndex,
  earthIcons,
  cities,
  cities2,
  innerEnterprises,
  earthTitles,
  earthVics,
  earthCircles,
  seperateModels,
  educationModels,
  heatmap,
  enterpriseIconsInner
};
