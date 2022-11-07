import request from '@/2d/utils/request'
import store from '@/2d/store'
// const url = 'https://dapi.seentao.com/custom-form/customForm.formInfos.get?caseVersionId=82347900509093947&enterpriseId=82441349728567340&userName=18871870420&userId=74791556441702461&userType=PLATFORM&userToken=a23defc6acd8954460b543d23bcfee2d&memberId=74791556450091021&orgType=SCHOOL&orgId=100678506119168&schoolId=100678506119168&sceneId=portal_logo&sysCode='
const p = store.state.urlParam
// https://dapi.seentao.com/custom-form/customForm.formInfos.get
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
// &userToken=6f92a803ac9b492b55aa42fd48cd9471
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
    return request({
        url: `${url}cyjj`,
        method: 'get',
    })
}

// 交通出行
export function getjtcx() {
    return request({
        url: `${url}jtcx`,
        method: 'get',
    })
}

// 环境人口
export function gethjrk() {
    return request({
        url: `${url}hjrk`,
        method: 'get',
    })
}

// 教育医疗
export function getjyyl() {
    return request({
        url: `${url}jyyl`,
        method: 'get',
    })
}

// 能源碳排放（年）
export function getnytpfy() {
    return request({
        url: `${url}nytpfy`,
        method: 'get',
    })
}

// 能源总消耗（月）
export function getnyzxhm() {
    return request({
        url: `${url}nyzxhm`,
        method: 'get',
    })
}