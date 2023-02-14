// 经营模式 API
import request from '@/2d/utils/request'
import store from '@/2d/store'

const baseUrl = store.state.isMock ? 'https://dedu.seentao.com/api' : '/api'

export function getBUSINESS1(p) {
  return request({
    url: `${baseUrl}/xbizerp/sale/stat/annualIncome`,
    method: 'POST',
    params: {
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
  })
}


export function getBUSINESS2(p) {
  return request({
    url: `${baseUrl}/xbizerp/erppurchase/stat/sumBudget`,
    method: 'POST',
    params: {
      orgCode: p.orgCode,
      deptCode: p.deptCode,
      deptName: p.deptName,
      userId: p.userId,
      userName: p.userName,
      classId: p.classId,
      orgName: p.orgName,
      virtualDate: p.virtualDate,
    }
  })
}

export function getBUSINESS3(p) {
  return request({
    url: `${baseUrl}/xbizerp/finance/stat/income`,
    method: 'POST',
    params: {
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
      orgTypeCode: p.orgTypeCode,
    }
  })
}

export function getBUSINESS4(p) {
  return request({
    url: `${baseUrl}/xbizerp/finance/stat/cost`,
    method: 'POST',
    params: {
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
      orgTypeCode: p.orgTypeCode,
    }
  })
}

export function getBUSINESS5(p) {
  return request({
    url: `${baseUrl}/xbizerp/companyInventory/stat/queryStoreNum`,
    method: 'POST',
    params: {
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
      orgTypeCode: p.orgTypeCode,
    }
  })
}


export function getBUSINESS6(p) {
  return request({
    url: `${baseUrl}/xbizerp/orgWarehouse/stat/queryFreeRate`,
    method: 'POST',
    params: {
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
  })
}

export function getBUSINESS7(p) {
  return request({
    url: `${baseUrl}/xbizerp/logistics/stat/cost/queryStat`,
    method: 'POST',
    params: {
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
  })
}

export function getBUSINESS8(p) {
  return request({
    url: `${baseUrl}/xbizerp/logistics/stat/car/statCars`,
    method: 'POST',
    params: {
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
  })
}


export function getBUSINESS9(p) {
  return request({
    url: `${baseUrl}/xbizerp/logistics/stat/transportOrder/queryStat`,
    method: 'POST',
    params: {
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
  })
}
export function getBUSINESS10(p) {
  return request({
    url: `${baseUrl}/xbizerp/logistics/stat/consignment/queryStat`,
    method: 'POST',
    params: {
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
  })
}
export function getBUSINESS11(p) {
  return request({
    url: `${baseUrl}/xbizerp/logistics/stat/consignment/sumConsignmentsTrend`,
    method: 'POST',
    params: {
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
  })
}