function getIntinterval(x, y) {
  return Math.round(Math.random() * (y - x) + x)
}

function getRandomList(list, num) {
  const _list = JSON.parse(JSON.stringify(list))
  const lists = []
  for (let index = 0; index < num; index++) {
    const i = Math.floor(Math.random() * (_list.length - 1))
    lists.push(..._list.splice(i, 1))
  }
  return lists
}

export {
  getIntinterval,
  getRandomList,
}