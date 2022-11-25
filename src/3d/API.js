import { DATA } from "./DATA.js";
import { CACHE } from "./CACHE.js";
import { STATE } from "./STATE.js";
import store from "@/2d/store";

let Bol3D = window.Bol3D
let h337 = window.h337

// ******************************* 二维方法开始 *******************************

// 获取企业总量
function getEnterprise() {
  return store.state.enterpriseData;
}

// ******************************* 二维方法结束 *******************************

function loadIcons() {
  for (const data of DATA.iconsData) {
    const icon = new Bol3D.CompositeIconTag({
      titleHeight: 0.5,
      color: "#EBA216",
      type: 0,
      title: data.name,
    });
    CACHE.container.scene.add(icon);
    icon.children[0].material.color = new Bol3D.Color("#EBA216");
    icon.children[0].material.transparent = true;
    icon.children[0].material.opacity = 0.8;
    icon.scale.set(4000, 4000, 4000);
    icon.renderOrder = 100;
    icon.position.copy(data.position);
    icon.name = data.name;

    icon.children[0].traverse((child) => {
      if (child.isMesh) CACHE.container.addBloom(child);
    });
    icon.children[1].traverse((child) => {
      if (child.isMesh) CACHE.container.addBloom(child);
    });
    icon.children[2].traverse((child) => {
      if (child.isMesh) child.material.transparent = false;
    });

    icon.traverse((d) => {
      if (d.isMesh || d.isSprite) {
        d.name = data.name;
        CACHE.container.clickObjects.push(d);
      }
    });

    CACHE.icons.push(icon);
    // icon.visible = false
  }
}

// 根据名字找企业内部标签
function findEnterpriseInnerIconByName(data, name){
  let result
    data.forEach( d=> {
      if(d.name == name){
        result = d
      }
    })
  return result
}

// 企业内部标签
function loadEnterPrisesInnerIcon(){
  for(const i in STATE.enterprisesInnerIcons){
    const enterprise = STATE.enterprisesInnerIcons[i]
    for(const data of enterprise){
      const bsTitle = new Bol3D.Primitives.BaseTitle({
        text: data.name,
        bgColor: '#ff0000',
        type: 1,
        size: 150,
        fontSize: 50
      })
      CACHE.container.scene.add(bsTitle)
      CACHE.enterpriseIconsInner[i].push(bsTitle)
      bsTitle.renderOrder = 100
      bsTitle.position.set(data.position.x , data.position.y , data.position.z)
      bsTitle.visible = false

      CACHE.container.clickObjects.push(bsTitle)
      bsTitle.userData.type = 'enterpriseIconInner'
    }
  }

}

function loadEnterPrises() {
  for (const data of STATE.enterprisesIcons) {
    const icon = new Bol3D.CompositeIconHTML({
      color: "#EBA216",
      bgColor: "#031951",
      opacity: 0.6,
      titleHeight: 1,
      titleSize: 10,
      titleColor: "#ffffff",
      title: data.name,
      closed: false
    });
    CACHE.container.scene.add(icon);
    icon.position.copy(data.position);
    icon.scale.set(2000, 2000, 2000);

    CACHE.container.addBloom(icon.children[0]);
    CACHE.container.addBloom(icon.children[2]);
    icon.children[1].traverse((cihtml) => {
      if (cihtml.isMesh) {
        CACHE.container.addBloom(cihtml);
      }
    });
    icon.children[3].traverse((cihtml) => {
      if (cihtml.isMesh) {
        CACHE.container.addBloom(cihtml);
      }
    });
    icon.renderOrder = 100;
    icon.name = data.name;
    icon.visible = false;
    icon.hideTitle();

    CACHE.enterpriseIcons.push(icon);

    icon.traverse((d) => {
      if (d.isMesh) {
        d.name = data.name;
        CACHE.container.clickObjects.push(d);
      }
    });
  }
}


function hideIcons() {
  // 进入区域层
  CACHE.icons.forEach((ic) => {
    ic.visible = false;
  });
}

function showIcons() {
  CACHE.icons.forEach((ic) => {
    ic.visible = true;
  });
}

function showEnterpriseIconInnerByType(type){
  CACHE.enterpriseIconsInner[type].forEach( eIcon => {
    eIcon.visible = true
  })
}

