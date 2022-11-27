<!-- 综合服务中心 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

const data = ref([
  { name: "市场开拓", value: 40296, unit: "亿",class:'lan',img:require('@/2d/assets/images/sckt.png') },
  { name: "广告投放", value: 40296, unit: "亿",class:'huang',img:require('@/2d/assets/images/ggtf.png') },
  { name: "3C认证", value: 40296, unit: "亿",class:'lan',img:require('@/2d/assets/images/ccc.png') },
  { name: "高新申请", value: 40296, unit: "亿",class:'lv',img:require('@/2d/assets/images/gxsq.png') },
  { name: "ISO9001", value: 40296, unit: "亿",class:'lan',img:require('@/2d/assets/images/iso.png') },
  { name: "软著", value: 40296, unit: "亿",class:'huang',img:require('@/2d/assets/images/rz.png') },
  { name: "产品研发", value: 40296, unit: "亿",class:'lan',img:require('@/2d/assets/images/cpyf.png') },
  { name: "碳交易", value: 40296, unit: "亿",class:'huang',img:require('@/2d/assets/images/tjy.png') },
  { name: "电费", value: 40296, unit: "亿",class:'lan',img:require('@/2d/assets/images/df.png') },
  { name: "资产购买", value: 40296, unit: "亿",class:'lv',img:require('@/2d/assets/images/zcgm.png') },
  { name: "人员招聘", value: 40296, unit: "亿",class:'lan',img:require('@/2d/assets/images/ryzp.png') },
  { name: "解聘", value: 40296, unit: "亿" ,class:'huang',img:require('@/2d/assets/images/jp.png')},
]);
</script>

<template>
  <div class="zhfwzx-main">
    <Title class="title">综合服务中心指标</Title>
    <ul class="zhfwzx-box">
      <li
        v-for="(item,index) in data"
        :key="index"
        :class="item.class"
      ><img :src=item.img><p><span>{{item.name}}</span><span class="num-type value">{{item.value}}{{item.unit}}</span></p></li>
    </ul>
  </div>
</template>

<style lang="less" scoped>
.title {
  height: 18%;
  width: 24%;
  padding-left: 4.2%;
}
.zhfwzx-main {
  position: absolute;
  width: 100%;
  height: 32%;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
}
.zhfwzx-box {
  height: calc(100% - 20%);
  margin-top: 1%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-between;
  li{
    width: 15%;
    height: 45%;
    display: flex;
    align-items: center;
    padding-left: .5%;
    img{
      width: 30%;
      height: 80%;
      bottom: 5%;
      margin-top: 6%;
    }
    p{
      display: flex;
      height: 80%;
      width: 70%;
      flex-direction: column;
      align-items:flex-start;
      justify-content: center;
      padding-left: 5%;
      span{
        margin: 1%;
        font-size: 1vw;
      }
      .value{
        
        font-size: 1.4vw;
      }
    }
  }
}
.lan{
  background: url("@/2d/assets/images/lan-bg.png") no-repeat center center /
    100% 100%;
}
.huang{
  background: url("@/2d/assets/images/huang-bg.png") no-repeat center center /
    100% 100%;
}
.lv{
  background: url("@/2d/assets/images/lv-bg.png") no-repeat center center /
    100% 100%;
}
</style>