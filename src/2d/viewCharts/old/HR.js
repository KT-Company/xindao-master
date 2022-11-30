export function setBarCharts(res, color, data, titleData) {
    let data1 = [];
    for (let i = 0; i < res.length; i++) {
        let barbox = {
            value: res[i].value,
            name: res[i].name,
            label: {
                textStyle: {
                    color: color[i],
                    fontSize: 30
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    shadowBlur: 5,
                    color: color[i]
                }
            }
        };

        data1.push(barbox, {
            value: data == '人员' ? 0 : 2,
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
                    borderWidth: 0
                }
            }
        });
    }
    let data2 = [];
    for (let i = 0; i < res.length; i++) {
        let barbox = {
            value: res[i].value,
            name: res[i].name,
            label: {
                textStyle: {
                    color: color[i + 2],
                    fontSize: 30
                }
            },
            itemStyle: {
                normal: {
                    borderWidth: 1,
                    shadowBlur: 5,
                    color: color[i + 2]
                }
            }
        };

        data2.push(barbox, {
            value: data == '人员' ? 0 : 2,
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
                    borderWidth: 0
                }
            }
        });
    }
    return {
        title: [

            {
                text: titleData,
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: data == '人员' ? 18 : 27
                },
                textAlign: "center",
                itemGap: 20,
                left: "26%",
                top: data == '人员' ? "35%" : "38%"
            },
            {
                text: data == '人员' ? "当月离职人数" : '',
                textStyle: {
                    color: "#FFFFFF",
                    fontSize: 12
                },
                textAlign: "center",
                itemGap: 20,
                left: "26%",
                top: "50%"
            },
        ],
        tooltip: {
            show: false
        },
        legend: {
            orient: "horizontal", //垂直显示
            top: "15%",
            left: "60%",
            itemWidth: 12,
            itemHeight: 12,
            itemGap: 20,
            textStyle: {
                rich: {
                    a: {
                        width: 28,
                        height: 28,
                        lineHeight: 0,
                        padding: [50, 0, 0, -50],
                        fontSize: 30,
                        fontWeight: "bolder",
                        color: color[2]
                    },
                    b: {
                        width: 28,
                        height: 28,
                        lineHeight: 0,
                        padding: [50, 0, 0, -40],
                        fontSize: 30,
                        fontWeight: "bolder",
                        color: color[3]
                    },
                    c: {
                        width: 28,
                        height: 28,
                        lineHeight: 0,
                        padding: [12, 0, 0, 0],
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
                if (name == "男职员" || name == '当月在职人数') {
                    return `{c|${name}}\n\n{a|${target}人}`;
                }
                if (name == "女职员" || name == '当月离职人数') {
                    return `{c|${name}}\n\n{b|${target}人}`;
                }

            }
        },

        series: [
            // 主要展示层的
            {
                radius: ["60%", "85%"],
                center: ["27%", "45%"],
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
                data: data1
            },
            // 主要展示层的
            {
                radius: ["50%", "61%"],
                center: ["27%", "45%"],
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
                data: data2
            },

        ]
    }
}