function hideEnterpriseIconsInner(){
  for(const i in CACHE.enterpriseIconsInner){
    const enpriseIcons = CACHE.enterpriseIconsInner[i]
    enpriseIcons.forEach( eIcon => {
      eIcon.visible = false
    })
  }
}

function hideEnterpriseIcons() {
  CACHE.enterpriseIcons.forEach((epi) => {
    epi.visible = false;
    epi.hideTitle();
  });
}

function showEnterpriseIcons() {
  CACHE.enterpriseIcons.forEach((epi) => {
    epi.visible = true;
    epi.showTitle();
  });
}

function showEnterpriseIconByName(name) {
  CACHE.enterpriseIcons.forEach((epi) => {
    if (epi.name == name) {
      epi.visible = true;
      epi.showTitle();
    }
  });
}

function hideEnterprises() {
  CACHE.innerEnterprises.forEach((d) => {
    d.visible = false;
  });
}

function showEnterpriseByName(name) {
  CACHE.innerEnterprises.forEach((d) => {
    if (d.name == name) d.visible = true;
  });
}

// 相机动画（传指定state）
const targetPos = new Bol3D.Vector3();
const pos = new Bol3D.Vector3();
function cameraAnimation({
  cameraState,
  callback,
  delayTime = 0,
  duration = 800,
}) {
  targetPos.set(
    cameraState.target.x,
    cameraState.target.y,
    cameraState.target.z
  );
  pos.set(
    cameraState.position.x,
    cameraState.position.y,
    cameraState.position.z
  );

  if (
    targetPos.distanceTo(CACHE.container.orbitControls.target) < 0.0001 &&
    pos.distanceTo(CACHE.container.orbitControls.object.position) < 0.0001
  ) {
    callback && callback();
    return;
  }

  if (STATE.isAnimating) return;
  STATE.isAnimating = true;

  CACHE.container.orbitControls.enabled = false;

  let count = 0;

  const t1 = new Bol3D.TWEEN.Tween(
    CACHE.container.orbitControls.object.position
  )
    .to(
      {
        x: cameraState.position.x,
        y: cameraState.position.y,
        z: cameraState.position.z,
      },
      duration
    )
    .onUpdate(() => {})
    .onComplete(() => {
      count++;

      if (count == 2) {
        CACHE.container.orbitControls.enabled = true;
        STATE.isAnimating = false;
        callback && callback();
      }
    });

  t1.delay(delayTime).start();

  const t2 = new Bol3D.TWEEN.Tween(CACHE.container.orbitControls.target)
    .to(
      {
        x: cameraState.target.x,
        y: cameraState.target.y,
        z: cameraState.target.z,
      },
      duration
    )
    .onUpdate(() => {})
    .onComplete(() => {
      count++;
      if (count == 2) {
        CACHE.container.orbitControls.enabled = true;
        STATE.isAnimating = false;
        callback && callback();
      }
    });

  t1.delay(delayTime).start();
  t2.delay(delayTime).start();

  return t1;
}

/**
 * 产业经济->区域板块
 */
function loadIndustrialEconomy() {
  const img = new Image();
  img.src = STATE.DEV_ENV + "/assets/png/icons/icon1.png";
  img.onload = () => {
    for (const d of DATA.industryData) {
      const {data , position ,} = d
      const icon = new Bol3D.CompositeIconPopup({
        color: "#ff0000",
        bgColor: "#211F1F",
        guideHeight: 2 * data.title3 / DATA.industryBaseHeight,
        titleHeight: (2 * data.title3 / DATA.industryBaseHeight) / 2,
        fontSize1: 60,
        fontSize2: 50,
        fontSize3: 40,
        title1: data.title1,
        title2: data.title2,
        title3: '数量：' +data.title3,
        fontColor1: '#ffffff',
        fontColor2: '#ffffff',
        fontColor3: '#ffffff',
        strokeColor: "#ffffff",
        opacity: 0.8,
        img,
        titleAnchor: [-0.05, 0.5],
      });
      CACHE.container.scene.add(icon);
      icon.position.copy(position);
      icon.scale.set(2000, 2000, 2000);
      icon.renderOrder = 100;

      icon.children[0].material.uniforms.color.value.set('#00069b')
      icon.children[0].material.uniforms.mixColor.value.set('#f267af')
      icon.children[0].material.uniforms.mixColor2.value.set('#000aff')
      icon.children[0].material.uniforms.threshold.value = 0.5

      icon.children[1].material.uniforms.color.value.set('#8babff')
      icon.children[2].material.uniforms.color.value.set('#8babff')

      CACHE.container.addBloom(icon.children[0])
      CACHE.container.addBloom(icon.children[1])
      CACHE.container.addBloom(icon.children[2])

      icon.visible = false

      CACHE.industries.push(icon)
    }
  };
  
}

