
import {
  getData1, getData2, getData3, getData4, getData5, getData6, getData7, getData8, getData9, getData10,
  getParamsA, getParamsB, getParamsC, getParamsD
} from '@/2d/api'
import { getBUSINESS1, getBUSINESS2, getBUSINESS3, getBUSINESS4, getBUSINESS5, getBUSINESS6, getBUSINESS7, getBUSINESS8, getBUSINESS9, getBUSINESS10, getBUSINESS11 } from '@/2d/api/BUSINESS'
import * as BUSINESS2 from './BUSINESS2'
import store from '@/2d/store'
import CHART from '@/2d/viewCharts/Params'
import dayjs from "dayjs";
import * as NUM from '@/2d/utils/num'

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

const BUSINESS = () => {
  const currMoth = dayjs().format('YYYY-MM')
  const startUnix = dayjs(`${dayjs(`${currMoth}`).startOf('month').format('YYYY-MM-DD')} 8:00`).valueOf()
  const endUnix = dayjs(`${dayjs(`${currMoth}`).endOf('month').format('YYYY-MM-DD')} 8:00`).valueOf()
  Promise.all([getParamsA(), getParamsB(), getParamsC(), getParamsD()]).then(res => {
    const data = res
    console.log('BUSINESS: ', data);
    const a = data[0].data.data
    // const b = data[1].data.data.steps.find(item => item.stepName == '经营模式')
    const c = data[2].data.data.param
    const d = data[3].data.data
    let orgTypeCode = null
    try {
      orgTypeCode = d.find(item => item.caseCode == a.caseCode && item.code == a.enterpriseCode)?.orgTypeCode
    } catch (error) {
      orgTypeCode = {}
    }
    console.log('orgTypeCode: ', orgTypeCode);
    const enterpriseInfo = window.enterpriseMap[b.paramValue.enterpriseCode]
    // const enterpriseInfo = window.enterpriseMap['MGE001'] // 测试用
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
      const data = res
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
      const ryld = data[12].data.data.find(item => item.employedTime == currMoth)

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

        rm01001: returnData(CHART.inventoryNamesLow[0]),
        rm01002: returnData(CHART.inventoryNamesLow[1]),
        rm01003: returnData(CHART.inventoryNamesLow[2]),
        rm01004: returnData(CHART.inventoryNamesLow[3]),
        rm01005: returnData(CHART.inventoryNamesLow[4]),
        rm01006: returnData(CHART.inventoryNamesLow[5]),
        rm01007: returnData(CHART.inventoryNamesLow[6]),
        rm01008: returnData(CHART.inventoryNamesLow[7]),
        rm01009: returnData(CHART.inventoryNamesLow[8]),
        rm01010: returnData(CHART.inventoryNamesLow[9]),
        rm01011: returnData(CHART.inventoryNamesLow[10]),
        rm01012: returnData(CHART.inventoryNamesLow[11]),
        rm01013: returnData(CHART.inventoryNamesLow[12]),
        rm01014: returnData(CHART.inventoryNamesLow[13]),
        rm01015: returnData(CHART.inventoryNamesLow[14]),
        rm01016: returnData(CHART.inventoryNamesLow[15]),
        rm01017: returnData(CHART.inventoryNamesLow[16]),
        rm01018: returnData(CHART.inventoryNamesLow[17]),
        fp00001: returnData(CHART.inventoryNamesLow[18]),
        fp00002: returnData(CHART.inventoryNamesLow[19]),
        fp00003: returnData(CHART.inventoryNamesLow[20]),

        kdj: {
          rm01001: returnData(CHART.inventoryNamesLow[0], 14),
          rm01002: returnData(CHART.inventoryNamesLow[1], 14),
          rm01003: returnData(CHART.inventoryNamesLow[2], 14),
          rm01004: returnData(CHART.inventoryNamesLow[3], 14),
          rm01005: returnData(CHART.inventoryNamesLow[4], 14),
          rm01006: returnData(CHART.inventoryNamesLow[5], 14),
          rm01007: returnData(CHART.inventoryNamesLow[6], 14),
          rm01008: returnData(CHART.inventoryNamesLow[7], 14),
          rm01009: returnData(CHART.inventoryNamesLow[8], 14),
          rm01010: returnData(CHART.inventoryNamesLow[9], 14),
          rm01011: returnData(CHART.inventoryNamesLow[10], 14),
          rm01012: returnData(CHART.inventoryNamesLow[11], 14),
          rm01013: returnData(CHART.inventoryNamesLow[12], 14),
          rm01014: returnData(CHART.inventoryNamesLow[13], 14),
          rm01015: returnData(CHART.inventoryNamesLow[14], 14),
          rm01016: returnData(CHART.inventoryNamesLow[15], 14),
          rm01017: returnData(CHART.inventoryNamesLow[16], 14),
          rm01018: returnData(CHART.inventoryNamesLow[17], 14),
          fp00001: returnData(CHART.inventoryNamesLow[18], 14),
          fp00002: returnData(CHART.inventoryNamesLow[19], 14),
          fp00003: returnData(CHART.inventoryNamesLow[20], 14),
        },
        xsjg: {
          rm01001: returnData(CHART.inventoryNamesLow[0], 19),
          rm01002: returnData(CHART.inventoryNamesLow[1], 19),
          rm01003: returnData(CHART.inventoryNamesLow[2], 19),
          rm01004: returnData(CHART.inventoryNamesLow[3], 19),
          rm01005: returnData(CHART.inventoryNamesLow[4], 19),
          rm01006: returnData(CHART.inventoryNamesLow[5], 19),
          rm01007: returnData(CHART.inventoryNamesLow[6], 19),
          rm01008: returnData(CHART.inventoryNamesLow[7], 19),
          rm01009: returnData(CHART.inventoryNamesLow[8], 19),
          rm01010: returnData(CHART.inventoryNamesLow[9], 19),
          rm01011: returnData(CHART.inventoryNamesLow[10], 19),
          rm01012: returnData(CHART.inventoryNamesLow[11], 19),
          rm01013: returnData(CHART.inventoryNamesLow[12], 19),
          rm01014: returnData(CHART.inventoryNamesLow[13], 19),
          rm01015: returnData(CHART.inventoryNamesLow[14], 19),
          rm01016: returnData(CHART.inventoryNamesLow[15], 19),
          rm01017: returnData(CHART.inventoryNamesLow[16], 19),
          rm01018: returnData(CHART.inventoryNamesLow[17], 19),
          fp00001: returnData(CHART.inventoryNamesLow[18], 19),
          fp00002: returnData(CHART.inventoryNamesLow[19], 19),
          fp00003: returnData(CHART.inventoryNamesLow[20], 19),
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
        qycgzc003: data[15].data.data.ringRatioAmount,
        qycgzc004: data[15].data.data.ringRatio,

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
        scktqk01: data[0].data.data.sumAmount,
        scktqk02: data[0].data.data.devList,
        scktqk03: data[0].data.data.unDevList,
        scktqk04: data[0].data.data.devList,

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