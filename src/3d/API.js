import { DATA } from "./DATA.js";
import { CACHE } from "./CACHE.js";
import { STATE } from "./STATE.js";
import store from "@/2d/store";

let Bol3D = window.Bol3D;
let h337 = window.h337;

// ******************************* 二维方法开始 *******************************

// 获取企业总量
function getEnterprise() {
  return store.state.enterpriseData;
}

// ******************************* 二维方法结束 *******************************

// 根据名字找企业内部标签
function findEnterpriseInnerIconByName(data, name) {
  let result;
  data.forEach((d) => {
    if (d.name == name) {
      result = d;
    }
  });
  return result;
}

// 企业内部标签
function loadEnterPrisesInnerIcon() {
  for (const i in STATE.enterprisesInnerIcons) {
    const enterprise = STATE.enterprisesInnerIcons[i];
    for (const data of enterprise) {
      const bsTitle = new Bol3D.Primitives.BaseTitle({
        text: data.name,
        bgColor: "#ff0000",
        type: 1,
        size: 150,
        fontSize: 50,
      });
      CACHE.container.scene.add(bsTitle);
      CACHE.enterpriseIconsInner[i].push(bsTitle);
      bsTitle.renderOrder = 100;
      bsTitle.position.set(data.position.x, data.position.y, data.position.z);
      bsTitle.visible = false;

      CACHE.container.clickObjects.push(bsTitle);
      bsTitle.userData.type = "enterpriseIconInner";
    }
  }
}

