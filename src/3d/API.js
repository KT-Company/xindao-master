import { DATA } from './DATA.js'
import { CACHE } from './CACHE.js'
import { STATE } from './STATE.js'

function loadIcons() {
  for (const data of DATA.iconsData) {
    const icon = new Bol3D.CompositeIconTag({
      titleHeight: 0.5,
      color: '#EBA216',
      type: 0,
      title: data.name
    })
    CACHE.container.scene.add(icon)
    icon.children[0].material.color = new Bol3D.Color('#EBA216')
    icon.children[0].material.transparent = true
    icon.children[0].material.opacity = .8
    icon.scale.set(4000, 4000, 4000)
    icon.renderOrder = 100
    icon.position.copy(data.position)
    icon.name = data.name

    icon.children[0].traverse( child  => {
      if(child.isMesh)CACHE.container.addBloom(child)
    })
    icon.children[1].traverse( child  => {
      if(child.isMesh)CACHE.container.addBloom(child)
    })
    icon.children[2].traverse( child  => {
      if(child.isMesh) child.material.transparent = false
    })
    
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

    icon.traverse(d => {
      if (d.isMesh|| d.isSprite) {
        d.name = data.name
        CACHE.container.clickObjects.push(d)
      }
    })
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

      let index = 0

      for (const feature of boundrays) {
        const coordinates = feature.geometry.coordinates[0][0]

        const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
          points: coordinates,
          color: '#671c91' ,
          gradient: '#003a64' ,
          height: index * 100 +  200,
          center: [116.41,39.90],
          extrude: true,
          vertical: 83000
        })

        extrudeShape.position.set(-2000, index * 50 + 1000, -10000)

        extrudeShape.scale.set(.25, 1, .25)
        extrudeShape.visible = false
        CACHE.container.scene.add(extrudeShape)

        extrudeShape.name = feature.properties.name

        CACHE.industries.push(extrudeShape)
        extrudeShape.visible = false

        // CACHE.container.clickObjects.push(extrudeShape)

        index++
      }


      for (const data of DATA.areaIconsData) {
        const icon = new Bol3D.CompositeIconTitle({
          titleHeight: 0.5,
          color: '#00ffff',
          type: 2,
          title: data.name,
          bgColor: '#000000',
          strokeColor: '#000000',
          fontColor: '#ffffff'
        })
        CACHE.container.scene.add(icon)
        icon.scale.set(2000, 2000, 2000)
        icon.renderOrder = 100
        icon.position.copy(data.position)
        icon.position.y += 10
        icon.name = data.name
        CACHE.container.addBloom(icon.children[0])
    
        // icon.traverse(d => {
        //   if (d.isMesh || d.isSprite) {
        //     d.name = data.name
        //     CACHE.container.clickObjects.push(d)
        //   }
        // })
    
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
      const colors = ['#03a9f4','#c61818','#2196f3','#00bcd4','#f44336','#4caf50','#3f51b5','#03a9f4','#c61818','#2196f3','#00bcd4','#f44336','#4caf50','#3f51b5','#03a9f4','#c61818','#2196f3','#00bcd4','#f44336','#4caf50','#3f51b5']

      for (let i = 0; i < boundrays.length; i++) {
        const coordinates = boundrays[i].geometry.coordinates[0][0];
        const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
          points: coordinates,
          color: colors[i],
          // gradient: Math.random() * 555555,
          height: 400 + Math.random() * 20,
          center: [116.41,39.90],
          opacity: .1
        })

        extrudeShape.position.set(-2000, 1000, -10000)
        extrudeShape.scale.set(.25, 1, .25)
        extrudeShape.visible = false
        CACHE.energy.push(extrudeShape)

        CACHE.container.scene.add(extrudeShape)
        CACHE.container.addBloom(extrudeShape.children[0])
        extrudeShape.visible = false
        
      }
    })

    for (const data of DATA.energyIconsData) {
      const tag = new Bol3D.CompositeIconTag({
        titleHeight: 0.8,
        color: '#00A2FF',
        type: 10,
        title: data.name,
        particleSize: 300,
        particleNumber: 100
      })
      CACHE.container.scene.add(tag)
      tag.children[0].traverse((ci11) => {
        if (ci11.isMesh) CACHE.container.addBloom(ci11)
      })
      tag.children[1].traverse((ci11) => {
        if (ci11.isMesh) CACHE.container.addBloom(ci11)
      })
      tag.children[2].traverse((ci11) => {
        if (ci11.isMesh) CACHE.container.addBloom(ci11)
      })
      CACHE.container.addBloom(tag.children[4])
      tag.renderOrder = 100
      tag.position.copy(data.position)
      tag.position.y += 10
      tag.scale.set(3000, 3000, 3000)
  
      CACHE.energyIcons.push(tag)
      tag.visible = false
    }
}

