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
const year = ref(dayjs().format("YYYY-MM-DD"));
const time = ref(dayjs().format("HH:mm:ss"));
const back = () => {
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

  // window.location.href='/aie_web'
};

setInterval(() => {
  time.value = dayjs().format("HH:mm:ss");
}, 1000);
</script>

<template>
  <div class="header">
    <h1 class="title num-jianbian-lan">{{ title }}</h1>
    <p class="time">
      <span>数据统计时间： {{ store.state.year }}年</span>
    </p>
    <p class="info">
      <span class="back" @click="back" v-show="store.state.LEVEL > 0"></span>
    </p>
  </div>
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
  background: url("@/2d/assets/images/top.png") no-repeat center center / 100%
    100%;
}
.title {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 6%;
  font-size: 1.6vw;
  color: #ffffff;
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
  * {
    padding: 0 8px;
  }
}

.time {
  position: absolute;
  display: inline-block;
  height: 22%;
  left: 2%;
  top: 20%;
  display: flex;
  align-items: center;
  * {
    padding: 0 5px;
  }
}

.back {
  background: url("@/2d/assets/images/btn-back.png") no-repeat center center /
    100% 100%;
  height: 100%;
  width: 13%;
  display: inline-block;
  cursor: pointer;
  pointer-events: auto;
}
</style>
