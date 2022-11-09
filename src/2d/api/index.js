import request from '@/2d/utils/request'
import store from '@/2d/store'
// const url = 'https://dapi.seentao.com/custom-form/customForm.formInfos.get?caseVersionId=82347900509093947&enterpriseId=82441349728567340&userName=18871870420&userId=74791556441702461&userType=PLATFORM&userToken=a23defc6acd8954460b543d23bcfee2d&memberId=74791556450091021&orgType=SCHOOL&orgId=100678506119168&schoolId=100678506119168&sceneId=portal_logo&sysCode='
const p = store.state.urlParam
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

// 开发环境 api 地址（如果没有数据就替换 token -----》 获取 token 地址：https://dstudent.seentao.com/ 账号：15178904534 密码：1234qwer!）
const url = `https://dapi.seentao.com/custom-form/customForm.formInfos.get?
caseVersionId=82347900509093947
&enterpriseId=82441349728567340
&userName=15178904534
&userId=85566304814628903
&userType=PLATFORM
&userToken=${window.myToken}
&memberId=85566304824590394
&orgType=SCHOOL
&orgId=31978613954314240
&schoolId=31978613954314240
&sceneId=portal_logo
&sysCode=`

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
        url: `${url}nyzxhm1`,
        method: 'get',
    })
}


// 全国碳排放
export function getqynytpfy(){
    return request({
        url: `${url}qynytpfy`,
        method: 'get',
    })
}

// 区域产业经济
export function getqycyjj(){
    return request({
        url: `${url}qycyjj`,
        method: 'get',
    })
}

// 区域企业信息
export function getqyqyxx(){
    return request({
        url: `${url}qyqyxx`,
        method: 'get',
    })
}