/**
 * 能源
 */
// function loadEnergy() {
//   fetch(STATE.boundrayGeojson)
//     .then((value) => {
//       return value.json();
//     })
//     .then((result) => {
//       const boundrays = result.features;
//       const colors = [
//         "#03a9f4",
//         "#c61818",
//         "#2196f3",
//         "#00bcd4",
//         "#f44336",
//         "#4caf50",
//         "#3f51b5",
//         "#03a9f4",
//         "#c61818",
//         "#2196f3",
//         "#00bcd4",
//         "#f44336",
//         "#4caf50",
//         "#3f51b5",
//         "#03a9f4",
//         "#c61818",
//         "#2196f3",
//         "#00bcd4",
//         "#f44336",
//         "#4caf50",
//         "#3f51b5",
//       ];

//       for (let i = 0; i < boundrays.length; i++) {
//         const coordinates = boundrays[i].geometry.coordinates[0][0];
//         const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
//           points: coordinates,
//           color: colors[i],
//           // gradient: Math.random() * 555555,
//           height: 400 + Math.random() * 20,
//           center: [116.41, 39.9],
//           opacity: 0.1,
//         });

//         extrudeShape.position.set(-2000, 1000, -10000);
//         extrudeShape.scale.set(0.25, 1, 0.25);
//         extrudeShape.visible = false;
//         CACHE.energy.push(extrudeShape);

//         CACHE.container.scene.add(extrudeShape);
//         CACHE.container.addBloom(extrudeShape.children[0]);
//         extrudeShape.visible = false;
//       }
//     });

//   for (const data of DATA.energyIconsData) {
//     const tag = new Bol3D.CompositeIconTag({
//       titleHeight: 0.8,
//       color: "#00A2FF",
//       type: 10,
//       title: data.name,
//       particleSize: 300,
//       particleNumber: 100,
//     });
//     CACHE.container.scene.add(tag);
//     tag.children[0].traverse((ci11) => {
//       if (ci11.isMesh) CACHE.container.addBloom(ci11);
//     });
//     tag.children[1].traverse((ci11) => {
//       if (ci11.isMesh) CACHE.container.addBloom(ci11);
//     });
//     tag.children[2].traverse((ci11) => {
//       if (ci11.isMesh) CACHE.container.addBloom(ci11);
//     });
//     CACHE.container.addBloom(tag.children[4]);
//     tag.renderOrder = 100;
//     tag.position.copy(data.position);
//     tag.position.y += 10;
//     tag.scale.set(3000, 3000, 3000);

//     CACHE.energyIcons.push(tag);
//     tag.visible = false;
//   }
// }


