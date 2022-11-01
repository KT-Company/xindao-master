<script setup>
import { defineProps } from "vue";
const props = defineProps({
  title: String,
  icon: String,
});
</script>

<template>
  <div class="item">
    <p class="item-title"><img v-if="icon" :src="icon" class="icon">{{ title }}</p>
    <slot></slot>
  </div>
</template>

<style lang="less" scoped>
.item {

  // border: 1px solid rgb(0, 238, 255);
  // padding-bottom: 2vh;
  .item-title {
    color: rgb(255, 255, 255);
    display: flex;
    align-items: center;
    font-family: Source Han Sans CN;
    font-size: .96vw;
    font-weight: 600;
    padding-left: 18%;
    background: url('@/2d/assets/images/item-title.png') no-repeat center center / 100% 100%;
    height: 2.7vw;
    // height: 52px;
  }
}

.icon {
  margin-right: 10px;
  width: 15px;
  margin-top: 2.5px;
}
</style>