function loadEnterPrises() {
  for (const data of STATE.enterprisesIcons) {
    const icon = new Bol3D.CompositeIconTitle({
      titleHeight: 0.75,
      fontColor: "#ffffff",
      color: "#512c2c",
      type: 3,
      title: data.name,
      titleSize: 0.3,
    });
    CACHE.container.addBloom(icon.children[0]);
    CACHE.container.scene.add(icon);
    icon.position.copy(data.position);
    icon.scale.set(2000, 2000, 2000);

    icon.children[1].scale.set(0.5, 0.5, 0.5);
    icon.children[1].position.set(0, 0.2, 0);

    icon.renderOrder = 100;
    icon.name = data.name;
    icon.userData.type = data.type;
    icon.visible = false;

    const bgColor = "rgba(0,0,0,.5)";
    const titleColor = "#ffffff";
    const titleSize = 14;
    const content = data.content;
    const infoPopup = new Bol3D.POI.Popup({
      closeVisible: "visible",
      value: `<div style='pointer-events:none;background-color:${bgColor};width:246px;height:auto;outline: 1px ridge rgb(255, 255, 255);border-radius: 1px;'>
                <div style='display:flex;width:100%;;height:100%;color:${titleColor};font-size:${titleSize}px;font-family: SourceHanSansCN-Regular;font-weight: 100;'>
                  <p style='width:100%;text-indent:2em;margin-top:20px;margin-left:15px;margin-right:15px;margin-bottom:20px;'>${content}</p>
                </div>
              </div>`,
      center: [-0.5, -1],
      position: [0, 0.25, 0],
      closeSize: 0.8,
    });
    icon.add(infoPopup);
    infoPopup.visible = false;

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

function showEnterpriseIconInnerByType(type) {
  CACHE.enterpriseIconsInner[type].forEach((eIcon) => {
    eIcon.visible = true;
  });
}

function hideEnterpriseIconsInner() {
  for (const i in CACHE.enterpriseIconsInner) {
    const enpriseIcons = CACHE.enterpriseIconsInner[i];
    enpriseIcons.forEach((eIcon) => {
      eIcon.visible = false;
    });
  }
}

function hideEnterpriseIcons() {
  CACHE.enterpriseIcons.forEach((epi) => {
    epi.visible = false;
    epi.children[epi.children.length - 1].visible = false;
  });
}

function showEnterpriseIcons() {
  CACHE.enterpriseIcons.forEach((epi) => {
    epi.visible = true;
  });
}

function hideEnterpriseIconPopups() {
  CACHE.enterpriseIcons.forEach((epi) => {
    epi.children[epi.children.length - 1].visible = false;
  });
}

function showEnterpriseIconByName(name) {
  CACHE.enterpriseIcons.forEach((epi) => {
    if (epi.name == name) {
      epi.children[epi.children.length - 1].visible = true;
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
    targetPos.distanceTo(CACHE.container.orbitControls.target) < 0.1 &&
    pos.distanceTo(CACHE.container.orbitControls.object.position) < 0.1
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
  return new Promise((resolve) => {
    const img = new Image();
    img.src = STATE.DEV_ENV + "/assets/png/icons/icon1.png";
    img.onload = () => {
      for (const d of DATA.industryData) {
        const { data, position } = d;
        const icon = new Bol3D.CompositeIconPopup({
          color: "#ff0000",
          bgColor: "#211F1F",
          guideHeight: (2 * data.title3) / DATA.industryBaseHeight,
          titleHeight: (2 * data.title3) / DATA.industryBaseHeight / 2,
          fontSize1: 60,
          fontSize2: 60,
          fontSize3: 60,
          title1: data.title1,
          title2: data.title2,
          title3: "数量：" + data.title3,
          fontColor1: "#ffffff",
          fontColor2: "#ffffff",
          fontColor3: "#ffffff",
          strokeColor: "#ffffff",
          opacity: 0.8,
          img,
          titleAnchor: [-0.05, 0.5],
        });
        CACHE.container.scene.add(icon);
        icon.position.copy(position);
        icon.scale.set(2000, 2000, 2000);
        icon.renderOrder = 100;

        icon.children[0].material.uniforms.color.value.set("#00069b");
        icon.children[0].material.uniforms.mixColor.value.set("#f267af");
        icon.children[0].material.uniforms.mixColor2.value.set("#000aff");
        icon.children[0].material.uniforms.threshold.value = 0.5;

        icon.children[1].material.uniforms.color.value.set("#8babff");
        icon.children[2].material.uniforms.color.value.set("#8babff");

        CACHE.container.addBloom(icon.children[0]);
        CACHE.container.addBloom(icon.children[1]);
        CACHE.container.addBloom(icon.children[2]);

        icon.visible = false;

        CACHE.industries.push(icon);
      }

      resolve();
    };
  });
}

// 能源
function loadEnergy() {
  const heatmapEle = document.createElement("canvas");
  heatmapEle.width = 1024;
  heatmapEle.height = 1024;
  heatmapEle.style.width = 1024 + "px";
  heatmapEle.style.height = 1024 + "px";
  document.body.appendChild(heatmapEle);
  // heatmap
  const heatmap = h337.create({
    container: heatmapEle,
    radius: 15,
    alpha: true,
    blur: 0.85,
  });
  let len = 4000;
  const width = 1024;
  const height = 1024;
  const points = [];
  let max = 0;
  const v1 = new Bol3D.Vector2(512, 512);
  const v2 = new Bol3D.Vector2();
  const base = v1.distanceTo(v2);
  while (len--) {
    const val = Math.floor(Math.random() * 50);
    max = Math.max(max, val);
    const point = {
      x: Math.floor(Math.random() * width),
      y: Math.floor(Math.random() * height),
      // y: Math.floor((Math.random() * height * 3) / 5 + height / 5),
      value: val,
    };
    v2.set(point.x, point.y);
    point.value = 40 * (1 - v2.distanceTo(v1) / base);
    points.push(point);
  }
  heatmap.setData({
    max: max,
    data: points,
  });

  const texture = new Bol3D.Texture(heatmap._renderer.canvas);
  texture.encoding = Bol3D.sRGBEncoding;

  const heatMapPlaneGeo = new Bol3D.CircleBufferGeometry(40000, 128);
  const heatMapPlaneMat = new Bol3D.MeshLambertMaterial({
    transparent: true,
    map: texture,
  });
  heatMapPlaneMat.map.needsUpdate = true;
  heatMapPlaneGeo.rotateX(-Math.PI / 2);
  const hetaMapPlane = new Bol3D.Mesh(heatMapPlaneGeo, heatMapPlaneMat);
  CACHE.container.scene.add(hetaMapPlane);
  hetaMapPlane.position.set(0, 10, 0);
  hetaMapPlane.visible = false;

  CACHE.heatmap = hetaMapPlane;
}

/**
 * 路网
 */
function loadTraffic() {
  return new Promise((resolve) => {
    fetch(STATE.roadsjson)
      .then((value) => {
        return value.json();
      })
      .then((result) => {
        // console.log("result", result);

        let count = 0;
        result.road.forEach((d) => {
          count++;
          let colors = ["#12aa6a", "#9b8f46", "#8e003d"];
          let speeds = [
            0.35 + Math.random() * 0.35,
            0.075 + Math.random() * 0.075,
            0.035 + Math.random() * 0.035,
          ];
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

          count %= 3;
          let color = colors[count];
          let speed = speeds[count];
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
          le2.userData.speed = speed;
          CACHE.container.scene.add(le2);
          CACHE.container.addBloom(le2);
          CACHE.lines.push(le2);
          le2.visible = false;
        });
      });

    const animate = () => {
      requestAnimationFrame(animate);
      CACHE.lines.forEach((l) => {
        l.material.dashOffset -= (l.userData.speed * l.totalDistance) / 100;
        l.material.dashOffset %= l.totalDistance;
      });
    };

    animate();

    resolve();
  });
}

/**
 * 教育医疗
 */
function loadEducation() {
  new Promise((resolve) => {
    let count = 0;
    const doLoad = (textures) => {
      DATA.educationPos.forEach((data) => {
        const icon = new Bol3D.CompositeIconSimple({
          color: "#ff0000",
          opacity: 0.5,
          texture: textures[data.type],
          anchor: [0.5, -0.25],
          guideHeight: Math.random() * 2 + 0.5,
          iconSpeed: Math.random() * 0.5 + 0.025,
        });
        CACHE.container.scene.add(icon);
        CACHE.container.addBloom(icon.children[0]);
        icon.startIconAnimation();
        icon.position.copy(data.position);
        icon.renderOrder = 100;
        icon.scale.set(500, 500, 500);

        icon.visible = false;
        CACHE.education.push(icon);
      });

      resolve();
    };

    const textures = {};
    CACHE.container.texLoader.load(
      STATE.DEV_ENV + "/assets/png/icons/school2.png",
      (tex) => {
        count++;
        tex.encoding = Bol3D.sRGBEncoding;
        textures["education"] = tex;
        if (count == 2) doLoad(textures);
      }
    );

    CACHE.container.texLoader.load(
      STATE.DEV_ENV + "/assets/png/icons/hospital2.png",
      (tex) => {
        count++;
        tex.encoding = Bol3D.sRGBEncoding;
        textures["medical"] = tex;
        if (count == 2) doLoad(textures);
      }
    );
  });
}

// 3圈
function loadThreeCircles() {
  STATE.threeCirclesStates.forEach((data) => {
    const { position, color, edgeColor, size } = data;
    const baseCircle = new Bol3D.Primitives.BaseCircle({
      color,
      edgeColor,
      type: 5,
      radius: 1.5,
    });
    CACHE.container.scene.add(baseCircle);
    baseCircle.position.set(position.x, position.y, position.z);
    baseCircle.scale.set(size, size, size);
    CACHE.container.addBloom(baseCircle);
    baseCircle.material.depthTest = false;

    CACHE.threeCircles.push(baseCircle);
  });
}

// 3流
function loadThreeFlows() {
  STATE.threeFlowsStates.forEach((data) => {
    const { startPoint, endPoint, path, type, title, height } = data;

    const colors = {
      logistics: "#f4a023",
      information: "#2b6496",
      money: "#ff6262",
    };

    const baseFlyLine = new Bol3D.Primitives.BaseFlyLine({
      color: colors[type],
      startPoint: new Bol3D.Vector3(startPoint.x, startPoint.y, startPoint.z),
      endPoint: new Bol3D.Vector3(endPoint.x, endPoint.y, endPoint.z),
      height,
      lineWidth: 2,
      attenuation: 0,
      title,
      titleSize: 600,
      dashOffset: 3,
      dashSize: 1,
      gapSize: 1,
      gapOffset: 1,
    });
    CACHE.container.scene.add(baseFlyLine);
    baseFlyLine.userData.speed = 0.5;
    baseFlyLine.userData.path = path;
    baseFlyLine.children[0].position.y = height * 0.8;
    baseFlyLine.children[0].renderOrder = 100;
    baseFlyLine.renderOrder = 100;
    CACHE.container.addBloom(baseFlyLine);

    CACHE.threeFlows[type].push(baseFlyLine);
  });

  const animate = () => {
    requestAnimationFrame(animate);

    for (let i in CACHE.threeFlows) {
      const flows = CACHE.threeFlows[i];
      flows.forEach((f) => {
        f.material.dashOffset -= (f.userData.speed * f.totalDistance) / 100;
        f.material.dashOffset %= f.totalDistance;
      });
    }
  };

  animate();
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
  hideEnterpriseIcons();
  hideEnterprises();
  hideEnterpriseIconsInner();
  hideThreeCircles();
  hideThreeFlows();
  hideMirror();
}

function showThreeCircles() {
  CACHE.threeCircles.forEach((tc) => {
    tc.visible = true;
  });
}

function hideThreeCircles() {
  CACHE.threeCircles.forEach((tc) => {
    tc.visible = false;
  });
}

function hideThreeFlows() {
  for (let i in CACHE.threeFlows) {
    const flows = CACHE.threeFlows[i];
    flows.forEach((f) => {
      f.visible = false;
    });
  }
}

function showThreeFlowsByType(type) {
  const flows = CACHE.threeFlows[type];
  flows.forEach((f) => {
    f.visible = true;
  });
}

function hideThreeFlowsByType(type) {
  const flows = CACHE.threeFlows[type];
  flows.forEach((f) => {
    f.visible = false;
  });
}

function showThreeFlowsByName(name) {
  for (let i in CACHE.threeFlows) {
    const flows = CACHE.threeFlows[i];
    flows.forEach((f) => {
      if (f.userData.path.includes(name)) f.visible = true;
    });
  }
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
  CACHE.heatmap.visible = true;
}

function hideEnergy() {
  CACHE.heatmap.visible = false;
}

function showIndustrialEconomy() {
  CACHE.industries.forEach((idstry) => {
    idstry.visible = true;

    idstry.show();
  });
}

function hideIndustrialEconomy() {
  CACHE.industries.forEach((idstry) => {
    idstry.hide(() => {
      idstry.visible = false;
    });
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

function hideAreaModels() {
  CACHE.cities2.forEach((d) => {
    d.visible = false;
  });
}

function beforeShowEnvironments() {
  CACHE.mergedMeshes["green"].material = CACHE.mergedMaterials["green"];
  CACHE.mergedMeshes["yellow"].material = CACHE.mergedMaterials["yellow"];
}

function showEnvironments() {
  new Bol3D.TWEEN.Tween(CACHE.mergedMeshes["green"].scale)
    .to(
      {
        y: 6,
      },
      800
    )
    .start();
  new Bol3D.TWEEN.Tween(CACHE.mergedMeshes["yellow"].scale)
    .to(
      {
        y: 6,
      },
      800
    )
    .start();
}

function hideEnvironments() {
  CACHE.seperateModels.forEach((d) => {
    d.visible = false;
  });
}

function beforeShowEducations() {
  CACHE.mergedMeshes["education"].material = CACHE.mergedMaterials["education"];
  CACHE.mergedMeshes["medical"].material = CACHE.mergedMaterials["medical"];
  CACHE.container.addBloom(CACHE.mergedMeshes["education"]);
  CACHE.container.addBloom(CACHE.mergedMeshes["medical"]);
}

function showEducations() {
  CACHE.education.forEach((edu) => {
    edu.visible = true;

    edu.show();
  });
}

function hideEducations() {
  CACHE.education.forEach((edu) => {
    edu.hide(() => {
      edu.visible = false;
    });
  });
}

function showModels() {
  CACHE.models.forEach((model) => {
    model.visible = true;
  });
  for (const i in CACHE.mergedMeshes) {
    const mesh = CACHE.mergedMeshes[i];
    if (mesh) {
      mesh.visible = true;
      mesh.material = CACHE.mergedMaterials["other"];
    }
  }
}

function hideModels() {
  CACHE.models.forEach((model) => {
    model.visible = false;
  });

  for (const i in CACHE.mergedMeshes) {
    const mesh = CACHE.mergedMeshes[i];
    if (mesh) {
      mesh.visible = false;
      mesh.scale.y = 3.8;
      CACHE.container.removeBloom(mesh);
    }
  }
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
  loadEnterPrises,
  findEnterpriseInnerIconByName,
  loadEnterPrisesInnerIcon,
  loadIndustrialEconomy,
  loadEnergy,
  loadTraffic,
  loadEducation,
  hideAll,
  showThreeCircles,
  hideThreeCircles,
  showThreeFlowsByType,
  hideThreeFlowsByType,
  showThreeFlowsByName,
  hideThreeFlows,
  loadThreeCircles,
  loadThreeFlows,
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
  hideEnterpriseIconPopups,
  hideEnterpriseIconsInner,
  showIcons,
  hideIcons,
  showModels,
  hideModels,
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
