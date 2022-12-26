// 全局路径
window.publicPath = ''
window.publicUrl = '/api/custom-form/customForm.formInfos.get' // 探索模式--请求接口地址
// window.MODE_BUSINESS = 'https://dedu.seentao.com/api/vbseTeach/vbse.postInfo.member.get' // 经营模式--请求接口地址
window.FRONT_INTERFACE = [
  'https://dapi.seentao.com/vbseTeach/vbse.postInfo.member.get',
  'https://dedu.seentao.com/api/vbseTeach/vbse.teachClass.steps.get',
  'https://dedu.seentao.com/api/xverse/paramsmapping/convert',
  'https://dedu.seentao.com/api/xbizerp/common/baseProfile/list',
]
window.publicParams = {
  year: 2021,       // 全局年份
  year2: 2022,      // 全局年份 （企业与部门层）
  szxs: '北京',      // 全局省直辖市
  // fireBackup: false, // 开启火力备用图
}
window.myToken = '31c72171e4494a52acffed8f09a60c58' // 仅用于测试
window.backHome = () => {
  window.top.location.href = "/aie_web"; // 返回用户 home 地址
}