import request from '@/2d/utils/request'

const params1 = (p) => {
  return {
    orgCode: p.orgCode,
    deptCode: p.deptCode,
    deptName: p.deptName,
    userId: p.userId,
    userName: p.userName,
    classId: p.classId,
    orgName: p.orgName,
    virtualDate: p.virtualDate,
    caseCode: p.caseCode,
    version: p.version,
  }
}

const params2 = (p) => {
  return {
    classId: p.classId,
    orgCode: p.orgCode,
    virtualDate: p.virtualDate,
  }
}

const params3 = (p) => {
  return {
    startDate: p.startDate,
    endDate: p.endDate,
    courseVersionId: p.courseVersionId,
    classId: p.classId,
    teamId: p.teamId,
    taxNum: p.taxNum
  }
}

// 人员占比
export function get_ryzb(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpperson/stat/queryNumGroupBySex`,
    method: 'POST',
    params: params1(p)
  })
}

// 人员流动
export function get_ryld(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpperson/stat/queryFlowPersons`,
    method: 'POST',
    params: params1(p)
  })
}

// 薪酬支出
export function get_xzzc(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpsalaryscheme/stat/sumPay`,
    method: 'POST',
    params: params1(p)
  })
}

// 客单价
export function get_kdj(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/sale/stat/material/averageUnitPrice`,
    method: 'POST',
    params: params2(p)
  })
}

// 采购支出
export function get_cgzc(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erppurchase/stat/sumPay`,
    method: 'POST',
    params: params1(p)
  })
}

// 市场获单情况
export function get_schdqk(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/market/stat/bidOrderAmountMonth`,
    method: 'get',
    params: params1(p)
  })
}

// 广告投放情况
export function get_ggtfqk(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/market/stat/advertisingAmount`,
    method: 'get',
    params: params1(p)
  })
}

// 市场开拓情况
export function get_scktqk(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/market/stat/marketDevAmount`,
    method: 'get',
    params: params1(p)
  })
}

// 销售结构
export function get_xsjg(p) {
  return request({
    url: `https://dedu.seentao.com/api/sale/stat/material/totalQuantity`,
    method: 'POST',
    params: params2(p)
  })
}

// 客户销量
export function get_khxl(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/sale/stat/salesVolume`,
    method: 'POST',
    params: params1(p)
  })
}

// 供应商排名
export function get_gyspm(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erppurchase/stat/querySupplierRank`,
    method: 'POST',
    params: params1(p)
  })
}

// 工人派工情况
export function get_grpgqk(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpequipment/stat/queryWorkerUsage`,
    method: 'get',
    params: params1(p)
  })
}

// 生产进度
export function get_scjd(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpequipment/stat/queryProduceProgress`,
    method: 'get',
    params: params1(p)
  })
}

// 设备状态
export function get_sbzt(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpequipment/stat/queryEquipmentStatusRealTime`,
    method: 'get',
    params: params1(p)
  })
}

// 总资产增长率
export function get_zzczzl(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/finance/stat/totalAssetsGrowthRate`,
    method: 'POST',
    params: params1(p)
  })
}

// 销售毛利率
export function get_xsmll(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/finance/stat/grossMarginRatio`,
    method: 'POST',
    params: params1(p)
  })
}

// 资产负债率
export function get_zcfzl(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/finance/stat/debtRate`,
    method: 'POST',
    params: params1(p)
  })
}

// 物流费用
export function get_wlfy(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/consignment/stat/logistfee`,
    method: 'POST',
    params: params1(p)
  })
}

// 存货周转率
export function get_chzzl(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/orgWarehouse/stat/inventoryTurnoveRate`,
    method: 'POST',
    params: params1(p)
  })
}

// 产量走势
export function get_clzs(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/erpequipment/stat/queryProductionTrend`,
    method: 'POST',
    params: params1(p)
  })
}

// 企业银行存款
export function get_qyyhck(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizbank/account/getOrgTypeBalance`,
    method: 'get',
    params: {
      orgCode: p.orgCode,
      caseCode: p.caseCode,
    }
  })
}

// 企业银行贷款
export function get_qyyhdk(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizbank/loanIssuance/findLoanListForOrgType`,
    method: 'get',
    params: {
      classId: p.classId,
      virtualDate: p.virtualDate,
      caseCode: p.caseCode,
    }
  })
}

// 企业所得税税负率
export function get_qysdssfl(p) {
  return request({
    url: `https://dchinataxn.seentao.com/chinataxn/invoice.getIncomeByParams`,
    method: 'POST',
    params: params3(p)
  })
}

// 企业增值税税负率
export function get_qyzzssfl(p) {
  return request({
    url: `https://dchinataxn.seentao.com/chinataxn/invoice.getVatByParams`,
    method: 'POST',
    params: params3(p)
  })
}

// 企业数量
export function get_qysl(p) {
  return request({
    url: `https://dapi.seentao.com/school/enterpriseNum.getByTeachClassId`,
    method: 'POST',
    params: {
      userId: p.userId,
      userToken: p.userToken,
      orgId: p.orgId,
      memberId: p.memberId,
      teachClassId: p.teachClassId,
    }
  })
}

// 企业贷款
export function get_qydk(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizbank/loanIssuance/findLoan`,
    method: 'get',
    params: {
      orgCode: p.orgCode,
      classId: p.classId,
      virtualDate: p.virtualDate,
      caseCode: p.caseCode,
    }
  })
}

// 企业存款
export function get_qyck(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizbank/account/getBalanceByCode`,
    method: 'get',
    params: {
      orgCode: p.orgCode,
      classId: p.classId,
      caseCode: p.caseCode,
    }
  })
}

// 综合服务收入（元）
export function get_zhfwsr(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizerp/api/totalAccount`,
    method: 'get',
    params: params2(p)
  })
}

// 碳排放
export function get_tpf(p) {
  return request({
    url: `https://dedu.seentao.com/api/xbizservicecenter/governmentCarbonQuota/getCarbonSummary`,
    method: 'POST',
    params: {
      classId: p.classId,
      caseCode: p.caseCode,
      annual: p.annual,
    }
  })
}


