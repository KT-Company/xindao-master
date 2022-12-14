export const toThreeDigitRating = num => {
  try {
    const strNum = num.toString()
    const pointerIndex = strNum.indexOf(".")
    return num.toFixed(0).replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + strNum.substring(pointerIndex === -1 ? strNum.length : pointerIndex)
  } catch (error) {
    return num
  }
}