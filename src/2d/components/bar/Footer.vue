<script setup>
import { reactive, ref, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { firstA, getWenhaoA } from "@/2d/utils/letters";
import { useStore } from "vuex";

import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";

// const iframeRef = inject("iframeRef"); // 获取三维里的方法
const router = useRouter();
const store = useStore();

const menus = ref([
  { id: 1, name: "产业经济", path: "/IndustrialEconomy" },
  { id: 2, name: "交通出行", path: "/Transportation" },
  { id: 3, name: "环境人口", path: "/Environmental" },
  { id: 4, name: "教育医疗", path: "/Education" },
  { id: 5, name: "能源碳排放", path: "/Energy" },
]);

const footers = ref([
  { id: 1, name: "海景区", isPick: true },
  { id: 2, name: "智能制造产业园", isPick: true },
  { id: 3, name: "数字金融区", isPick: false },
  { id: 4, name: "物流服务", isPick: false },
  { id: 5, name: "供应链", isPick: false },
  { id: 6, name: "综合服务", isPick: false },
  { id: 7, name: "数字政务", isPick: false },
]);
// 海景区.... 点击事件
const handleFooters = (item) => {
  footers.value[item.id - 1].isPick = !item.isPick;
  console.log("item: ", item);
};

const handleMenu = (item) => {
  // const currRouter = firstA(router.currentRoute.value.path);
  // if (currRouter === item.path) router.replace("/Replace");
  // else router.push(item.path);
  router.push(item.path);
};

const goBack = ()=>{
  window.top.location.href = "/aie_web"; // 返回用户 home 地址
}

// const isShow = ref(true);
const routerName = ref("/IndustrialEconomy");

watch(
  () => router,
  () => {
    routerName.value = getWenhaoA(firstA(router.options.history.state.current));
    // isShow.value = [
    //   "/IndustrialEconomy",
    //   "/Transportation",
    //   "/Environmental",
    //   "/Education",
    //   "/Energy",
    // ].includes(routerName.value);

    API.hideAll();
    API.showIcons();
    API.showModels();
    API.showRoutes();

    // 根据路由名称调用三维方法
    if (routerName.value === "/IndustrialEconomy") {
      // API.showIndustrialEconomy();

      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          // API.showAreaIcons();
        },
      });
    }
    if (routerName.value === "/Transportation") {
      API.cameraAnimation({
        cameraState: STATE.trafficState,
        callback: () => {
          API.showTraffics();
        },
      });
    }
    if (routerName.value === "/Environmental") {
      // for (const i in CACHE.completeBoundrays) {
      //   const d = CACHE.completeBoundrays[i];
      //   if (d.name == "environment") d.visible = true;
      // }

      API.cameraAnimation({
        cameraState: STATE.environmentState,
        callback: () => {
          // API.showEnvironments();
          // API.beforeEnvironmentAniamtion();
          // API.animateEnvironment();
        },
      });
    }
    if (routerName.value === "/Education") {
      // for (const i in CACHE.completeBoundrays) {
      //   const d = CACHE.completeBoundrays[i];
      //   if (d.name == "education") d.visible = true;
      // }

      API.cameraAnimation({
        cameraState: STATE.educationState,
        callback: () => {
          // API.showEducations();
          // API.beforeEducationAniamtion();
          // API.animateEducation();
        },
      });
    }
    if (routerName.value === "/Energy") {
      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          API.showEnergyIcons();
          API.showEnergy();
        },
      });
    }
    if (routerName.value === "/Area") {
      API.showPlates();
      API.hideIcons();
    }
  },
  { deep: true }
);
</script>

<template>
  <div :class="['footer', store.state.LEVEL != 2 ? 'fb' : '']">
    <div class="footer-main">
      <ul class="button-box" v-if="store.state.LEVEL == 1">
        <li
          v-for="item in menus"
          :key="item.id"
          @click="handleMenu(item)"
          :class="routerName == item.path ? 'pick' : ''"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>

      <ul class="button-box2 animated bounceInDown" v-if="store.state.LEVEL == 2">
        <li
          v-for="item in footers"
          :key="item.id"
          @click="handleFooters(item)"
          :class="item.isPick ? 'pick2' : ''"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>

      <img src="../../assets/images/fanhui.png" class="back" @click="goBack" v-if="store.state.LEVEL == 2">
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 10.8vh;
  position: fixed;
  bottom: 0;
  pointer-events: auto;
  .footer-main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    button {
      padding: 0 20px;
      margin: 0 20px;
      height: 50%;
    }

    .button-box {
      display: flex;
      position: absolute;
      width: 40%;
      cursor: pointer;
      bottom: 40%;
      align-items: flex-end;

      li {
        height: 10.8vh;
        flex: 1;
        background: url("@/2d/assets/images/router.png") no-repeat center center /
          100% 100%;
        display: flex;
        justify-content: center;

        span {
          margin-top: -20%;
          color: #a1b4d1eb;
          font-size: 1.05vw;
          font-family: AliHYAiHei;
          height: 1.2vw;
          font-weight: bold;
          text-shadow: 0px 6px 4px rgba(0, 16, 61, 0.63);
        }

        transition: 0.3s ease;
        // &:hover {
        //   scale: 1.1;
        // }
      }
    }
  }
}
.fb {
  background: url("@/2d/assets/images/footer.png") no-repeat center center /
    100% 100%;
}
.back{
  position: absolute;
  right: 24%;
  height: 40%;
  cursor: pointer;  
  // &:hover{
  //   scale: 1.1;
  // }
}

.button-box2 {
  display: flex;
  width: 40%;
  height: 38%;
  justify-content: space-between;
  li {
    display: flex;
    align-items: center;
    padding: 0 2%;
    background: rgba(0, 0, 0, 0.7);
    transition: 0.3s;
    &:not(&:nth-child(1)) {
      margin-left: 1%;
    }
    &:hover {
      cursor: pointer;
      scale: 1.1;
    }
  }
}

.pick2 {
  background: rgba(197, 0, 0, 0.7) !important;
}

.pick {
  background: url("@/2d/assets/images/router-pick.png") no-repeat center center /
    100% 100% !important;
  height: 19vh !important;

  span {
    margin-top: 10% !important;
    background: linear-gradient(
      to bottom,
      rgb(255, 255, 255) 50%,
      rgb(0, 76, 255)
    ) !important;
    background-clip: text !important;
    -webkit-background-clip: text !important;
    color: transparent !important;
    // 转变为行内块元素 文字渐变才会生效
    display: inline-block !important;
    text-shadow: 0px 0px 6px rgb(255 255 255 / 63%) !important;
  }
}
</style>