// 能源
function loadEnergy(){

  const heatmapEle = document.createElement('canvas')
  heatmapEle.width = 1024
  heatmapEle.height = 1024
  heatmapEle.style.width = 1024 + 'px'
  heatmapEle.style.height = 1024 + 'px'
  document.body.appendChild(heatmapEle)
  // heatmap
  const heatmap = h337.create({
    container: heatmapEle,
    radius: 30,
    alpha: true,
    blur : .85
  });
  let len = 1200;
  const width = 1024;
  const height = 1024;
  const points = [];
  let max = 0;
  const v1 = new Bol3D.Vector2(512 , 512)
  const v2 = new Bol3D.Vector2()
  const base = v1.distanceTo(v2)
  while (len--) {
    const val = Math.floor(Math.random()*50);
    max = Math.max(max, val);
    const point = {
      x: Math.floor(Math.random()*width ),
      y: Math.floor(Math.random()*height* 3  / 5 + height / 5),
      value: val
    };
    v2.set(point.x, point.y)
    point.value = 40 * (1 - v2.distanceTo(v1) / base)
    points.push(point);
  }
  heatmap.setData({
    max: max,
    data: points
  });

  const texture = new Bol3D.Texture(heatmap._renderer.canvas)
  texture.encoding = Bol3D.sRGBEncoding

  const heatMapPlaneGeo = new Bol3D.CircleBufferGeometry(25000, 128)
  const heatMapPlaneMat = new Bol3D.MeshLambertMaterial({
    transparent: true,
    map: texture
  })
  heatMapPlaneMat.map.needsUpdate = true
  heatMapPlaneGeo.rotateX(-Math.PI / 2)
  const hetaMapPlane = new Bol3D.Mesh(heatMapPlaneGeo, heatMapPlaneMat)
  CACHE.container.scene.add(hetaMapPlane)
  hetaMapPlane.position.set(0, 10, 0)
  hetaMapPlane.visible = false

  CACHE.heatmap = hetaMapPlane
}

/**
 * 加载环境/教育板块
 */
function loadCompeleteBoundrays() {
  fetch(STATE.boundrayAllGeojson)
    .then((value) => {
      return value.json();
    })
    .then((result) => {
      const boundrays = result.features;

      for (const feature of boundrays) {
        const coordinates = feature.geometry.coordinates[0][0];

        const extrudeShape = new Bol3D.Primitives.BaseExtrudeShape({
          points: coordinates,
          color: "#181e72",
          gradient: "#437478",
          height: 200,
          center: [116.41, 39.9],
          extrude: true,
          vertical: 113000,
        });

        extrudeShape.position.set(-2000, 1000, -10000);
        extrudeShape.scale.set(0.25, 1, 0.25);
        extrudeShape.visible = false;
        CACHE.completeBoundrays.environment = extrudeShape;
        CACHE.container.scene.add(extrudeShape);
        extrudeShape.name = "environment";

        const extrudeShape2 = new Bol3D.Primitives.BaseExtrudeShape({
          points: coordinates,
          color: "#7c1e31",
          gradient: "#5e79ad",
          height: 200,
          center: [116.41, 39.9],
          extrude: true,
          vertical: 92000,
        });

        extrudeShape2.position.set(-2000, 1000, -10000);
        extrudeShape2.scale.set(0.25, 1, 0.25);
        extrudeShape2.visible = false;
        CACHE.completeBoundrays.education = extrudeShape2;
        CACHE.container.scene.add(extrudeShape2);
        extrudeShape2.name = "education";

        // CACHE.container.clickObjects.push(extrudeShape2)
      }
    });
}

/**
 * 环境人口
 */
// function loadEnvironment() {
//   // 改成柱状图
//   fetch(STATE.environmentJson)
//     .then((value) => {
//       return value.json();
//     })
//     .then((result) => {
//       const environment = result;

//       environment.forEach((d) => {
//         let { options, position, renderOrder } = d;

//         // console.log(options)
//         options = Object.assign(options, {
//           threshold: -900,
//           color: "#000000",
//           mixColor: "#005f93",
//           mixColor2: "#151548",
//         });

//         const baseCube = new Bol3D.Primitives.BaseCube(options);

//         CACHE.container.scene.add(baseCube);
//         baseCube.position.set(position.x, position.y, position.z);
//         baseCube.renderOrder = renderOrder;
//         baseCube.visible = false;
//         baseCube.userData.speed = Math.random() * 0.05 + 0.015;
//         CACHE.container.addBloom(baseCube);

//         CACHE.environment.push(baseCube);
//       });
//     });
// }

/**
 * 环境人口->柱状图动画
 */
// function animateEnvironment() {
//   CACHE.environmentAnimateIndex = requestAnimationFrame(animateEnvironment);

//   const length = CACHE.environment;
//   let count = 0;

//   for (let l of CACHE.environment) {
//     if (l.scale.y == 1) continue;

//     if (l.scale.y < 1) {
//       l.scale.y += l.userData.speed;
//     } else {
//       l.scale.y = 1;
//       count++;
//     }
//   }

//   if (length == count) cancelAnimationFrame(CACHE.environmentAnimateIndex);
// }

