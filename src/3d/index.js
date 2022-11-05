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
      bloomStrength: 0.85,
      bloomRadius: 0.25,
      threshold: 0.035
    },
    renderer: {
      logarithmicDepthBuffer: true,
      alpha: true
    },
    toneMapping: {
      toneMappingExposure: 0.817
    },
    // nodePass : {
    //   hue: 0, // 色调
    //   sataturation: 1, // 饱和度
    //   vibrance: 0, //
    //   brightness: .1, // 亮度
    //   contrast: 0.2, //  对比度
    // },
    cameras: {
      orbitCamera: {
        position: [  -22127.06565369117,   5621.439437571587,   24205.299948474756],
        near: 0.001,
        far: 400000,
        fov: 60
      }
    },
    controls: {
      orbitControls: {
        autoRotate: false,
        autoRotateSpeed: 1,
        target: [1656.3432304127095, 0, 9800.149326543074],
        minDistance: 1000,
        maxDistance: 45000,
        maxPolarAngle: Math.PI * 0.44,
        minPolarAngle: Math.PI * 0.05,
        enableDamping: true,
        dampingFactor: 0.05,
      }
    },
    // bounds: {
    //   radius: 48000,
    //   center: [0, 0, 0]
    // },
    lights: {
      directionLights: [
        { color: 0xffffff, intensity: 1.2, position: [-1300, 500, 3800], mapSize: [4096, 4096], near: 10, far: 15000, bias: -0.001, distance: 8000 },
      ],
      ambientLight: {
        color: '#ffffff',
        intensity: 1.2
      }
    },
    background: {
      type: 'panorama',
      value: ['/assets/png/skybox/sky1(1).jpg'],
      options: {
        scale: 1,
        fog: true
      }
    },
    modelUrls: [
      '/assets/models/BeiJing/beijing-1.glb',
      '/assets/models/BeiJing/beijing-2.glb',
      '/assets/models/BeiJing/beijing-3.glb',
      '/assets/models/BeiJing/beijing-4.glb',
      '/assets/models/BeiJing/gongying.glb',
      '/assets/models/BeiJing/wuliu.glb',
      '/assets/models/BeiJing/shuzijinrong.glb',
      '/assets/models/BeiJing/zhengwu.glb',
      '/assets/models/BeiJing/zhinengzhizao.glb',
      '/assets/models/BeiJing/zonghefuwu.glb'
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

    gammaEnabled: false,
    stats: false,
    // loadingBar: {
    //   show: true,
    //   type: 10
    // }
    onProgress: (model) => {

      model.scale.set(2, 3.8, 2)

      if(model.name.includes('beijing')){
        model.traverse((m) => {
          if (m.isMesh) {
            // m.material = new Bol3D.PrimitiveMaterial.BaseBuildingStripeMaterial({
            //   color: '#0000ff',
            //   emissive: '#00ffff',
            //   minHeight: -142,
            //   maxHeight: -27
            // })
            // CACHE.container.addBloom(m)
  
            m.material = new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
              color: '#1a2199',
              emissive: '#ff004b',
              minHeight: -142,
              maxHeight: -27,
              threshold: STATE.modelExclude.includes(model.name) ? STATE.modelThreshold[model.name] : 0,
              mixColor: '#512c2c'
            })
  
          }
        })
      }else{
        model.children.forEach( m => {
          if(m.isMesh){
            m.material = new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
              color: '#1a2199',
              emissive: '#ff004b',
              minHeight: -142,
              maxHeight: -27,
              threshold: STATE.modelExclude.includes(model.name) ? STATE.modelThreshold[model.name] : 0,
              mixColor: '#512c2c'
            })
          }
        })
      }

      

      CACHE.models.push(model)

      // 默认视角
      // API.cameraAnimation({
      //   cameraState: STATE.initialState
      // });
    },
    onLoad: (evt) => {
      window.container = evt
      window.position = evt.orbitControls.object
      evt.clickObjects = []

      console.log(evt.sceneModels)

      // ************** init icons start **************
      API.loadIcons()
      API.loadPlates()
      // ************** init icons end **************

      // 5大板块
      API.loadIndustrialEconomy()
      API.loadCompeleteBoundrays()
      API.loadHeatMap()
      API.loadTraffic()
      API.loadEducation()
      API.loadEnergy()

      // 地球
      // console.log(evt)
      // const {group,flowMaterial} = createEarth(evt.scene)
      // CACHE.earth.push(group)
      // API.cameraAnimation({
      //   cameraState: STATE.earthState,
      //   callback:()=>{
      //     API.animate()
      //   }
      // });

      // floor
      const floorGeo = new Bol3D.CircleBufferGeometry(80000, 64)
      floorGeo.rotateX(-Math.PI / 2)
      const floorMat = new Bol3D.MeshLambertMaterial({
        color: '#000056',
        transparent: true,
        opacity: 0.697,
      })
      const floor = new Bol3D.Mesh(floorGeo, floorMat)
      // floor.receiveShadow = true
      // evt.clickObjects = [floor]
      // evt.clickObjects.push(floor)
      evt.scene.add(floor)

      // CACHE.models.forEach(e => {
      //   evt.clickObjects.push(e)
      // })

      // mirror
      const mirrorGeo = new Bol3D.CircleBufferGeometry(50000, 64)
      const groundMirror = new Bol3D.Reflector(mirrorGeo, {
        clipBias: 0.0003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777
      })
      groundMirror.position.y = -1
      groundMirror.rotateX(-Math.PI / 2)
      evt.scene.add(groundMirror)

      // ********************** gui start **********************
      // const gui = new dat.GUI()
      // // scenes
      // const scenesFolder = gui.addFolder('场景')
      // // floor
      // const defaults = {vertical: 24000, shapeColor: '#ffffff', shapeExtrude: '#ffffff', lineBottom: '#ffffff', line: '#ffffff', floorOpacity: 1, floorColor: '#101119', buildingColor: '#ffffff', fogColor: '#111472', skySize: 2, minHeight: -155, maxHeight: -36, city1Color: '#0000ff', city1StripeColor: '#00ffff', city1MixColor: '#ff0000' }

      // scenesFolder
      //   .add(defaults, 'vertical')
      //   .name('水平起始')
      //   .onChange((val) => {
      //     CACHE.industries.forEach((c) => {
      //       c.material.uniforms.vertical.value = val
      //     })
      //   })

      //   scenesFolder.addColor(defaults, 'shapeColor').onChange((val) => {
      //     CACHE.industries.forEach((c, index) => {
      //       c.material.uniforms.color.value.set(val)
      //     })
      //   })

      //   scenesFolder.addColor(defaults, 'shapeExtrude').onChange((val) => {
      //     CACHE.industries.forEach((c) => {
      //       c.material.uniforms.gradient.value.set(val)
      //     })
      //   })

      // scenesFolder.addColor(defaults, 'city1Color').onChange((val) => {
      //   CACHE.models.forEach(d => {
      //     d.traverse(c => {
      //       if (c.isMesh) {
      //         c.material.uniforms.color.value.set(val)
      //       }
      //     })
      //   })
      // })
      //   .name('color')

      // scenesFolder.addColor(defaults, 'city1StripeColor').onChange((val) => {
      //   CACHE.models.forEach(d => {
      //     d.traverse(c => {
      //       if (c.isMesh) {
      //         c.material.uniforms.emissive.value.set(val)
      //       }
      //     })
      //   })
      // })
      //   .name('emissive')


      // scenesFolder.addColor(defaults, 'city1MixColor').onChange((val) => {
      //   CACHE.models.forEach(d => {
      //     d.traverse(c => {
      //       if (c.isMesh) {
      //         c.material.uniforms.mixColor.value.set(val)
      //       }
      //     })
      //   })
      // })
      //   .name('mixColor')


      // scenesFolder
      //   .add(defaults, 'maxHeight')
      //   .name('maxHeight')
      //   .step(1)
      //   .onChange((val) => {
      //     CACHE.models.forEach(d => {
      //       d.traverse(c => {
      //         if (c.isMesh) {
      //           c.material.uniforms.maxHeight.value = val
      //         }
      //       })
      //     })
      //   })
      // scenesFolder
      //   .add(defaults, 'minHeight')
      //   .name('minHeight')
      //   .step(1)
      //   .onChange((val) => {
      //     CACHE.models.forEach(d => {
      //       d.traverse(c => {
      //         if (c.isMesh) {
      //           c.material.uniforms.minHeight.value = val
      //         }
      //       })
      //     })
      //   })


      // // scenesFolder.add(floor.material, 'opacity', 0, 1).step(0.001).name('地板透明度')
      // // // toneMapping
      // scenesFolder.add(evt.renderer, 'toneMappingExposure', 0, 10).step(0.001).name('exposure')
      // scenesFolder.add(evt.ambientLight, 'intensity').step(0.001).min(0).name('环境光强度')
      // scenesFolder.add(evt.directionLights[0], 'intensity').step(0.001).min(0).name('平行光1强度')
      // scenesFolder.add(evt.directionLights[0].position, 'x').name('平行光1X')
      // scenesFolder.add(evt.directionLights[0].position, 'y').name('平行光1Y')
      // scenesFolder.add(evt.directionLights[0].position, 'z').name('平行光1Z')
      // // scenesFolder.add(evt.directionLights[1], 'intensity').step(0.001).min(0).name('平行光2强度')
      // // scenesFolder.add(evt.directionLights[1].position, 'x').name('平行光2X')
      // // scenesFolder.add(evt.directionLights[1].position, 'y').name('平行光2Y')
      // // scenesFolder.add(evt.directionLights[1].position, 'z').name('平行光2Z')
      // scenesFolder.addColor(defaults, 'fogColor').name('雾颜色').onChange((val) => {
      //   CACHE.container.scene.fog.color.set(val)
      // })
      // scenesFolder.addColor(defaults, 'floorColor').name('地板颜色').onChange((val) => {
      //   floorMat.color.set(val)
      // })
      // scenesFolder.add(defaults, 'floorOpacity').step(0.001).min(0).name('地板透明度').onChange(val => {
      //   floorMat.opacity = val
      // })
      // scenesFolder.add(evt.scene.fog, 'density').step(0.000001).min(0).name('雾强度')
      // scenesFolder.add(defaults, 'skySize').step(.5).min(0).name('天空盒大小')
      //   .onChange(val => {
      //     evt.sky.scale.set(val, val, val)
      //   })


      // scenesFolder.addColor(defaults, 'line').name('line').onChange((val) => {

      //   CACHE.lines.forEach(l => {
      //     l.material.color.set(val)
      //   })

      // })
      // scenesFolder.addColor(defaults, 'lineBottom').name('lineBottom').onChange((val) => {

      //   CACHE.linesBottom.forEach(l => {
      //     l.material.color.set(val)
      //   })

      // })




      // const nodePass = {
      //   hue: 6.3, // 色调
      //   sataturation: 1.2, // 饱和度
      //   vibrance: 0, //
      //   brightness: -0.01, // 亮度
      //   contrast: 0.9, //  对比度
      // }

      // scenesFolder.add(nodePass, 'hue').step(0.001).min(0).name('hue').onChange( () => {

      // })

      // scenesFolder.add(nodePass, 'sataturation').step(0.001).min(0).name('sataturation')
      // scenesFolder.add(nodePass, 'vibrance').name('vibrance')
      // scenesFolder.add(nodePass, 'brightness').name('brightness')
      // .onChange(val => {
      //   CACHE.container.nodepass
      // })
      // scenesFolder.add(nodePass, 'contrast').name('contrast')


      // ********************** gui end **********************
    }
  })



  window.container = () => console.log(CACHE.container);

  const events = new Bol3D.Events(CACHE.container)
  events.enabled.hover = false
  events.ondbclick = (e) => {
    // console.log('e', e)

    console.log(e, e.objects[0].point , e.objects[0].object.name)

    // e.objects[0].object.visible = false
    //       const icon = new Bol3D.CompositeIconTitle({
    //       titleHeight: 0.5,
    //       color: Math.random() * 555555,
    //       type: 2,
    //       title: e.objects[0].object.name
    //     })

        

    //     icon.position.copy(e.objects[0].point)

    //     CACHE.container.scene.add(icon)
    //     icon.scale.set(3000, 3000, 3000)


    if (e.objects.length > 0 ) {

      const name = e.objects[0].object.name
      if(name == '海景区'){
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
      }else if(STATE.platesNames.includes(name)){
        API.cameraAnimation({
          cameraState: {
            position: STATE.platesViewStates[name].position,
            target: STATE.platesViewStates[name].target
          },
        })
      }

      
    }

  }

  // events.onhover = (e) => {}
}
