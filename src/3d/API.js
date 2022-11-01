import { DATA } from './DATA.js'
import { CACHE } from './CACHE.js'
import { STATE } from './STATE.js'
import store from '../2d/store/index.js'

function loadIcons() {
  for (const data of DATA.iconsData) {
    const icon = new Bol3D.CompositeIconTitle({
      titleHeight: 0.5,
      color: '#0E368E',
      type: 3,
      title: data.name
    })
    CACHE.container.scene.add(icon)
    icon.scale.set(3000, 3000, 3000)
    icon.renderOrder = 100
    icon.position.copy(data.position)
    icon.name = data.name
    CACHE.container.addBloom(icon.children[0])

    icon.traverse(d => {
      if (d.isMesh || d.isSprite) {
        d.name = data.name
        CACHE.container.clickObjects.push(d)
      }
    })

    CACHE.icons.push(icon)

  }
}

function loadPlates() {
  for (const data of DATA.platesData) {
    const icon = new Bol3D.CompositeIconTag({
      titleHeight: 0.8,
      color: '#EBA216',
      type: 8,
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

function hideIcons(){ // 进入区域层
  store.commit('jumpPage','/Area')
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
          color: Math.random() * 555555,
          gradient: Math.random() * 555555,
          height: 200 + Math.random() * 500,
          center: [120.76, 30.75],
          extrude: true
        })

        extrudeShape.position.set(0, Math.random() * 1000 + 1000, 0)

        extrudeShape.scale.set(0.5, 1, 0.5)
        extrudeShape.visible = false
        CACHE.container.scene.add(extrudeShape)

        CACHE.industries.push(extrudeShape)
      }
    })
}

function loadEnergy() {
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
          color: Math.random() * 555555,
          gradient: Math.random() * 555555,
          height: 200 + Math.random() * 500,
          center: [120.76, 30.75]
        })

        extrudeShape.position.set(0, 1000, 0)
        extrudeShape.scale.set(0.5, 1, 0.5)
        extrudeShape.visible = false
        CACHE.energy.push(extrudeShape)

        CACHE.container.scene.add(extrudeShape)
        CACHE.container.addBloom(extrudeShape.children[0])
      }
    })
}

function loadHeatMap() {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 512
  c.style.width = '512px'
  c.style.height = '512px'
  c.id = 'heatmap'
  c.style.visibility = 'hidden'
  document.body.appendChild(c)

  let maxvalue = 0
  let minvalue = 0
  const w = 512
  const h = 512
  const segments = []

  const positions = []

  let numbers = 500
  for (let i = 0; i < numbers; i++) {
    const x = Math.floor(Math.random() * 128 + Math.random() * 128 + 80)
    const y = Math.floor(Math.random() * 128 + Math.random() * 128 + 80)

    const z = 3
    let value = parseInt(Math.random() * 100 + 50 + '')
    maxvalue = value > maxvalue ? value : maxvalue
    minvalue = value < minvalue ? value : minvalue
    segments.push({ x: x, y: y, value: value })
    positions.push(x, y, z)
  }

  var heatmap = h337.create({
    container: c,
    radius: 8,
    width: w,
    height: h,
    alpha: true
  })

  heatmap.setData({
    max: maxvalue,
    min: minvalue,
    data: segments
  })

  let texture = new Bol3D.Texture(heatmap._renderer.canvas)
  texture.encoding = Bol3D.sRGBEncoding
  let mat = new Bol3D.MeshBasicMaterial({
    map: texture,
    transparent: true,
    side: 2
  })
  mat.map.needsUpdate = true

  const geo = new Bol3D.PlaneBufferGeometry(20000, 20000)
  geo.rotateX(Math.PI / 2)
  const htmap = new Bol3D.Mesh(geo, mat)
  htmap.renderOrder = 100
  htmap.position.set(0, 1, 0)
  htmap.visible = false
  CACHE.container.scene.add(htmap)

  CACHE.environment.push(htmap)
}

function loadTraffic() {
  fetch(STATE.trafficGeojson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      const traffics = result.features

      // console.log(traffics)

      const lines = []

      traffics.forEach((traffic, index) => {
        if (index < 100) {
          const lnglats = traffic.geometry.coordinates

          const points = []
          lnglats.forEach((lnglat) => {
            // 116.41,39.90
            const mercator = Bol3D.lnglat2mercator([lnglat[0] - 116.41, lnglat[1] - 39.9])

            points.push(mercator[0], 10, mercator[1])
          })

          const baseLine = new Bol3D.Primitives.BaseLine({
            lineWidth: 2,
            color: '#ff0000',
            dashOffset: 1,
            dashSize: 1,
            gapSize: 1,
            gapOffset: 1
          })
          baseLine.setPositions(points)

          CACHE.container.scene.add(baseLine)
          baseLine.renderOrder = 100
          CACHE.container.addBloom(baseLine)
          baseLine.visible = false
          lines.push(baseLine)

          CACHE.traffics.push(baseLine)
        }
      })

      // const animate = () => {
      //   requestAnimationFrame(animate)
      //   lines.forEach((l) => {
      //     l.material.dashOffset -= (1 * l.totalDistance) / 100
      //     l.material.dashOffset %= l.totalDistance
      //   })
      // }

      // animate()
    })
}

function loadEducation() {
  fetch(STATE.educationGeojson)
    .then((value) => {
      return value.json()
    })
    .then((result) => {
      const educations = result.features

      console.log(educations)

      educations.forEach((edu, index) => {
        if (index % 7 == 0) {
          const lnglat = edu.geometry.coordinates

          // 116.41,39.90
          const mercator = Bol3D.lnglat2mercator([lnglat[0] - 116.41, lnglat[1] - 39.9])

          const baseCube = new Bol3D.Primitives.BaseCube({
            width: 70,
            height: Math.random() * 1000 + 200,
            depth: 70,
            color: '#000fff',
            mixColor: Math.random() * Math.pow(2, 22)
          })

          CACHE.container.scene.add(baseCube)
          baseCube.position.set(mercator[0], 0, mercator[1])
          baseCube.renderOrder = 100
          baseCube.visible = false
          CACHE.container.addBloom(baseCube)

          CACHE.education.push(baseCube)
        }
      })
    })
}



function hideAll() {
  hideIndustrialEconomy()
  hideEducations()
  hideEnergy()
  hideEnvironments()
  hideTraffics()
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
  CACHE.traffics.forEach(traf => {
    traf.visible = true
  })
}

function hideTraffics() {
  CACHE.traffics.forEach(traf => {
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
  hideIcons
}
