// 交通出行------------------------------------------------
// 交通里程

// 交通出行------------------------------------------------
// 交通里程 
export function setTrafficMileage(tlzlc, res) {
    let data = [];
    for (let i = 0; i < res.length; i++) {
        let barbox = {
            value: res[i].value,
            name: res[i].name,
            label: {
                textStyle: {
                    color: res[i].color,
                    fontSize: 30
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    shadowBlur: 5,
                    color: res[i].color
                }
            }
        };

        data.push(barbox, {
            value: 600 * 10,
            name: "",
            label: {
                show: false
            },
            itemStyle: {
                normal: {
                    labelLine: {
                        show: false
                    },
                    color: "rgba(0, 0, 0, 0)",
                    borderColor: "rgba(0, 0, 0, 0)",
                    borderWidth: 0
                }
            }
        });
    }
    return {
        title: [

            {
                text: tlzlc,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 18
                },
                textAlign: "center",
                itemGap: 20,
                left: "25%",
                top: "30%"
            },
            {
                text: "铁路总里程",
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 12
                },
                textAlign: "center",
                itemGap: 20,
                left: "25%",
                top: "43%"
            },
        ],
        tooltip: {
            show: false
        },
        legend: {
            orient: "horizontal", //垂直显示
            top: "10%",
            left: "50%",
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 30,
            textStyle: {
                rich: {
                    a: {
                        width: 28,
                        height: 28,
                        lineHeight: 0,
                        padding: [50, 0, 0, 0],
                        fontSize: 20,
                        fontWeight: "bolder",
                        color: "#124EFB"
                    },
                    b: {
                        width: 28,
                        height: 28,
                        lineHeight: 0,
                        padding: [50, 0, 0, 0],
                        fontSize: 20,
                        fontWeight: "bolder",
                        color: "#FFAF15"
                    },
                    c: {
                        width: 28,
                        height: 28,
                        lineHeight: 0,
                        padding: [0, 0, 0, 0],
                        fontSize: 14,
                        color: "#ffffff"
                    },

                }
            },

            formatter: function (name) {
                var target
                for (var i = 0, l = res.length; i < l; i++) {
                    if (res[i].name == name) {
                        target = res[i].value
                    }
                }
                if (name == "高速铁路总里程") {
                    return `{c|${name}}\n{a|${target} 公里}`;
                }
                if (name == "普通铁路总里程") {
                    return `{c|${name}}\n{b|${target} 公里}`;
                }

            }
        },

        series: [
            // 主要展示层的
            {
                radius: ["60%", "85%"],
                center: ["27%", "42%"],
                type: "pie",
                labelLine: {
                    normal: {
                        show: false,
                    },
                    emphasis: {
                        show: false
                    }
                },
                label: {
                    show: false,
                },
                data: data
            },
            // 主要展示层的
            {
                radius: ["50%", "59%"],
                center: ["27%", "42%"],
                type: "pie",
                labelLine: {
                    normal: {
                        show: false,
                        length: 25,
                        length2: 50
                    },
                    emphasis: {
                        show: false
                    }
                },
                label: {
                    show: false,
                },
                data: data
            },

        ]
    }


}

// 公共交通
export function setPublicTransport(res,name, color, img, maxData) {
    let data = res;
    return {
      // tooltip: {
      //   trigger: 'axis',
      //   // 设置浮层的 css 样式
      //   extraCssText: 'width:80px;height:auto;background-color:rgba(255,255,255,0.5);color:#fff',
      //   position:[60,35],
      //   formatter: function (params) {
      //     //params[0].name表示x轴数据
      //     let str 
      //     // =  name + '<br/>'
      //     //params是数组格式
         
      //     //设置浮层图形的样式跟随图中展示的颜色
      //       str = "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:" + color + ";'></span>" + "\t"   + res
          
      //     return str
      //   },
      // }, 
        angleAxis: {
            max: '100',
            clockwise: true, // 逆时针
            // 隐藏刻度线
            show: false
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
                show: false
            },
        },
        polar: {
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
        },

        graphic: {//图形中间图片
            elements: [{
                type: "image",
                style: {
                    image: img,//你的图片地址
                    width: 80,
                    height: 80,
                },
                left: "center",
                top: "center",
            }],
        },

        series: [{
            type: 'pie',
            name: '低层细圆环',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            startAngle: 0,
            hoverAnimation: false,
            clockWise: true,
            itemStyle: {
                borderWidth: 1,
                opacity: .1,

                color: color,
                borderColor: color
            },
            label: {
                show: false
            },
            data: [0],
            z: 99,
        },

        {
            type: 'bar',
            data: [data],
            polarIndex: 0,
            showBackground: false,
            coordinateSystem: 'polar',
            roundCap: true,
            barWidth: 9,
            itemStyle: {
                normal: {
                    opacity: .8,

                    color: color,
                    shadowColor: color,
                }
            },
            z: 999,
        },

        {
            type: 'pie',
            name: '外层细圆环',
            radius: ['90%', '92%'],
            center: ['50%', '50%'],
            hoverAnimation: true,
            clockWise: false,
            itemStyle: {
                normal: {
                    opacity: .1,
                    color: color,
                },
            },
            label: {
                show: false,
            },
            data: [maxData],
        },

        ]
    }




}

