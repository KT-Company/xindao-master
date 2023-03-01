import request from '@/2d/utils/request'
import store from '@/2d/store'
import getData from './getDatas'
import getUrlParam from '@/2d/utils/getUrlParam'

// const p = 
const p = store.state.isMock ? { mode: 'BUSINESS' } : getUrlParam()  // 经营模式: BUSINESS  探索模式: EXPLORE （测试）
console.log('p: ', p);
store.commit('setMODE', p.mode)

console.log('MODE: ', store.state.MODE);

// mock 数据获取 token 地址：https://dstudent.seentao.com/ 账号：15178904534 密码：admin9527...）
const url = `${window.publicUrl}?
caseVersionId=${p.caseVersionId}
&enterpriseId=${p.enterpriseId}
&userName=${p.userName}
&userId=${p.userId}
&userType=${p.userType}
&userToken=${p.userToken}
&memberId=${p.memberId}
&orgType=${p.orgType}
&orgId=${p.orgId}
&schoolId=${p.schoolId}
&sceneId=${p.sceneId}
&sysCode=`

// const url = `https://dapi.seentao.com/custom-form/customForm.formInfos.get?
// caseVersionId=82347900509093947
// &enterpriseId=82441349728567340
// &userName=15178904534
// &userId=85566304814628903
// &userType=PLATFORM
// &userToken=${window.myToken}
// &memberId=85566304824590394
// &orgType=SCHOOL
// &orgId=31978613954314240
// &schoolId=31978613954314240
// &sceneId=portal_logo
// &sysCode=` 

// #region ********************************************* 正式接口 *********************************************

// 产业经济
export function getcyjj() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}cyjj`,
        method: 'get',
    })
}

// 交通出行
export function getjtcx() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}jtcx`,
        method: 'get',
    })
}


// 企业总量详情
export function getqyjycx() {
    return request({
        url: `${url}qyjycx`,
        method: 'get',
    })
}

// 环境人口
export function gethjrk() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}hjrk`,
        method: 'get',
    })
}

// 教育医疗
export function getjyyl() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}jyyl`,
        method: 'get',
    })
}

// 能源碳排放（年）
export function getnytpfy() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}nytpfy`,
        method: 'get',
    })
}

// 能源总消耗（月）
export function getnyzxhm() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}nyzxhm1`,
        method: 'get',
    })
}


// 全国碳排放
export function getqynytpfy() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}qynytpfy`,
        method: 'get',
    })
}

// 区域产业经济
export function getqycyjj() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}qycyjj`,
        method: 'get',
    })
}

// 区域企业信息
export function getqyqyxx() {
    store.state.globalYear = window.publicParams.year
    return request({
        url: `${url}qyqyxx`,
        method: 'get',
    })
}


// 人力资源
export function getrlzy() {
    return request({
        url: `${url}rlzy`,
        method: 'get',
    })
}

// 企业看板1
export function getData1() {
    return request({
        url: `${url}qyzbhzb01`,
        method: 'get',
    })
}
// 企业看板2
export function getData2() {
    return request({
        url: `${url}qyzbhzb02`,
        method: 'get',
    })
}

// 企业看板3
export function getData3() {
    return request({
        url: `${url}qyzbmx`,
        method: 'get',
    })
}

// 企业看板4
export function getData4() {
    return request({
        url: `${url}qyzbyfqs`,
        method: 'get',
    })
}

// 企业看板5
export function getData5() {
    return request({
        url: `${url}bmzbhzb01`,
        method: 'get',
    })
}

// 企业看板6
export function getData6() {
    return request({
        url: `${url}bmzbhzb02`,
        method: 'get',
    })
}

// 企业看板7
export function getData7() {
    return request({
        url: `${url}bmzbmx`,
        method: 'get',
    })
}

// 企业看板8
export function getData8() {
    return request({
        url: `${url}bmzbyfqs`,
        method: 'get',
    })
}

// 企业看板9
export function getData9() {
    return request({
        url: `${url}bmzbmx_b`,
        method: 'get',
    })
}
// 企业看板10
export function getData10() {
    return request({
        url: `${url}bmzbyfqs_b`,
        method: 'get',
    })
}
//#endregion



// #region ******************************************** 经营模式-BUSINESS ********************************************

function getUrLParams(index) {
    if ([2, 3].includes(index)) {
        return `${window.FRONT_INTERFACE[index]}`
    } else {
        const p = store.state.isMock ? {
            userId: '13085827083014144',
            userName: '18612107916',
            userType: 'PLATFORM',
            userToken: '3ed0e3801425eca8fc77ff407a9fc7a9',
            orgId: '13066758269702144',
            orgType: 'SCHOOL',
            memberId: '13085827099787264',
            memberType: 'STUDENT',
            schoolId: '13066758269702144',
            teachClassId: '85662867958267939',
            teachClassStepId: '85662876444917791'
        } : window.parent.getParamsA()
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
    const p = store.state.isMock ? {
        platformSerkey: 'Seentao@12345',
        pageCode: 'xbizerp_databoard_manage',
        systemKey: 'xbizerp-1.0',
        userName: '18612107916',
        paramValue: {
            "userId": "13085827083014144",
            "userName": "18612107916",
            "userType": "PLATFORM",
            "userToken": "3ed0e3801425eca8fc77ff407a9fc7a9",
            "orgId": "13066758269702144",
            "orgType": "SCHOOL",
            "memberId": "13085827099787264",
            "memberType": "STUDENT",
            "schoolId": "13066758269702144",
            "enterpriseCode": "LE001",
            "classId": "85662867958267939",
            "teachClassStepId": "85662876444917791",
            "memberSourceDeptCodes": "150101",
            "realName": "谢华志",
            "caseVersionId": "85662731031543860",
            "caseCode": "SZZHSJ_2",
            "memberSourcePostCodes": "15010101",
            "teamId": "85662882041167900",
            "virtualDate": "2023-01-25"
        }
    } : window.parent.getParamsB()
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
    const p = store.state.isMock ? {
        orgCode: 'LE001',
        deptCode: '110101',
        deptName: '企管部',
        userId: '74791587158163480',
        userName: '饶展兴',
        classId: '86967220904136739-86967228588101667',
        orgName: '新锐创新科技（集团）有限公司',
        virtualDate: '2023-01-05',
        caseCode: 'SZZHSJ_2',
        version: '86301907887329314',
        profileType: 'ENTERPRISE_INFO',
    } : window.parent.getParamsC()
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