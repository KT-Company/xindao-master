<!-- 制造集团 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();

</script>

<template>
  <Left>
    <Title>当前银行存款</Title>
    <div class="main20">
      <p><span>单位：元</span><span>详细金额：4965548547元</span></p>
      <ul>
        <li>4</li>
      </ul>
    </div>
    <Title>当前银行贷款</Title>
    <div class="main20"></div>
    <Title>年度收入指标</Title>
    <div class="main30"></div>
    <Title>采购预算</Title>
    <div class="main30"></div>
  </Left>
  <Right>
    <Title>营业收入</Title>
    <div class="main25"></div>
    <Title>成本支出</Title>
    <div class="main25"></div>
    <Title>仓库空闲率</Title>
    <div class="main20"></div>
    <Title>库存量</Title>
    <div class="main30"></div>
  </Right>
</template>

<style lang="less" scoped>
.main20{
  height: calc(20% - var(--titleH));
}

.main30{
  height: calc(30% - var(--titleH));
}
.main25{
  height: calc(25% - var(--titleH));
}
</style>