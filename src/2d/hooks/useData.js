
import store from "@/2d/store/index";

const data1 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (name && store.state.MODE !== 'BUSINESS') return store.state.data1.find(item => item.qylx === name && item.year == store.state.year2)
  else return store.state.data1
}
const data2 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (name && store.state.MODE !== 'BUSINESS') return store.state.data2.find(item => item.qylx === name && item.year == store.state.year2)
  else return store.state.data2
}
const data3 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data3
  return store.state.data3.filter(item => item.qylx === name && item.year == store.state.year2)
}
const data4 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data4
  return store.state.data4.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}

const data5 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data5
  return store.state.data5.find(item => item.qylx === name && item.year == store.state.year2)
}
const data6 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data6
  return store.state.data6.find(item => item.qylx === name && item.year == store.state.year2)
}
const data7 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data7
  return store.state.data7.filter(item => item.qylx === name && item.year == store.state.year2)
}
const data8 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data8
  return store.state.data8.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}
const data9 = (name) => {
  if (store.state.MODE === 'BUSINESS') return store.state.data9
  store.state.globalYear = window.publicParams.year2
  return store.state.data9.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}
const data10 = (name) => {
  store.state.globalYear = window.publicParams.year2
  if (store.state.MODE === 'BUSINESS') return store.state.data10
  return store.state.data10.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}
const useData = { data1, data2, data3, data4, data5, data6, data7, data8, data9, data10 }
export default useData