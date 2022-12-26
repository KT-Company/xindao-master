const inventoryNames = [] // 仓库种类名称 ( echart x 轴显示名字 )
const inventoryNamesLow = [] // 仓库种类名称 ( 后端返回数据 key )
for (let index = 0; index < 18; index++) {
  let num = index + 1
  num = num >= 10 ? num : `0${num}`
  inventoryNames.push(`RM010${num}`)
  inventoryNamesLow.push(`rm010${num}`)
}
for (let index = 0; index < 3; index++) {
  const num = index + 1
  inventoryNames.push(`FP0000${num}`)
  inventoryNamesLow.push(`fp0000${num}`)
}

const CHART = {
  inventoryNames,
  inventoryNamesLow,
}

export default CHART