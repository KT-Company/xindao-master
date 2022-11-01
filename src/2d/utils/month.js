function getMonth() {
  var m = []
  for (let index = 0; index < 12; index++) {
    m.push(`${index + 1}月`)
  }
  return m
}

export{
  getMonth
}