<!-- 综合服务 -->
<script setup>
import { onMounted, reactive, ref } from "vue";
import { useStore } from "vuex";
const store = useStore();
let sum = ref(4965548547);
let money = reactive({
  one: 4,
  two: 9,
  three: 6,
  four: 5,
  unit: '亿',
});
let synthesizeIncome = reactive({
  SCKT: "40,290.65",
  GGTF: "40,290.65",
  RZ3C: "40,290.65",
  GXRZ: "40,290.65",
  ISORZ: "40,290.65",
  RJZZQ: "40,290.65",
  CPYF: "40,290.65",
  TJY: "40,290.65",
  DFDS: "40,290.65",
  RYZP: "40,290.65",
  RYJP: "40,290.65",
  ZCGM: "40,290.65",
  ZCHS: "-800,000.00",

});
</script>

<template>
  <Left class="z-left">
    <Bar>
      <Title>企业银行存款</Title>
      <Content class="top-wrap">
        <div class="sum-box dpy-row">
          <div>单位：元</div>
          <div>详细金额：{{ sum }}元</div>
        </div>
        <div class="money-box dpy-row">
          <div>{{ money.one }}</div>
          <div>{{ money.two }}</div>
          <div>{{ money.three }}</div>
          <div>{{ money.four }}</div>
          <div>{{ money.unit }}</div>
        </div>
      </Content>
    </Bar>
    <Bar>
      <Title>综合服务收入(元)</Title>
      <Content>
        <div class="synthesizeIncome-wrap">
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-1.png" alt=""></div>
              <div>
                <div>市场开拓</div>
                <div>{{ synthesizeIncome.SCKT }}</div>
              </div>
            </div>
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-2.png" alt=""></div>
              <div>
                <div>广告投放</div>
                <div>{{ synthesizeIncome.GGTF }}</div>
              </div>
            </div>
          </div>
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-3.png" alt=""></div>
              <div>
                <div>3C认证</div>
                <div>{{ synthesizeIncome.RZ3C }}</div>
              </div>
            </div>
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-4.png" alt=""></div>
              <div>
                <div>高新认证</div>
                <div>{{ synthesizeIncome.GXRZ }}</div>
              </div>
            </div>
          </div>
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-5.png" alt=""></div>
              <div>
                <div>ISO认证</div>
                <div>{{ synthesizeIncome.ISORZ }}</div>
              </div>
            </div>
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-6.png" alt=""></div>
              <div>
                <div>软件著作权</div>
                <div>{{ synthesizeIncome.RJZZQ }}</div>
              </div>
            </div>
          </div>
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-7.png" alt=""></div>
              <div>
                <div>产品研发</div>
                <div>{{ synthesizeIncome.CPYF }}</div>
              </div>
            </div>
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-8.png" alt=""></div>
              <div>
                <div>碳交易</div>
                <div>{{ synthesizeIncome.TJY }}</div>
              </div>
            </div>
          </div>
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-9.png" alt=""></div>
              <div>
                <div>电费代收</div>
                <div>{{ synthesizeIncome.DFDS }}</div>
              </div>
            </div>
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-10.png" alt=""></div>
              <div>
                <div>人员招聘</div>
                <div>{{ synthesizeIncome.RYZP }}</div>
              </div>
            </div>
          </div>
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-11.png" alt=""></div>
              <div>
                <div>人员解聘</div>
                <div>{{ synthesizeIncome.RYJP }}</div>
              </div>
            </div>
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-12.png" alt=""></div>
              <div>
                <div>资产购买</div>
                <div>{{ synthesizeIncome.ZCGM }}</div>
              </div>
            </div>
          </div>
          <div class="dpy-row">
            <div class="dpy-row">
              <div><img src="@/2d/assets/icons/ico-comsive-13.png" alt=""></div>
              <div>
                <div>资产回收</div>
                <div>{{ synthesizeIncome.ZCHS }}</div>
              </div>
            </div>

          </div>
        </div>
      </Content>
    </Bar>
  </Left>
</template>

<style lang="less" scoped>
.z-left {
  display: grid;
  grid-template-rows: 147fr 562fr;
  row-gap: 2%;
  top: 16.59% !important;
  height: 67% !important;

  .top-wrap {
    padding: 0 5%;

    .sum-box {
      font-size: 12px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #FFFFFF;
      opacity: 0.8;
      margin: 0 0 .3rem 0;
    }

    .money-box {
      height: 6vh;
      line-height: 6vh;


      div {
        width: 14%;
        height: 100%;
        background: url("@/2d/assets/icons/ico-comsive-0.png") no-repeat center center / 100% 100%;
        text-align: center;
        font-size: 1.9vw;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #FFFFFF;

      }

      &>div:nth-of-type(2) {
        position: relative;

        &::after {
          content: "";
          width: 7px;
          height: 7px;
          background-color: #FFFFFF;
          border-radius: 50%;
          display: inline-block;
          overflow: hidden;
          clear: both;
          position: absolute;
          right: -40%;
          bottom: 20%;
        }
      }

    }
  }

  .synthesizeIncome-wrap {
    margin: 0 1rem;

    &>div:not(:last-child) {
      border-bottom: 1px solid rgba(255, 255, 255, .3);
    }

    &>div {
      padding: 6% 0 5% 0;

      &>div {
        align-items: self-end;

        &>div:nth-of-type(2) {
          display: flex;
          flex-flow: column;
          justify-content: space-between;
          height: 4vh;
          padding-left: 1rem;

          &>div:nth-of-type(1) {
            height: 1vh;
            font-size: 14px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #FFFFFF;
            opacity: 0.5;
          }

          &>div:nth-of-type(2) {
            height: 1vh;
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 500;
            color: #FFFFFF;

          }
        }
      }

      img {
        width: 2rem;
        height: 2rem;
        margin-right: 11%;
      }
    }
  }
}
</style>