// const DEV_ENV = '/demos'
// const DEV_ENV = '../../new_example/seentao' // 116 服务器
const DEV_ENV = window.publicPath // 本地

const boundrayGeojson = DEV_ENV + '/assets/data/beijing/boundray.geojson'
const trafficGeojson = DEV_ENV + '/assets/data/beijing/traffic.geojson'
const educationGeojson = DEV_ENV + '/assets/data/beijing/education.geojson'

const initialState= {  
  position : {
    x: -2093.2950871470284,y: 30319.260717048488, z: 7358.705940927195
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
  initialState
}