/**
 * 加载环境/教育板块
 */
function loadCompeleteBoundrays(){
  fetch(STATE.boundrayAllGeojson)
  .then((value) => {
    return value.json()
  })
  .then((result) => {
    const boundrays = result.features

    for (const feature of boundrays) {
      const coordinates = feature.geometry.coordinates[0][0]

      const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
        points: coordinates,
        color: '#181e72' ,
        gradient: '#437478' ,
        height:   200,
        center: [116.41,39.90],
        extrude: true,
        vertical: 113000
      })

      extrudeShape.position.set(-2000,  1000, -10000)
      extrudeShape.scale.set(.25, 1, .25)
      extrudeShape.visible = false
      CACHE.completeBoundrays.environment = extrudeShape
      CACHE.container.scene.add(extrudeShape)
      extrudeShape.name = 'environment'


      const extrudeShape2 = new Bol3D.Primitives.BaseExtrudeShape({
        points: coordinates,
        color: '#7c1e31' ,
        gradient: '#5e79ad' ,
        height:   200,
        center: [116.41,39.90],
        extrude: true,
        vertical: 92000
      })

      extrudeShape2.position.set(-2000,  1000, -10000)
      extrudeShape2.scale.set(.25, 1, .25)
      extrudeShape2.visible = false
      CACHE.completeBoundrays.education = extrudeShape2
      CACHE.container.scene.add(extrudeShape2)
      extrudeShape2.name = 'education'

      // CACHE.container.clickObjects.push(extrudeShape2)
    }
  })
}

/**
 * 环境人口
 */
function loadHeatMap() {
  // 改成柱状图
  fetch(STATE.environmentJson)
  .then((value) => {
    return value.json()
  })
  .then((result) => {

    const environment = result

    environment.forEach((d)=>{

      let { options, position, renderOrder } = d
  
      // console.log(options)
      options = Object.assign(options, {
        threshold: -900,
        color: '#000000',
        mixColor: '#005f93',
        mixColor2: '#151548'
      })
  
      const baseCube = new Bol3D.Primitives.BaseCube(options)
  
      CACHE.container.scene.add(baseCube)
      baseCube.position.set(position.x, position.y, position.z)
      baseCube.renderOrder = renderOrder
      baseCube.visible = false
      baseCube.userData.speed = Math.random() * .05 + .015
      CACHE.container.addBloom(baseCube)
  
      CACHE.environment.push(baseCube)
    })
  })
}

/**
 * 环境人口->柱状图动画
 */
 function animateEnvironment() {
  CACHE.environmentAnimateIndex = requestAnimationFrame(animateEnvironment)

  const length = CACHE.environment
  let count = 0

  for(let l of CACHE.environment){
    if(l.scale.y == 1) continue

    if(l.scale.y < 1) {
      l.scale.y += l.userData.speed
    }else{
      l.scale.y = 1
      count++
    }
  }

  if(length == count) cancelAnimationFrame(CACHE.environmentAnimateIndex)

}


/**
 * 路网
 */
