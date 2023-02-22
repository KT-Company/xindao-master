
import {
  getData1, getData2, getData3, getData4, getData5, getData6, getData7, getData8, getData9, getData10,
  getParamsA, getParamsB, getParamsC, getParamsD
} from '@/2d/api'
import { getBUSINESS1, getBUSINESS2, getBUSINESS3, getBUSINESS4, getBUSINESS5, getBUSINESS6, getBUSINESS7, getBUSINESS8, getBUSINESS9, getBUSINESS10, getBUSINESS11 } from '@/2d/api/BUSINESS'
import * as BUSINESS2 from './BUSINESS2'
import store from '@/2d/store'
import CHART from '@/2d/viewCharts/Params'
import dayjs from "dayjs";
import { setMenu, menu } from '../hooks/useMenu'
import * as NUM from '@/2d/utils/num'

// 探索模式
const All = () => {
  getData1().then(res => {
    store.commit('setData1', res.data.formInfoList)
    store.state.debug && console.log('data1：', store.state.data1);
  })

  getData2().then(res => {
    store.commit('setData2', res.data.formInfoList)
    store.state.debug && console.log('data2：', store.state.data2);
  })

  getData3().then(res => {
    store.commit('setData3', res.data.formInfoList)
    store.state.debug && console.log('data3：', store.state.data3);
  })

  getData4().then(res => {
    store.commit('setData4', res.data.formInfoList)
    store.state.debug && console.log('data4：', store.state.data4);
  })

  getData5().then(res => {
    store.commit('setData5', res.data.formInfoList)
    store.state.debug && console.log('data5：', store.state.data5);
  })

  getData6().then(res => {
    store.commit('setData6', res.data.formInfoList)
    store.state.debug && console.log('data6：', store.state.data6);
  })

  getData7().then(res => {
    store.commit('setData7', res.data.formInfoList)
    store.state.debug && console.log('data7：', store.state.data7);
  })

  getData8().then(res => {
    store.commit('setData8', res.data.formInfoList)
    store.state.debug && console.log('data8：', store.state.data8);
  })

  getData9().then(res => {
    store.commit('setData9', res.data.formInfoList)
    store.state.debug && console.log('data9：', store.state.data9);
  })

  getData10().then(res => {
    store.commit('setData10', res.data.formInfoList)
    store.state.debug && console.log('data10：', store.state.data10);
  })
}

