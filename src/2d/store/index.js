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
            year2: window.publicParams.year2, // 全局年份
            szxs: window.publicParams.szxs, // 全局省/直辖市
            LEVEL: 0, // 3维层级： 0地球1社会层2区域层3企业层4内部层
            enterpriseData: [],  // 企业总量
            data1: {},    // 看板数据1 
            data2: {},    // 看板数据2 
            data3: [],    // 看板数据3 
            data4: [],    // 看板数据4 
            data5: {},
            data6: {},
            data7: {},
            data8: {},
            data9: [],
            data10: [],
            debug: true, // console
            globalYear: window.publicParams.year, // 左上角年份
            pickId: 1, // 二级菜单显示
            MODE: 'EXPLORE', // 当前运行模式
        }
    },
    mutations: {
        setMODE(state, value) {
            state.MODE = value
        },
        setPickId(state, value) {
            state.pickId = value
        },
        setMenuAid(state, value) {
            state.menuAid = value
        },
        setMenuBid(state, value) {
            if (state.menuAid === 2) {
                if (!value) return state.menuBid = []
                const index = state.menuBid.findIndex(item => item === value)
                if (index === -1) {
                    if (value === '2-1') {
                        state.menuBid = ['2-1']
                    } else {
                        state.menuBid.push(value)
                        const index = state.menuBid.findIndex(item => item === '2-1')
                        index !== -1 && state.menuBid.splice(index, 1)
                    }
                }
                else state.menuBid.splice(index, 1)
            } else if (!value) {
                state.menuBid = []
            }
            else {
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
        },
        setData1(state, value) {
            state.data1 = value
        },
        setData2(state, value) {
            state.data2 = value
        },
        setData3(state, value) {
            state.data3 = value
        },
        setData4(state, value) {
            state.data4 = value
        },
        setData5(state, value) {
            state.data5 = value
        },
        setData6(state, value) {
            state.data6 = value
        },
        setData7(state, value) {
            state.data7 = value
        },
        setData8(state, value) {
            state.data8 = value
        },
        setData9(state, value) {
            state.data9 = value
        },
        setData10(state, value) {
            state.data10 = value
        },
    }
})
export default store