/**
 * 路网
 */
function loadTraffic() {
  loadByJson();

  const animate = () => {
    requestAnimationFrame(animate);
    CACHE.lines.forEach((l) => {
      l.material.dashOffset -= (l.userData.speed * l.totalDistance) / 100;
      l.material.dashOffset %= l.totalDistance;
    });
  };

  animate();
}

/**
 * 教育医疗
 */
function loadEducation() {

  let count = 0
  const doLoad = (textures) => {
    DATA.educationPos.forEach( data => {
      const icon = new Bol3D.CompositeIconSimple({
        color: '#ff0000',
        opacity: 0.5,
        texture: textures[data.type],
        anchor: [0.5, -0.25],
        guideHeight: Math.random() * 2 + .5,
        iconSpeed: Math.random() *.5 + .025
      })
      CACHE.container.scene.add(icon)
      CACHE.container.addBloom(icon.children[0])
      icon.startIconAnimation()
      icon.position.copy(data.position)
      icon.renderOrder = 100
      icon.scale.set(500, 500, 500)

      icon.visible = false
      CACHE.education.push(icon)
    })
  }

  const textures = {}
  CACHE.container.texLoader.load(STATE.DEV_ENV + '/assets/png/icons/school2.png', (tex) => {
    count++
    tex.encoding = Bol3D.sRGBEncoding
    textures['education'] = tex
    if(count == 2) doLoad(textures)
  })

   CACHE.container.texLoader.load(STATE.DEV_ENV + '/assets/png/icons/hospital2.png', (tex) => {
    count++
    tex.encoding = Bol3D.sRGBEncoding
    textures['medical'] = tex
    if(count == 2) doLoad(textures)
  })
  
}

/**
 * 教育医疗->柱状图动画
 */
// function animateEducation() {
//   CACHE.educationAnimateIndex = requestAnimationFrame(animateEducation);

//   const length = CACHE.education;
//   let count = 0;

//   for (let l of CACHE.education) {
//     if (l.material.uniforms.opacity.value == 1) continue;

//     if (l.material.uniforms.opacity.value < 1) {
//       l.material.uniforms.opacity.value += l.userData.speed;
//     } else {
//       l.material.uniforms.opacity.value = 1;
//       count++;
//     }
//   }

//   if (length == count) cancelAnimationFrame(CACHE.educationAnimateIndex);
// }

// 道路
function loadByJson() {
  fetch(STATE.roadsjson)
    .then((value) => {
      return value.json();
    })
    .then((result) => {

      console.log('result' , result)

      let count = 0
      result.road.forEach((d) => {
        count++
        let colors = ['#12aa6a' ,'#9b8f46', '#8e003d'  ]
        let speeds = [.35 +  Math.random() * .35, .075 +  Math.random() * .075, .035 +  Math.random() * .035]
        const le = new Bol3D.Primitives.BaseLine({
          lineWidth: 2,
          color: "#ed6565",
          attenuation: 1,
        });
        le.setPositions(d);
        le.position.set(0, 5, 0);
        le.renderOrder = 100;
        CACHE.container.scene.add(le);
        CACHE.container.addBloom(le);
        CACHE.linesBottom.push(le);
        le.visible = false;

        count %= 3
        let color = colors[count]
        let speed = speeds[count]
        const le2 = new Bol3D.Primitives.BaseLine({
          lineWidth: 3,
          color,
          dashOffset: 3,
          dashSize: 1,
          gapSize: 1,
          gapOffset: 1,
          attenuation: 0,
        });
        le2.renderOrder = 100;
        le2.setPositions(d);
        le2.position.set(0, 20, 0);
        le2.userData.speed = speed
        CACHE.container.scene.add(le2);
        CACHE.container.addBloom(le2);
        CACHE.lines.push(le2);
        le2.visible = false;
      });
    });
}

function hideAll() {
  hideIndustrialEconomy();
  hideEducations();
  hideEnergy();
  hideEnvironments();
  hideTraffics();
  hideRoutes();
  hideModels();
  hideIcons();
  hideCompleteBoundrays();
  hideEnterpriseIcons();
  hideEnterprises();
  hideMirror();
  hideEnterpriseIconsInner()
}

