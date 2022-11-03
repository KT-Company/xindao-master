import { DATA } from './DATA.js'
import { CACHE } from './CACHE.js'
import { STATE } from './STATE.js'
import store from '../2d/store/index.js'

function loadIcons() {
  for (const data of DATA.iconsData) {
    const icon = new Bol3D.CompositeIconTag({
      titleHeight: 0.5,
      color: '#EBA216',
      type: 0,
      title: data.name
    })
    CACHE.container.scene.add(icon)
    console.log('icon.children===>',icon.children)
    icon.children[0].material.color = new Bol3D.Color('#EBA216')
    icon.children[0].material.transparent = true
    icon.children[0].material.opacity = .8
    icon.scale.set(3000, 3000, 3000)
    icon.renderOrder = 100
    icon.position.copy(data.position)
    icon.name = data.name
    CACHE.container.addBloom(icon.children[0])
    CACHE.container.addBloom(icon.children[1])
    CACHE.container.addBloom(icon.children[2])
    CACHE.container.addBloom(icon.children[3])

    icon.traverse(d => {
      if (d.isMesh || d.isSprite) {
        d.name = data.name
        CACHE.container.clickObjects.push(d)
      }
    })

    CACHE.icons.push(icon)
    // icon.visible = false
  }
}

function loadPlates() {
  for (const data of DATA.platesData) {
    const icon = new Bol3D.CompositeIconTag({
      titleHeight: 0.8,
      color: '#EBA216',
      type: 2,
      title: data.name
    })
    CACHE.container.scene.add(icon)
    icon.children[0].traverse((ci9) => {
      if (ci9.isMesh) {
        CACHE.container.addBloom(ci9)
      }
    })
    CACHE.container.addBloom(icon.children[1].children[1])
    CACHE.container.scene.add(icon)
    icon.scale.set(2000, 2000, 2000)
    icon.renderOrder = 100
    icon.position.copy(data.position)
    icon.name = data.name
    icon.visible = false

    CACHE.plates.push(icon)
  }
}


// 循环动画
function animate(){
  let delta = new Bol3D.Clock().getDelta()
  CACHE.earth.forEach(e=>{
    e.rotation.y -= 0.010
  })
  // lines.forEach((l) => {
  //   l.material.dashOffset -= (1 * l.totalDistance) / 100
  //   l.material.dashOffset %= l.totalDistance
  // })
  requestAnimationFrame(animate)
} 

function hideIcons(){ // 进入区域层
  store.commit('jumpPage','/Area')
  CACHE.icons.forEach( ic => {
    ic.visible = false
  })
}

function _hideIcons(){
  CACHE.icons.forEach( ic => {
    ic.visible = false
  })
}

function showIcons(){
  CACHE.icons.forEach( ic => {
    ic.visible = true
  })
}

function hidePlates(){
  CACHE.plates.forEach( plt => {
    plt.visible = false
  })
}

function showPlates(){
  CACHE.plates.forEach( plt => {
    plt.visible = true
  })
}

// 相机动画（传指定state）
function cameraAnimation({ cameraState, callback, delayTime = 0, duration = 800 }) {

  CACHE.container.orbitControls.enabled = false

  let count = 0

  const t1 = new Bol3D.TWEEN.Tween(CACHE.container.orbitControls.object.position)
    .to(
      {
        x: cameraState.position.x,
        y: cameraState.position.y,
        z: cameraState.position.z
      },
      duration
    )
    .onUpdate(() => {
    })
    .onComplete(() => {
      count++

      if (count == 2) CACHE.container.orbitControls.enabled = true

      callback && callback()
    })

  t1.delay(delayTime).start()

  const t2 = new Bol3D.TWEEN.Tween(CACHE.container.orbitControls.target)
    .to(
      {
        x: cameraState.target.x,
        y: cameraState.target.y,
        z: cameraState.target.z
      },
      duration
    )
    .onUpdate(() => {
    })
    .onComplete(() => {
      count++
      if (count == 2) CACHE.container.orbitControls.enabled = true

      callback && callback()
    })

  t1.delay(delayTime).start()
  t2.delay(delayTime).start()

  return t1
}


