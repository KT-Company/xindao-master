// 全局路径
window.publicPath = ''
window.publicUrl = '/api/custom-form/customForm.formInfos.get'
window.publicParams = {
  year: 2021,       // 全局年份
  year2: 2022,      // 全局年份 （企业与部门层）
  szxs: '北京',      // 全局省直辖市
  fireBackup: false, // 开启火力备用图
}
window.myToken = '9051be8aa5f4491f7ea73478a113de7c' // 仅用于测试
window.backHome = ()=>{
  // window.window.top.location.href = "/aie_web"; // 返回用户 home 地址
  window.location.href = 'http://www.baidu.com';
}