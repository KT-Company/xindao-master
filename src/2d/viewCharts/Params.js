const inventoryNames = [] // 仓库种类名称

for (let index = 0; index < 18; index++) {
  let num = index + 1
  num = num >= 10 ? num : `0${num}`
  inventoryNames.push(`RM010${num}`)
}
for (let index = 0; index < 3; index++) {
  const num = index + 1
  inventoryNames.push(`FP0000${num}`)
}

const CHART = {
  inventoryNames
}

export default CHART