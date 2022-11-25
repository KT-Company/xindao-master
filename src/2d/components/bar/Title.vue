<script setup>
import { defineProps } from "vue";
const props = defineProps({
  icon: String,
});
</script>

<template>
  <p class="item-title"><img
      v-if="icon"
      :src="icon"
      class="icon"
    >
    <slot></slot>
  </p>
</template>

<style lang="less" scoped>
.item-title {
  color: rgb(255, 255, 255);
  display: flex;
  align-items: center;
  // font-family: Source Han Sans CN;
  font-size: 0.96vw;
  padding-left: 18%;
  background: url("@/2d/assets/images/item-title.png") no-repeat center center /
    100% 100%;
  height: var(--titleH);
}
.icon {
  margin-right: 10px;
  width: 15px;
  margin-top: 2.5px;
}
</style>