function hideFloor() {
  if (CACHE.floor) CACHE.floor.visible = false;
}

function showFloor() {
  if (CACHE.floor) CACHE.floor.visible = true;
}

function hideMirror() {
  if (CACHE.floorMirror) CACHE.container.scene.remove(CACHE.floorMirror);
}

function showMirror() {
  if (CACHE.floorMirror) CACHE.container.scene.add(CACHE.floorMirror);
}

function hideSkyBox() {
  CACHE.container.sky.visible = false;
}

function showSkyBox() {
  CACHE.container.sky.visible = true;
}

function showEarth() {
  CACHE.container.scene.add(CACHE.earthGroup);
}

function hideEarth() {
  CACHE.container.scene.remove(CACHE.earthGroup);
}

function showEnergy() {
  CACHE.heatmap.visible = true
}

function hideEnergy() {
  CACHE.heatmap.visible = false
}

function showIndustrialEconomy() {
  CACHE.industries.forEach((idstry) => {
    idstry.visible = true;

    idstry.show()
  });
}

function hideIndustrialEconomy() {
  CACHE.industries.forEach((idstry) => {

    idstry.hide(() => {
      idstry.visible = false;
    })
  });
}

function showTraffics() {
  CACHE.lines.forEach((traf) => {
    traf.visible = true;
  });
}

function hideTraffics() {
  CACHE.lines.forEach((traf) => {
    traf.visible = false;
  });
}

function showRoutes() {
  CACHE.linesBottom.forEach((rt) => {
    rt.visible = true;
  });
}

function hideRoutes() {
  CACHE.linesBottom.forEach((rt) => {
    rt.visible = false;
  });
}

function hideAreaModels(){
  CACHE.cities2.forEach( d=> {
    d.visible = false
  })
}

function beforeShowEnvironments(){
  CACHE.seperateModels.forEach( d=> {
    CACHE.container.removeBloom(d)
    d.scale.set(0,0,0)
    const data = d.userData.environment
    d.material.color.set(data.color)
    d.material.envMapIntensity = data.envMapIntensity
    d.material.roughness = data.roughness
    d.material.metalness = data.metalness
  })
}

function showEnvironments() {
  CACHE.seperateModels.forEach( d=> {
    d.visible = true

    new Bol3D.TWEEN.Tween(d.scale)
    .to(
      {
        x: 1.1,
        y: 1.1,
        z: 1.1,
      },
      800
    ).start()
  })
}

function hideEnvironments() {
  CACHE.seperateModels.forEach( d=> {
    d.visible = false
  })
}

function showCompleteBoundrays() {
  for (const d in CACHE.completeBoundrays) {
    CACHE.completeBoundrays[d].visible = true;
  }
}

function hideCompleteBoundrays() {
  for (const d in CACHE.completeBoundrays) {
    CACHE.completeBoundrays[d].visible = false;
  }
}

function beforeShowEducations(){
  CACHE.educationModels.forEach(m => {
    CACHE.container.addBloom(m)
    m.visible = true
    const data = m.userData.education ? m.userData.education : m.userData.medical
    m.material.color.set(data.color)
    m.material.envMapIntensity = data.envMapIntensity
    m.material.roughness = data.roughness
    m.material.metalness = data.metalness
  })
}

function showEducations() {
  CACHE.education.forEach((edu) => {
    edu.visible = true;

    edu.show()
  });
}

function hideEducations() {
  CACHE.education.forEach((edu) => {

    edu.hide(() => {
      edu.visible = false;
    })
  });
}


function showModels() {
  CACHE.models.forEach((model) => {
    model.visible = true;
  });
}

function hideModels() {
  CACHE.models.forEach((model) => {
    model.visible = false;
  });
}

