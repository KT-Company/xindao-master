import { API } from "./API.js";
import { STATE } from "./STATE.js";
import { CACHE } from "./CACHE.js";
import { DATA } from "./DATA.js";
import store from "@/2d/store";
import router from "@/2d/router";

let Bol3D = window.Bol3D

export const sceneOnLoad = ({ domElement, callback }) => {
  CACHE.container = new Bol3D.Container({
    publicPath: STATE.DEV_ENV,
    container: domElement,
    viewState: "orbit",
    bloomEnabled: true,
    bloom: {
      bloomStrength: .75,
      bloomRadius: 0.45,
      threshold: 0.015,
    },
    renderer: {
      logarithmicDepthBuffer: true,
      alpha: true,
    },
    toneMapping: {
      toneMappingExposure: 0.817,
    },
    cameras: {
      orbitCamera: {
        position: [
          STATE.earthState.position.x,
          STATE.earthState.position.y,
          STATE.earthState.position.z,
        ],
        near: 0.001,
        far: 400000,
        fov: 60,
      },
    },
    controls: {
      orbitControls: {
        autoRotate: false,
        autoRotateSpeed: 1,
        target: [
          STATE.earthState.target.x,
          STATE.earthState.target.y,
          STATE.earthState.target.z,
        ],
        maxDistance: 1000000,
        // maxPolarAngle: Math.PI * 0.44,
        // minPolarAngle: Math.PI * 0.05,
        enableDamping: true,
        dampingFactor: 0.05,
      },
    },
    // bounds: {
    //   radius: 48000,
    //   center: [0, 0, 0]
    // },
    lights: {
      directionLights: [
        {
          color: 0xffffff,
          intensity: 1.2,
          position: [-1300, 500, 3800],
          mapSize: [4096, 4096],
          near: 10,
          far: 15000,
          bias: -0.001,
          distance: 8000,
        },
      ],
      ambientLight: {
        color: "#ffffff",
        intensity: 1.2,
      },
    },
    background: {
      type: "panorama",
      value: ["/assets/png/skybox/sky1(1).jpg"],
      options: {
        scale: 1,
        fog: true,
      },
    },
    modelUrls: [
      "/assets/models/BeiJing/beijing-1.glb",
      "/assets/models/BeiJing/beijing-2.glb",
      "/assets/models/BeiJing/beijing-3.glb",
      "/assets/models/BeiJing/beijing-4.glb",
      "/assets/models/BeiJing/fuwugongsi.glb",
      "/assets/models/BeiJing/gongyingqiye.glb",
      "/assets/models/BeiJing/guanweihui.glb",
      "/assets/models/BeiJing/jingxiaoqiye.glb",
      "/assets/models/BeiJing/wuliuqiye.glb",
      "/assets/models/BeiJing/xiaoshougongsi.glb",
      "/assets/models/BeiJing/yinhangyuanqu.glb",
      "/assets/models/BeiJing/zhengwuzhongxin.glb",
      "/assets/models/BeiJing/zhizaojituan.glb",
      // *** 内部 ***
      "/assets/models/NeiBu/GongYingBanGongShi.glb",
      "/assets/models/NeiBu/JingXiaoBanGongShi.glb",
      "/assets/models/NeiBu/Xiao_Shou_Gong_Si.glb",
      "/assets/models/NeiBu/yinghang.glb",
      "/assets/models/NeiBu/zhengwuzhongxinbangongshi.glb",
      "/assets/models/NeiBu/zhizaojituanbangongshi.glb",
      "/assets/models/NeiBu/zonghefuwulou.glb",
      "/assets/models/NeiBu/wuliubangongshi.glb",
      // *** seperate ***
      "/assets/models/seperate/fuwugongsi_s.glb",
      "/assets/models/seperate/gongyingqiye_s.glb",
      "/assets/models/seperate/guanweihui_s.glb",
      "/assets/models/seperate/jingxiaoqiye_s.glb",
      "/assets/models/seperate/wuliuqiye_s.glb",
      "/assets/models/seperate/xiaoshougongsi_s.glb",
      "/assets/models/seperate/yinhangyuanqu_s.glb",
      "/assets/models/seperate/zhengwuzhongxin_s.glb",
      "/assets/models/seperate/zhizaojituan_s.glb",
    ],
    hdrUrls: ["/assets/hdr/st_peters_square_night_1k.hdr"],
    enableShadow: false,
    antiShake: false,
    fog: {
      color: "#060719",
      intensity: 0.000008,
    },
    outlineEnabled: false,
    dofEnabled: false,
    msaa: {
      supersampling: false,
    },

    gammaEnabled: false,
    stats: false,
    loadingBar: {
      show: true,
      type: 5,
    },
    onProgress: (model) => {
      if (model.name.includes("beijing")) {
        model.scale.set(2, 3.8, 2);
        model.traverse((m) => {
          if (m.isMesh) {
            // m.material = new Bol3D.PrimitiveMaterial.BaseBuildingStripeMaterial({
            //   color: '#0000ff',
            //   emissive: '#00ffff',
            //   minHeight: -142,
            //   maxHeight: -27
            // })
            // CACHE.container.addBloom(m)

            m.material =
              new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
                color: "#1a2199",
                emissive: "#ff004b",
                minHeight: -142,
                maxHeight: -82,
                threshold: 0,
                mixColor: "#512c2c",
              });

            // todo
            // m.material.envMap = CACHE.container.envMap
          }
        });
        CACHE.cities.push(model);
        CACHE.models.push(model);
      } else if (STATE.modelExclude.includes(model.name)) {
        model.scale.set(2, 3.8, 2);
        model.children.forEach((m) => {
          if (m.isMesh) {
            m.material =
              new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
                color: "#1a2199",
                emissive: "#ff004b",
                minHeight: -142,
                maxHeight: -82,
                threshold: 0,
                mixColor: "#512c2c",
              });

            // m.material = new Bol3D.PrimitiveMaterial.BaseBuildingStripeMaterial({
            //   color: '#0000ff',
            //   emissive: '#00ffff',
            //   minHeight: -142,
            //   maxHeight: -27
            // })
            // CACHE.container.addBloom(m)
            // todo
            // m.material.envMap = CACHE.container.envMap
          }
        });
        CACHE.cities2.push(model);
        CACHE.models.push(model);

        // model.visible = false
      } else if (STATE.modelSeperate.includes(model.name)) {
        model.scale.set(2, 3.8, 2);

        let count = 0;
        model.children.forEach((child) => {
          if (child.type == "Object3D") {
            child.children.forEach((gchild) => {
              count++;

              // gchild.visible = count%25 == 0
              // education/medical data
              if (count % 25 == 0) {
                // CACHE.container.addBloom(gchild)
                const v3 = new Bol3D.Vector3();
                gchild.getWorldPosition(v3);

                const type = Math.random() > 0.5 ? "education" : "medical";
                DATA.educationPos.push({
                  position: v3,
                  type,
                });

                gchild.material.color.set(type == 'education' ? '#00617f' : '#156d00')
                gchild.material.roughness = 1
                gchild.material.matalness = 1
                gchild.material.envMapIntensity = 4.7

                gchild.userData[type] = {
                  roughness: 1,
                  metalness: 1,
                  envMapIntensity: 4.7,
                  color: type == "education" ? "#00617f" : "#156d00",
                };
                CACHE.educationModels.push(gchild)
              }
              gchild.scale.set(1.1, 1.1, 1.1);
              if (gchild.geometry.boundingSphere.radius > 50) {
                gchild.material.color.set("#3f3c00");
                gchild.material.roughness = 0.8;
                gchild.material.matalness = 0.4;
                gchild.material.envMapIntensity = 4.7;

                gchild.userData.environment = {
                  color: "#3f3c00",
                  roughness: 0.8,
                  metalness: 0.4,
                  envMapIntensity: 4.7,
                };
              } else {
                gchild.material.color.set("#003800");
                gchild.material.roughness = 0.8;
                gchild.material.matalness = 0.4;
                gchild.material.envMapIntensity = 4.7;

                gchild.userData.environment = {
                  color: "#003800",
                  roughness: 0.8,
                  metalness: 0.4,
                  envMapIntensity: 4.7,
                };
              }

              CACHE.seperateModels.push(gchild);
              // gchild.visible = false;
            });
          } else {
            child.visible = false;
          }
        });
      } else {
        model.scale.set(100, 100, 100);
        if (STATE.enterprisesNames.includes(model.name)) {
          CACHE.innerEnterprises.push(model);
          // model.visible = false;
          const pos = STATE.enterprisesStates[model.name];
          model.position.set(pos.x, pos.y, pos.z);
        }
      }
    },
    onLoad: (evt) => {
      window.container = evt;
      window.position = evt.orbitControls.object;
      evt.clickObjects = [];

      // console.log(evt.sceneModels , evt.clickObjects);

      // ************** init icons start **************
      // API.loadIcons();  // 6大区标签
      API.loadEnterPrises(); // 企业标签
      API.loadEnterPrisesInnerIcon() // 企业内部标签
      // ************** init icons end **************

      // 5大板块
      API.loadIndustrialEconomy();
      API.loadTraffic();
      API.loadEducation();
      API.loadEnergy()

      // 地球模块
      API.loadEarth(() => {
        API.hideFloor();
        API.hideSkyBox();
        // earth load finish
        API.cameraAnimation({
          duration: 0,
          cameraState: STATE.earthState,
          callback: () => {
            
            API.earthRotateAnimation();
            API.startEarthLineAnimation();

            if (CACHE.container.loadingBar) CACHE.container.loadingBar.style.visibility = "hidden";

            API.hideAll();
          },
        });
      });

      // floor
      const floorGeo = new Bol3D.CircleBufferGeometry(50000, 64);
      floorGeo.rotateX(-Math.PI / 2);
      const floorMat = new Bol3D.MeshLambertMaterial({
        color: "#000056",
        transparent: true,
        opacity: 0.697,
      });
      const floor = new Bol3D.Mesh(floorGeo, floorMat);
      CACHE.floor = floor;
      // floor.receiveShadow = true
      // evt.clickObjects = [floor];
      // evt.clickObjects.push(floor)
      evt.scene.add(floor);

      // mirror
      const mirrorGeo = new Bol3D.CircleBufferGeometry(50000, 64);
      const groundMirror = new Bol3D.Reflector(mirrorGeo, {
        clipBias: 0.0003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777,
      });
      groundMirror.position.y = -1;
      groundMirror.rotateX(-Math.PI / 2);
      CACHE.floorMirror = groundMirror;
      evt.scene.add(groundMirror)

      // ********************** gui start **********************
      // const gui = new dat.GUI();
      // // scenes
      // const scenesFolder = gui.addFolder("场景");
      // // floor
      // const defaults = {
      //   vertical: 24000,
      //   shapeColor: "#ffffff",
      //   shapeExtrude: "#ffffff",
      //   lineBottom: "#ffffff",
      //   line: "#ffffff",
      //   floorOpacity: 1,
      //   floorColor: "#101119",
      //   buildingColor: "#ffffff",
      //   fogColor: "#111472",
      //   skySize: 2,
      //   minHeight: -155,
      //   maxHeight: -36,
      //   city1Color: "#0000ff",
      //   city1StripeColor: "#00ffff",
      //   city1MixColor: "#ff0000",
      // };

      // scenesFolder
      //   .add(defaults, "vertical")
      //   .name("水平起始")
      //   .onChange((val) => {
      //     CACHE.industries.forEach((c) => {
      //       c.material.uniforms.vertical.value = val;
      //     });
      //   });

      // scenesFolder.addColor(defaults, "shapeColor").onChange((val) => {
      //   CACHE.industries.forEach((c, index) => {
      //     c.material.uniforms.color.value.set(val);
      //   });
      // });

      // scenesFolder.addColor(defaults, "shapeExtrude").onChange((val) => {
      //   CACHE.industries.forEach((c) => {
      //     c.material.uniforms.gradient.value.set(val);
      //   });
      // });

      // scenesFolder
      //   .addColor(defaults, "city1Color")
      //   .onChange((val) => {
      //     // CACHE.cities.forEach((d) => {
      //     //   if (d.isMesh) {
      //     //     d.material.uniforms.color.value.set(val);
      //     //   }
      //     // });
      //     CACHE.cities2.forEach((d) => {
      //       if (d.isMesh) {
      //         d.material.uniforms.color.value.set(val);
      //       }
      //     });
      //   })
      //   .name("color");

      // scenesFolder
      //   .addColor(defaults, "city1StripeColor")
      //   .onChange((val) => {
      //     // CACHE.cities.forEach((d) => {
      //     //   if (d.isMesh) {
      //     //     d.material.uniforms.emissive.value.set(val);
      //     //   }
      //     // });
      //     CACHE.cities2.forEach((d) => {
      //       if (d.isMesh) {
      //         d.material.uniforms.emissive.value.set(val);
      //       }
      //     });
      //   })
      //   .name("emissive");

      // scenesFolder
      //   .addColor(defaults, "city1MixColor")
      //   .onChange((val) => {
      //     // CACHE.cities.forEach((d) => {
      //     //   if (d.isMesh) {
      //     //     d.material.uniforms.mixColor.value.set(val);
      //     //   }
      //     // });
      //     CACHE.cities2.forEach((d) => {
      //       if (d.isMesh) {
      //         d.material.uniforms.mixColor.value.set(val);
      //       }
      //     });
      //   })
      //   .name("mixColor");

      // scenesFolder
      //   .add(defaults, "maxHeight")
      //   .name("maxHeight")
      //   .step(1)
      //   .onChange((val) => {
      //     // CACHE.cities.forEach((d) => {
      //     //   if (d.isMesh) {
      //     //     d.material.uniforms.maxHeight.value = val;
      //     //   }
      //     // });
      //     CACHE.cities2.forEach((d) => {
      //       if (d.isMesh) {
      //         d.material.uniforms.maxHeight.value = val;
      //       }
      //     });
      //   });
      // scenesFolder
      //   .add(defaults, "minHeight")
      //   .name("minHeight")
      //   .step(1)
      //   .onChange((val) => {
      //     // CACHE.cities.forEach((d) => {
      //     //   if (d.isMesh) {
      //     //     d.material.uniforms.minHeight.value = val;
      //     //   }
      //     // });
      //     CACHE.cities2.forEach((d) => {
      //       if (d.isMesh) {
      //         d.material.uniforms.minHeight.value = val;
      //       }
      //     });
      //   });

      // // scenesFolder.add(floor.material, 'opacity', 0, 1).step(0.001).name('地板透明度')
      // // // toneMapping
      // scenesFolder
      //   .add(evt.renderer, "toneMappingExposure", 0, 10)
      //   .step(0.001)
      //   .name("exposure");
      // scenesFolder
      //   .add(evt.ambientLight, "intensity")
      //   .step(0.001)
      //   .min(0)
      //   .name("环境光强度");
      // scenesFolder
      //   .add(evt.directionLights[0], "intensity")
      //   .step(0.001)
      //   .min(0)
      //   .name("平行光1强度");
      // scenesFolder.add(evt.directionLights[0].position, "x").name("平行光1X");
      // scenesFolder.add(evt.directionLights[0].position, "y").name("平行光1Y");
      // scenesFolder.add(evt.directionLights[0].position, "z").name("平行光1Z");
      // // scenesFolder.add(evt.directionLights[1], 'intensity').step(0.001).min(0).name('平行光2强度')
      // // scenesFolder.add(evt.directionLights[1].position, 'x').name('平行光2X')
      // // scenesFolder.add(evt.directionLights[1].position, 'y').name('平行光2Y')
      // // scenesFolder.add(evt.directionLights[1].position, 'z').name('平行光2Z')
      // scenesFolder
      //   .addColor(defaults, "fogColor")
      //   .name("雾颜色")
      //   .onChange((val) => {
      //     CACHE.container.scene.fog.color.set(val);
      //   });
      // scenesFolder
      //   .addColor(defaults, "floorColor")
      //   .name("地板颜色")
      //   .onChange((val) => {
      //     floorMat.color.set(val);
      //   });
      // scenesFolder
      //   .add(defaults, "floorOpacity")
      //   .step(0.001)
      //   .min(0)
      //   .name("地板透明度")
      //   .onChange((val) => {
      //     floorMat.opacity = val;
      //   });
      // scenesFolder
      //   .add(evt.scene.fog, "density")
      //   .step(0.000001)
      //   .min(0)
      //   .name("雾强度");
      // scenesFolder
      //   .add(defaults, "skySize")
      //   .step(0.5)
      //   .min(0)
      //   .name("天空盒大小")
      //   .onChange((val) => {
      //     evt.sky.scale.set(val, val, val);
      //   });

      // scenesFolder
      //   .addColor(defaults, "line")
      //   .name("line")
      //   .onChange((val) => {
      //     CACHE.lines.forEach(l => {
      //       l.material.color.set(val)
      //     })

      //     // CACHE.earthLines.forEach((l) => {
      //     //   l.material.color.set(val);
      //     // });
      //   });
      // scenesFolder
      //   .addColor(defaults, "lineBottom")
      //   .name("lineBottom")
      //   .onChange((val) => {
      //     CACHE.linesBottom.forEach(l => {
      //       l.material.color.set(val)
      //     })

      //     // CACHE.earthLinesBottom.forEach((l) => {
      //     //   l.material.color.set(val);
      //     // });
      //   });

      // const earthG = {
      //   rotation: { x: 0, y: 0, z: 0 },
      //   roughness: 1,
      //   metalness: 1,
      //   envMapIntensity: 1.5,
      //   color1: "#ff0000",
      //   color2: "#ff0000",
      //   color3: "#ff0000",
      // };
      // scenesFolder
      //   .add(earthG.rotation, "y")
      //   .step(0.1)
      //   .name("Y")
      //   .onChange((val) => {
      //     CACHE.earthGroup.rotation.y = (val * Math.PI) / 180;
      //   });

      // scenesFolder
      //   .add(earthG, "roughness")
      //   .step(0.01)
      //   .onChange((val) => {
      //     CACHE.earthGroup.children[0].material.roughness = val;
      //   });

      // scenesFolder
      //   .add(earthG, "metalness")
      //   .step(0.01)
      //   .onChange((val) => {
      //     CACHE.earthGroup.children[0].material.metalness = val;
      //   });

      // scenesFolder
      //   .add(earthG, "envMapIntensity")
      //   .step(0.01)
      //   .onChange((val) => {
      //     CACHE.earthGroup.children[0].material.envMapIntensity = val;
      //   });

      // scenesFolder.addColor(earthG, "color1").onChange((val) => {
      //   CACHE.earthVics.forEach((ev) => {
      //     ev.material.color.set(val);
      //   });
      // });
      // // scenesFolder.addColor(earthG, "color2").onChange((val) => {
      // //   CACHE.earthTitles.forEach((ev) => {
      // //     ev.update({
      // //       bgColor: val
      // //     })
      // //   });
      // // });
      // scenesFolder.addColor(earthG, "color3").onChange((val) => {
      //   CACHE.earthCircles.forEach((ev) => {
      //     ev.material.uniforms.color.value.set(val);
      //   });
      // });

      // // ****************** indurstries start ******************
      // const industriesOpts = {
      //   circleColor: "#ff0000",
      //   cubeColor: "#ff0000",
      //   cubeMix: "#ff0000",
      //   cubeMix2: "#ff0000",
      //   cubeThreshold: 2,
      // };
      // scenesFolder.addColor(industriesOpts, "circleColor").onChange((val) => {
      //   CACHE.industries.forEach((ev) => {
      //     ev.children[1].material.uniforms.color.value.set(val);
      //     ev.children[2].material.uniforms.color.value.set(val);
      //   });
      // });
      // scenesFolder.addColor(industriesOpts, "cubeColor").onChange((val) => {
      //   CACHE.industries.forEach((ev) => {
      //     ev.children[0].material.uniforms.color.value.set(val);
      //   });
      // });
      // scenesFolder.addColor(industriesOpts, "cubeMix").onChange((val) => {
      //   CACHE.industries.forEach((ev) => {
      //     ev.children[0].material.uniforms.mixColor.value.set(val);
      //   });
      // });
      // scenesFolder.addColor(industriesOpts, "cubeMix2").onChange((val) => {
      //   CACHE.industries.forEach((ev) => {
      //     ev.children[0].material.uniforms.mixColor2.value.set(val);
      //   });
      // });
      // scenesFolder.add(industriesOpts, "cubeThreshold").onChange((val) => {
      //   CACHE.industries.forEach((ev) => {
      //     ev.children[0].material.uniforms.threshold.value = val;
      //   });
      // });

      // // ****************** indurstries end ******************

      // // ****************** seperate start ******************
      // const seperate = {
      //   color: "#ff0000",
      //   envMapIntensity: 1,
      //   roughness: 1,
      //   metalness: 1,
      // };
      // const seperateFolder = gui.addFolder("单体化");
      // seperateFolder.addColor(seperate, "color").onChange((val) => {
      //   CACHE.seperateModels.forEach((d) => {
      //     d.material.color.set(val);
      //   });
      // });
      // seperateFolder.add(seperate, "envMapIntensity").onChange((val) => {
      //   CACHE.seperateModels.forEach((d) => {
      //     d.material.envMapIntensity = val;
      //   });
      // });
      // seperateFolder.add(seperate, "roughness").onChange((val) => {
      //   CACHE.seperateModels.forEach((d) => {
      //     d.material.roughness = val;
      //   });
      // });
      // seperateFolder.add(seperate, "metalness").onChange((val) => {
      //   CACHE.seperateModels.forEach((d) => {
      //     d.material.metalness = val;
      //   });
      // });

      // ****************** seperate end ******************

      // ********************** gui end **********************
    },
  });

  window.container = () => console.log(CACHE.container);

  const events = new Bol3D.Events(CACHE.container);
  events.enabled.hover = false;
  events.ondbclick = (e) => {
    console.log("e", e);

    // console.log(e, e.objects[0].point , e.objects[0].object.name)

    // e.objects[0].object.visible = false
    // const icon = new Bol3D.CompositeIconTitle({
    //   titleHeight: 0.5,
    //   color: Math.random() * 555555,
    //   type: 2,
    //   title: e.objects[0].object.name
    // })

    // icon.position.copy(e.objects[0].point)
    // CACHE.container.scene.attach(icon)
    // icon.scale.set(3000, 3000, 3000)

    if (e.objects.length > 0) {
      // const name = e.objects[0].object.name;
    }
  };

  // events.onhover = (e) => {}

  events.onclick = (e) => {
    // console.log('ee', e)
    if (e.objects.length == 0) return;
    const obj = e.objects[0].object;
    if (obj.userData.name == "智能制造") {
      API.showModels();
      API.showIcons();
      // console.log('下钻')
      API.cameraAnimation({
        cameraState: STATE.earthState,
        callback: () => {
          API.cameraAnimation({
            cameraState: STATE.earthState2,
            callback: () => {
              API.cameraAnimation({
                cameraState: STATE.industrialState,
                callback: () => {
                  store.commit("changeLevel", 1);
                  router.push("/IndustrialEconomy");

                  CACHE.container.orbitControls.maxDistance =
                    STATE.CAMERA_BOUNDS;
                  CACHE.container.orbitControls.minPolarAngle = Math.PI * 0.05;
                  CACHE.container.orbitControls.maxPolarAngle = Math.PI * 0.44;
                  CACHE.container.orbitCamera.far = 100000;
                  CACHE.container.bounds.radius = STATE.CAMERA_BOUNDS;
                  CACHE.container.bounds.center.set(0, 0, 0);

                  API.hideEarth();
                  API.showFloor();
                  API.showSkyBox();
                  API.showRoutes();
                  API.showIndustrialEconomy();
                },
              });
            },
          });
        },
      });
    } else if (STATE.enterpriseIconNames.includes(obj.name)) {
      // obj.parent.visible && obj.parent.showTitle && obj.parent.showTitle();
    } else if(obj.userData.type == 'enterpriseIconInner'){
      CACHE.container.cameraFocus({
        target: obj.position,
        distance: 2000
      })
    }
  };
};
