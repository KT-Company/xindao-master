export default function geturlparam() {
  let obj = {};
  try {
    let that = this
    let url = window.location.href
    let p = url.split('?')[1]
    let keyValue = p.split('&');
    for (let i = 0; i < keyValue.length; i++) {
      let item = keyValue[i].split('=');
      let key = item[0];
      let value = item[1];
      obj[key] = value;
    }
  } catch (error) {
    // console.log('error: ', error);
  }
  return obj
}