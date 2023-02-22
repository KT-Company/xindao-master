// 全局路径
// window.publicPath = ''
// window.publicUrl = '/api/custom-form/customForm.formInfos.get' // 社会层、区域层 请求接口地址
// window.FRONT_INTERFACE = [
//   'https://dapi.seentao.com/vbseTeach/vbse.postInfo.member.get',
//   'https://dedu.seentao.com/api/vbseTeach/vbse.teachClass.steps.get',
//   'https://dedu.seentao.com/api/xverse/paramsmapping/convert',
//   'https://dedu.seentao.com/api/xbizerp/common/baseProfile/list',
// ]

// 发布
window.publicPath = '/aie_explore_web'
window.publicUrl = '/api/custom-form/customForm.formInfos.get' // 社会层、区域层 请求接口地址
window.FRONT_INTERFACE = [
  '/api/vbseTeach/vbse.postInfo.member.get',
  '/api/vbseTeach/vbse.teachClass.steps.get',
  '/api/xverse/paramsmapping/convert',
  '/api/xbizerp/common/baseProfile/list',
]


window.publicParams = {
  year: 2021,       // 全局年份
  year2: 2022,      // 全局年份 （探索模式 - 企业与部门层）
  year3: 2023,      // 全局年份  （经营模式）  // BUSINESS
  szxs: '北京',      // 全局省直辖市
  // fireBackup: false, // 开启火力备用图
}
window.myToken = '072d8c11f07ed814bbceaa38895af086' // 仅用于测试
window.backHome = () => {
  window.top.location.href = "/aie_web"; // 返回用户 home 地址
}

window.enterpriseMap = {
  'MGE001': { id: 3, name: '制造集团', path: '/Manufacture', level: 3, cameraKey: 'zhizaojituan' },
  'SCE001': { id: 9, name: '销售公司', path: '/Manufacture', level: 3, cameraKey: 'Xiao_Shou_Gong_Si' },
  'DTE001': { id: 11, name: '经销企业', path: '/Manufacture', level: 3, cameraKey: 'JingXiaoBanGongShi' },
  'SEE001': { id: 10, name: '供应企业', path: '/Manufacture', level: 3, cameraKey: 'GongYingBanGongShi' },
  'LEE001': { id: 7, name: '物流公司', path: '/Logistics', level: 3, cameraKey: 'wuliuqiye' },
  'ISE001': { id: 8, name: '综合服务', path: '/Comprehensive', level: 3, cameraKey: 'zonghefuwulou' },
  'FSC001': { id: 4, name: '工商银行', path: '/ICBC', level: 3, cameraKey: 'yinhangyuanqu' }, 
  'GSC001': { id: 5, name: '政务服务', path: '/Government', level: 3, cameraKey: 'zhengwuzhongxin' },
  'BSM001': { id: 6, name: '管委会', path: '/Management', level: 3, cameraKey: 'guanweihui' },
}
