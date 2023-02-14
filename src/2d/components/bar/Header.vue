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

const handleHome = () => {
  store.commit("changeLevel", 1);
  window.backHome()
};

</script>

<template>
  <p class="time">
    <span>数据统计时间： {{ store.state.MODE === 'BUSINESS' ? store.state.BusinessTime : store.state.globalYear }}年</span>
  </p>
  <img src="../../assets/images/home.png" class="home" @click="handleHome" />
  <img src="../../assets/images/logoa.png" class="head" />
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

.head {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 28.5%;
}
.time {
  position: absolute;
  left: .8%;
  top: 3.5%;
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
.home{
  position: absolute;
  right: 2%;
  top: 2.5%;
  width: 2.5%;
  cursor: pointer;
  pointer-events: auto;
}
</style>
