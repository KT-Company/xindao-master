//环境人口
// -历年人口数---------------------------------
import * as echarts from "echarts";
export function setYearManNumber(res) {
    let dataX = [];
    let dataY = [];


    res.forEach(element => {
        dataX.push(element.name);
        dataY.push(element.value);
    });
    console.log(dataX);
    console.log(dataY);
    console.log('dataY----------------------------------dataY');
    let Max = Math.max.apply(null, dataY);
    let dataM = []
    dataY.forEach(element => {
        dataM.push(600);

    });
    console.log(dataX, dataY, dataM);
    return {
        grid: {
            left: '3%',
            right: '3%',
            top: '20%',
            bottom: '0%',
            containLabel: true
        },

        xAxis: {
            show: true,
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#2E415D ',
                }
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                rotate: 0,
                textStyle: {
                    fontSize: '70%',
                    color: '#FFFFFF '
                },
            },
            data: dataX
        },
        yAxis: [
            {
                show: true,
                name: '万',
                nameTextStyle: {
                    color: "#FFFFFF"
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: '#2E415D ',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: '#2E415D '
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: '70%',
                        color: '#FFFFFF '
                    }
                }
            },


            {
                show: true,
                type: 'value',
                splitNumber: 12,
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: '#2E415D ',
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        type: "dashed",
                        color: '#2E415D '
                    }
                },
                axisLabel: {
                    textStyle: {
                        fontSize: '70%',
                        color: '#FFFFFF '
                    }
                }
            }
        ],
        series: [


            {
                name: '内部柱子',
                type: 'bar',
                barWidth: 20,
                z: 19,
                barGap: '-100%',
                itemStyle: {
                    // opacity: 0.7,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(255,168,0,0.4)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(255,168,0,0.4)', // 100% 处的颜色
                                },
                            ],
                            false
                        );
                    },
                },
                data: dataY,
            },
            {
                name: '上部圆',
                type: 'pictorialBar',
                silent: true,
                symbolSize: [20, 10],
                symbolOffset: [-18, -6],
                symbolPosition: 'end',
                z: 22,
                color: '#FFA800',
                data: dataY,
            },
            {
                name: '底部圆',
                type: 'pictorialBar',
                silent: true,
                symbolSize: [20, 10],
                symbolOffset: [-18, 2],
                z: 21,
                itemStyle: {
                    color: '#FFA800'
                },
                data: dataY,
            },
            {
                type: 'pictorialBar',
                name: '',
                symbol: 'rect',
                symbolSize: [1, 3],
                symbolMargin: 1,
                symbolRepeat: true,
                barWidth: 1,
                data: dataM,
                itemStyle: {
                    normal: {
                        color: '#2E415D '
                    },
                    emphasis: {
                        color: '#2E415D '
                    }
                },
                z: 110
            },
        ]
    };


};
// 消费统计-----------------------------------------

