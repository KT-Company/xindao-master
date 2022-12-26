
import {
  getData1, getData2, getData3, getData4, getData5, getData6, getData7, getData8, getData9, getData10,
  getParamsA, getParamsB, getParamsC, getParamsD
} from '@/2d/api'
import { getBUSINESS1, getBUSINESS2, getBUSINESS3, getBUSINESS4, getBUSINESS5, getBUSINESS6, getBUSINESS7, getBUSINESS8, getBUSINESS9, getBUSINESS10, getBUSINESS11 } from '@/2d/api/BUSINESS'
import store from '@/2d/store'
import CHART from '@/2d/viewCharts/Params'

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
  Promise.all([getParamsA(), getParamsB(), getParamsC(), getParamsD()]).then(res => {
    const data = res
    console.log('BUSINESS: ', data);
    const a = data[0].data.data
    const b = data[1].data.data.steps.find(item => item.stepName == '经营模式')
    const c = data[2].data.data.param
    const d = data[3].data.data
    const orgTypeCode = d.find(item => item.caseCode == a.caseCode && item.code == a.enterpriseCode).orgTypeCode
    console.log('orgTypeCode: ', orgTypeCode);
    const p = {
      orgCode: c.orgCode,
      deptCode: c.deptCode,
      deptName: c.deptName,
      userId: c.userId,
      userName: c.userName,
      classId: c.classId,
      orgName: c.orgName,
      virtualDate: c.virtualDate,
      caseCode: c.caseCode,
      version: c.version,
      orgTypeCode: orgTypeCode,
    }

    Promise.all([getBUSINESS1(p), getBUSINESS2(p), getBUSINESS3(p), getBUSINESS4(p), getBUSINESS5(p), getBUSINESS6(p), getBUSINESS7(p), getBUSINESS8(p), getBUSINESS9(p), getBUSINESS10(p), getBUSINESS11(p),]).then(res => {
      const data = res
      console.log('data: ', data);
      function returnData(name) {
        return data[4].data.data.find(item => item.materialCode == name)?.quantity || 0
      }
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

        // 卡住 start
        zwgrsds01: 0,
        zwgrsds02: 0,
        zwgrsds03: 0,
        zwqyzzs01: 0,

        wlhzxd01: data[0].data.data.budget,
        wlhzxd02: data[0].data.data.budget,
        zhwflx01: data[0].data.data.budget,
        zhwflx02: data[0].data.data.budget,
        month: data[0].data.data.budget,
        wlhzxdqs0: data[0].data.data.budget,
        month: data[0].data.data.budget,
        zwtpf02: data[0].data.data.budget,
        zwtpf03: data[0].data.data.budget,
        zwtpf04: data[0].data.data.budget,
        // 卡住 end
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
    // getBUSINESS1(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS1: ', res);
    // })
    // getBUSINESS2(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS2: ', res);
    // })
    // getBUSINESS3(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS3: ', res);
    // })
    // getBUSINESS4(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS4: ', res);
    // })
    // getBUSINESS5(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS5: ', res);
    // })
    // getBUSINESS6(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS6: ', res);
    // })
    // getBUSINESS7(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS7: ', res);
    // })
    // getBUSINESS8(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS8: ', res);
    // })
    // getBUSINESS9(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS9: ', res);
    // })
    // getBUSINESS10(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS10: ', res);
    // })
    // getBUSINESS11(p).then(res => {
    //   store.state.debug && console.log('getBUSINESS11: ', res);
    // })
  })

}

const getData = {
  All,
  BUSINESS,
}

export default getData