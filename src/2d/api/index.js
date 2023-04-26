import request from '@/2d/utils/request'
import store from '@/2d/store'
import getData from './getDatas'
import getUrlParam from '@/2d/utils/getUrlParam'
// const url = 'https://dapi.seentao.com/custom-form/customForm.formInfos.get?caseVersionId=82347900509093947&enterpriseId=82441349728567340&userName=18871870420&userId=74791556441702461&userType=PLATFORM&userToken=a23defc6acd8954460b543d23bcfee2d&memberId=74791556450091021&orgType=SCHOOL&orgId=100678506119168&schoolId=100678506119168&sceneId=portal_logo&sysCode='
const p = getUrlParam()
console.log('p: ', p);

// const MODE = p.mode  // 经营模式: BUSINESS  探索模式: EXPLORE
store.commit('setMODE', p.mode)

console.log('MODE: ', store.state.MODE);

// https://dapi.seentao.com/custom-form/customForm.formInfos.get
// 部署环境 api 地址
// const url = `${window.publicUrl}?
// caseVersionId=${p.caseVersionId}
// &enterpriseId=${p.enterpriseId}
// &userName=${p.userName}
// &userId=${p.userId}
// &userType=${p.userType}
// &userToken=${p.userToken}
// &memberId=${p.memberId}
// &orgType=${p.orgType}
// &orgId=${p.orgId}
// &schoolId=${p.schoolId}
// &sceneId=${p.sceneId}
// &sysCode=`

// 开发环境 api 地址（如果没有数据就替换 token -----》 获取 token 地址：https://dstudent.seentao.com/ 账号：15178904534 密码：admin9527...）
const url = `./mock/`


// #region ********************************************* 正式接口 *********************************************


// 产业经济
export function getcyjj() {
    window.ue5("getcyjj", "产业经济");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}cyjj.json`,
        method: 'get',
    })
}

// 交通出行
export function getjtcx() {
    window.ue5("getjtcx", "交通出行");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}jtcx.json`,
        method: 'get',
    })
}


// 企业总量详情
export function getqyjycx() {
    console.log("企业总量详情")
    return request({
        url: `${url}qyjycx.json`,
        method: 'get',
    })
}

// 环境人口
export function gethjrk() {
    window.ue5("gethjrk", "环境人口");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}hjrk.json`,
        method: 'get',
    })
}

// 教育医疗
export function getjyyl() {
    window.ue5("getjyyl", "教育医疗");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}jyyl.json`,
        method: 'get',
    })
}

// 能源碳排放（年）
export function getnytpfy() {
    window.ue5("getnytpfy", "能源碳排放（年）");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}nytpfy.json`,
        method: 'get',
    })
}

// 能源总消耗（月）
export function getnyzxhm() {
    window.ue5("getnyzxhm", "能源总消耗（月）");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}nyzxhm1.json`,
        method: 'get',
    })
}


// getnyzxhm(){
    
// }



// 全国碳排放
export function getqynytpfy() {
    window.ue5("getqynytpfy", "全国碳排放");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}qynytpfy.json`,
        method: 'get',
    })
}

// 区域产业经济
export function getqycyjj() {
    window.ue5("getqycyjj", "区域产业经济");
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}qycyjj.json`,
        method: 'get',
    })
}

// // 区域企业信息
// export function getqyqyxx() {
//     store.state.globalYear = window.publicParams.year
//     return request({
//         url: `${url}qyqyxx.json`,
//         method: 'get',
//     })
// }


// // 人力资源
// export function getrlzy() {
//     return request({
//         url: `${url}rlzy.json`,
//         method: 'get',
//     })
// }

// 企业看板1
export function getData1() {
    return request({
        url: `${url}data1.json`,
        method: 'get',
    })
}
// 企业看板2
export function getData2() {
    return request({
        url: `${url}data2.json`,
        method: 'get',
    })
}

// 企业看板3
export function getData3() {
    return request({
        url: `${url}data3.json`,
        method: 'get',
    })
}

// 企业看板4
export function getData4() {
    return request({
        url: `${url}data4.json`,
        method: 'get',
    })
}

// 企业看板5
export function getData5() {
    return request({
        url: `${url}data5.json`,
        method: 'get',
    })
}

// 企业看板6
export function getData6() {
    return request({
        url: `${url}data6.json`,
        method: 'get',
    })
}

// 企业看板7
export function getData7() {
    return request({
        url: `${url}data7.json`,
        method: 'get',
    })
}

// 企业看板8
export function getData8() {
    return request({
        url: `${url}data8.json`,
        method: 'get',
    })
}

// 企业看板9
export function getData9() {
    return request({
        url: `${url}data9.json`,
        method: 'get',
    })
}
// 企业看板10
export function getData10() {
    return request({
        url: `${url}data10.json`,
        method: 'get',
    })
}
//#endregion



// #region ******************************************** 经营模式-BUSINESS ********************************************

function getUrLParams(index) {
    if ([2, 3].includes(index)) {
        return `${window.FRONT_INTERFACE[index]}`
    } else {
        const p = window.parent.getParamsA()
        index == 0 && store.commit('setParamsA', p)
        return `${window.FRONT_INTERFACE[index]}?userId=${p.userId}&userName=${p.userName}&userType=${p.userType}&userToken=${p.userToken}&orgId=${p.orgId}&orgType=${p.orgType}&memberId=${p.memberId}&memberType=${p.memberType}&schoolId=${p.schoolId}&teachClassId=${p.teachClassId}&teachClassStepId=${p.teachClassStepId}`
    }
}

// 前置接口
export function getParamsA() {
    return request({
        url: getUrLParams(0),
        method: 'post'
    })
}
export function getParamsB() {
    return request({
        url: getUrLParams(1),
        method: 'post'
    })
}
export function getParamsC() {
    const p = window.parent.getParamsB()
    return request({
        url: getUrLParams(2),
        method: 'get',
        params: {
            platformSerkey: p.platformSerkey,
            pageCode: p.pageCode,
            systemKey: p.systemKey,
            userName: p.userName,
            paramValue: JSON.stringify(p.paramValue)
        }
    })
}

export function getParamsD() {
    const p = window.parent.getParamsC()
    return request({
        url: getUrLParams(3),
        method: 'get',
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
            profileType: p.profileType,
        }
    })
}
//#endregion
if (store.state.MODE === 'BUSINESS') {
    getData.BUSINESS()
} else {
    getData.All()
}