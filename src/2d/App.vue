<script setup>
import { nextTick, onMounted, provide, ref } from "vue";
import * as echarts from "echarts";
import { sceneOnLoad } from "@/3d/index.js";
import { useStore } from "vuex";
const store = useStore();
provide("echarts", echarts);
const canvas3d = ref(null);
onMounted(() => {
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
  <div id="main" v-if="store.state.LEVEL > 0">
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
  background: url("@/2d/assets/images/bg-5.png") no-repeat center center / 101%
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