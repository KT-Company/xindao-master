// 二级菜单事件
const handleBMenuBMap = {
    '2-1': (isPick) => {
        // do something 
        alert('三圈关系' + isPick)
    },
    '2-2': (isPick) => {
        alert('资金流关系' + isPick)
    },
    '2-3': (isPick) => {
        alert('物流关系' + isPick)
    },
    '2-4': (isPick) => {
        alert('信息流关系' + isPick)
    }, // .....以此类推
}

export default handleBMenuBMap