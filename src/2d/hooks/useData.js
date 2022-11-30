
import store from "@/2d/store/index";

const year = (name) => {
  return store.state.dataYear.find(item => item.qylx === name && item.year == store.state.year2)
}

const month = (name) => {
  return store.state.dataYear.filter(item => item.qylx === name && item.year == store.state.year2).sort((a, b) => {
    return parseInt(a.month) - parseInt(b.month)
  })
}
const useData = {
  year,
  month,
}
export default useData