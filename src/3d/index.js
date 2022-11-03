import { API } from './API.js'
import { STATE } from './STATE.js'
import { CACHE } from './CACHE.js'
import { createEarth } from './utils/createEarth'

export const sceneOnLoad = ({ domElement, callback }) => {
  CACHE.container = new Bol3D.Container({
    publicPath: STATE.DEV_ENV,
    container: domElement,
    viewState: 'orbit',
    bloomEnabled: true,
    bloom: {
      bloomStrength: 0.15,
      bloomRadius: 0.15,
      threshold: 0.035
    },
    renderer: {
      logarithmicDepthBuffer: true,
      alpha: true
    },
    // toneMapping: {
    //   toneMappingExposure: 0.0817
    // },
    cameras: {
      orbitCamera: {
        position: [-2093.2950871470284, 30319.260717048488, 7358.705940927195],
        near: 0.001,
        far: 400000,
        fov: 60
      }
    },
    controls: {
      orbitControls: {
        autoRotate: false,
        autoRotateSpeed: 1,
        target: [-2133.5462087425603, 0, 2556.7757758174635],
        minDistance: 1000,
        maxDistance: 800000,
        maxPolarAngle: Math.PI * 0.44,
        minPolarAngle: Math.PI * 0.05,
        enableDamping: true,
        dampingFactor: 0.05
      }
    },
    lights: {
      directionLights: [{ color: 0xedeacc, intensity: 1.4, position: [4000, 3000, 4000], mapSize: [4096, 4096], near: 10, far: 40000, bias: -0.001, distance: 40000 }],
      ambientLight: {
        color: '#ffffff',
        intensity: 0.4
      }
    },
    // background: {
    //   type: 'panorama',
    //   value: ['/assets/png/skybox/sky1(1).jpg'],
    //   options: {
    //     scale: 2,
    //     fog: true
    //   }
    // },
    modelUrls: [
      '/assets/models/BeiJing/beijing1.glb',
     '/assets/models/BeiJing/beijing2.glb',
     '/assets/models/BeiJing/beijing3.glb',
      '/assets/models/BeiJing/beijing4.glb'
    ],
    hdrUrls: ['/assets/hdr/HDR.hdr'],
    enableShadow: false,
    antiShake: false,
    fog: {
      color: '#060719',
      intensity: 0.000008
    },
    outlineEnabled: false,
    dofEnabled: false,
    msaa: {
      supersampling: false
    },

    gammaEnabled: true,
    stats: false,
    // loadingBar: {
    //   show: true,
    //   type: 10
    // }
    onProgress: (model) => {

      model.scale.set(2, 2, 2)

      // 模型材质
      model.children.forEach((e)=>{
        e.traverse((d)=>{
            d.material = new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
              color:"#0000ff",
              emissive: "#00ffff",
              maxHeight: -27,
              minHeight: -842,
              mixColor: "#1617c4"
            })
            
            CACHE.models.push(d)
        })
      })

      // 默认视角
      API.cameraAnimation({
        cameraState: STATE.initialState
      });
    },
    onLoad: (evt) => {
      window.container = evt
      window.position =  evt.orbitControls.object
      evt.clickObjects = []

      // model materials
      // evt.sceneModels[0].traverse((d) => {
      //   if (d.isMesh) {
      //     d.material.roughness = 0.5
      //     d.receiveShadow = false
      //   }
      // })

      // model transforms
      // evt.sceneModels[0].scale.set(2, 3, 2)

      // ************** init icons start **************
      API.loadIcons()
      API.loadPlates()
      // ************** init icons end **************

      // 5大板块
      API.loadIndustrialEconomy()
      API.loadEnergy()
      API.loadHeatMap()
      API.loadTraffic()
      API.loadTraffic2()
      API.loadEducation()

      // 地球
      console.log(evt)
      // API._hideIcons()
      // const {group,flowMaterial} = createEarth(evt.scene)
      // CACHE.earth.push(group)
      // API.cameraAnimation({
      //   cameraState: STATE.earthState,
      //   callback:()=>{
      //     API.animate()
      //   }
      // });

      // floor
      // const floorGeo = new Bol3D.CircleBufferGeometry(42000, 32)
      // floorGeo.rotateX(-Math.PI / 2)
      // const floorMat = new Bol3D.MeshLambertMaterial({
      //   color: '#116be6',
      //   transparent: true,
      //   opacity: 0.96,
      // })
      // const floor = new Bol3D.Mesh(floorGeo, floorMat)
      // floor.receiveShadow = true
      // // evt.clickObjects = [floor]
      // evt.clickObjects.push(floor)
      // evt.scene.add(floor)

      CACHE.models.forEach(e=>{
        evt.clickObjects.push(e)
      })

      // mirror
      // const mirrorGeo = new Bol3D.CircleBufferGeometry(50000, 32)
      // const groundMirror = new Bol3D.Reflector(mirrorGeo, {
      //   clipBias: 0.0003,
      //   textureWidth: window.innerWidth * window.devicePixelRatio,
      //   textureHeight: window.innerHeight * window.devicePixelRatio,
      //   color: 0x777777
      // })
      // groundMirror.position.y = -0.1
      // groundMirror.rotateX(-Math.PI / 2)
      // evt.scene.add(groundMirror)

      // ********************** gui start **********************
      const gui = new dat.GUI()
      // scenes
      const scenesFolder = gui.addFolder('场景')
      // floor
      const defaults = { floorColor: '#101119', buildingColor: '#ffffff', fogColor: '#111472', skySize: 2 }

      scenesFolder.addColor(defaults, 'fogColor').onChange((val)=>{
        console.log(val)
        console.log(evt.scene.children)
        const model = evt.scene.children[4]
        
        model.children.forEach((e)=>{
          e.traverse((d)=>{
            console.log(d.material)
            d.material = new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
              color: val,
              emissive: '#00ffff',
              minHeight: -142,
              maxHeight: -27,
              mixColor: '#ff0000'
            })
            console.log(d.material)
          })
        })

      })
      .name('建筑color')

      scenesFolder.addColor(defaults, 'fogColor').onChange((val)=>{
        console.log(val)

        const model = evt.scene.children[4]
        
        model.children.forEach((e)=>{
          e.traverse((d)=>{
            console.log(d.material)
            d.material = new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
              color: '#0000ff',
              emissive: val,
              minHeight: -142,
              maxHeight: -27,
              mixColor: '#ff0000'
            })
            console.log(d.material)
          })
        })

      })
      .name('建筑emissive')


      scenesFolder.addColor(defaults, 'fogColor').onChange((val)=>{
        console.log(val)

        const model = evt.scene.children[4]
        
        model.children.forEach((e)=>{
          e.traverse((d)=>{
            console.log(d.material)
            d.material = new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
              color: '#0000ff',
              emissive: '#00ffff',
              minHeight: -142,
              maxHeight: -27,
              mixColor: val
            })
            console.log(d.material)
          })
        })

      })
      .name('建筑mixColor')





      // scenesFolder.add(floor.material, 'opacity', 0, 1).step(0.001).name('地板透明度')
      // // toneMapping
      // scenesFolder.add(evt.renderer, 'toneMappingExposure', 0, 10).step(0.001).name('exposure')
      // scenesFolder.add(evt.ambientLight, 'intensity').step(0.001).min(0).name('环境光强度')
      // scenesFolder.add(evt.directionLights[0], 'intensity').step(0.001).min(0).name('平行光强度')
      // scenesFolder.add(evt.directionLights[0].position, 'x').name('平行光X')
      // scenesFolder.add(evt.directionLights[0].position, 'y').name('平行光Y')
      // scenesFolder.add(evt.directionLights[0].position, 'z').name('平行光Z')
      // scenesFolder.addColor(defaults, 'fogColor').name('雾颜色').onChange((val) => {
      //   CACHE.container.scene.fog.color.set(new Bol3D.Color(val))
      // })
      // scenesFolder.add(evt.scene.fog, 'density').step(0.000001).min(0).name('雾强度')
      // scenesFolder.add(defaults, 'skySize').step(.5).min(0).name('天空盒大小')
      //   .onChange(val => {
      //     evt.sky.scale.set(val, val, val)
      //   })

      
      // ********************** gui end **********************
    }
  })



  window.container = ()=>console.log(CACHE.container);

  const events = new Bol3D.Events(CACHE.container)
  events.enabled.hover = false
  events.ondbclick = (e) => {
    // console.log('e', e)

    console.log(e)
    if (e.objects.length > 0 || e.objects[0].object.name == '海景区') {
      console.log(e.objects[0].object.name)
      API.cameraAnimation({
        cameraState: {
          position: { x: -10468.392443444347, y: 7503.154099941362, z: 2470.1723962172264 },
          target: { x: -7390.194097925514, y: 0, z: -7478.079034308425 }
        },
        callback: () => {
          API.showPlates()
          API.hideIcons()
        }
      })
    }

  }

  // events.onhover = (e) => {}
}
