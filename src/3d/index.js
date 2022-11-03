import { API } from './API.js'
import { STATE } from './STATE.js'
import { CACHE } from './CACHE.js'

export const sceneOnLoad = ({ domElement, callback }) => {
  CACHE.container = new Bol3D.Container({
    publicPath: STATE.DEV_ENV,
    container: domElement,
    viewState: 'orbit',
    bloomEnabled: true,
    bloom: {
      bloomStrength: 0.75,
      bloomRadius: 0.15,
      threshold: 0.035
    },
    renderer: {
      logarithmicDepthBuffer: true,
      alpha: true
    },
    toneMapping: {
      toneMappingExposure: 0.817
    },
    cameras: {
      orbitCamera: {
        position: [-2093.2950871470284, 30319.260717048488, 7358.705940927195],
        near: 0.001,
        far: 150000,
        fov: 60
      }
    },
    controls: {
      orbitControls: {
        autoRotate: false,
        autoRotateSpeed: 1,
        target: [-2133.5462087425603, 0, 2556.7757758174635],
        minDistance: 1000,
        maxDistance: 50000,
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
    background: {
      type: 'panorama',
      value: ['/assets/png/skybox/sky1(1).jpg'],
      options: {
        scale: 2,
        fog: true
      }
    },
    modelUrls: ['/assets/models/BeiJing/beijing.glb'],
    hdrUrls: ['/assets/hdr/HDR.hdr'],
    enableShadow: false,
    antiShake: false,
    fog: {
      color: '#060719',
      intensity: 0.000021
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
    // onProgress: (model) => {

    //   if(model.name == 'beijing'){
    //     model.traverse( m => {
    //       if(m.isMesh){
    //         m.material = new Bol3D.ShaderMaterial({
    //           lights: true,
    //           // depthWrite: true,
    //           // depthTest: true,
    //           transparent: true,
    //           uniforms: {
    //             color: {
    //               value: new Bol3D.Color('#ff0000')
    //             },
    //             opacity: {
    //               value: 1
    //             },
    //             maxHeight: {
    //               value: 2000
    //             },
    //             maxGlow: {
    //               value: 200
    //             },
    //             frameTime: {
    //               value: 0
    //             },
    //             emissive: {
    //               value: new Bol3D.Color('#ffffff')
    //             },
    //             uFlowMax: {
    //               value: 10000
    //             },
    //             uFlowCurrent: {
    //               value: 0
    //             },
    //             uIsFlow: {
    //               value: false
    //             }
    //           },
    //           vertexShader: `
    //             #include <common>

    //             precision highp float; 

    //             varying vec3 v_position;

    //             varying vec3 vLightFront;
    //             varying vec3 vIndirectFront;

    //             #ifdef DOUBLE_SIDED
    //               varying vec3 vLightBack;
    //               varying vec3 vIndirectBack;
    //             #endif

    //             #include <uv_pars_vertex>
    //             #include <uv2_pars_vertex>
    //             #include <bsdfs>
    //             #include <lights_pars_begin>
    //             #include <color_pars_vertex>
    //             #include <fog_pars_vertex>
    //             #include <logdepthbuf_pars_vertex>
    //             #include <clipping_planes_pars_vertex>

    //             void main(){
    //               #include <uv_vertex>
    //               #include <uv2_vertex>
    //               #include <color_vertex>

    //               #include <beginnormal_vertex>
    //               #include <defaultnormal_vertex>

    //               #include <begin_vertex>
    //               #include <project_vertex>
    //               #include <logdepthbuf_vertex>
    //               #include <clipping_planes_vertex>

    //               #include <worldpos_vertex>
    //               #include <lights_lambert_vertex>
    //               #include <fog_vertex>

    //               v_position = position;
    //             }
    //           `,
    //           fragmentShader: `
    //             precision highp float; 

    //             varying vec3 v_position;

    //             uniform vec3 color;
    //             uniform vec3 emissive;
    //             uniform float opacity;
    //             uniform float maxHeight;
    //             uniform float maxGlow;
    //             uniform float frameTime;

    //             varying vec3 vLightFront;
    //             varying vec3 vIndirectFront;

    //             uniform vec3 uCenter;
    //             uniform float uFlowCurrent;
    //             uniform int uIsFlow;

    //             #ifdef DOUBLE_SIDED
    //               varying vec3 vLightBack;
    //               varying vec3 vIndirectBack;
    //             #endif


    //             #include <common>
    //             #include <packing>
    //             #include <color_pars_fragment>
    //             #include <uv_pars_fragment>
    //             #include <uv2_pars_fragment>
    //             #include <map_pars_fragment>
    //             #include <bsdfs>
    //             #include <lights_pars_begin>
    //             #include <fog_pars_fragment>
    //             #include <logdepthbuf_pars_fragment>
    //             #include <clipping_planes_pars_fragment>
    //             void main(){
    //               float baseHeight = v_position.y;
    //               float dis = distance(uCenter, v_position);
    //               vec4 mixColor = vec4(0.0);
    //               if(dis > uFlowCurrent - 350. && dis < uFlowCurrent){
    //                 mixColor = vec4(vec3(1.),opacity);
    //               }
    //               // if(baseHeight < 260.){
    //               //     gl_FragColor= vec4(color / 2.,opacity);
    //               //     return;
    //               // } else{
    //               //     gl_FragColor= vec4(vec3(1.0,0.0,0.0),opacity);
    //               //     return;
    //               // }

    //               // 建筑基础色
    //               float vtxf_a12 = baseHeight / maxHeight;
    //               vec4 diffuseColor = vec4( color, opacity );
    //               // gl_FragColor = diffuseColor; // 基础色
    //               #include <clipping_planes_fragment>
    //               ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
    //               vec3 totalEmissiveRadiance = emissive;

    //               #include <logdepthbuf_fragment>
    //               #include <map_fragment>
    //               #include <color_fragment>
    //               #include <alphatest_fragment>

    //               #ifdef DOUBLE_SIDED

    //                 reflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;

    //               #else

    //                 reflectedLight.indirectDiffuse += vIndirectFront;

    //               #endif

    //               reflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

    //               #ifdef DOUBLE_SIDED

    //                 reflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;

    //               #else

    //                 reflectedLight.directDiffuse = vLightFront;

    //               #endif

    //               reflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );

    //               // modulation

    //               vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +  totalEmissiveRadiance;
    //               gl_FragColor = vec4( outgoingLight, diffuseColor.a );

    //               #include <tonemapping_fragment>
    //               #include <encodings_fragment>
    //               #include <fog_fragment>
    //               #include <premultiplied_alpha_fragment>

    //               gl_FragColor *= vec4(min(vtxf_a12, color.r),min(vtxf_a12, color.g) , min(vtxf_a12, color.b), 1.0);

    //               // 动态光环
    //               float vtxf_a13 = fract(frameTime / 360.0);
    //               float vtxf_h = clamp(baseHeight / maxGlow, 0.0, 1.0);
    //               vtxf_a13 = abs(vtxf_a13 - 0.5) * 2.0;
    //               float vtxf_diff = step(0.005, abs(vtxf_h - vtxf_a13));
    //               gl_FragColor.rgb += gl_FragColor.rgb * (1.0 - vtxf_diff);

    //               if(uIsFlow == 1) {
    //                 gl_FragColor.rgb += mix(gl_FragColor.rgb , mixColor.rgb, .65);
    //               }
    //             }
    //           `
    //         })

    //         m.material.uniforms = Bol3D.UniformsUtils.merge([ m.material.uniforms, Bol3D.ShaderLib.lights])
    //       }
    //     })
    //   }
    // },
    onLoad: (evt) => {
      window.container = evt

      evt.clickObjects = []

      console.log(evt.sceneModels)

      // model materials
      evt.sceneModels[0].traverse((d) => {
        if (d.isMesh) {
          d.material.roughness = 0.5
          d.receiveShadow = false
        }
      })

      // model transforms
      evt.sceneModels[0].scale.set(2, 3, 2)

      // ************** init icons start **************
      API.loadIcons()
      API.loadPlates()
      // ************** init icons end **************

      // 5大板块
      API.loadIndustrialEconomy()
      API.loadEnergy()
      API.loadHeatMap()
      API.loadTraffic()
      API.loadEducation()

      // floor
      const floorGeo = new Bol3D.CircleBufferGeometry(120000, 32)
      floorGeo.rotateX(-Math.PI / 2)
      const floorMat = new Bol3D.MeshLambertMaterial({
        color: '#101119',
        transparent: true,
        opacity: 0.96,
      })
      const floor = new Bol3D.Mesh(floorGeo, floorMat)
      floor.receiveShadow = true
      // evt.clickObjects = [floor]
      // evt.clickObjects.push(floor)
      evt.scene.add(floor)

      // mirror
      const mirrorGeo = new Bol3D.CircleBufferGeometry(120000, 32)
      const groundMirror = new Bol3D.Reflector(mirrorGeo, {
        clipBias: 0.0003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777
      })
      groundMirror.position.y = -0.1
      groundMirror.rotateX(-Math.PI / 2)
      evt.scene.add(groundMirror)

      // ********************** gui start **********************
      // const gui = new dat.GUI()
      // // scenes
      // const scenesFolder = gui.addFolder('场景')
      // // floor
      // const defaults = { floorColor: '#101119', buildingColor: '#ffffff', fogColor: '#111472', skySize: 2 }
      // scenesFolder
      //   .addColor(defaults, 'floorColor')
      //   .onChange((val) => {
      //     floor.material.color = new Bol3D.Color(val)
      //   })
      //   .name('地板颜色')
      // scenesFolder
      //   .addColor(defaults, 'buildingColor')
      //   .onChange((val) => {
      //     CACHE.container.sceneModels[0].children[0].material.color = new Bol3D.Color(val)
      //   })
      //   .name('建筑颜色')
      // // scenesFolder
      // //   .add(CACHE.container.sceneModels[0].children[0].material, 'roughness')
      // //   .name('建筑粗糙度')
      // // scenesFolder
      // //   .add(CACHE.container.sceneModels[0].children[0].material, 'metalness')
      // //   .name('建筑金属度')
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

    if (e.objects.length > 0 && e.objects[0].object.name == '海景区') {
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