function loadTraffic() {
  loadByJson()

  const animate = () => {
    requestAnimationFrame(animate)
    CACHE.lines.forEach((l) => {
      l.material.dashOffset -= (l.userData.speed * l.totalDistance) / 100
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

    const education = result

    education.forEach((d)=>{

      let { options, position, renderOrder } = d
  
      // console.log(options)
      options = Object.assign(options, {
        threshold: -800,
        color: '#720000',
        mixColor: '#78591a',
        mixColor2: '#090037'
      })
  
      const baseCube = new Bol3D.Primitives.BaseCube(options)
  
      CACHE.container.scene.add(baseCube)
      baseCube.position.set(position.x, position.y, position.z)
      baseCube.renderOrder = renderOrder
      baseCube.visible = false
      baseCube.userData.speed = Math.random() * .05 + .015
      CACHE.container.addBloom(baseCube)
  
      CACHE.education.push(baseCube)
    })
  })

}


/**
 * 教育医疗->柱状图动画
 */
function animateEducation() {
  CACHE.educationAnimateIndex = requestAnimationFrame(animateEducation)

  const length = CACHE.education
  let count = 0

  for(let l of CACHE.education){
    if(l.material.uniforms.opacity.value == 1) continue

    if(l.material.uniforms.opacity.value < 1) {
      l.material.uniforms.opacity.value += l.userData.speed
    }else{
      l.material.uniforms.opacity.value = 1
      count++
    }
  }

  if(length == count) cancelAnimationFrame(CACHE.educationAnimateIndex)
}


// 道路
function loadByJson() {

  fetch(STATE.roadsjson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      result.road.forEach((d) => {
        const le = new Bol3D.Primitives.BaseLine({
          lineWidth: 2,
          color: '#ed6565',
          attenuation: 1
        })
        le.setPositions(d)
        le.position.set(0,5,0)
        le.renderOrder = 100
        CACHE.container.scene.add(le)
        CACHE.container.addBloom(le)
        CACHE.linesBottom.push(le)

        const le2 = new Bol3D.Primitives.BaseLine({
          lineWidth: 2,
          color: '#ffad00',
          dashOffset: 3,
          dashSize: 1,
          gapSize: 1,
          gapOffset: 1,
          attenuation: 0
        })
        le2.renderOrder = 100
        le2.setPositions(d)
        le2.position.set(0,20,0)
        le2.userData.speed = Math.random() + .15
        CACHE.container.scene.add(le2)
        CACHE.container.addBloom(le2)
        CACHE.lines.push(le2)
        le2.visible = false
      })

    
    })

     
}


function hideAll() {
  hideIndustrialEconomy()
  hideEducations()
  hideEnergy()
  hideEnvironments()
  hideTraffics()
  hideRoutes()
  hideAreaIcons()
  hideModels()
  hideEnergyIcons()
  hideIcons()
  hideCompleteBoundrays()
  hidePlates()
}

function showEnergyIcons(){
  CACHE.energyIcons.forEach(e=>{
    e.visible = true
  })
}

function hideEnergyIcons(){
  CACHE.energyIcons.forEach(e=>{
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

function showRoutes(){
  CACHE.linesBottom.forEach( rt => {
    rt.visible = true
  })
}

function hideRoutes(){
  CACHE.linesBottom.forEach( rt => {
    rt.visible = false
  })
}

function showEnvironments() {
  CACHE.environment.forEach(env => {
    env.visible = true
  })
}

function beforeEnvironmentAniamtion() {
  CACHE.environment.forEach(env => {
    env.scale.y = 0
  })
}

function hideEnvironments() {
  CACHE.environment.forEach(env => {
    env.visible = false
  })
}

function showCompleteBoundrays(){
  for(const d in CACHE.completeBoundrays){
    CACHE.completeBoundrays[d].visible = true
  }
}

function hideCompleteBoundrays(){
  for(const d in CACHE.completeBoundrays){
    CACHE.completeBoundrays[d].visible = false
  }
}


function showEducations() {
  CACHE.education.forEach(edu => {
    edu.visible = true
  })
}

function beforeEducationAniamtion() {
  CACHE.education.forEach(edu => {
    edu.material.uniforms.opacity.value = 0
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
  loadEducation,
  hideAll,
  showIndustrialEconomy,
  hideIndustrialEconomy,
  showTraffics,
  hideTraffics,
  showRoutes,
  hideRoutes,
  showEnvironments,
  beforeEnvironmentAniamtion,
  hideEnvironments,
  showEducations,
  beforeEducationAniamtion,
  hideEducations,
  showEnergy,
  hideEnergy,
  cameraAnimation,
  showPlates,
  hidePlates,
  showIcons,
  hideIcons,
  showAreaIcons,
  hideAreaIcons,
  showEnergyIcons,
  hideEnergyIcons,
  animate,
  loadByJson,
  animateEducation,
  animateEnvironment,
  showModels,
  hideModels,
  showCompleteBoundrays,
  hideCompleteBoundrays,
  loadCompeleteBoundrays
}
