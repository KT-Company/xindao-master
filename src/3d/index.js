import { API } from "./API.js";
import { STATE } from "./STATE.js";
import { CACHE } from "./CACHE.js";
import { DATA } from "./DATA.js";
import store from "@/2d/store";
import router from "@/2d/router";
import { handleBackMap, handleBMenuBMap } from "@/2d/hooks/use3dhandle";
import { menu } from '@/2d/hooks/useMenu'
import progress from './js/progress'

let Bol3D = window.Bol3D;

window.CACHE = CACHE
progress.init()
let progressCount = 0
// const progresstTotal = 30046
const progresstTotal = 17



export const sceneOnLoad = ({ domElement, callback }) => {
  CACHE.container = new Bol3D.Container({
    publicPath: STATE.DEV_ENV,
    container: domElement,
    viewState: "orbit",
    bloomEnabled: true,
    bloom: {
      bloomStrength: 1.25,
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
          STATE.initialState.position.x,
          STATE.initialState.position.y,
          STATE.initialState.position.z,
        ],
        near: 0.1,
        far: 100000,
        fov: 60,
      },
    },
    controls: {
      orbitControls: {
        autoRotate: false,
        autoRotateSpeed: 1,
        target: [
          STATE.initialState.target.x,
          STATE.initialState.target.y,
          STATE.initialState.target.z,
        ],
        maxDistance: STATE.CAMERA_BOUNDS,
        maxPolarAngle: Math.PI * 0.49,
        minPolarAngle: Math.PI * 0.01,
        enableDamping: true,
        dampingFactor: 0.05,
      },
    },
    bounds: {
      radius: STATE.CAMERA_BOUNDS,
      center: [0, 0, 0],
    },
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
      "/assets/models/BeiJing/Aqu-1.glb",
      "/assets/models/BeiJing/Bqu.glb",
      "/assets/models/BeiJing/Cqu.glb",
      "/assets/models/BeiJing/Dqu.glb",
      "/assets/models/BeiJing/Equ.glb",
      "/assets/models/BeiJing/Fqu.glb",
      "/assets/models/BeiJing/qiyezhulou.glb",
      "/assets/models/BeiJing/qiyepeilou.glb",
      // *** 内部 ***
      "/assets/models/NeiBu/GongYingBanGongShi.glb",
      "/assets/models/NeiBu/JingXiaoBanGongShi.glb",
      "/assets/models/NeiBu/Xiao_Shou_Gong_Si.glb",
      "/assets/models/NeiBu/yinghang.glb",
      "/assets/models/NeiBu/zhengwuzhongxinbangongshi.glb",
      "/assets/models/NeiBu/zhizaojituanbangongshi.glb",
      "/assets/models/NeiBu/zonghefuwulou.glb",
      "/assets/models/NeiBu/wuliubangongshi.glb",

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
      show: false,
      type: 5,
    },
    onProgress: (model) => {
      progressCount++
      const num = (progressCount/progresstTotal) * 100
      progress.update(num)
      if (STATE.baseModelNames.includes(model.name)) {
        model.scale.set(2, 3.8, 2);
        if (model.name == "Aqu-1") {
          let count = 0;
          model.traverse((gchild) => {
            if (gchild.isMesh) {
              count++;

              const geoClone = gchild.geometry.clone().toNonIndexed();

              const updatedPos = geoClone.getAttribute("position").array;
              for (let i = 0; i < updatedPos.length; i += 3) {
                updatedPos[i] =
                  updatedPos[i] +
                  gchild.position.x +
                  gchild.parent.position.x +
                  gchild.parent.parent.position.x +
                  model.position.x;
                updatedPos[i + 1] =
                  updatedPos[i + 1] +
                  gchild.position.y +
                  gchild.parent.position.y +
                  gchild.parent.parent.position.y +
                  model.position.y;
                updatedPos[i + 2] =
                  updatedPos[i + 2] +
                  gchild.position.z +
                  gchild.parent.position.z +
                  gchild.parent.parent.position.z +
                  model.position.z;
              }

              const v3 = new Bol3D.Vector3();
              gchild.getWorldPosition(v3);
              if (count % 100 == 0) {
                CACHE.mergedGeos["medical"].push(geoClone);
                DATA.educationPos.push({
                  position: v3,
                  type: 'medical',
                });
              } else if (count % 50 == 0) {
                CACHE.mergedGeos["education"].push(geoClone);
                DATA.educationPos.push({
                  position: v3,
                  type: 'education',
                });
              } else if (count % 2 == 0) {
                CACHE.mergedGeos["green"].push(geoClone);
              } else {
                CACHE.mergedGeos["yellow"].push(geoClone);
              }
            }
          });
        } else {
          let count = 0;
          model.traverse((gchild) => {
            if (gchild.isMesh) {
              count++;
              const geoClone = gchild.geometry.clone().toNonIndexed();

              const updatedPos = geoClone.getAttribute("position").array;
              for (let i = 0; i < updatedPos.length; i += 3) {
                updatedPos[i] =
                  updatedPos[i] +
                  gchild.position.x +
                  gchild.parent.position.x +
                  model.position.x;
                updatedPos[i + 1] =
                  updatedPos[i + 1] +
                  gchild.position.y +
                  gchild.parent.position.y +
                  model.position.y;
                updatedPos[i + 2] =
                  updatedPos[i + 2] +
                  gchild.position.z +
                  gchild.parent.position.z +
                  model.position.z;
              }

              // CACHE.mergedGeos['other'].push(geoClone)

              if (count % 2 == 0) {
                CACHE.mergedGeos["green"].push(geoClone);
              } else {
                CACHE.mergedGeos["yellow"].push(geoClone);
              }
            }
          });
        }

        CACHE.container.scene.remove(model);
        model.traverse((m) => {
          if (m.isMesh) {
            m.geometry.dispose();
            m.material.dispose();
          }
        });
        model = null;

        // CACHE.cities.push(model);
        // CACHE.models.push(model);
      } else if (STATE.areaModelNames.includes(model.name)) {
        if (model.name == 'qiyepeilou') {
          model.scale.set(2, 3.8, 2);
          model.children.forEach(d => {
            if (d.isMesh) {
              d.material = new Bol3D.PrimitiveMaterial.BaseBuildingStripeMaterial(
                {
                  color: "#405887",
                  emissiveBase: "#969696",
                  minHeightBase: -142,
                  maxHeightBase: -125,
                  mixColorBase: "#01010a",
                  thresholdBase: -159,
                  minHeightStripe: -183,
                  maxHeightStripe: 36,
                  emissiveStripe: "#555555",
                }
              );
            }
          })
        }
        else if (model.name == 'qiyezhulou') {
          const keys = Object.keys(STATE.areaModelData)
          model.children.forEach(m => {
            if (keys.includes(m.name)) {
              const data = STATE.areaModelData[m.name]
              const { position, scale } = data
              m.position.set(position.x, position.y, position.z)
              m.scale.set(scale.x, scale.y, scale.z)
            }
          })
        }
        CACHE.cities2.push(model);
        CACHE.models.push(model);
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

      // console.log("CACHE.mergeGeos", CACHE.mergedGeos);

      // *** merge geo start***
      CACHE.mergedMaterials = {
        'education': new Bol3D.MeshStandardMaterial({
          roughness: 1,
          metalness: 1,
          envMapIntensity: 4.7,
          color: "#00617f",
          envMap: CACHE.container.envMap,
        }),
        'medical': new Bol3D.MeshStandardMaterial({
          roughness: 1,
          metalness: 1,
          envMapIntensity: 4.7,
          color: "#ff0000",
          envMap: CACHE.container.envMap,
        }),
        'yellow': new Bol3D.MeshStandardMaterial({
          color: "#3f3c00",
          roughness: 0.8,
          metalness: 0.4,
          envMapIntensity: 4.7,
          envMap: CACHE.container.envMap,
        }),
        'green': new Bol3D.MeshStandardMaterial({
          color: "#003800",
          roughness: 0.8,
          metalness: 0.4,
          envMapIntensity: 4.7,
          envMap: CACHE.container.envMap,
        }),
        'other': new Bol3D.PrimitiveMaterial.BaseBuildingGradientMaterial({
          color: "#1a2199",
          emissive: "#ff004b",
          minHeight: -142,
          maxHeight: -82,
          threshold: -155,
          mixColor: "#512c2c",
        })
      }

      for (const key in CACHE.mergedGeos) {
        const geos = CACHE.mergedGeos[key];
        if (geos.length == 0) continue;
        const mainGeo = new Bol3D.BufferGeometry();

        let posLen = 0;
        let normLen = 0;
        let sumPosCursor = 0;
        let sumNormCursor = 0;

        for (let i = 0; i < geos.length; i++) {
          posLen += geos[i].getAttribute("position").array.length;
          normLen += geos[i].getAttribute("normal").array.length;
        }

        let sumPosArr = new Float32Array(posLen);
        let sumNormArr = new Float32Array(normLen);

        for (let i = 0; i < geos.length; i++) {
          let posAttArr = geos[i].getAttribute("position").array;
          for (let j = 0; j < posAttArr.length; j++) {
            sumPosArr[j + sumPosCursor] = posAttArr[j];
          }
          sumPosCursor += posAttArr.length;

          let numAttArr = geos[i].getAttribute("normal").array;
          for (let j = 0; j < numAttArr.length; j++) {
            sumNormArr[j + sumNormCursor] = numAttArr[j];
          }
          sumNormCursor += numAttArr.length;
        }

        mainGeo.setAttribute(
          "position",
          new Bol3D.BufferAttribute(sumPosArr, 3)
        );
        mainGeo.setAttribute(
          "normal",
          new Bol3D.BufferAttribute(sumNormArr, 3)
        );

        const mergeMesh = new Bol3D.Mesh(
          mainGeo,
          CACHE.mergedMaterials['other']
        );

        CACHE.container.scene.add(mergeMesh);
        mergeMesh.scale.set(2, 3.8, 2);

        CACHE.mergedMeshes[key] = mergeMesh
      }

      // *** merge geo end***

      CACHE.cities2.forEach((c) => {
        if (c.name == 'qiyezhulou') {
          c.children.forEach((d) => {
            for (const i in STATE.areaModelMap) {
              if (STATE.areaModelMap[i].includes(d.name)) {
                if (d.name === 'ZWDL_DaLou') {
                  d.scale.set(35, 35, 35)
                  d.position.y = 0
                }
                d.traverse((m) => {
                  if (m.isMesh) {
                    evt.clickObjects.push(m);
                    m.userData.name = STATE.modelExcludeMap[i];
                  }
                });
              }
            }
          });
        }
      });

      // console.log(evt.sceneModels , evt.clickObjects);

      const promiseAll = [];

      // ************** init icons start **************
      API.loadEnterPrises(); // 企业标签
      API.loadEnterPrisesInnerIcon(); // 企业内部标签
      // ************** init icons end **************

      // 3圈3流
      API.loadThreeCircles();
      API.loadThreeFlows();

      // 5大板块
      API.loadEnergy();
      promiseAll.push(API.loadIndustrialEconomy());
      promiseAll.push(API.loadTraffic());
      promiseAll.push(API.loadEducation());

      Promise.all(promiseAll).then(() => {
        progress.update(100)
        if (CACHE.container.loadingBar)
          CACHE.container.loadingBar.style.visibility = "hidden";
        API.hideAll();
        API.showModels();
        API.showRoutes();
        API.showFloor();
        API.showMirror();

        let animationId = -1;
        CACHE.container.orbitControls.enabled = false
        const rotateAnimation = () => {
          animationId = requestAnimationFrame(rotateAnimation);

          let angle = CACHE.container.orbitControls.getAzimuthalAngle();
          angle -= 0.015;
          const offset = new Bol3D.Vector3().subVectors(
            CACHE.container.orbitCamera.position,
            CACHE.container.orbitControls.target
          );
          const spherical = new Bol3D.Spherical().setFromVector3(offset);
          spherical.theta = angle;
          offset.setFromSpherical(spherical);
          const newPOS = new Bol3D.Vector3();
          newPOS.copy(CACHE.container.orbitControls.target).add(offset);

          CACHE.container.orbitCamera.position.copy(newPOS);

          if (spherical.theta <= - .9 * Math.PI) {
            cancelAnimationFrame(animationId);

            API.cameraAnimation({
              cameraState: store.state.MODE === 'BUSINESS' ? STATE.enterpriseStates[store.state.enterpriseInfo.cameraKey] : STATE.industrialState,
              callback: () => {
                if (store.state.MODE === 'BUSINESS') {
                  store.commit("changeLevel", store.state.enterpriseInfo.level);
                  router.push(store.state.enterpriseInfo.path);
                } else {
                  store.commit("changeLevel", 1);
                  router.push("/IndustrialEconomy");
                }
                API.showIndustrialEconomy();
                store.state.MODE === 'BUSINESS' && handleBackMap[store.state.menuAid]()
              },
            });
          }
        };

        rotateAnimation();
      });

      // API.hideAll();
      // API.showModels();
      // API.showRoutes();

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
        clipBias: -0.005,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x777777,
      });
      groundMirror.position.y = -1;
      groundMirror.rotateX(-Math.PI / 2);
      CACHE.floorMirror = groundMirror;
      evt.scene.add(groundMirror);

      // ********************** gui start **********************
      // const gui = new dat.GUI();
      // ****************** base models start ******************
      // const baseModelsFolder = gui.addFolder("基础模型");
      // const baseModelsOpts = {
      //   color: "#1a2199",
      //   emissive: "#ff004b",
      //   minHeight: -142,
      //   maxHeight: -82,
      //   threshold: 0,
      //   mixColor: "#512c2c",
      // };
      // baseModelsFolder.addColor(baseModelsOpts, "color").onChange((val) => {
      //   mergeMesh.material.uniforms.color.value.set(val);
      // });
      // baseModelsFolder.addColor(baseModelsOpts, "emissive").onChange((val) => {
      //   mergeMesh.material.uniforms.emissive.value.set(val);
      // });
      // baseModelsFolder.addColor(baseModelsOpts, "mixColor").onChange((val) => {
      //   mergeMesh.material.uniforms.mixColor.value.set(val);
      // });
      // baseModelsFolder.add(baseModelsOpts, "minHeight").onChange((val) => {
      //   mergeMesh.material.uniforms.minHeight.value = val;
      // });
      // baseModelsFolder.add(baseModelsOpts, "maxHeight").onChange((val) => {
      //   mergeMesh.material.uniforms.maxHeight.value = val;
      // });
      // baseModelsFolder.add(baseModelsOpts, "threshold").onChange((val) => {
      //   mergeMesh.material.uniforms.threshold.value = val;
      // });

      // ****************** base models end ******************

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

      // ****************** 3圈 start ****************
      // const threeCirclesFolder = gui.addFolder('3圈')
      // const threeCircles = {size: 1000 , color: '#ff0000' , edgeColor: '#ff0000', position: {x: 0, y:0 ,z :0}}
      // threeCirclesFolder.add(threeCircles , 'size').onChange(val => {
      //   CACHE.threeCircles[2].scale.set(val, val, val)
      // })
      // threeCirclesFolder.add(threeCircles.position , 'x').onChange(val => {
      //   CACHE.threeCircles[2].position.x = val
      // })
      // threeCirclesFolder.add(threeCircles.position , 'y').onChange(val => {
      //   CACHE.threeCircles[2].position.y = val
      // })
      // threeCirclesFolder.add(threeCircles.position , 'z').onChange(val => {
      //   CACHE.threeCircles[2].position.z = val
      // })
      // threeCirclesFolder.addColor(threeCircles , 'color').onChange(val => {
      //   CACHE.threeCircles[2].material.uniforms.color.value.set(val)
      // })
      // threeCirclesFolder.addColor(threeCircles , 'edgeColor').onChange(val => {
      //   CACHE.threeCircles[2].material.uniforms.edgeColor.value.set(val)
      // })
      // ****************** 3圈 end ****************

      // ****************** 3流 start ****************
      // const threeFlowsFolder = gui.addFolder('3流')
      // const threeFlows = {color: '#ff0000'}
      // threeFlowsFolder.addColor(threeFlows , 'color').onChange(val => {
      //   CACHE.threeFlows['money'].forEach( tf => {
      //     tf.material.uniforms.diffuse.value.set(val)
      //   })

      // })
      // ****************** 3流 end ****************

      // models
      // const areaModels = {
      //   color: '#606089',
      // emissiveBase: '#282828',
      // minHeightBase: -122,
      // maxHeightBase: -112,
      // mixColorBase: '#545575',
      // thresholdBase: 0,
      // minHeightStripe: -183,
      // maxHeightStripe: -90,
      // emissiveStripe: '#555555'
      // }
      // const areasModelFolder = gui.addFolder('区域模型')
      // areasModelFolder.addColor(areaModels, 'color').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.color.value.set(val)
      //   })
      // })
      // areasModelFolder.addColor(areaModels, 'emissiveBase').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.emissiveBase.value.set(val)
      //   })
      // })
      // areasModelFolder.addColor(areaModels, 'mixColorBase').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.mixColorBase.value.set(val)
      //   })
      // })
      // areasModelFolder.addColor(areaModels, 'emissiveStripe').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.emissiveStripe.value.set(val)
      //   })
      // })

      // areasModelFolder.add(areaModels, 'minHeightBase').step(1).onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.minHeightBase.value = val
      //   })
      // })
      // areasModelFolder.add(areaModels, 'maxHeightBase').step(1).onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.maxHeightBase.value = val
      //   })
      // })
      // areasModelFolder.add(areaModels, 'thresholdBase').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.thresholdBase.value = val
      //   })
      // })
      // areasModelFolder.add(areaModels, 'minHeightStripe').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.minHeightStripe.value = val
      //   })
      // })
      // areasModelFolder.add(areaModels, 'maxHeightStripe').onChange((val) => {
      //   CACHE.cities2.forEach( d => {
      //         d.material.uniforms.maxHeightStripe.value = val
      //   })
      // })

      // ********************** gui end **********************
    },
  });

  window.container = () => console.log(CACHE.container);

  window.outCooroutCoordinate = () => {
    let points = CACHE.container.orbitControls.target;
    let camera = CACHE.container.orbitCamera.position;
    return [
      [Math.round(points.x), Math.round(points.y), Math.round(points.z)],
      [Math.round(camera.x), Math.round(camera.y), Math.round(camera.z)],
    ];
  };

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

    if (e.objects.length == 0) return;

    // 过滤检测到的visible为false的物体
    let count = e.objects.length;
    while (count > 0) {
      if (e.objects[0].object.visible) {
        count = 0;
      } else {
        e.objects.splice(0, 1);
        count--;
      }
    }

    if (e.objects.length == 0) return;

    const obj = e.objects[0].object;
    if (STATE.enterpriseIconNames.includes(obj.name) && obj.parent.visible) {
      if (store.state.LEVEL == 2) {
        store.commit("setMenuBid", null);
        API.hideEnterpriseIcons();
        API.hideThreeCircles();
        API.hideThreeFlows();
        API.cameraAnimation({
          cameraState: STATE.enterpriseStates[obj.parent.userData.type],
          callback: () => {
            obj.parent.children[obj.parent.children.length - 1].visible = true;
            store.commit("changeLevel", 3);
            store.commit("setMenuBid", null);
            if (STATE.enterpriseInnerMap[obj.parent.userData.type])
              store.commit(
                "setPickId",
                STATE.enterpriseInnerMap[obj.parent.userData.type].id
              );
            store.commit(
              "setMenuAid",
              STATE.enterpriseInnerMap[obj.parent.userData.type].id
            );
          },
        });
      }
    } else if (
      Object.values(STATE.modelExcludeMap).includes(obj.userData.name)
    ) {
      if (store.state.LEVEL == 2) {
        store.commit("setMenuBid", null);
        API.hideEnterpriseIcons();
        API.hideThreeFlows();
        API.hideThreeCircles();
        API.cameraAnimation({
          cameraState: STATE.enterpriseStates[obj.userData.name],
          callback: () => {
            CACHE.enterpriseIcons.forEach((d) => {
              if (d.userData.type == obj.userData.name)
                d.children[d.children.length - 1].visible = true;
            });
            store.commit("changeLevel", 3);
            store.commit("setMenuBid", null);
            if (STATE.enterpriseInnerMap[obj.userData.name])
              store.commit(
                "setPickId",
                STATE.enterpriseInnerMap[obj.userData.name].id
              );
            store.commit(
              "setMenuAid",
              STATE.enterpriseInnerMap[obj.userData.name].id
            );
          },
        });
      } else if (store.state.LEVEL == 3) {
        if (Object.keys(STATE.enterpriseInnerMap).includes(obj.userData.name)) {
          // 整体布局
          API.hideAll();
          API.showEnterpriseByName(
            STATE.enterpriseInnerMap[obj.userData.name].name
          );
          if (STATE.enterpriseInnerMap[obj.userData.name].hasInnerIcon)
            API.showEnterpriseIconInnerByType(
              STATE.enterpriseInnerMap[obj.userData.name].name
            );
          API.showMirror();
          API.cameraAnimation({
            cameraState: STATE.enterpriseInnerStates[obj.userData.name],
          });
          store.commit("setMenuBid", null);
          store.commit(
            "setMenuBid",
            `${STATE.enterpriseInnerMap[obj.userData.name].id}-${STATE.enterpriseInnerMap[obj.userData.name].cid
            }`
          );
          store.commit("changeLevel", 4);
          router.push(STATE.enterpriseInnerMap[obj.userData.name].path);
        }
      }
    }
  };

  // events.onhover = (e) => {}

  events.onclick = (e) => {
    // console.log('ee', e)
    if (e.objects.length == 0) return;

    // 过滤检测到的visible为false的物体
    let count = e.objects.length;
    while (count > 0) {
      if (e.objects[0].object.visible) {
        count = 0;
      } else {
        e.objects.splice(0, 1);
        count--;
      }
    }

    if (e.objects.length == 0) return;

    const obj = e.objects[0].object;
    if (STATE.enterpriseIconNames.includes(obj.name) && obj.parent.visible) {
      if (store.state.LEVEL == 2 && obj.name != "管委会") {
        store.commit("setMenuBid", null);
        API.showEnterpriseIcons();
        API.hideEnterpriseIconPopups();
        API.hideThreeCircles();
        API.hideThreeFlows();
        API.showThreeFlowsByName(obj.name);
      }
    } else if (obj.userData.type == "enterpriseIconInner" && obj.visible) {
      const name = obj.text == '企业管理部' ? '企管部' : obj.text
      try {
        const son = menu.value.find(item => item.id == store.state.menuAid).children.find(item => item.name == name)
        handleBMenuBMap[son.id]()
        store.commit("setMenuBid", son.id);
        router.push(son.path);
      } catch (error) {
        CACHE.container.cameraFocus({
          target: obj.position,
          distance: 2000,
        });
        API.selectEnterpriseInnerIcon(obj.userData.enterprise, obj.userData.name)
        store.commit("setMenuBid", null);
        if (obj.userData.id) {
          store.commit(
            "setMenuBid",
            obj.userData.id
          );
        }
      }

    } else if (
      Object.values(STATE.modelExcludeMap).includes(obj.userData.name)
    ) {
      // 企业模型
      if (
        store.state.LEVEL == 2 &&
        STATE.threeFlowsMap[obj.userData.name] != "管委会"
      ) {
        store.commit("setMenuBid", null);
        API.showEnterpriseIcons();
        API.hideEnterpriseIconPopups();
        API.hideThreeCircles();
        API.hideThreeFlows();
        API.showThreeFlowsByName(STATE.threeFlowsMap[obj.userData.name]);
      } else if (store.state.LEVEL == 3) {
        CACHE.enterpriseIcons.forEach((d) => {
          if (d.userData.type == obj.userData.name)
            d.children[d.children.length - 1].visible = true;
        });
      }
    }
  };
};
