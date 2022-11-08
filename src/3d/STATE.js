// const DEV_ENV = '/demos'
// const DEV_ENV = '../../new_example/seentao' // 116 服务器
const DEV_ENV = window.publicPath // 本地

const boundrayGeojson = DEV_ENV + '/assets/data/beijing/boundray.json'
const boundrayAllGeojson = DEV_ENV + '/assets/data/beijing/boundrayAll.json'
const trafficGeojson = DEV_ENV + '/assets/data/beijing/traffic.geojson'
const environmentJson = DEV_ENV + '/assets/data/beijing/environment.json'
const educationGeojson = DEV_ENV + '/assets/data/beijing/education.json'
const roadsjson = DEV_ENV + '/assets/data/beijing/roads.json'
const chinajson = DEV_ENV + '/assets/data/china.json'

// 摄像头球角度
const earthState = {
  position: { x: 10478.659614781236, y: 37803.028468717326, z: 120977.37665805497 },
  target: { x: 1406.9879364323017, y: 0, z: 2940.559695509824},
}

const earthState2 = {
  position: { x: 6038.900868824114, y: 22634.069559301177, z: 58460.17261231369 },
  target: { x: 607.3559339702609, y: -2.02729963303239e-15, z: -12212.829892818681}
}

const earthState3 = {
  position: {x: -9938.288809320029, y: 42407.784669488225, z: 18089.857058505946},
  target: {x: -9821.88437918559, y: 0, z: 3037.7392860806394}
}


// 摄像头垂直角度
const initialState = {
  position: {
    x: 7434.028334554503, y: 2834.2073350206824, z: 26447.912258023345
  },
  target: {
    x: -2133.5462087425603, y: 0, z: 2556.7757758174635
  }
}

// 经济板块摄像头角度
const industrialState = {
  position: {
    x: -10193.24420049027, y: 817.4223284548395, z: 5798.987933882156
  },
  target: {
    x: -9821.88437918559, y: 0, z: 3037.7392860806385
  }
}

// 交通出行摄像头角度
const trafficState = {
  position: {
    x: -10193.24420049027, y: 817.4223284548395, z: 5798.987933882156
  },
  target: {
    x: -9821.88437918559, y: 0, z: 3037.7392860806385
  }
}

// 环境人口摄像头角度
const environmentState = {
  position: {
    x: -10193.24420049027, y: 817.4223284548395, z: 5798.987933882156
  },
  target: {
    x: -9821.88437918559, y: 0, z: 3037.7392860806385
  }
}

// 教育医疗摄像头角度
const educationState = {
  position: {
    x: -10193.24420049027, y: 817.4223284548395, z: 5798.987933882156
  },
  target: {
    x: -9821.88437918559, y: 0, z: 3037.7392860806385
  }
}

// 能源角度
const energyState = {
  position: {
    x: -10193.24420049027, y: 817.4223284548395, z: 5798.987933882156
  },
  target: {
    x: -9821.88437918559, y: 0, z: 3037.7392860806385
  }
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


const platesNames = ['物流服务', '供应企业', '综合服务', '智能制造', '数字金融', '数字政务']
const platesViewStates = {
  '物流服务': {
    position: { x: -15566.12461256521, y: 3224.4901005912693, z: -5609.777556038479 },
    target: { x: -12296.100162922101, y: -1.421407369603958e-13, z: -10807.081934238533 }
  },
  '供应企业': {
    position: { x: -2449.687925865157, y: 3571.374701822279, z: -4514.272723102796 },
    target: { x: 1172.7753634275005, y: -2.6711002621599213e-13, z: -10274.492473598973 }
  },
  '综合服务': {
    position: { x: 9262.83891526821, y: 3392.805966731159, z: -8829.506157450362 },
    target: { x: 12704.179672912924, y: -1.9441795668056147e-13, z: -14301.715808119558 }
  },
  '智能制造': {
    position: { x: 16277.75987497227, y: 3223.1656683946057, z: 3491.111003173791 },
    target: { x: 19547.03308405005, y: -1.6859661103236783e-13, z: -1707.4873528899773 }
  },
  '数字金融': {
    position: { x: 1051.7426027543443, y: 1957.4118152847207, z: 8836.186242412718 },
    target: { x: 4352.6983291339175, y: -1.8421332212063645e-13, z: 4293.952020107741 }
  },
  '数字政务': {
    position: { x: -14697.107982541967, y: 2413.170516420395, z: 6011.062871803393 },
    target: { x: -10996.375264924223, y: -2.551555266517058e-13, z: 1577.0053968580273 }
  },


}

const isAnimating = false

const RADIUS = 55000
const CAMERA_BOUNDS = 48000

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
  platesViewStates,
  platesNames,
  chinajson,
  isAnimating,
  RADIUS,
  CAMERA_BOUNDS
}
