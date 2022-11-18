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

const menus = ref([
  // 只用于老版本-后面会删除
  { id: 1, name: "产业经济", path: "/IndustrialEconomy" },
  { id: 2, name: "交通出行", path: "/Transportation" },
  { id: 3, name: "环境人口", path: "/Environmental" },
  { id: 4, name: "教育医疗", path: "/Education" },
  { id: 5, name: "能源碳排放", path: "/Energy" },
]);

const footers = menu; // 底部菜单
const pickId = ref(1); // 二级菜单显示

// 底部菜单点击事件
const handleFooters = (item, leve, son) => {
  if (leve === 1) {
    store.commit("setMenuBid", null);
    store.commit("setMenuAid", item.id);
    if (item.id === 1) {
      const _son = item.children.find((v) => v.id === "1-1");
      store.commit("setMenuBid", _son.id);
      router.push(_son.path);
    }
    if (item.id === 2) router.push("/Area");
    pickId.value = item.id;
  } else {
    if (["1-2", "1-3", "1-4"].includes(son.id)) return; // 这三个页面未完成不能点击
    store.commit("setMenuBid", son.id);
    if (item.id === 1) router.push(son.path);
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
    API.hideAll();
    API.showIcons();
    API.showModels();
    API.showRoutes();

    // 根据路由名称调用三维方法
    if (routerName.value === "/IndustrialEconomy") {
      isNewView.value = true;
      // API.showIndustrialEconomy();
      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          // API.showAreaIcons();
        },
      });
    }
    if (routerName.value === "/Transportation") {
      isNewView.value = false;
      API.cameraAnimation({
        cameraState: STATE.trafficState,
        callback: () => {
          API.showTraffics();
        },
      });
    }
    if (routerName.value === "/Environmental") {
      isNewView.value = false;
      // for (const i in CACHE.completeBoundrays) {
      //   const d = CACHE.completeBoundrays[i];
      //   if (d.name == "environment") d.visible = true;
      // }

      API.cameraAnimation({
        cameraState: STATE.environmentState,
        callback: () => {
          // API.showEnvironments();
          // API.beforeEnvironmentAniamtion();
          // API.animateEnvironment();
        },
      });
    }
    if (routerName.value === "/Education") {
      isNewView.value = true;
      // for (const i in CACHE.completeBoundrays) {
      //   const d = CACHE.completeBoundrays[i];
      //   if (d.name == "education") d.visible = true;
      // }

      API.cameraAnimation({
        cameraState: STATE.educationState,
        callback: () => {
          // API.showEducations();
          // API.beforeEducationAniamtion();
          // API.animateEducation();
        },
      });
    }
    if (routerName.value === "/Energy") {
      isNewView.value = false;
      API.cameraAnimation({
        cameraState: STATE.industrialState,
        callback: () => {
          API.showEnergyIcons();
          API.showEnergy();
        },
      });
    }
    if (routerName.value === "/Area") {
      isNewView.value = true;
      API.showPlates();
      API.hideIcons();
    }
  },
  { deep: true }
);
</script>

<template>
  <div :class="['footer', !isNewView ? 'fb' : '']">
    <div class="footer-main">
      <ul class="button-box" v-if="!isNewView">
        <li
          v-for="item in menus"
          :key="item.id"
          @click="handleMenu(item)"
          :class="routerName == item.path ? 'pick' : ''"
        >
          <span>{{ item.name }}</span>
        </li>
      </ul>

      <!-- 新-导航栏 -->
      <ul class="button-box2 animated bounceInUp" v-if="isNewView">
        <li
          v-for="item in footers"
          :key="item.id"
          @click="handleFooters(item, 1)"
          :class="store.state.menuAid === item.id ? 'pick2' : ''"
        >
          <img v-if="item.icon" :src="item.icon" class="f-icon" />
          <span class="m1-t">{{ item.name }}</span>

          <!-- 二级菜单 -->
          <ul
            :class="['menu-children', 'animated fadeIn']"
            v-show="item.id === pickId"
          >
            <li
              v-for="son in item.children"
              :key="son.id"
              :class="store.state.menuBid.includes(son.id) ? 'pick2' : ''"
              @click.stop="handleFooters(item, 2, son)"
            >
              {{ son.name }}
            </li>
          </ul>
        </li>
      </ul>

      <!-- <img src="../../assets/images/fanhui.png" class="back" @click="goBack" v-if="store.state.LEVEL == 2"> -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.footer {
  width: 100%;
  height: 10.8vh;
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

    button {
      padding: 0 20px;
      margin: 0 20px;
      height: 50%;
    }

    .button-box {
      display: flex;
      position: absolute;
      width: 40%;
      cursor: pointer;
      bottom: 40%;
      align-items: flex-end;

      li {
        height: 10.8vh;
        flex: 1;
        background: url("@/2d/assets/images/router.png") no-repeat center center /
          100% 100%;
        display: flex;
        justify-content: center;

        span {
          margin-top: -20%;
          color: #a1b4d1eb;
          font-size: 1.05vw;
          font-family: AliHYAiHei;
          height: 1.2vw;
          font-weight: bold;
          text-shadow: 0px 6px 4px rgba(0, 16, 61, 0.63);
        }

        transition: 0.3s ease;
        // &:hover {
        //   scale: 1.1;
        // }
      }
    }
  }
}
.fb {
  background: url("@/2d/assets/images/footer.png") no-repeat center center /
    100% 100%;
}
.back {
  position: absolute;
  right: 24%;
  height: 40%;
  cursor: pointer;
  // &:hover{
  //   scale: 1.1;
  // }
}

.button-box2 {
  display: flex;
  width: 48%;
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
    // &:not(&:nth-child(1)) {
    //   margin-left: .5%;
    // }
    &:hover {
      cursor: pointer;
      // scale: 1.1;
    }
  }
}

.menu-children {
  display: flex;
  justify-content: flex-start;
  position: absolute;
  top: -160%;
  top: -120%;
  height: 100%;
  width: 100%;
  left: 0;
  li {
    &:not(&:nth-child(1)) {
      margin-left: 1%;
    }
  }
}

.pick2 {
  background: rgba(197, 0, 0, 0.7) !important;
}

.pick {
  background: url("@/2d/assets/images/router-pick.png") no-repeat center center /
    100% 100% !important;
  height: 19vh !important;

  span {
    margin-top: 10% !important;
    background: linear-gradient(
      to bottom,
      rgb(255, 255, 255) 50%,
      rgb(0, 76, 255)
    ) !important;
    background-clip: text !important;
    -webkit-background-clip: text !important;
    color: transparent !important;
    // 转变为行内块元素 文字渐变才会生效
    display: inline-block !important;
    text-shadow: 0px 0px 6px rgb(255 255 255 / 63%) !important;
  }
}
</style>
