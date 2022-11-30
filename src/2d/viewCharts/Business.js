import * as echarts from 'echarts'
// 百分比-------------------------
export function setPiePercentage(data) {
    return {
        title: [
            {
                text: data.titleData,
                x: 'center',
                top: '55%',
                textStyle: {
                    color: '#FFFFFF',
                    fontSize: 13,
                    fontWeight: '100',
                },
            },
            {
                text: data.perCentum,
                x: 'center',
                top: '30%',
                textStyle: {
                    fontSize: 22,
                    color: '#FFFFFF',
                    fontFamily: 'Source Han Sans CN',
                    foontWeight: '400',
                },
            },
        ],
        polar: {
            radius: ['92%', '75%'],
            center: ['50%', '50%'],
        },
        angleAxis: {
            max: 100,
            show: false,
        },
        radiusAxis: {
            type: 'category',
            show: true,
            axisLabel: {
                show: false,
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
        },
        series: [
            {
                name: '',
                type: 'bar',
                roundCap: true,
                barWidth: 30,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(66, 66, 66, .3)',
                },
                data: data.data,
                coordinateSystem: 'polar',
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                            {
                                offset: 0,
                                color: data.color[0],
                            },
                            {
                                offset: 1,
                                color: data.color[1],
                            },
                        ]),
                    },
                },
            },


        ],
    };
}
// 折现图----------------------------
export function setLine(data) {
    return {
        tooltip: {
            trigger: 'axis',
        },
        title: {
            left: 26,
            top: 26,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 50000,
                fontFamily: 'PingFang SC'
            }
        },
        grid: {
            left: '1%',
            right: '5%',
            bottom: '4%',
            top: '10%',
            containLabel: true
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: data.dataList.length > 15 ? 35 : 100
        }],
        xAxis: {
            axisTick: {
                show: false // 是否显示坐标轴轴线
            },
            axisLabel: {
                rotate: '-20',
                margin: '10',
                color: 'rgba(202,224,255,.6)',
                fontSize: 12,
                interval: 0
            },
            splitLine: {
                show: false
            },
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。
                show: true,
                inside: false,
                lineStyle: {
                    color: 'rgba(255,255,255,.3)'
                }
            },
            data: data.Xdata
        },
        yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: { show: true },
            axisLabel: { //坐标轴刻度标签的相关设置。
                show: true,
                textStyle: {
                    color: 'rgba(202,224,255,.6)',
                    fontSize: 12,
                },
                formatter: data.isShow ? '{value}%' : '{value}'
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(202,202,202,0.2)',
                    type: 'dashed',
                }
            },
            show: true,

        }],
        series: [{
            name: data.name,
            type: 'line',
            smooth: true, //是否平滑曲线显示
            showSymbol: false,

            itemStyle: {
                color: data.color,
                borderColor: data.color,
                borderWidth: 1
            },
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 0,
                            color: data.color // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: data.color // 100% 处的颜色
                        }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: data.color,
                    shadowBlur: 30,
                    shadowOffsetY: 5
                }
            },
            data: data.dataList
        }]
    };

}
// 折现图----------------------------
export function setLineFinancial(data) {
    console.log(data);
    console.log('data---------------------');
    return {
        tooltip: {
            trigger: 'axis',
        },
        title: {
            left: 26,
            top: 26,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 50000,
                fontFamily: 'PingFang SC'
            }
        },
        grid: {
            left: '1%',
            right: '1%',
            bottom: '4%',
            top: '10%',
            containLabel: true
        },
        dataZoom: [{
            type: 'inside',
            start: 0,
            end: data.dataList.length > 15 ? 35 : 100
        }],
        xAxis: {
            axisTick: {
                show: true, // 是否显示坐标轴轴线
                alignWithLabel: true,
                length: 3,
                lineStyle: {
                    color: 'rgba(202,224,255,.3)',
                }
            },
            axisLabel: {
                margin: 10,
                color: 'rgba(202,224,255,.6)',
                fontSize: 12,
                interval: 0
            },
            splitLine: {
                show: false
            },
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。
                show: false,
                inside: false,
                lineStyle: {
                    color: 'rgba(255,255,255,.3)'
                }
            },
            data: data.Xdata
        },
        yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: { show: true },
            axisLabel: { //坐标轴刻度标签的相关设置。
                show: true,
                textStyle: {
                    color: 'rgba(202,224,255,.6)',
                    fontSize: 12,
                },
                formatter: data.isShow ? '{value}%' : '{value}'
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(202,202,202,0.2)',
                    type: 'dashed',
                }
            },
            show: true,

        }],
        series: [{
            name: data.name,
            type: 'line',
            smooth: true, //是否平滑曲线显示
            showSymbol: false,

            itemStyle: {
                color: data.color,
                borderColor: data.color,
                borderWidth: 1
            },
            lineStyle: {
                normal: {
                    width: 2,
                    color: {
                        type: 'linear',
                        colorStops: [{
                            offset: 0,
                            color: data.color // 0% 处的颜色
                        },
                        {
                            offset: 1,
                            color: data.color // 100% 处的颜色
                        }
                        ],
                        globalCoord: false // 缺省为 false
                    },
                    shadowColor: data.color,
                    shadowBlur: 30,
                    shadowOffsetY: 5
                }
            },
            data: data.dataList
        }]
    };

}
// 柱状图-----------------------------
export function setBar(data) {


    return {
        tooltip: {
            trigger: 'axis',
        },
        title: {
            left: 26,
            top: 26,
            textStyle: {
                color: '#FFFFFF',
                fontSize: 15,
                fontWeight: 50000,
                fontFamily: 'PingFang SC'
            }
        },
        grid: {
            left: '1%',
            right: '5%',
            bottom: '10%',
            top: '10%',
            containLabel: true
        },
        dataZoom: [{
            type: 'slider',
            show: data.isShow,
            start: 0,
            end: data.dataList.length > 8 ? 80 : 100,
            height: 5, //高度 
            xAxisIndex: [0], //控制第一个x轴
            left: '10%',
            bottom: 0, //图表底部距离
            zoomLock: true,
            // show: false,
            showDetail: false,
            showDataShadow: false,
            brushSelect: false,
            fillerColor: "rgba(200,200,200,.3)",
            backgroundColor: "rgba(200,200,200,.05)",
            borderColor: "transparent",
            handleSize: '0%',
        }],
        xAxis: {
            axisTick: {
                show: false // 是否显示坐标轴轴线
            },
            axisLabel: {
                color: 'rgba(202,224,255,.6)',
                fontSize: 12,
                interval: 0
            },
            splitLine: {
                show: false
            },
            boundaryGap: true,
            axisLine: { //坐标轴轴线相关设置。
                show: true,
                inside: false,
                lineStyle: {
                    color: 'rgba(255,255,255,.3)'
                }
            },
            data: data.Xdata.map(item => item.replace(" ", "\n"))
        },
        yAxis: [{
            type: 'value',
            splitNumber: 4,
            splitLine: { show: true },
            axisLabel: { //坐标轴刻度标签的相关设置。
                show: true,
                textStyle: {
                    color: 'rgba(202,224,255,.6)',
                    fontSize: 12,
                }
            },
            axisLine: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(202,202,202,0.2)',
                    type: 'dashed',
                }
            },
            show: true,

        }],
        series: [{
            name: data.name,
            type: 'bar',
            barWidth: '20px',
            itemStyle: {
                color: data.color
            },
            data: data.dataList
        }]
    };

}
// 横柱状图-----------------------------
export function setBarAcross(data) {
    return {
        xAxis: {
            splitLine: {
                show: false,
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                show: false,
            },
        },
        grid: {
            containLabel: true,
            left: 0,
            top: 20,
            right: 0,
            bottom: 0,
        },
        tooltip: {
            trigger: "axis",
        },
        dataZoom: [//给x轴设置滚动条
            {

                type: 'slider',
                show: true,
                yAxisIndex: [0],
                right: 0,
                width: 5,
                height: '84%',
                top: 30,
                start: 0,
                end: 40,
                zoomLock: true,
                // show: false,
                showDetail: false,
                showDataShadow: false,
                brushSelect: false,
                fillerColor: "rgba(200,200,200,.3)",
                backgroundColor: "rgba(200,200,200,.05)",
                borderColor: "transparent",
                handleSize: '0%',
                yAxisIndex: [0, 1],//控制的 y轴 
            },
        ],
        yAxis: [
            {
                splitLine: 'none',
                axisLine: 'none',
                inverse: true,
                axisLabel: {
                    show: false
                },
                data: data.labelData,
            },
            {
                axisLine: 'none',
                data: data.valueData,
                inverse: true,
                axisLabel: {
                    show: true,
                    verticalAlign: 'bottom',
                    align: 'right',
                    padding: [0, 10, 6, 0],//数据与图形的距离
                    textStyle: {
                        color: 'rgba(202,224,255,.7)',
                        fontSize: 12,
                    }
                },
            },
        ],
        series: [
            {
                type: 'bar',
                showBackground: true,
                data: data.valueData,
                barWidth: 9,
                itemStyle: {
                    normal: {
                        color: " #5C73E6"
                    },
                },
                label: {
                    normal: {
                        color: 'rgba(202,224,255,.7)',
                        show: true,
                        position: [0, '-15'],
                        textStyle: {
                            fontSize: 12,
                        },
                        formatter: function (a) {
                            return a.name
                        }
                    }
                }
            },
        ],
    };


}