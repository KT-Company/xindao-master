export const toThreeDigitRating = num => {
  try {
    const strNum = num.toString()
    const pointerIndex = strNum.indexOf(".")
    return num.toFixed(0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + strNum.substring(pointerIndex === -1 ? strNum.length : pointerIndex)
  } catch (error) {
    return num
  }
}


/**
 * 保留两位小数*100
 * @date 2023-01-16
 * @param {number} num
 * @returns {any} 结果
 */
export const reservedTwo100times = num => {
  return Number(num).toPrecision(2) * 100
}