/**
 * 产业经济->区域板块
 */
function loadIndustrialEconomy() {
  fetch(STATE.boundrayGeojson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      const boundrays = result.features

      for (const feature of boundrays) {
        const coordinates = feature.geometry.coordinates[0][0]

        const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
          points: coordinates,
          color: '#0E368E',
          gradient: Math.random() * 555555,
          height: 1200,
          center: [120.76, 30.75],
          extrude: true
        })

        extrudeShape.position.set(0, Math.random() * 1000 + 1000, 0)

        extrudeShape.scale.set(1.3, 2.4, 1.8)
        extrudeShape.visible = false
        CACHE.container.scene.add(extrudeShape)

        CACHE.industries.push(extrudeShape)
        extrudeShape.visible = false
      }

      for (const data of DATA.areaIconsData) {
        const icon = new Bol3D.CompositeIconTitle({
          titleHeight: 0.5,
          color: Math.random() * 555555,
          type: 2,
          title: data.name
        })
        
        CACHE.container.scene.add(icon)
        icon.scale.set(12000, 12000, 12000)
        icon.renderOrder = 100
        icon.position.copy(data.position)
        icon.name = data.name
        icon.children[0].visible = false
        CACHE.container.addBloom(icon.children[0])
    
        icon.traverse(d => {
          if (d.isMesh || d.isSprite) {
            d.name = data.name
            CACHE.container.clickObjects.push(d)
          }
        })
    
        CACHE.areaIcons.push(icon)
        icon.visible = false
      }

    })
}


/**
 * 能源
 */
function loadEnergy() {
  fetch(STATE.boundrayGeojson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      const boundrays = result.features
      const colors = ['#03a9f4','#c61818','#2196f3','#00bcd4','#f44336','#4caf50','#3f51b5']

      for (let i = 0; i < boundrays.length; i++) {
        const coordinates = boundrays[i].geometry.coordinates[0][0];
        const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
          points: coordinates,
          color: colors[i],
          // gradient: Math.random() * 555555,
          height: 400 + Math.random() * 20,
          center: [120.76, 30.75],
          opacity: .1
        })

        extrudeShape.position.set(0, 1000, 0)
        extrudeShape.scale.set(1.3, 2.4, 1.8)
        extrudeShape.visible = false
        CACHE.energy.push(extrudeShape)

        CACHE.container.scene.add(extrudeShape)
        CACHE.container.addBloom(extrudeShape.children[0])
        extrudeShape.visible = false
        
      }
    })

    for (const data of DATA.tpIconsData) {
      const icon = new Bol3D.CompositeIconTitle({
        titleHeight: 0.5,
        color: Math.random() * 555555,
        type: 2,
        title: data.name
      })
      CACHE.container.scene.add(icon)
      icon.scale.set(12000, 12000, 12000)
      icon.renderOrder = 100
      icon.position.copy(data.position)
      icon.name = data.name
      icon.children[0].visible = false
      // icon.children[1].visible = false
      // icon.children[2].visible = false
      // icon.children[3].visible = false
      // CACHE.container.addBloom(icon.children[0])
  
      icon.traverse(d => {
        if (d.isMesh || d.isSprite) {
          d.name = data.name
          CACHE.container.clickObjects.push(d)
        }
      })
  
      CACHE.tpIcons.push(icon)
      icon.visible = false
    }
}


/**
 * 环境人口
 */
function loadHeatMap() {
  // 改成柱状图
  fetch(STATE.educationGeojson)
  .then((value) => {
    return value.json()
  })
  .then((result) => {

    const educations = result.poi
    educations.forEach((d)=>{

      let { options, position, renderOrder } = d
  
      console.log(options)
      options = Object.assign(options, {
        threshold: -1500
      })
  
      const baseCube = new Bol3D.Primitives.BaseCube(options)
  
      CACHE.container.scene.add(baseCube)
      baseCube.position.set(position.x, position.y, position.z)
      baseCube.renderOrder = renderOrder
      baseCube.visible = false
      CACHE.container.addBloom(baseCube)
  
      CACHE.environment.push(baseCube)
    })
  })
}