function loadEarth(cb) {
  fetch(STATE.chinajson)
    .then((value) => {
      return value.json();
    })
    .then((result) => {
      // earth
      const loader = CACHE.container.texLoader;

      let loadCount = 0;
      const map = loader.load(
        `${window.publicPath}/assets/png/earth/earth.jpg`,
        () => {
          loadCount++;
          if (loadCount == 1) cb && cb();
        }
      );
      // const normalMap = loader.load(
      //   `${window.publicPath}/assets/png/earth/normal.png`,
      //   () => {
      //     loadCount++;
      //     if (loadCount == 2) cb && cb();
      //   }
      // );

      //创建本体
      const geometry = new Bol3D.SphereGeometry(STATE.RADIUS, 64, 64);
      const earthMaterial = new Bol3D.MeshStandardMaterial({
        map,
        // normalMap,
        envMap: CACHE.container.envMap,
        envMapIntensity: 1.4,
        // normalScale: new Bol3D.Vector2(.11, .11),
        roughness: 0.42,
        metalness: 0.47,
      });
      const sphere = new Bol3D.Mesh(geometry, earthMaterial);
      sphere.name = "earth";
      CACHE.container.clickObjects.push(sphere);

      // CACHE.container.addBloom(sphere);
      CACHE.earthGroup.add(sphere);
      CACHE.container.scene.add(CACHE.earthGroup);
      // CACHE.earthGroup.position.set(1656.3432304127095, 0, 9800.149326543074)

      // boundrays
      const boundrays = result.features;

      boundrays.forEach((bd, index) => {
        bd.geometry.coordinates.forEach((cds) => {
          const positions = [];
          cds.forEach((cd) => {
            const pos = lglt2xyz(cd[0], cd[1], STATE.RADIUS);
            positions.push(pos.x, pos.y, pos.z);
          });
          const boundrayLineBottom = new Bol3D.Primitives.BaseLine({
            lineWidth: 2,
            color: "#3f3f47",
            attenuation: 1,
          });
          boundrayLineBottom.setPositions(positions);
          CACHE.earthGroup.add(boundrayLineBottom);
          // CACHE.container.addBloom(boundrayLineBottom);
          CACHE.earthLinesBottom.push(boundrayLineBottom);
          if (index < 4) {
            const boundrayLine = new Bol3D.Primitives.BaseLine({
              lineWidth: 2,
              color: "#ff8900",
              attenuation: 0,
              dashOffset: 3,
              dashSize: 1,
              gapSize: 1,
              gapOffset: 1,
            });
            boundrayLine.setPositions(positions);
            boundrayLine.userData.speed = Math.random() + 0.15;
            CACHE.earthGroup.add(boundrayLine);
            CACHE.container.addBloom(boundrayLine);
            CACHE.earthLines.push(boundrayLine);
          }
        });
      });

      loadEarthIcon();
    });
}

function loadEarthIcon() {
  DATA.earthIcons.forEach((ic) => {
    // 深圳：智能制造 ICON ： 点击下钻 114.06,22.54
    const posIcon = lglt2xyz(ic.lnglat[0], ic.lnglat[1], STATE.RADIUS + 20);
    const posVic = lglt2xyz(ic.lnglat[0], ic.lnglat[1], STATE.RADIUS + 250);
    const posTitle = lglt2xyz(ic.lnglat[0], ic.lnglat[1], STATE.RADIUS + 2000);

    const znzzIcon = new Bol3D.Primitives.BaseSpreadCircle({
      color: ic.name == "智能制造" ? "#2363e2" : "#9b6d53",
    });
    znzzIcon.geometry.rotateX(-Math.PI / 2);
    znzzIcon.position.copy(posIcon);
    znzzIcon.lookAt(0, 0, 0);
    znzzIcon.renderOrder = 100;
    znzzIcon.userData.type = "earthIcon";
    znzzIcon.userData.name = ic.name;
    CACHE.earthGroup.add(znzzIcon);
    CACHE.earthIcons.push(znzzIcon);
    znzzIcon.start();
    znzzIcon.scale.set(3000, 3000, 3000);

    const znzzVic = new Bol3D.Primitives.BaseShapeVic({
      color: ic.name == "智能制造" ? "#7e8bd1" : "#b2724f",
    });
    znzzVic.geometry.rotateX(-Math.PI / 2);
    znzzVic.position.copy(posVic);
    znzzVic.lookAt(0, 0, 0);
    znzzVic.renderOrder = 100;
    znzzVic.userData.type = "earthIcon";
    znzzVic.userData.name = ic.name;
    CACHE.earthGroup.add(znzzVic);
    CACHE.earthIcons.push(znzzVic);
    znzzVic.scale.set(3000, 3000, 3000);

    const znzzTitle = new Bol3D.Primitives.BaseTitle({
      text: ic.name,
      bgColor: "#213B78",
      strokeColor: "#ff0000",
      fontColor: "#ffffff",
      opacity: 1,
      size: 4000,
      type: 3,
    });
    znzzTitle.userData.type = "earthIcon";
    znzzTitle.userData.name = ic.name;
    znzzTitle.position.copy(posTitle);
    znzzTitle.lookAt(0, 0, 0);
    znzzTitle.scale.set(
      znzzTitle.canvasSize,
      znzzTitle.canvasSize * (znzzTitle.canvasHeight / znzzTitle.canvasWidth),
      1
    );
    CACHE.earthGroup.add(znzzTitle);
    CACHE.earthIcons.push(znzzTitle);

    if (ic.active) {
      CACHE.container.clickObjects.push(znzzIcon);
      CACHE.container.clickObjects.push(znzzVic);
      znzzVic.start();
      CACHE.container.clickObjects.push(znzzTitle);

      CACHE.container.addBloom(znzzIcon);
      CACHE.container.addBloom(znzzTitle);
    }
    CACHE.earthTitles.push(znzzTitle);
    CACHE.earthCircles.push(znzzIcon);
    CACHE.earthVics.push(znzzVic);
  });
}

