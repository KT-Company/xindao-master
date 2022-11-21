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
            menuAid: 1, // 底部一级导航选中 id
            menuBid: ['1-1'], // 底部二级导航选中 id
            year: window.publicParams.year, // 全局年份
            szxs: window.publicParams.szxs, // 全局省/直辖市
            LEVEL: 1, // 3维层级： 0地球1社会层2区域层3企业层4内部层
            enterpriseData: []  // 企业总量
        }
    },
    mutations: {
        setMenuAid(state, value) {
            state.menuAid = value
        },
        setMenuBid(state, value) {
            if (state.menuAid === 2) {
                const index = state.menuBid.findIndex(item => item === value)
                if (index === -1) state.menuBid.push(value)
                else state.menuBid.splice(index, 1)
            } else {
                state.menuBid = [value]
            }
        },
        setViewType(state, value) {
            state.viewType = value
        },
        setUrlParam(state, value) {
            state.urlParam = value
        },
        jumpPage(state, value) {
            router.push(`${value}`)
        },
        changeLevel(state, value) {
            state.LEVEL = value
        },
        setEnterpriseData(state, value) {
            state.enterpriseData = value
        }
    }
})
export default store