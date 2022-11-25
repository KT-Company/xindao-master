let Bol3D = window.Bol3D

// ICONS 
const iconsData = [
  {
    name: '海景区',
    position: new Bol3D.Vector3(-19425.43533103114, 0.1, -15968.667815998684)
  },
  {
    name: '崇武区',
    position: new Bol3D.Vector3(14999.590085793356, 0.1, -24570.312039456356)
  },
  {
    name: '延平区',
    position: new Bol3D.Vector3(30660.107029163068, 0.1, -932.139094563925)
  },
  {
    name: '丰阳区',
    position: new Bol3D.Vector3(-23998.7867404583, 0.1, 21093.928057913305)
  },
  {
    name: '兴通区',
    position: new Bol3D.Vector3(8384.14138935829, 0.1, 5726.746226325336)
  },
  {
    name: '平云区',
    position: new Bol3D.Vector3(30753.86698923057, 0.1, 25198.43153192119)
  }
]


// ICONS 产业经济
const industryBaseHeight = 5000
const industryData = [
  {
    name: '海景区',
    position: new Bol3D.Vector3(-19425.43533103114, 0.1, -15968.667815998684),
    data: {
      title1: '(国家级)高新技术产业',
      title2: '海景区',
      title3: '5000'
    }
  },
  {
    name: '崇武区',
    position: new Bol3D.Vector3(14999.590085793356, 0.1, -24570.312039456356),
    data: {
      title1: '(国家级)高新技术产业',
      title2: '崇武区',
      title3: '8000'
    }
  },
  {
    name: '延平区',
    position: new Bol3D.Vector3(30660.107029163068, 0.1, -932.139094563925),
    data: {
      title1: '(国家级)高新技术产业',
      title2: '延平区',
      title3: '7000'
    }
  },
  {
    name: '丰阳区',
    position: new Bol3D.Vector3(-23998.7867404583, 0.1, 21093.928057913305),
    data: {
      title1: '(国家级)高新技术产业',
      title2: '丰阳区',
      title3: '7000'
    }
  },
  {
    name: '兴通区',
    position: new Bol3D.Vector3(8384.14138935829, 0.1, 5726.746226325336),
    data: {
      title1: '(国家级)高新技术产业',
      title2: '兴通区',
      title3: '7500'
    }
  },
  {
    name: '平云区',
    position: new Bol3D.Vector3(30753.86698923057, 0.1, 25198.43153192119),
    data: {
      title1: '(国家级)高新技术产业',
      title2: '平云区',
      title3: '8000'
    }
  }
]

// ICONS 碳排量
const energyIconsData = [
  {
    name: '密云区',
    position: new Bol3D.Vector3(  
      12848.372467195517,
      1200,
      13938.311143936135)
  },
  {
    name: '怀柔区',
    position: new Bol3D.Vector3(
      3431.867360251428,
      1200,
      23833.72813333784)
  },
  {
    name: '延庆区',
    position: new Bol3D.Vector3(
      -8135.605699771289,
      1200,
      14391.18384746060)
  },
  {
    name: '昌平区',
    position: new Bol3D.Vector3(  
      -6407.488734279507,
      1200,
      2186.9107017085917)
  },
  {
    name: '顺义区',
    position: new Bol3D.Vector3( 
      6473.582049385015,
      1200,
      -883.6797181922157)
  },
  {
    name: '平谷区',
    position: new Bol3D.Vector3(
      18887.77678366274,
      1200,
      1924.3371234904262)
  },
  {
    name: '通州区',
    position: new Bol3D.Vector3(
      6718.5319369646095,
      1200,
      -13418.167316645362)
  },
  {
    name: '大兴区',
    position: new Bol3D.Vector3(
      -1812.1490219768189,
      1200,
      -19288.307865921794)
  },
  {
    name: '朝阳区',
    position: new Bol3D.Vector3(
      1140.186372136954,
      1200,
      -7933.079285673499)
  },
  {
    name: '海淀区',
    position: new Bol3D.Vector3( 
    -6569.698270463316,
    1200,
    -5386.778901662123)
  },
  {
    name: '西城区',
    position: new Bol3D.Vector3( 
    -3299.3093933187897,
    1200,
    -9689.452176135157)
  },
  {
    name: '东城区',
    position: new Bol3D.Vector3( 
    -1767.7001318039565,
    1200,
    -9632.235090199127)
  },
  {
    name: '丰台区',
    position: new Bol3D.Vector3( 
    -5127.501655224841,
    1200,
    -12318.44151552979)
  },
  {
    name: '石景山区',
    position: new Bol3D.Vector3( 
    -8652.979525673363,
    1200,
    -8767.787182897082)
  },
  {
    name: '门头沟区',
    position: new Bol3D.Vector3( 
    -18694.717682356066,
    1200,
    -5403.2891985246915)
  },
  {
    name: '房山区',
    position: new Bol3D.Vector3(
    -16520.5619108887,
    1200,
    -15272.089977460932)
  },
]


// ICONS earth
const earthIcons = [
  {
    name:'智能制造',
    lnglat: [114.06,22.54],//深圳
    active: true
  },
  {
    name:'现代服务',
    lnglat: [116.32,39.89],//北京
    active: false
  },
  {
    name:'行业名称',
    lnglat: [106.55,29.56],//重庆
    active: false
  },
  {
    name:'行业名称',
    lnglat: [104.07,30.57],//成都
    active: false
  },
  {
    name:'金融服务中心',
    lnglat: [121.47,31.23],//上海
    active: false
  },
  {
    name:'行业名称',
    lnglat: [114.30,30.59],//武汉
    active: false
  },
]

const educationPos = []

export const DATA = {
  iconsData,
  industryBaseHeight,
  industryData,
  energyIconsData,
  earthIcons,
  educationPos
}
