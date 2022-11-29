import store from '@/2d/store'
export function useYear(item, year = 8) {
  return item.year <= store.state.year && item.year > store.state.year - year
}

export function useLastYear(item, year = 8) {
  return item.year <= store.state.year - 1 && item.year > store.state.year - 1 - year
}