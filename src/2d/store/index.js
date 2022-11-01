import { createStore } from 'vuex';
import router from '../router'
const store = createStore({
    state() {
        return {
            urlParam: {},
            chart: { // echart 统一样式
                fontSize: 12,
                fontColor: '#999999',
                xLine: '#8098CD'
            },
            viewType: 1, // 当前显示的页面类型  默认1，2：区域层
            year: 2021, // 全局年份
            szxs: '北京' // 全局省/直辖市
        }
    },
    mutations: {
        setViewType(state, value) {
            state.viewType = value
        },
        setUrlParam(state, value) {
            state.urlParam = value
        },
        jumpPage(state, value) {
            router.push(`${value}`)
        }
    }
})
export default store