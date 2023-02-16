const moneyFormat = (num, decimal = 2, split = ',') => {
  /*
      parameter：
      num：格式化目标数字
      decimal：保留几位小数，默认2位
      split：千分位分隔符，默认为,
      moneyFormat(123456789.87654321, 2, ',') // 123,456,789.88
  */
  function thousandFormat(num) {
    const len = num.length
    return len <= 3 ? num : thousandFormat(num.substr(0, len - 3)) + split + num.substr(len - 3, 3)
  }
  if (isFinite(num)) { // num是数字
    if (num === 0) { // 为0
      return num.toFixed(decimal)
    } else { // 非0
      var res = ''
      var dotIndex = String(num).indexOf('.')
      if (dotIndex === -1) { // 整数
        res = thousandFormat(String(num)) + '.' + '0'.repeat(decimal)
      } else { // 非整数
        // js四舍五入 Math.round()：正数时4舍5入，负数时5舍6入
        // Math.round(1.5) = 2
        // Math.round(-1.5) = -1
        // Math.round(-1.6) = -2
        // 保留decimals位小数
        const numStr = String((Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)).toFixed(decimal)) // 四舍五入，然后固定保留2位小数
        const decimals = numStr.slice(dotIndex, dotIndex + decimal + 1) // 截取小数位
        res = thousandFormat(numStr.slice(0, dotIndex)) + decimals
      }
      return res
    }
  } else {
    return '--'
  }
}
export const toThreeDigitRating = num => {
  // try {
  //   const strNum = num.toString()
  //   const pointerIndex = strNum.indexOf(".")
  //   return num.toFixed(0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + strNum.substring(pointerIndex === -1 ? strNum.length : pointerIndex)
  // } catch (error) {
    return num
  // }
  // 金额格式化
  // return moneyFormat(num)
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