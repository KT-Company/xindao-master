<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { useStore } from "vuex";
const store = useStore();

const router = useRouter();
const title = ref("AIE智境-数智商业综合实践平台");
const year = ref(dayjs().format("YYYY-MM-DD"));
const time = ref(dayjs().format("HH:mm:ss"));

// 返回
const back = () => {
  if (STATE.LEVEL == 0) return;
  router.push("/Transportation");
  // window.location.href='/aie_web'

  // API.hideAll();

  // API.cameraAnimation({
  //   cameraState: STATE.initialState,
  //   callback: () => {
  // API.hidePlates();
  // API.showIcons();
  // API.showModels()
  //   },
  // });
};

// home
const handleHome = () => {
  window.location.href = "/aie_web";
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
      <img
        src="../../assets/images/home.png"
        class="home"
        @click="handleHome"
      />
      <img src="../../assets/images/btn-back.png" class="back" @click="back" />
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
