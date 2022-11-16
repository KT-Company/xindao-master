<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";
import { useStore } from "vuex";
const store = useStore();

const router = useRouter();
const title = ref("AIE智境-数智商业综合实践平台");
// const year = ref(dayjs().format("YYYY-MM-DD"));
// const time = ref(dayjs().format("HH:mm:ss"));

// 返回
const back = () => {
  window.top.location.href = "/aie_web";
  if (store.state.LEVEL > 0) {
    store.commit("changeLevel", --store.state.LEVEL);

    if (store.state.LEVEL == 0) {
      CACHE.container.orbitControls.maxDistance = 1000000;
      CACHE.container.orbitControls.minPolarAngle = 0;
      CACHE.container.orbitControls.maxPolarAngle = Math.PI * 0.5;
      CACHE.container.orbitCamera.far = 1000000;
      CACHE.container.bounds.radius = 1000000;

      API.cameraAnimation({
        cameraState: STATE.earthState2,
        callback: () => {
          API.hideSkyBox();
          API.hideFloor();
          API.hideAll();
          API.showEarth();

          API.cameraAnimation({
            cameraState: STATE.earthState,
            callback: () => {},
          });
        },
      });
    } else if (store.state.LEVEL == 1) {
      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          router.push("/IndustrialEconomy");
        },
      });
    } else if (store.state.LEVEL == 2) {
      //
    } else if (store.state.LEVEL == 3) {
      //
    } else if (store.state.LEVEL == 4) {
      //
    }
  }
};

const handleHome = () => {
  // store.commit("changeLevel", 0);

  // CACHE.container.orbitControls.maxDistance = 1000000;
  // CACHE.container.orbitControls.minPolarAngle = 0;
  // CACHE.container.orbitControls.maxPolarAngle = Math.PI * 0.5;
  // CACHE.container.orbitCamera.far = 1000000;
  // CACHE.container.bounds.radius = 1000000;

  // API.cameraAnimation({
  //   cameraState: STATE.earthState2,
  //   callback: () => {
  //     API.hideSkyBox();
  //     API.hideFloor();
  //     API.hideAll();
  //     API.showEarth();

  //     API.cameraAnimation({
  //       cameraState: STATE.earthState,
  //       callback: () => {},
  //     });
  //   },
  // });

  store.commit("changeLevel", 1);
  router.push("/IndustrialEconomy");
  window.top.location.href = "/aie_web"; // 返回用户 home 地址
};

// setInterval(() => {
//   time.value = dayjs().format("HH:mm:ss");
// }, 1000);
</script>

<template>
  <!-- <div :class="['header', store.state.LEVEL != 2 ? 'hb' : '']"> -->
  <div :class="['header', store.state.LEVEL != 2 ? '' : '']">
    <!-- <h1 class="title num-jianbian-lan">{{ title }}</h1> -->
    <!-- <img class="title" src="../../assets/images/logo.png" v-show="store.state.LEVEL != 2" /> -->
    <p class="time">
      <span>数据统计时间： {{ store.state.year }}年</span>
    </p>
    <p class="info">
      <img
        src="../../assets/images/home.png"
        class="home"
        @click="handleHome"
        v-show="store.state.LEVEL > 0"
      />
      <!-- <img
        src="../../assets/images/btn-back.png"
        class="back"
        @click="back"
        v-show="store.state.LEVEL != 2"
      /> -->
    </p>
  </div>

  <img src="../../assets/images/logoa.png" class="head" v-if="true" />
</template>

<style lang="less" scoped>
.header {
  width: 100%;
  height: var(--headerH);
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: right;
  padding-right: 1vw;
  color: rgb(255, 255, 255);
}

.hb {
  background: url("@/2d/assets/images/top.png") no-repeat center center / 100%
    100%;
}

.head {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 28.5%;
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20%;
  font-size: 1.6vw;
  width: 20%;
  color: #ffffff;
}
.time {
  position: absolute;
  display: inline-block;
  height: 22%;
  left: 2%;
  top: 20%;
  display: flex;
  align-items: center;
  font-family: Alibaba PuHuiTi;
  font-weight: 400;
  color: #ffffff;
  opacity: 0.7;
  * {
    padding: 0 5px;
  }
}
.info {
  position: absolute;
  right: 2%;
  top: 20%;
  height: 22%;
  width: 15%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  pointer-events: auto;
  * {
    padding: 0 8px;
  }
}
.back {
  height: 100%;
  cursor: pointer;
}
.home {
  height: 100%;
  cursor: pointer;
}
</style>