/**
 * 环境人口->柱状图动画
 */
 function animateEnvironment() {
  requestAnimationFrame(animateEnvironment)
  CACHE.environment.forEach((l) => {
    if(l.position.y <= (l.opts.height / 2 + 1200)) l.position.y += 50
  })
}


/**
 * 路网
 */
function loadTraffic() {
  loadByJson()

  const animate = () => {
    requestAnimationFrame(animate)
    CACHE.lines.forEach((l) => {
      l.material.dashOffset -= (1 * l.totalDistance) / (Math.random() * 5000)
      l.material.dashOffset %= l.totalDistance
    })
  }

  animate()
}


/**
 * 交通
 */
 function loadTraffic2() {
  loadByJson2()

  const animate = () => {
    requestAnimationFrame(animate)
    CACHE.lines2.forEach((l) => {
      l.material.dashOffset -= (1 * l.totalDistance) / (Math.random() * 5000)
      l.material.dashOffset %= l.totalDistance
    })
  }

  animate()
}



/**
 * 教育医疗
 */
function loadEducation() {
  fetch(STATE.educationGeojson)
  .then((value) => {
    return value.json()
  })
  .then((result) => {

    console.log(result, 'result')

    const educations = result.poi
    educations.forEach(d=>{
      const { options,position,renderOrder } = d
      options.height = 1200 + Math.random() * 20000

      const baseCube = new Bol3D.Primitives.BaseCube(options)
      CACHE.container.scene.add(baseCube)
      baseCube.position.set(position.x,0,position.z)
      baseCube.renderOrder = renderOrder
      baseCube.visible = false
      // CACHE.container.addBloom(baseCube)

      CACHE.education.push(baseCube)
    })
  })

  fetch(STATE.education2Geojson)
  .then((value) => {
    return value.json()
  })
  .then((result) => {

    const educations = result.poi
    educations.forEach(d=>{
      const { options,position,renderOrder } = d
      options.height = 1200 + Math.random() * 10000


      const baseCube = new Bol3D.Primitives.BaseCube(options)
      CACHE.container.scene.add(baseCube)
      baseCube.position.set(position.x,0,position.z)
      baseCube.renderOrder = renderOrder
      baseCube.visible = false
      // CACHE.container.addBloom(baseCube)

      CACHE.education.push(baseCube)
    })
  })
}


/**
 * 教育医疗->柱状图动画
 */
function animateEducation() {
  requestAnimationFrame(animateEducation)
  CACHE.education.forEach((l) => {
    if(l.position.y <= (l.opts.height / 2 + 1200)) l.position.y += 50
  })
}



// 道路
function loadByJson(data) {

  fetch(STATE.roadsjson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      result.road.forEach((d) => {
        const le = new Bol3D.Primitives.BaseLine({
          lineWidth: 2,
          color: '#0c2351',
          // dashOffset: 1,
          // dashSize: 1,
          // gapSize: 1,
          // gapOffset: 1
        })
        le.setPositions(d)
        CACHE.container.scene.add(le)
        CACHE.container.addBloom(le)
        CACHE.lines.push(le)
        CACHE.linePoints.push(d)
        // le.visible = false
      })
    })

    fetch(STATE.roadsjson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      result.road.forEach((d) => {
        const le = new Bol3D.Primitives.BaseLine({
          lineWidth: 2,
          color: '#ff9800',
          dashOffset: 10,
          dashSize: 1,
          gapSize: 1,
          gapOffset: 1,
          attenuation: 0
        })
        le.material.uniforms.opacity.value = .5
        le.position.set(0,3,0)
        le.setPositions(d)
        CACHE.container.scene.add(le)
        CACHE.container.addBloom(le)
        CACHE.lines.push(le)
        CACHE.linePoints.push(d)
        // le.visible = false
      })
    })
}

