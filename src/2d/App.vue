<script setup>
import { useRouter } from "vue-router";
import { nextTick, onMounted, provide, ref } from "vue";
import * as echarts from "echarts";
import { sceneOnLoad } from "@/3d/index.js";
provide("echarts", echarts);
const router = useRouter();
const isShow = ref(true);
// const iframeRef = ref(null)
const canvas3d = ref(null);
window.useShowView = (bool) => {
  isShow.value = bool;
};
// router.push("/Manufacture");
// router.push("/");
onMounted(() => {
  // provide("iframeRef", iframeRef.value.contentWindow);
    nextTick(() => {
      sceneOnLoad({
        domElement: canvas3d.value,
        callback: () => {
          // console.log('load finish')
        },
      });
    });
});
</script>

<template>
  <!-- <iframe
    src="./3d/index.html"
    frameborder="0"
    style="width: 100%; height: 100%; position: fixed; top: 0px; left: 0px;pointer-events: auto;"
    ref="iframeRef"
  ></iframe> -->
  <div id="main" v-if="isShow">
    <Header></Header>
    <router-view />
    <Footer></Footer>
  </div>
  <div ref="container3d" class="container-3d">
    <canvas class="canvas-3d" ref="canvas3d"></canvas>
  </div>
</template>
<style lang="less" scoped>
.backgroubnd {
  position: absolute;
  height: 100%;
  width: 100%;
  left: 0;
  top: 0;
}
#main {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 2;
  pointer-events: none;
  background: url("@/2d/assets/images/bg-5.png") no-repeat center center / 100%
    100%;
}
.container-3d {
  height: 100vh;
  width: 100vw;
  position: relative;
}
.canvas-3d {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

</style>