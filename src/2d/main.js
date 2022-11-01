import { createApp } from 'vue'
import './global.css'
import App from './App.vue'
import * as echarts from "echarts";
import router from '@/2d/router'
import store from '@/2d/store'
import '@/2d/css/animate.min.css'
import dayjs from "dayjs";
import getUrlParam from '@/2d/utils/getUrlParam'
import {
    Left,
    Right,
    Header,
    Footer,
    Item,
    Echart,
    Title,
} from '@/2d/components'
const app = createApp(App);
app.component('Left', Left)
    .component('Right', Right)
    .component('Header', Header)
    .component('Footer', Footer)
    .component('Item', Item)
    .component('Echart', Echart)
    .component('Title', Title)

if (dayjs().format("YYYY-MM-DD") > "2022-12-01") {
    alert('体验时间过期，请联系管理员')
} else {
    app.use(router).use(store).mount('#app')
    store.commit('setUrlParam',getUrlParam())
}


export { app }