// const DEV_ENV = '/demos'
// const DEV_ENV = '../../new_example/seentao' // 116 服务器
const DEV_ENV = window.publicPath // 本地

const boundrayGeojson = DEV_ENV + '/assets/data/beijing/boundray.json'
const boundrayAllGeojson = DEV_ENV + '/assets/data/beijing/boundrayAll.json'
const trafficGeojson = DEV_ENV + '/assets/data/beijing/traffic.geojson'
const environmentJson = DEV_ENV + '/assets/data/beijing/environment.json'
const educationGeojson = DEV_ENV + '/assets/data/beijing/education.json'
const roadsjson = DEV_ENV + '/assets/data/beijing/roads.json'

// 摄像头球角度
const earthState= {
  position : {
    x: -27857.849778896947,y: 7637.833596412168, z: 36605.38107417314
  },
  target: {
    x:-2133.5462087425603, y:0, z: 2556.7757758174635
  }
}

// 摄像头垂直角度
const initialState= {  
  position : {
    x: 7434.028334554503,y: 2834.2073350206824,z: 26447.912258023345
  },
  target: {
    x:-2133.5462087425603, y:0, z: 2556.7757758174635
  }
}

// 经济板块摄像头角度
const industrialState= {  
  position : {
    x: -32620.07229161867, y: 14459.87937798484, z: 18463.94671122655
  },
  target: {
    x: -8796.49330276977, y: 0, z: 2029.5766360239907
  }
}

// 交通出行摄像头角度
const trafficState= {  
  position : {
    x: 2491.273150899704, y: 18353.165139550812, z: 28038.327534706743
  },
  target: {
    x: 1406.9879364323017, y: 2.343238524457646e-15, z: 2940.559695509824
  }
}

// 环境人口摄像头角度
const environmentState= {  
  position : {
    x: -35037.09840305019, y: 22603.762256423837, z: 25777.15310703317
  },
  target: {
    x: -1403.4733132457723, y: 0, z: -1354.3423867073304
  }
}

// 教育医疗摄像头角度
const educationState= {  
  position : {
    x: -40222.45999417895, y: 20019.063693659304, z: 18380.785112631125
   },
  target: {
    x: -4078.9956742074155, y: 0, z: -2578.0964227278805
  }
}

const energyState = {
  position: {x: -27404.08767057564, y: 23179.753248076613, z: 20425.030830960764},
  target: {x: -10206.002395898979, y: 4.860745917103297e-13, z: 5807.765372752004}
}

const modelThreshold = {
  gongying: -85,
  shuzijinrong: -125,
  wuliu: -125,
  zhengwu: -109,
  zhinengzhizao: -107,
  zonghefuwu: -58
}

const modelExclude = ['gongying', 'shuzijinrong', 'wuliu', 'zhengwu', 'zhinengzhizao', 'zonghefuwu']


const platesNames = ['物流服务' , '供应企业', '综合服务', '智能制造', '数字金融', '数字政务']
const platesViewStates =  {
  '物流服务': {
    position: {x: -15566.12461256521, y: 3224.4901005912693, z: -5609.777556038479},
    target:{x: -12296.100162922101, y: -1.421407369603958e-13, z: -10807.081934238533}
  },
  '供应企业': {
    position: {x: -2449.687925865157, y: 3571.374701822279, z: -4514.272723102796},
    target:{x: 1172.7753634275005, y: -2.6711002621599213e-13, z: -10274.492473598973}
  },
  '综合服务': {
    position: {x: 9262.83891526821, y: 3392.805966731159, z: -8829.506157450362},
    target:{x: 12704.179672912924, y: -1.9441795668056147e-13, z: -14301.715808119558}
  },
  '智能制造': {
    position: {x: 16277.75987497227, y: 3223.1656683946057, z: 3491.111003173791},
    target:{x: 19547.03308405005, y: -1.6859661103236783e-13, z: -1707.4873528899773}
  },
  '数字金融': {
    position: {x: 1051.7426027543443, y: 1957.4118152847207, z: 8836.186242412718},
    target:{x: 4352.6983291339175, y: -1.8421332212063645e-13, z: 4293.952020107741}
  },
  '数字政务': {
    position: {x: -14697.107982541967, y: 2413.170516420395, z: 6011.062871803393},
    target:{x: -10996.375264924223, y: -2.551555266517058e-13, z: 1577.0053968580273}
  },


}


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
  educationGeojson,
  modelThreshold,
  modelExclude,
  platesViewStates,
  platesNames
}