// 经营模式
const BUSINESS = () => {
  const currMoth = dayjs().format('YYYY-MM')
  const startUnix = dayjs(`${dayjs(`${currMoth}`).startOf('month').format('YYYY-MM-DD')} 8:00`).valueOf()
  const endUnix = dayjs(`${dayjs(`${currMoth}`).endOf('month').format('YYYY-MM-DD')} 8:00`).valueOf()
  Promise.all([getParamsA(), getParamsB(), getParamsC(), getParamsD()]).then(res => {
    const data = res
    console.log('BUSINESS: ', data);
    const a = data[0].data.data
    const b = data[1].data.data.steps.find(item => item.stepName == '经营模式').calendars
    const BusinessTime = dayjs.unix(Number(b.find(item => item.state === 'ACTIVE_CURRENT').calendarTime)).format('YYYY')
    const BusinessTimeToYYYYMM = dayjs.unix(Number(b.find(item => item.state === 'ACTIVE_CURRENT').calendarTime)).format('YYYY-MM')
    console.log('BusinessTimeToMoth: ', BusinessTimeToYYYYMM);
    store.commit('setBusinessTime', BusinessTime)
    const c = data[2].data.data.param
    const d = data[3].data.data
    let orgTypeCode = null
    try {
      orgTypeCode = d.find(item => item.caseCode == a.caseCode && item.code == a.enterpriseCode)?.orgTypeCode
    } catch (error) {
      orgTypeCode = {}
    }
    const enterpriseInfo = window.enterpriseMap[orgTypeCode]
    // const enterpriseInfo = window.enterpriseMap['DTE001'] // 测试用
    // console.log('enterpriseInfo: ', enterpriseInfo);
    setMenu(menu.value.filter(item => item.id === enterpriseInfo.id))
    store.commit('setEnterpriseInfo', enterpriseInfo)
    store.commit('setMenuAid', enterpriseInfo.id)
    store.commit('setMenuBid', null)
    store.commit('setPickId', enterpriseInfo.id)
    const p2 = store.state.paramsA
    const p = {
      orgCode: c.orgCode,
      deptCode: c.deptCode,
      deptName: c.deptName,
      userId: p2.userId,
      userName: c.userName,
      classId: c.classId,
      orgName: c.orgName,
      virtualDate: c.virtualDate,
      caseCode: c.caseCode,
      version: c.version,
      orgTypeCode: orgTypeCode,

      userToken: p2.userToken,
      orgId: p2.orgId,
      memberId: p2.memberId,
      teachClassId: a.teachClassId,
      annual: window.publicParams.year3,
      teamId: c.teamId,
      taxNum: c.orgCode,
      courseVersionId: null,
      endDate: startUnix,
      startDate: endUnix,
    }

    console.log('p-->', p);


    Promise.all([
      //11
      getBUSINESS1(p), getBUSINESS2(p), getBUSINESS3(p), getBUSINESS4(p), getBUSINESS5(p), getBUSINESS6(p), getBUSINESS7(p), getBUSINESS8(p), getBUSINESS9(p), getBUSINESS10(p), getBUSINESS11(p),
      BUSINESS2.get_ryzb(p), BUSINESS2.get_ryld(p), BUSINESS2.get_xzzc(p), BUSINESS2.get_kdj(p), BUSINESS2.get_cgzc(p),
      BUSINESS2.get_schdqk(p), BUSINESS2.get_ggtfqk(p), BUSINESS2.get_scktqk(p), BUSINESS2.get_xsjg(p), BUSINESS2.get_khxl(p),
      BUSINESS2.get_gyspm(p), BUSINESS2.get_grpgqk(p), BUSINESS2.get_scjd(p), BUSINESS2.get_sbzt(p), BUSINESS2.get_zzczzl(p),
      BUSINESS2.get_xsmll(p), BUSINESS2.get_zcfzl(p), BUSINESS2.get_wlfy(p), BUSINESS2.get_chzzl(p), BUSINESS2.get_clzs(p),
      BUSINESS2.get_qyyhck(p), BUSINESS2.get_qyyhdk(p), BUSINESS2.get_qysdssfl(p), BUSINESS2.get_qyzzssfl(p), BUSINESS2.get_qysl(p),
      BUSINESS2.get_qydk(p), BUSINESS2.get_qyck(p), BUSINESS2.get_zhfwsr(p), BUSINESS2.get_tpf(p)
    ]).then(res => {
      // console.log('res: ', res);
      const data = res
      if (store.state.isMock) {
        // 企业存款（2）
        data[37].data.data = { "balance": "5000000.00元", "balance2": "0.05000亿" }
        // 企业贷款（2）
        data[36].data.data = { "loan": "10000.00元", "loan2": "0.00010亿" }
        
        // 企业所得税税负率
        data[33].data.data = {"income":0.5405,"sum":37.00,"tax":20}
        // 企业增值税税负率
        data[34].data.data = {"current":99.00,"vat":0.2475,"sum":400.00}

        // 企业银行贷款（1）
        data[32].data.data = [{ "loan": "7200.00", "orgTypeName": "销售公司" }, { "loan": "1000.00", "orgTypeName": "集团企业" }]
        // 企业银行存款（1）
        data[31].data.data = [{ "orgTypeName": "供应企业", "balance": "40001066.00" }, { "orgTypeName": "商业社会管理委员会", "balance": "10000000.00" }, { "orgTypeName": "虚拟供应商", "balance": "50000000.00" }, { "orgTypeName": "政府服务中心", "balance": "3000139501.63" }, { "orgTypeName": "招投标", "balance": "9997600.00" }, { "orgTypeName": "经销企业", "balance": "60000000.00" }, { "orgTypeName": "综合服务企业", "balance": "5960933.20" }, { "orgTypeName": "物流企业", "balance": "18504166.80" }, { "orgTypeName": "集团企业", "balance": "245394529.20" }, { "orgTypeName": "虚拟客户", "balance": "10000000000.00" }, { "orgTypeName": "销售公司", "balance": "100002203.17" }, { "orgTypeName": "金融服务企业", "balance": "10000000000.00" }]
        // 综合服务
        data[38].data.data = [
          {
            "total": 60000.0,
            "code": "MARKET_APPLY",
            "name": "市场开拓"
          },
          {
            "total": 400000.0,
            "code": "ADVERT_APPLY",
            "name": "广告投放"
          },
          {
            "total": 366.00,
            "code": "CCC_QUALIFICATION",
            "name": "3C认证"
          },
          {
            "total": 2222,
            "code": "ISO9001_QUALIFICATION",
            "name": "ISO9001"
          },
          {
            "total": 3333,
            "code": "SOFTWARE_QUALIFICATION",
            "name": "软著"
          },
          {
            "total": 4444,
            "code": "PRODUCT_APPLY",
            "name": "产品研发申请"
          },
          {
            "total": 5555,
            "code": "CARBON_APPLY",
            "name": "碳排放费申请"
          },
          {
            "total": 6666,
            "code": "ELECT_APPLY",
            "name": "电费申请"
          },
          {
            "total": 7777,
            "code": "RECRUI_PERSON",
            "name": "人员招聘"
          },
          {
            "total": 8888,
            "code": "DISMISS_PERSON",
            "name": "人员解聘"
          },
          {
            "total": 9999,
            "code": "ASSETS_APPLY",
            "name": "固定资产申请"
          },
          {
            "total": 1010,
            "code": "DEPRE_DISPOSAL",
            "name": "固定资产处置"
          },
          {
            "total": 1111,
            "code": "HIGH_TECH_QUALIFICATION",
            "name": "高新认证"
          }
        ]
        // 企业仓库容积
        data[5].data.data = { "totalUseSum": 187000, "totalFreeSum": 53000, "freeRate": 22.08 }
        // 物流费用
        data[28].data.data = [{ "billDate": "2023-01", "taxAmount": 0 }, { "billDate": "2023-02", "taxAmount": 287760 }, { "billDate": "2023-03", "taxAmount": 0 }, { "billDate": "2023-04", "taxAmount": 0 }, { "billDate": "2023-05", "taxAmount": 0 }, { "billDate": "2023-06", "taxAmount": 0 }, { "billDate": "2023-07", "taxAmount": 0 }, { "billDate": "2023-08", "taxAmount": 0 }, { "billDate": "2023-09", "taxAmount": 0 }, { "billDate": "2023-10", "taxAmount": 0 }, { "billDate": "2023-11", "taxAmount": 0 }, { "billDate": "2023-12", "taxAmount": 0 }]
        // 供应商排名
        data[21].data.data = [{ "supplierName": "晶弘贸易有限公司", "taxAmount": 1345837.50 }, { "supplierName": "天凯贸易有限公司", "taxAmount": 1345837.50 }, { "supplierName": "星祥贸易有限公司", "taxAmount": 1345837.50 }, { "supplierName": "朗兴贸易有限公司", "taxAmount": 1345837.50 }]
        // 采购支出
        data[15].data.data = { "totalSum": 5383350.00, "currentMonthSum": 5383350.00, "ringRatio": 5383350.00, "ringRatioRate": 0 }
        // 薪资支出
        data[13].data.data = { "totalSum": 300556.71, "currentMonthSum": 300556.71, "ringRatio": 300556.71, "ringRatioRate": 0 }
        // 设备状态
        data[24].data.data = [{ "num": "8", "state": "1", "stateRemark": "空闲" }, { "num": "0", "state": "2", "stateRemark": "生产中" }, { "num": "0", "state": "3", "stateRemark": "完工" }]
        // 销售结构
        data[19].data.data = { "RM01001": "100.10", "RM01002": "200", }
        // 市场开拓情况
        data[18].data.data = {
          "unDevList": [
            { "regionCode": 1, "regionName": "东北", "id": 1 },
            { "regionCode": 2, "regionName": "华北", "id": 2 },
            { "regionCode": 3, "regionName": "华东", "id": 3 },
            { "regionCode": 4, "regionName": "华中", "id": 4 },
            { "regionCode": 5, "regionName": "华南", "id": 5 },
            { "regionCode": 6, "regionName": "西南", "id": 6 },
          ],
          "devList": [
            { "regionCode": 7, "regionName": "西北", "id": 7 },],
          "sumAmount": "0", "pioneeringRate": "14.29"
        }
        // 广告投放情况
        data[17].data.data = { "monthAmount": "0", "ringRatioAmount": "10", "ringRatioRate": "10.00", "sumAmount": "0" }
        // 市场获单情况
        data[16].data.data = { "monthAmount": "0", "ringRatioAmount": "0", "ringRatioRate": "10.00", "sumAmount": "0" }
        // 客户销量
        data[20].data.data = [{ "purchaseOrgCode": "SC001", "purchaseOrgName": "新锐创新科技销售有限公司", "taxAmount": 7725450.00 }]
        // 
        data[4].data.data = [{ "materialCode": "FP00001", "materialName": "玉龙X4mini 遥控飞机航拍器", "quantity": 4500 }, { "materialCode": "RM01001", "materialName": "PP塑料机架壳MINI", "quantity": 4000 }, { "materialCode": "RM01002", "materialName": "PP螺旋桨", "quantity": 16000 }, { "materialCode": "RM01003", "materialName": "飞控主机主板", "quantity": 4000 }, { "materialCode": "RM01004", "materialName": "玉龙X4mini钢机架", "quantity": 4000 }, { "materialCode": "RM01005", "materialName": "无刷动力套装A", "quantity": 4000 }, { "materialCode": "RM01006", "materialName": "MINI遥控器", "quantity": 4000 }, { "materialCode": "RM01007", "materialName": "4K高清云图套件", "quantity": 4000 }, { "materialCode": "RM01008", "materialName": "MINI包装套件", "quantity": 4000 }]
        // 增长
        data[25].data.data = { "2023-01": 100.00, "2023-02": 0.00, "2023-03": 0.00, "2023-04": 0.00, "2023-05": 0.00, "2023-06": 0.00, "2023-07": 0.00, "2023-08": 0.00, "2023-09": 0.00, "2023-10": 0.00, "2023-11": 0.00, "2023-12": 0.00 }
        // 负债
        data[27].data.data = { "2023-01": 1.93, "2023-02": 1.93, "2023-03": 1.93, "2023-04": 1.93, "2023-05": 1.93, "2023-06": 1.93, "2023-07": 1.93, "2023-08": 1.93, "2023-09": 1.93, "2023-10": 1.93, "2023-11": 1.93, "2023-12": 1.93 }
        // 销售毛利率
        data[26].data.data = { "2023-01": 100.00, "2023-02": 0.00, "2023-03": 100.00, "2023-04": 0.00, "2023-05": 0.00, "2023-06": 0.00, "2023-07": 0.00, "2023-08": 0.00, "2023-09": 0.00, "2023-10": 0.00, "2023-11": 0.00, "2023-12": 0.00 }
        // 存货周转率
        data[29].data.data = [{ "period": "2023-01", "rate": 0.00 }, { "period": "2023-02", "rate": 0 }, { "period": "2023-03", "rate": 0 }, { "period": "2023-04", "rate": 0 }, { "period": "2023-05", "rate": 0 }, { "period": "2023-06", "rate": 0 }, { "period": "2023-07", "rate": 0 }, { "period": "2023-08", "rate": 0 }, { "period": "2023-09", "rate": 0 }, { "period": "2023-10", "rate": 50 }, { "period": "2023-11", "rate": 0 }, { "period": "2023-12", "rate": 0 }]
      }
      console.log('data: ', data);

      function returnData(name, id = 4) {
        if (id = 4) {
          return data[id].data.data.find(item => item?.materialCode == name)?.quantity || 0
        } else {
          return data[id].data.data[name] || 0
        }

      }
      const nan = data[11].data.data.list.find(item => item.sex == '男')
      const nv = data[11].data.data.list.find(item => item.sex == '女')
      const ryld = data[12].data.data.find(item => item.employedTime == BusinessTimeToYYYYMM)
      console.log('ryld: ', ryld);

      const data1 = {
        ndsrzb01: data[0].data.data.budget,
        ndsrzb02: data[0].data.data.income,
        ndsrzb03: data[0].data.data.rate,

        ndcgys01: data[1].data.data.budget,
        ndcgys02: data[1].data.data.totalPaySum,
        ndcgys03: data[1].data.data.ringRatioRate,

        qyyysr01: data[2].data.data.totalSum,
        qyyysr02: data[2].data.data.currentMonthSum,
        qyyysr03: data[2].data.data.ringRatio,
        qyyysr04: data[2].data.data.ringRatioRate,

        qycbzc01: data[3].data.data.totalSum,
        qycbzc02: data[3].data.data.currentMonthSum,
        qycbzc03: data[3].data.data.ringRatio,
        qycbzc04: data[3].data.data.ringRatioRate,

        rm01001: returnData(CHART.inventoryNames[0]),
        rm01002: returnData(CHART.inventoryNames[1]),
        rm01003: returnData(CHART.inventoryNames[2]),
        rm01004: returnData(CHART.inventoryNames[3]),
        rm01005: returnData(CHART.inventoryNames[4]),
        rm01006: returnData(CHART.inventoryNames[5]),
        rm01007: returnData(CHART.inventoryNames[6]),
        rm01008: returnData(CHART.inventoryNames[7]),
        rm01009: returnData(CHART.inventoryNames[8]),
        rm01010: returnData(CHART.inventoryNames[9]),
        rm01011: returnData(CHART.inventoryNames[10]),
        rm01012: returnData(CHART.inventoryNames[11]),
        rm01013: returnData(CHART.inventoryNames[12]),
        rm01014: returnData(CHART.inventoryNames[13]),
        rm01015: returnData(CHART.inventoryNames[14]),
        rm01016: returnData(CHART.inventoryNames[15]),
        rm01017: returnData(CHART.inventoryNames[16]),
        rm01018: returnData(CHART.inventoryNames[17]),
        fp00001: returnData(CHART.inventoryNames[18]),
        fp00002: returnData(CHART.inventoryNames[19]),
        fp00003: returnData(CHART.inventoryNames[20]),

        kdj: {
          rm01001: returnData(CHART.inventoryNames[0], 14),
          rm01002: returnData(CHART.inventoryNames[1], 14),
          rm01003: returnData(CHART.inventoryNames[2], 14),
          rm01004: returnData(CHART.inventoryNames[3], 14),
          rm01005: returnData(CHART.inventoryNames[4], 14),
          rm01006: returnData(CHART.inventoryNames[5], 14),
          rm01007: returnData(CHART.inventoryNames[6], 14),
          rm01008: returnData(CHART.inventoryNames[7], 14),
          rm01009: returnData(CHART.inventoryNames[8], 14),
          rm01010: returnData(CHART.inventoryNames[9], 14),
          rm01011: returnData(CHART.inventoryNames[10], 14),
          rm01012: returnData(CHART.inventoryNames[11], 14),
          rm01013: returnData(CHART.inventoryNames[12], 14),
          rm01014: returnData(CHART.inventoryNames[13], 14),
          rm01015: returnData(CHART.inventoryNames[14], 14),
          rm01016: returnData(CHART.inventoryNames[15], 14),
          rm01017: returnData(CHART.inventoryNames[16], 14),
          rm01018: returnData(CHART.inventoryNames[17], 14),
          fp00001: returnData(CHART.inventoryNames[18], 14),
          fp00002: returnData(CHART.inventoryNames[19], 14),
          fp00003: returnData(CHART.inventoryNames[20], 14),
        },
        xsjg: {
          rm01001: returnData(CHART.inventoryNames[0], 19),
          rm01002: returnData(CHART.inventoryNames[1], 19),
          rm01003: returnData(CHART.inventoryNames[2], 19),
          rm01004: returnData(CHART.inventoryNames[3], 19),
          rm01005: returnData(CHART.inventoryNames[4], 19),
          rm01006: returnData(CHART.inventoryNames[5], 19),
          rm01007: returnData(CHART.inventoryNames[6], 19),
          rm01008: returnData(CHART.inventoryNames[7], 19),
          rm01009: returnData(CHART.inventoryNames[8], 19),
          rm01010: returnData(CHART.inventoryNames[9], 19),
          rm01011: returnData(CHART.inventoryNames[10], 19),
          rm01012: returnData(CHART.inventoryNames[11], 19),
          rm01013: returnData(CHART.inventoryNames[12], 19),
          rm01014: returnData(CHART.inventoryNames[13], 19),
          rm01015: returnData(CHART.inventoryNames[14], 19),
          rm01016: returnData(CHART.inventoryNames[15], 19),
          rm01017: returnData(CHART.inventoryNames[16], 19),
          rm01018: returnData(CHART.inventoryNames[17], 19),
          fp00001: returnData(CHART.inventoryNames[18], 19),
          fp00002: returnData(CHART.inventoryNames[19], 19),
          fp00003: returnData(CHART.inventoryNames[20], 19),
        },


        qyckzy01: data[5].data.data.totalUseSum,
        qyckzy02: data[5].data.data.totalFreeSum,
        qyckzy03: data[5].data.data.freeRate,

        wlcbzc01: data[6].data.data.totalSum,
        wlcbzc02: data[6].data.data.currentMonthSum,
        wlcbzc03: data[6].data.data.ringRatio,
        wlcbzc04: data[6].data.data.ringRatioRate,

        wlclqk01: data[7].data.data.runNum,
        wlclqk02: data[7].data.data.freeNum,
        wlclqk03: data[7].data.data.freeRate,
        wlclqk04: data[7].data.data.carCategoryList.find(item => item.carCategory == '中型货车空闲率').freeNum, //
        wlclqk05: data[7].data.data.carCategoryList.find(item => item.carCategory == '大型货车空闲率').freeNum,

        wlddqk01: data[8].data.data.totalSum,
        wlddqk02: data[8].data.data.currentMonthSum,
        wlddqk03: data[8].data.data.ringRatio,
        wlddqk04: data[8].data.data.ringRatioRate,

        // 企业银行存款
        qyyhck: data[31].data.data,

        // 企业银行贷款
        qyyhdk: data[32].data.data,

        // 货主下单排行
        HZXDPH: [...data[9].data.data],

        // 货主下单趋势
        HZXDQS: [...data[10].data.data],

        // 碳排放
        tpf: data[39].data.data,

        //综合服务收入
        ZHFWSR: data[38].data.data,


        // 人力资源 start
        ryxbzb01: nan.num,
        ryxbzb02: nv.num,
        ryxbzb03: NUM.reservedTwo100times((nan.num / (nan.num + nv.num)) || 0),
        ryld01: ryld.num,
        ryld02: ryld.curMonthDisNum,
        ryld03: NUM.reservedTwo100times((ryld.curMonthDisNum / (ryld.num + ryld.curMonthDisNum)) || 0),
        ryxczc01: data[13].data.data.totalSum,
        ryxczc02: data[13].data.data.currentMonthSum,
        ryxczc03: data[13].data.data.ringRatio,
        ryxczc04: data[13].data.data.ringRatioRate,
        // 人力资源 end

        // 采购支出
        qycgzc001: data[15].data.data.totalSum,
        qycgzc002: data[15].data.data.currentMonthSum,
        qycgzc003: data[15].data.data.ringRatio,
        qycgzc004: data[15].data.data.ringRatioRate,

        // 市场获单情况
        schdqk01: data[16].data.data.sumAmount,
        schdqk02: data[16].data.data.monthAmount,
        schdqk03: data[16].data.data.ringRatioAmount,
        schdqk04: data[16].data.data.ringRatioRate,

        //广告投放情况
        ggtfqk01: data[17].data.data.sumAmount,
        ggtfqk02: data[17].data.data.monthAmount,
        ggtfqk03: data[17].data.data.ringRatioAmount,
        ggtfqk04: data[17].data.data.ringRatioRate,

        // 市场开拓情况
        scktqk01: data[18].data.data.sumAmount,
        scktqk02: data[18].data.data.devList.map(item => item.regionName).join(),
        scktqk03: data[18].data.data.unDevList.map(item => item.regionName).join(),
        // scktqk04: NUM.reservedTwo100times(data[18].data.data.devList.length / (data[18].data.data.devList.length + data[18].data.data.unDevList.length)),
        scktqk04: data[18].data.data.pioneeringRate,

        // 企业银行存款
        qyyhckxj: data[37].data.data.balance || 0,
        qyyhckxj02: data[37].data.data.balance2 || 0,

        // 企业银行贷款
        qyyhdkxj: data[36].data.data.loan || 0,
        qyyhdkxj02: data[36].data.data.loan2 || 0,

        // 营销部 start 
        khxl: data[20].data.data,
        // 营销部 start 

        // 生产进度
        scjd: data[23].data.data,

        // 采购部 start 
        gysphb: data[21].data.data,
        wlfy: data[28].data.data,
        chzzl: data[29].data.data,
        // 采购部 end

        // 设备状态
        sbzt: data[24].data.data,

        // 工人派工情况
        grpgqk: data[22].data.data,

        // 产量走势
        clzs: data[30].data.data,

        // 财务部 start 
        zzczzl: data[25].data.data,
        xsmll: data[26].data.data,
        zcfzl: data[27].data.data,
        // 财务部 end

        // 企业数量
        qysl: data[35].data.data,

        // 企业增值税税负率
        zwqyzzs01: data[34].data.data.sum,
        zwqyzzs02: data[34].data.data.current,
        zwqyzzs03: data[34].data.data.vat,

        // 企业所得税税负率
        zwgrsds01: data[33].data.data.sum,
        zwgrsds02: data[33].data.data.tax,
        zwgrsds03: data[33].data.data.income,



      }
      console.log('data1: ', data1);
      store.commit('setData1', data1)
      store.commit('setData2', data1)
      store.commit('setData3', data1)
      store.commit('setData4', data1)
      store.commit('setData5', data1)
      store.commit('setData6', data1)
      store.commit('setData7', data1)
      store.commit('setData8', data1)
      store.commit('setData9', data1)
      store.commit('setData10', data1)

      console.log('getBUSINESSall: ', data);
    })

  })

}

const getData = {
  All,
  BUSINESS,
}

export default getData