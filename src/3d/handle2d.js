import { menu } from "@/2d/hooks/useMenu";
import router from "@/2d/router";
import store from "@/2d/store";

const titleMap = {
  '企业管理部': '企管部'
}

const getMenuBInfo = (name) => {
  return menu.value.find(item => item.id === store.state.menuAid).children.find(item => item.name == name)
}

export const handleMenu = (id, name) => {
  const title = titleMap[name] || name
  if (id === 3) {
    const menuInfo = getMenuBInfo(title)
    store.commit('setMenuBid',menuInfo.id)
    menuInfo.path && router.push(menuInfo.path)
  }
  if (id === 7) {
    const menuInfo = getMenuBInfo(title)
    store.commit('setMenuBid',menuInfo.id)
    menuInfo.path && router.push(menuInfo.path)
  }
  if (id === 8) {
    const menuInfo = getMenuBInfo(title)
    store.commit('setMenuBid',menuInfo.id)
    menuInfo.path && router.push(menuInfo.path)
  }
  if (id === 9) {
    const menuInfo = getMenuBInfo(title)
    store.commit('setMenuBid',menuInfo.id)
    menuInfo.path && router.push(menuInfo.path)
  }
  if (id === 10) {
    const menuInfo = getMenuBInfo(title)
    store.commit('setMenuBid',menuInfo.id)
    menuInfo.path && router.push(menuInfo.path)
  }
  if (id === 11) {
    const menuInfo = getMenuBInfo(title)
    store.commit('setMenuBid',menuInfo.id)
    menuInfo.path && router.push(menuInfo.path)
  }
}
