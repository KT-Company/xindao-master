
import store from "@/2d/store/index";

const data1 = (name) => {
  if (name) return store.state.data1.find(item => item.qylx === name && item.year == store.state.year2)
  else return store.state.data1
}
const data2 = (name) => {
  if (name) return store.state.data2.find(item => item.qylx === name && item.year == store.state.year2)
  else return store.state.data2
}
const data3 = (name) => {
  return store.state.data3.filter(item => item.qylx === name && item.year == store.state.year2)
}
const data4 = (name) => {
  return store.state.data4.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}

const data5 = (name) => {
  return store.state.data5.find(item => item.qylx === name && item.year == store.state.year2)
}
const data6 = (name) => {
  return store.state.data6.find(item => item.qylx === name && item.year == store.state.year2)
}
const data7 = (name) => {
  return store.state.data7.filter(item => item.qylx === name && item.year == store.state.year2)
}
const data8 = (name) => {
  return store.state.data8.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}
const useData = { data1, data2, data3, data4, data5, data6, data7, data8 }
export default useData