// 交通道路
function loadByJson2(data) {

  fetch(STATE.roads2json)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      result.road.forEach((d) => {
        const le = new Bol3D.Primitives.BaseLine({
          lineWidth: 2,
          color: '#0c2351',
          // dashOffset: 1,
          // dashSize: 1,
          // gapSize: 1,
          // gapOffset: 1
        })
        le.setPositions(d)
        CACHE.container.scene.add(le)
        CACHE.container.addBloom(le)
        CACHE.lines2.push(le)
        CACHE.linePoints.push(d)
        le.visible = false
      })
    })

    fetch(STATE.roads2json)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      result.road.forEach((d) => {
        const le = new Bol3D.Primitives.BaseLine({
          lineWidth: 4,
          color: '#f44336',
          dashOffset: 10,
          dashSize: 1,
          gapSize: 1,
          gapOffset: 1,
          attenuation: 0
        })
        le.material.uniforms.opacity.value = .5
        le.position.set(0,3,0)
        le.setPositions(d)
        CACHE.container.scene.add(le)
        CACHE.container.addBloom(le)
        CACHE.lines2.push(le)
        CACHE.linePoints.push(d)
        le.visible = false
      })
    })
}


function hideAll() {
  hideIndustrialEconomy()
  hideEducations()
  hideEnergy()
  hideEnvironments()
  // hideTraffics()
  hideAreaIcons()
}

// function hide


function showTpIcons(){
  CACHE.tpIcons.forEach(e=>{
    e.visible = true
  })
}

function hideTpIcons(){
  CACHE.tpIcons.forEach(e=>{
    e.visible = false
  })
}

function showAreaIcons(){
  CACHE.areaIcons.forEach(e=>{
    e.visible = true
  })
}

function hideAreaIcons(){
  CACHE.areaIcons.forEach(e=>{
    e.visible = false
  })
}

function showIndustrialEconomy() {
  CACHE.industries.forEach(idstry => {
    idstry.visible = true
  })
}

function hideIndustrialEconomy() {
  CACHE.industries.forEach(idstry => {
    idstry.visible = false
  })
}

function showTraffics() {
  CACHE.lines.forEach(traf => {
    traf.visible = true
  })
}

function hideTraffics() {
  CACHE.lines.forEach(traf => {
    traf.visible = false
  })
}

function showTraffics2() {
  CACHE.lines2.forEach(traf => {
    traf.visible = true
  })
}

function hideTraffics2() {
  CACHE.lines2.forEach(traf => {
    traf.visible = false
  })
}

function showEnvironments() {
  CACHE.environment.forEach(env => {
    env.visible = true
  })
}

function hideEnvironments() {
  CACHE.environment.forEach(env => {
    env.visible = false
  })
}

function showEducations() {
  CACHE.education.forEach(edu => {
    edu.visible = true
  })
}

function hideEducations() {
  CACHE.education.forEach(edu => {
    edu.visible = false
  })
}

function showEnergy() {
  CACHE.energy.forEach(engy => {
    engy.visible = true
  })
}

function hideEnergy() {
  CACHE.energy.forEach(engy => {
    engy.visible = false
  })
}

function showModels(){
  CACHE.models.forEach(model=>{
    model.visible = true
  })
}

function hideModels(){
  CACHE.models.forEach(model=>{
    model.visible = false
  })
}

export const API = {
  loadIcons,
  loadPlates,
  loadIndustrialEconomy,
  loadEnergy,
  loadHeatMap,
  loadTraffic,
  loadTraffic2,
  loadEducation,
  hideAll,
  showIndustrialEconomy,
  hideIndustrialEconomy,
  showTraffics,
  hideTraffics,
  showTraffics2,
  hideTraffics2,
  showEnvironments,
  hideEnvironments,
  showEducations,
  hideEducations,
  showEnergy,
  hideEnergy,
  cameraAnimation,
  showPlates,
  hidePlates,
  showIcons,
  hideIcons,
  _hideIcons,
  showAreaIcons,
  hideAreaIcons,
  showTpIcons,
  hideTpIcons,
  animate,
  loadByJson,
  animateEducation,
  animateEnvironment,
  showModels,
  hideModels
}