// 智能交通/出行数据

import * as echarts from "echarts";
export function setGoingOutData(res, color, img) {
    const xdata = res.map((v) => v.name);
    const ydata = res.map((v) => v.value);
    const unitList = res.map(v=>v.unit)

    return { 
  //       tooltip: {
  //         trigger: 'axis',
  //         type:"shadow",
  //         // 设置浮层的 css 样式
  //         extraCssText: 'width:auto;height:auto;background-color:rgba(255,255,255,0.5);color:#fff',
  //         formatter: function (params) {
  //           //params[0].name表示x轴数据
  //           let str 
  //           // =  name + '<br/>'
  //           //params是数组格式 
  //          params.forEach(item=>{
  // //设置浮层图形的样式跟随图中展示的颜色 
  // str = "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:" + color[2] +"'></span>" + "\t"   + item.name+"\t : "+item.value
  // // str =`<span :style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:${color}'></span>\t${item.name}\t${item.value}`
  //          }) 
  //           return str
  //         },
  //       }, 
  tooltip:{
    trogger:'axis',
  },
     
        grid: {
            left: "6%",
            bottom: 0,
            right: "6%",
            top: 0,
            containLabel: false,
        },
        yAxis: [
            {
                inverse: true,
                data: xdata,
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        align: 'left',
                        fontFamily: 'MiSans-Normal',
                    },
                    padding: [0, 0, 25, 10],
                    formatter: (name, index) => {
                        return `{num| ${name}}`;
                    },
                    rich: {
                        num: {
                            padding: [0, 0, 10, 0],
                            width: 25,
                            color: '#fff',
                            align: 'left',
                            fontSize: 12,
                            fontFamily: 'Mohave-BoldItalic',
                            fontWeight: 400,
                        },
                    },
                },
                offset: 0,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },


            },
            {
                inverse: true,
                data: ydata,
                axisLabel: {
                    textStyle: {
                        color: '#00C9FB',
                        fontSize: 12,
                        fontFamily: 'MiSans-Medium',
                        align: 'right',
                        padding: [0, 10, 40, 0],
                    },
                    formatter: (name, index) => {
                        let unit;
                        // res.forEach(item => {
                        //     switch (item.id) {
                        //         case 0:
                        //             unit = item.unit
                        //             break;
                        //         case 1:
                        //             unit = item.unit
                        //             break;
                        //         case 2:
                        //             unit = item.unit
                        //             break;
                        //         case 3:
                        //             unit = item.unit
                        //             break;
                        //         case 4:
                        //             unit = item.unit
                        //             break;
                        //         case 5:
                        //             unit = item.unit
                        //             break;
                        //     }
                        // })
                        return `{num1|${name}${unitList[index]}}`;
                    },
                    rich: {
                        num1: {
                            color: '#ffffff',
                        },
                    },
                },
                offset: 0,
                splitLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
            },

        ],
        xAxis: {
            show: false,
        },
        series: [
            {
                z: 1,
                type: 'bar',
                data: ydata,
                barWidth: 12,
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(95, 123, 149, 0.2)',
                },
                itemStyle: {
                    color: function (params) {
                        const { dataIndex } = params;
                        return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                            {
                                offset: 0,
                                color: color[0],
                            },
                            {
                                offset: 0.9,
                                color: color[1],
                            },
                            {
                                offset: 1,
                                color: color[2],
                            },
                        ]);
                    },
                },
            },
            {
                type: 'pictorialBar',
                data: ydata,
                z: 10,
                symbol: `image://${img}`,
                symbolRotate: null,
                symbolSize: [36, 36],
                symbolPosition: 'end',
                symbolOffset: [20, 0],
                itemStyle: {
                    color: 'rgba(255,255,255,1)',
                },
            },
            {
                type: 'pictorialBar',
                data: ydata,
                z: 0,
                symbol: `image://${require("@/2d/assets/images/t-pie-bg.png")}`,
                symbolSize: [400, 10],
                symbolOffset: [0, 0],
                itemStyle: {
                    color: 'rgba(255,255,255,1)',
                },
            },


        ],

    }



}