function startEarthLineAnimation() {
  const animate = () => {
    CACHE.earthAnimationIndex = requestAnimationFrame(animate);

    CACHE.earthLines.forEach((l) => {
      l.material.dashOffset -= (l.userData.speed * l.totalDistance) / 100;
      l.material.dashOffset %= l.totalDistance;
    });
  };

  animate();
}

function stopEarthLineAnimation() {
  cancelAnimationFrame(CACHE.earthAnimationIndex);
}

function earthRotateAnimation() {
  let animationIndex = -1;
  CACHE.container.orbitControls.enabled = false;

  const animate = () => {
    animationIndex = requestAnimationFrame(animate);
    CACHE.earthGroup.rotation.y += 0.01;

    if (CACHE.earthGroup.rotation.y >= (Math.PI * 162) / 180) {
      cancelAnimationFrame(animationIndex);
      CACHE.container.orbitControls.enabled = true;
    }
  };

  animate();
}

/**
 *lng:经度
 *lat:维度
 *radius:地球半径
 */
const v3 = new Bol3D.Vector3();

function lglt2xyz(lng, lat, radius) {
  const theta = (90 + lng) * (Math.PI / 180);
  const phi = (90 - lat) * (Math.PI / 180);
  const result = v3
    .clone()
    .setFromSpherical(new Bol3D.Spherical(radius, phi, theta));
  return result;
}

export const API = {
  loadIcons,
  loadEnterPrises,
  findEnterpriseInnerIconByName,
  loadEnterPrisesInnerIcon,
  loadIndustrialEconomy,
  loadEnergy,
  // loadHeatMap,
  loadTraffic,
  loadEducation,
  hideAll,
  showIndustrialEconomy,
  hideIndustrialEconomy,
  showTraffics,
  hideTraffics,
  showRoutes,
  hideRoutes,
  hideAreaModels,
  beforeShowEnvironments,
  showEnvironments,
  hideEnvironments,
  beforeShowEducations,
  showEducations,
  hideEducations,
  showEnergy,
  hideEnergy,
  cameraAnimation,
  showEnterpriseIcons,
  showEnterpriseIconByName,
  hideEnterpriseIcons,
  hideEnterpriseIconsInner,
  showIcons,
  hideIcons,
  loadByJson,
  // animateEducation,
  // animateEnvironment,
  showModels,
  hideModels,
  showCompleteBoundrays,
  hideCompleteBoundrays,
  loadCompeleteBoundrays,
  loadEarth,
  showFloor,
  hideFloor,
  showSkyBox,
  hideSkyBox,
  lglt2xyz,
  earthRotateAnimation,
  stopEarthLineAnimation,
  startEarthLineAnimation,
  hideEarth,
  showEarth,
  getEnterprise,
  showEnterpriseByName,
  hideEnterprises,
  showMirror,
  hideMirror,
  showEnterpriseIconInnerByType,
};
