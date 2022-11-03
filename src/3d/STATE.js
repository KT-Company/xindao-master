// const DEV_ENV = '/demos'
// const DEV_ENV = '../../new_example/seentao' // 116 服务器
const DEV_ENV = '' // 本地


const boundrayGeojson = DEV_ENV + '/assets/data/beijing/boundray2.geojson'
const trafficGeojson = DEV_ENV + '/assets/data/beijing/traffic.geojson'
const educationGeojson = DEV_ENV + '/assets/data/beijing/education2.geojson'
const education2Geojson = DEV_ENV + '/assets/data/beijing/education3.geojson'
const roadsjson = DEV_ENV + '/assets/data/beijing/roads.json'
const roads2json = DEV_ENV + '/assets/data/beijing/roads2.json'

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

// 区域板块摄像头角度
const industrialState= {  
  position : {
    x: -50488.98966950788,y: 107695.50158959007,z: 37367.451804984354
  },
  target: {
    x:-2133.5462087425603, y:0, z: 2556.7757758174635
  }
}

// 交通出行摄像头角度
const trafficState= {  
  position : {
    x: -2568.2723446113346,y: 60293.18230198893, z: 8684.950233216767
  },
  target: {
    x:-2133.5462087425603, y:0, z: 2556.7757758174635
  }
}

// 环境人口摄像头角度
const popState= {  
  position : {
    x
    : 
    -71598.30375213051,
    y
    : 
    112110.02536534668,
    z
    : 
    91494.46762834994
  },
  target: {
    x:0, y:0, z:0
  }
}

// 教育医疗摄像头角度
const educationState= {  
  position : {
    x
    : 
    -71598.30375213051,
    y
    : 
    112110.02536534668,
    z
    : 
    91494.46762834994
  },
  target: {
    x:-2133.5462087425603, y:0, z: 2556.7757758174635
  }
}

export const STATE = {
  DEV_ENV,
  boundrayGeojson,
  trafficGeojson,
  educationGeojson,
  roadsjson,
  initialState,
  industrialState,
  trafficState,
  popState,
  educationState,
  earthState,
  education2Geojson,
  roads2json
}