export function setConsumptionStatistics(res) {
    let dataX = [];
    let dataY = [];
    res.forEach(element => {
        dataX.push(element.name);
        dataY.push(element.value);
    });

    let Max = Math.max.apply(null, dataY);
    let dataM = []
    dataY.forEach(element => {
        dataM.push(500);

    });
    console.log(dataX, dataY, dataM);
    return {
        grid: {
            left: '3%',
            right: '9%',
            top: '20%',
            bottom: '0%',
            containLabel: true
        },

        xAxis: {
            show: true,
            type: 'category',
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#2E415D ',
                }
            },
            splitLine: {
                show: false,
            },
            axisLabel: {
                rotate: 0,
                interval: 0,
                textStyle: {
                    fontSize: '70%',
                    color: '#FFFFFF ',
                    fontSize: 14

                },
            },
            data: dataX
        },
        yAxis: [{
            type: 'value',
            name: '亿',
            nameTextStyle: {
                fontSize: 14,
                color: '#ffffff'
            },
            min: 0,
            max: 500,
            splitNumber: 5,
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(108, 166, 219, 0.5)',
                    type: 'dashed',
                },
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(149, 162, 170,.8)',
                    type: 'dotted',
                    width: 1
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 14
                }

            },

            splitArea: {
                show: true,
                areaStyle: {
                    color: 'rgba(1, 147, 244,0.1)'
                }
            }
        },
        {
            type: 'value',
            name: '百分比',
            nameTextStyle: {
                fontSize: 14,
                color: '#ffffff'
            },
            splitNumber: 5,
            min: -10,
            max: 10,
            axisTick: {
                show: false
            },
            axisLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(149, 162, 170,.8)',
                    type: 'dotted',
                    width: 1
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 14
                }

            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(149, 162, 170,.1)',
                    type: 'dotted',
                    width: .1
                }
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: 'rgba(1, 147, 244,0.1)'
                }
            }
        },
        ],
        series: [


            {
                name: '内部柱子',
                type: 'bar',
                barWidth: 20,
                z: 19,
                barGap: '-100%',
                itemStyle: {
                    // opacity: 0.7,
                    color: function (params) {
                        return new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: 'rgba(238,247,255,0.4)', // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(238,247,255,0.4)', // 100% 处的颜色
                                },
                            ],
                            false
                        );
                    },
                },
                data: dataY,
            },
            {
                type: 'pictorialBar',
                name: '',
                symbol: 'rect',
                symbolSize: [1, 3],
                symbolMargin: 1,
                symbolRepeat: true,
                barWidth: 1,
                data: dataM,
                itemStyle: {
                    normal: {
                        color: '#2E415D '
                    },
                    emphasis: {
                        color: '#2E415D '
                    }
                },
                z: 110
            },
            {
                type: "line",
                zlevel: 3,
                lineStyle: {

                    color: "#FFD800",

                },
                data: dataY
            }
        ]
    };


}
// 消费统计
export function setXFTJ(res) {
    let xData = res.map(item => item.name)
    let yData = res.map(item => item.value)

    return {
        grid: {
            left: '3%',
            right: '3%',
            top: '10%',
            bottom: '0%',
            containLabel: true
        },

        xAxis: [{
            type: 'category',
            boundaryGap: true,
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12,

                }

            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: 'rgba(108, 166, 219, 1)'
                }
            },
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(108, 166, 219, 0.5)',
                    type: 'dashed',
                }
            },
            data: xData
        },
        ],
        yAxis: [{
            type: 'value',
            nameTextStyle: {
                fontSize: 20,
                color: '#95a2aa'
            },
            min: 0,
            max: 120,
            axisTick: {
                show: false
            },
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(108, 166, 219, 0.5)',
                    type: 'dashed',
                },
            },
            axisLine: {
                // show: true,
                lineStyle: {
                    color: 'rgba(149, 162, 170,.8)',
                    type: 'dotted',
                    width: 1
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontSize: 12
                }

            },

            splitArea: {
                show: true,
                areaStyle: {
                    color: 'rgba(1, 147, 244,0.1)'
                }
            }
        },

        ],
        series: [{
            name: '', type: 'line', stack: '',
            // 修改的是线下区域的颜色
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(65,127,255,1)'
                }, {
                    offset: 1,
                    color: 'rgba(65,127,255,0)'
                }])
            },
            // 修改的是线的颜色
            lineStyle: {
                normal: {
                    color: {
                        type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
                        // 0% 处的颜色                           // 100% 处的颜色
                        colorStops: [{ offset: 0, color: '#fff' }, { offset: .25, color: ' #0042FF' }, { offset: .75, color: '#fff' }, { offset: 1, color: '#fff' }],
                        global: false // 缺省为 false
                    }, width: 3,
                    shadowBlur: 1,
                    shadowColor: 'rgba(65,127,255,0.3)',
                    shadowOffsetY: 30
                }
            },
            symbol: 'none',
            data: yData,

        },
        ]
    };

}