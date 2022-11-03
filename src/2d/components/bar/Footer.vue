<script setup>
import { reactive, ref, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { firstA,getWenhaoA } from "@/2d/utils/letters";

import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";

// const iframeRef = inject("iframeRef"); // 获取三维里的方法
const router = useRouter();
const menus = ref([
  { id: 1, name: "产业经济", path: "/IndustrialEconomy" },
  { id: 2, name: "交通出行", path: "/Transportation" },
  { id: 3, name: "环境人口", path: "/Environmental" },
  { id: 4, name: "教育医疗", path: "/Education" },
  { id: 5, name: "能源碳排放", path: "/Energy" },
]);
const handleMenu = (item) => {
  router.push(item.path);
};
const isShow = ref(true);
const routerName = ref("/IndustrialEconomy");




watch(
  () => router,
  () => {
    routerName.value = getWenhaoA(firstA(router.options.history.state.current))
    isShow.value = ["/IndustrialEconomy","/Transportation","/Environmental","/Education","/Energy"].includes(routerName.value);

    API.hideAll()
    // 根据路由名称调用三维方法
    if (routerName.value === "/IndustrialEconomy") {
      // iframeRef.test1(); // 调用三维方法三维方法必须绑定在window上---test1() ......以下同理
      API.showIndustrialEconomy()
      API._hideIcons()
      API.hideModels()
      API.hideTraffics2()
      API.hideTpIcons()
      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          API.showAreaIcons()
        },
      });
    }
    if (routerName.value === "/Transportation") {
      // iframeRef.test2();
      API.showTraffics()
      API.showIcons()
      API.showModels()
      API.hideTraffics()
      API.hideTpIcons()
      API.showTraffics2()
      API.cameraAnimation({
        cameraState: STATE.trafficState,
        callback:()=>{
        }
      });
    }
    if (routerName.value === "/Environmental") {
      // iframeRef.test3();
      API.showIndustrialEconomy()
      API.showEnvironments()
      API._hideIcons()
      API.hideTpIcons()
      API.hideModels()
      API.hideTraffics()
      API.hideTraffics2()
      // API.showIcons()
      API.cameraAnimation({
        cameraState: STATE.popState,
        callback:()=>{
          API.animateEnvironment()
        }
      });
    }
    if (routerName.value === "/Education") {
      // iframeRef.test4();
      API.showIndustrialEconomy()
      API.showEducations()
      API._hideIcons()
      API.hideModels()
      API.hideTraffics()
      API.hideTraffics2()
      API.hideTpIcons()
      // API.showIcons()
      API.cameraAnimation({
        cameraState: STATE.educationState,
        callback:()=>{
          API.animateEducation()
        }
      });
    }
    if (routerName.value === "/Energy") {
      // iframeRef.test5();
      API.showEnergy()
      API._hideIcons()
      API.hideModels()
      API.hideTraffics()
      API.hideTraffics2()
      API.showTpIcons()
      API.hideAreaIcons()
      API.cameraAnimation({
        cameraState: STATE.industrialState
      });
    }
    if (routerName.value === "/Area") {
      // iframeRef.test6();
    }
  },
  { deep: true }
);
</script>

<template>
  <div class="footer">
    <div class="footer-main">
      <ul class="button-box" v-if="isShow">
        <li
          v-for="item in menus"
          :key="item.id"
          @click="handleMenu(item)"
          :class="routerName == item.path ? 'pick' : ''"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>
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
  background: url("@/2d/assets/images/footer.png") no-repeat center center /
    100% 100%;

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
