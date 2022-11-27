<script setup>
import { defineProps } from "vue";
const props = defineProps({
  icon: String,
});
</script>

<template>
  <p class="b-title"><img
      v-if="icon"
      :src="icon"
      class="icon"
    >
    <slot></slot>
  </p>
</template>

<style lang="less" scoped>
.b-title {
  font-size: var(--titleSize);
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #ffffff;
  height: 2rem;
}
</style>