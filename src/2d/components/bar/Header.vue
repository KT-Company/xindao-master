<script setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";

const router = useRouter();
const title = ref("AIE智镜-数智商业综合实践平台");
const year = ref(dayjs().format("YYYY-MM-DD"));
const time = ref(dayjs().format("HH:mm:ss"));
const back = () => {
  router.go(-1);

  API.hideAll();

  API.cameraAnimation({
    cameraState: STATE.initialState,
    callback: () => {
      API.hidePlates();
      API.showIcons();
    },
  });
};

setInterval(() => {
  time.value = dayjs().format("HH:mm:ss");
}, 1000);
</script>

<template>
  <div class="header">
    <h1 class="title num-jianbian-lan">{{ title }}</h1>
    <p class="time">
      <span>{{ year }}</span>
      <span>{{ time }}</span>
    </p>
    <p class="info">
      <span>🌤&nbsp; 多云</span>
      <span>23-34℃</span>
      <span
        class="back"
        @click="back"
      ></span>
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
