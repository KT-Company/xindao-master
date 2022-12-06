<script setup>
import { reactive, ref, watch, inject } from "vue";
import { useRouter } from "vue-router";
import { firstA, getWenhaoA } from "@/2d/utils/letters";
import { useStore } from "vuex";

import { API } from "@/3d/API";
import { STATE } from "@/3d/STATE";
import { CACHE } from "@/3d/CACHE";
import { menu } from "@/2d/hooks/useMenu";
import USE3D from "@/2d/hooks/use3d";

const router = useRouter();
const store = useStore();

const isShowBack = () => {
  const isDepartment = ![1, 2].includes(store.state.menuAid);
  return isDepartment && store.state.menuBid.length;
};

// 底部菜单点击事件
const handleFooters = (item, leve, son) => {
  if (leve === 1) {
    if (STATE.isAnimating) return;
    if (store.state.LEVEL == 4) return;
    const currRouter = firstA(router.currentRoute.value.path);
    store.commit("setMenuBid", null);
    // 一级菜单点击事件
    store.commit("setMenuAid", item.id);
    if (item.id === 1) {
      const _son = item.children.find((v) => v.id === "1-1");
      store.commit("setMenuBid", _son.id);
    }
    if (currRouter === item.path) {
      router.replace("/Replace");
      console.log("currRouter: ", currRouter);
    } else router.push(item.path);
    store.commit("setPickId", item.id);
  } else {
    if (STATE.isAnimating) return;
    // 二级菜单点击事件
    // if (["1-2", "1-4"].includes(son.id)) return; // 这三个页面未完成不能点击
    store.commit("setMenuBid", son.id);
    son.path && router.push(son.path);
    // if (item.id === 1) router.push(son.path);
    // if (son.id === "3-2") router.push(son.path);
  }

  // 3d
  USE3D.menuInteraction(item, leve, son);
};

const handleMenu = (item) => {
  // const currRouter = firstA(router.currentRoute.value.path);
  // if (currRouter === item.path) router.replace("/Replace");
  // else router.push(item.path);
  router.push(item.path);
};

const goBack = () => {
  // window.top.location.href = "/aie_web"; // 返回用户 home 地址(废弃)
  store.commit("setMenuBid", null);
  store.commit("changeLevel", 3);
  const currentRoute = menu.value.find(
    (item) => item.id === store.state.menuAid
  );
  router.push(currentRoute.path);
  USE3D.goBack();
};

const routerName = ref("/IndustrialEconomy");

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
          v-for="item in menu"
          :key="item.id"
          @click.stop="handleFooters(item, 1)"
          :class="[store.state.menuAid === item.id ? `pick2` : '']"
        >
          <img
            v-if="item.icon"
            :src="item.icon"
            class="f-icon"
          />
          <span class="m1-t">{{ item.name }}</span>

          <!-- 二级菜单 -->
          <ul
            :class="['menu-children', 'animated fadeIn']"
            v-show="item.id === store.state.pickId"
          >
            <div :class="['c-main', `pickClass${item.id}`]">
              <img
                src="../../assets/images/xiajian.png"
                class="xiajian"
              />
              <li
                v-for="son in item.children"
                :key="son.id"
                :class="store.state.menuBid.includes(son.id) ? 'pick2' : ''"
                @click.stop="handleFooters(item, 2, son)"
              >
                {{ son.name }}
              </li>
            </div>
          </ul>
        </li>
      </ul>

      <!-- 返回按钮 -->
      <Transition
        enter-active-class="bounceInUp"
        leave-active-class="bounceOutDown"
      >
        <img
          v-show="store.state.LEVEL == 4"
          src="../../assets/images/fanhui.png"
          class="back animated"
          @click="goBack"
        >
      </Transition>
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
    pointer-events: auto;
    white-space: nowrap;
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
  pointer-events: none;
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
  top: -15%;
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

.pickClass3 {
  width: 57% !important;
  &::before {
    position: absolute;
    content: "";
    width: 41.5%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 45.5%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 41%;
  }
}

.pickClass4 {
  width: 7.7% !important;
  left: 75.3%;
  &::before {
    position: absolute;
    content: "";
    width: 36%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 71%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 34%;
  }
}

.pickClass5 {
  width: 7.7% !important;
  left: 84.5%;
  &::before {
    position: absolute;
    content: "";
    width: 36%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 71%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 34%;
  }
}

.pickClass7 {
  width: 23% !important;
  left: 50%;
  &::before {
    position: absolute;
    content: "";
    width: 43%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 54%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 42%;
  }
}

.pickClass8 {
  width: 23% !important;
  left: 59%;
  &::before {
    position: absolute;
    content: "";
    width: 43%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 54%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 42%;
  }
}
// .pickClass9 {
//   width: 23% !important;
//   left: 67%;
//   &::before {
//     position: absolute;
//     content: "";
//     width: 43%;
//     border-bottom: 1px solid rgb(179, 179, 179);
//     bottom: 28%;
//   }
//   &::after {
//     position: absolute;
//     content: "";
//     width: 100%;
//     border-bottom: 1px solid rgb(179, 179, 179);
//     bottom: 28%;
//     left: 54%;
//   }
//   .xiajian {
//     position: absolute;
//     height: 42%;
//     bottom: 0%;
//     left: 42%;
//   }
// }
.pickClass9 {
  width: 30% !important;
  left: 20%;
  &::before {
    position: absolute;
    content: "";
    width: 43%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 51%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 42%;
  }
}

.pickClass10 {
  width: 30% !important;
  left: 35%;
  &::before {
    position: absolute;
    content: "";
    width: 52.5%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 61%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    left: 52%;
  }
}

.pickClass11 {
  width: 38% !important;
  left: 23.2%;
  &::before {
    position: absolute;
    content: "";
    width: 48.5%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
  }
  &::after {
    position: absolute;
    content: "";
    width: 100%;
    border-bottom: 1px solid rgb(179, 179, 179);
    bottom: 28%;
    left: 56%;
  }
  .xiajian {
    position: absolute;
    height: 42%;
    bottom: 0%;
    right: 44%;
  }
}
</style>
