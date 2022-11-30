<template>
  <div class="progress-wrap">
    <div class="progress" :style="{ background: color, width: `${value}%` }"></div>
  </div>
</template>

<script setup>
defineProps({
  value: { type: Number },
  color: { type: String, default: "rgba(92, 115, 230, 1)" }
})
</script>

<style>
.progress-wrap {
  height: 8px;
  width: 100%;
  overflow: hidden;
  background: rgba(255, 255, 255, .2);
}

.progress {
  height: 100%;
  animation: .25s ease-in .5s beginTo both;
  transform: translateX(-100%);
}

@keyframes beginTo {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(0);
  }
}
</style>