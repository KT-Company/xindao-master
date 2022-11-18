<script setup>
import { reactive, ref, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { firstA, getWenhaoA } from "@/2d/utils/letters";
import { useStore } from "vuex";

import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";
import { menu } from "@/2d/hooks/useMenu";

const router = useRouter();
const store = useStore();

const footers = menu; // 底部菜单
const pickId = ref(1); // 二级菜单显示

// 底部菜单点击事件
const handleFooters = (item, leve, son) => {
  if(STATE.isAnimating) return

  if (leve === 1) {
    store.commit("setMenuBid", null);
    store.commit("setMenuAid", item.id);
    if (item.id === 1) {
      const _son = item.children.find((v) => v.id === "1-1");
      store.commit("setMenuBid", _son.id);
      router.push(_son.path);
    } else if (item.id === 2) {
      router.push("/Area")
    }
    else {
      //
    }
    pickId.value = item.id;
  } else {
    if (["1-2", "1-3", "1-4"].includes(son.id)) return; // 这三个页面未完成不能点击
    store.commit("setMenuBid", son.id);
    if (item.id === 1) router.push(son.path);
  }

  
  // 3d
  if (item.name == "社会层") {
    API.hideAll()
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.industrialState,
      callback: () => {
        //
      },
    });
  } else if (item.name == "区域层") {
    API.hideAll()
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.areaState,
      callback: () => {
        API.showEnterpriseIcons()
      },
    });
  } else if (item.name == "制造集团") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zhizaojituan,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('zhizaojituanbangongshi')
      },
    });
  } else if (item.name == "工商银行") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.yinhangyuanqu,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('yinghang')
      },
    });
  } else if (item.name == "政务服务") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zhengwuzhongxin,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('zhengwuzhongxinbangongshi')
      },
    });
  } else if (item.name == "管委会") { // 无内部
    API.hideAll()
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.guanweihui,
      callback: () => {
        API.showEnterpriseIconByName(item.name)
      },
    });
  } else if (item.name == "物流公司") { // 无内部
    API.hideAll()
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.wuliuqiye,
      callback: () => {
        API.showEnterpriseIconByName(item.name)
      },
    });
  } else if (item.name == "综合服务") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.zonghefuwulou,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('zonghefuwulou')
      },
    });
  } else if (item.name == "销售公司") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.Xiao_Shou_Gong_Si,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('Xiao_Shou_Gong_Si')
      },
    });
  } else if (item.name == "供应企业") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.GongYingBanGongShi,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('GongYingBanGongShi')
      },
    });
  } else if (item.name == "经销企业") {
    API.showRoutes()
    API.showModels()
    API.cameraAnimation({
      cameraState: STATE.enterpriseStates.JingXiaoBanGongShi,
      callback: () => {
        API.hideAll()
        API.showMirror()
        API.showEnterpriseByName('JingXiaoBanGongShi')
      },
    });
  }
};

const handleMenu = (item) => {
  // const currRouter = firstA(router.currentRoute.value.path);
  // if (currRouter === item.path) router.replace("/Replace");
  // else router.push(item.path);
  router.push(item.path);
};

const goBack = () => {
  window.top.location.href = "/aie_web"; // 返回用户 home 地址
};

const routerName = ref("/IndustrialEconomy");
const isNewView = ref(true);

watch(
  () => router,
  () => {
    routerName.value = getWenhaoA(firstA(router.options.history.state.current));
  },
  { deep: true }
);
</script>

<template>
  <div :class="['footer']">
    <div class="footer-main">
      <ul class="button-box2 animated bounceInUp">
        <li
          v-for="item in footers"
          :key="item.id"
          @click="handleFooters(item, 1)"
          :class="[store.state.menuAid === item.id ? `pick2` : '']"
        >
          <img v-if="item.icon" :src="item.icon" class="f-icon" />
          <span class="m1-t">{{ item.name }}</span>

          <!-- 二级菜单 -->
          <ul
            :class="['menu-children', 'animated fadeIn']"
            v-show="item.id === pickId"
          >
            <div :class="['c-main', `pickClass${item.id}`]">
              <img src="../../assets/images/xiajian.png" class="xiajian" />
              <li
                v-for="son in item.children"
                :key="son.id"
                :class="store.state.menuBid.includes(son.id) ? 'pick2' : ''"
                @click.stop="handleFooters(item, 2, son)"
                :style="{
                  cursor: ['1-2', '1-3', '1-4'].includes(son.id)
                    ? 'no-drop'
                    : 'pointer',
                }"
              >
                {{ son.name }}
              </li>
            </div>
          </ul>
        </li>
      </ul>

      <!-- 返回按钮 -->
      <!-- <img src="../../assets/images/fanhui.png" class="back" @click="goBack" > -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
  width: 48%;
  height: 10.8vh;
  left: 26.1%;
  position: fixed;
  bottom: 0;
  pointer-events: auto;
  .footer-main {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
}

.button-box2 {
  display: flex;
  width: 100%;
  // height: 38%;
  height: 35%;
  justify-content: space-between;
  position: relative;
  * {
    font-size: 0.7vw;
    // font-size: 12px;
  }
  .f-icon {
    height: 50%;
    margin-right: 0.5rem;
  }
  li {
    display: flex;
    align-items: center;
    padding: 0 0.65rem;
    background: rgba(0, 0, 0, 0.7);
    transition: 0.3s;
    cursor: pointer;
  }
}

.menu-children {
  position: absolute;
  top: -160%;
  top: -170%;
  width: 100%;
  left: 0;
  height: 170%;
  cursor: auto;
  // background: url("@/2d/assets/images/xiansanjiao.png") no-repeat;
  .c-main {
    display: flex;
    justify-content: space-between;
    position: relative;
    height: 100%;
    width: 100%;
    overflow: hidden;
    li {
      height: 60%;
      &:not(&:nth-of-type(1)) {
        margin-left: 1%;
      }
    }
  }
}

.pick2 {
  background: rgba(197, 0, 0, 0.7) !important;
}

.back {
  position: absolute;
  width: 5%;
  right: -8%;
  cursor: pointer;
}
.xiajian {
  height: 0;
}
.pickClass1 {
  width: 45% !important;
  &::before {
    position: absolute;
    content: "";
    width: 8%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 13%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 7.5%;
  }
}

.pickClass2 {
  width: 38% !important;
  &::before {
    position: absolute;
    content: "";
    width: 37%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 44%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 37%;
  }
}
</style>
