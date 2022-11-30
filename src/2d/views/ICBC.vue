<!-- 工商银行 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
const dataLeft = ref([
  {
    id: '1',
    color: '#FF5349',
    bg: require('@/2d/assets/icons/ICBC-bg-left-1.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '2',
    color: '#FF9F40',
    bg: require('@/2d/assets/icons/ICBC-bg-left-2.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '3',
    color: '#5C73E6',
    bg: require('@/2d/assets/icons/ICBC-bg-left-3.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '4',
    color: '#CCCCCC',
    bg: require('@/2d/assets/icons/ICBC-bg-left-4.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '5',
    color: '#CCCCCC',
    bg: require('@/2d/assets/icons/ICBC-bg-left-5.png'),
    name: '企业类型',
    value: '2154788'
  },
]);
const dataRight = ref([
  {
    id: '1',
    bg: require('@/2d/assets/icons/ICBC-bg-right-1.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '2',
    bg: require('@/2d/assets/icons/ICBC-bg-right-2.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '3',
    bg: require('@/2d/assets/icons/ICBC-bg-right-3.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '4',
    bg: require('@/2d/assets/icons/ICBC-bg-right-4.png'),
    name: '企业类型',
    value: '2154788'
  },
  {
    id: '5',
    bg: require('@/2d/assets/icons/ICBC-bg-right-5.png'),
    name: '企业类型',
    value: '2154788'
  },
]);
onMounted(() => { })
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业贷款</Title>
      <Content class="dpy-column">
        <div class="left-wrap dpy-row" v-for="(item, index) in dataLeft" :key="index" :style="{
          background: `url(${item.bg})`,
          'background-size': '100% 100%'
        }">
          <div class="dpy-row">
            <span :style="{ color: item.color }">{{ item.id }}</span>
            <p>{{ item.name }}</p>
          </div>
          <div>￥{{ item.value }}</div>
        </div>
      </Content>
    </Bar>
  </Left>

  <Right class="z-right">
    <Bar>
      <Title>企业存款</Title>
      <Content class="dpy-column">
        <div class="right-wrap dpy-row" v-for="(item, index) in dataRight" :key="index" :style="{
          background: `url(${item.bg})`,
          'background-size': '100% 100%'
        }">
          <div class="dpy-row">
            <p>{{ item.name }}</p>
          </div>
          <div>￥{{ item.value }}</div>
        </div>
      </Content>
    </Bar>
  </Right>
</template>

<style lang="less" scoped>
.z-left,
.z-right {
  top: 29.57% !important;
  height: 40.9% !important;
}

.left-wrap,
.right-wrap {
  width: 100%;
  padding: 1.2vh 2vh;

  span {
    font-family: SourceHanSansCN;
    font-weight: bold;
    font-size: .8vw;
  }

  p {
    padding-left: 1.5vh;
  }

  &>div:nth-of-type(2) {
    font-family: SourceHanSansCN;
    font-weight: bold;
    font-size: 1vw;
  }
}
</style>