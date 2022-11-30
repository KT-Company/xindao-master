
import { getData1, getData2, getData3, getData4, getData5, getData6, getData7, getData8 } from '@/2d/api'
import store from '@/2d/store'

const All = () => {
  getData1().then(res => {
    store.commit('setData1', res.data.formInfoList)
    console.log('data1：', store.state.data1);
  })

  getData2().then(res => {
    store.commit('setData2', res.data.formInfoList)
    console.log('data2：', store.state.data2);
  })

  getData3().then(res => {
    store.commit('setData3', res.data.formInfoList)
    console.log('data3：', store.state.data3);
  })

  getData4().then(res => {
    store.commit('setData4', res.data.formInfoList)
    console.log('data4：', store.state.data4);
  })

  getData5().then(res => {
    store.commit('setData5', res.data.formInfoList)
    console.log('data5：', store.state.data5);
  })

  getData6().then(res => {
    store.commit('setData6', res.data.formInfoList)
    console.log('data6：', store.state.data6);
  })

  getData7().then(res => {
    store.commit('setData7', res.data.formInfoList)
    console.log('data7：', store.state.data7);
  })

  getData8().then(res => {
    store.commit('setData8', res.data.formInfoList)
    console.log('data8：', store.state.data8);
  })
}

const getData = {
  All
}

export default getData