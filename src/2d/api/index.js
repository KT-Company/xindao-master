import request from '@/2d/utils/request'
import store from '@/2d/store'
import getData from './getDatas'
import useData from '../hooks/useData'
import getUrlParam from '@/2d/utils/getUrlParam'
// const url = 'https://dapi.seentao.com/custom-form/customForm.formInfos.get?caseVersionId=82347900509093947&enterpriseId=82441349728567340&userName=18871870420&userId=74791556441702461&userType=PLATFORM&userToken=a23defc6acd8954460b543d23bcfee2d&memberId=74791556450091021&orgType=SCHOOL&orgId=100678506119168&schoolId=100678506119168&sceneId=portal_logo&sysCode='
const p = getUrlParam()
// https://dapi.seentao.com/custom-form/customForm.formInfos.get
// 部署环境 api 地址
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

// 开发环境 api 地址（如果没有数据就替换 token -----》 获取 token 地址：https://dstudent.seentao.com/ 账号：15178904534 密码：1234qwer!）
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

// // get
// export function get(params) {
//     return request({
//         url: '/mock/data.json',
//         method: 'get',
//         params
//     })
// }
// // post
// export function post(data) {
//     return request({
//         url: '/mock/data.json',
//         method: 'post',
//         data
//     })
// }

// ********************************************* 正式接口 *********************************************

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



export function getParam() {
    return request({
        url: `https://dedu.seentao.com/api/xverse/paramsmapping/convert?platformSerkey: 
        Seentao@12345
        pageCode: 
        xbizerp_databoard_manage
        systemKey: 
        xbizerp-1.0
        userName: 
        18612107916
        paramValue: 
        {
        "userId":"13085827083014144",
        "userName":"18612107916",
        "userType":"PLATFORM",
        "userToken":"7f84fcf2880901fc01aa84e16379520f",
        "orgId":"13066758269702144",
        "orgType":"SCHOOL",
        "memberId":"13085827099787264",
        "memberType":"STUDENT",
        "schoolId":"13066758269702144",
        "enterpriseCode":"GE002",
        "classId":"85662867958267939",
        "teachClassStepId":"85662876444917791",
        "memberSourceDeptCodes":"110101",
        "realName":"谢华志","caseVersionId":"85662731031543860","caseCode":"SZZHSJ_2","memberSourcePostCodes":"11010103","teamId":"85662882041167889","virtualDate":"2023-01-25"}`,
        method: 'get',
    })
}

export function postParam(data) {
    return request({
        url: `https://dedu.seentao.com/api/vbseTeach/vbse.teachClass.steps.get?userId=74791556441702461&userName=18612107916&userType=PLATFORM&userToken=75bfc69012f9cacb5179436c60ad319b&orgId=13066758269702144&orgType=SCHOOL&memberId=81180384836976670&memberType=STUDENT&schoolId=13066758269702144&teachClassId=85662867958267939&teachClassStepId=85662876444917791`,
        method: 'post',
    })
}



getData.All()