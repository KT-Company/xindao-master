import * as echarts from "echarts"
import 'echarts-liquidfill'
import { merge, clone } from "lodash-es"
import store from '@/2d/store'

const optionCache = {
  gauge1: {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        radius: "100%",
        progress: {
          show: true,
          width: 10,
          roundCap: true,
        },
        axisLine: {
          lineStyle: {
            width: 10,
            color: [[1, 'rgba(255,255,255,.2)']]
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          show: false
        },
        anchor: {
          show: false,
        },
        pointer: { show: false },
        title: {
          show: false
        },
        detail: {
          valueAnimation: true,
          offsetCenter: [0, 5],
          rich: {
            val: { fontSize: 23, color: "#FFF", lineHeight: 25, fontWeight: "bold" },
            name: { fontSize: 10, color: "#FFF", lineHeight: 20 }
          },
          formatter(val) {
            return `{val|${val}}\n{name|名字}`;
          }
        },
        data: [
          {
            value: 60
          }
        ]
      }
    ]
  },
  line1: {
    tooltip: { show: true, trigger: 'axis', },
    color: ["rgba(255, 159, 64, 1)"],
    grid: {
      containLabel: true,
      top: 30,
      left: 0,
      right: 10,
      bottom: 10
    },
    title: {
      // text: "单位:亿",
      right: 0,
      textStyle: {
        color: "rgba(202, 224, 255, 1)",
        fontSize: 10,
        fontWeight: "normal"
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        fontSize: 10,
        interval: 0,
        align: "left",
        color: "rgba(202, 224, 255, 1)",
        rotate: -45,
        interval: store.state.MODE === 'BUSINESS' ? 1 : 0
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        interval: 0,
        color: "rgba(202, 224, 255, 1)"
      },
      splitLine: {
        lineStyle: {
          color: ["rgba(255, 255, 255, .2)"]
        }
      }
    },

    series: [
      {
        data: [1254869, 2222222, 3321234, 3344353, 1290543, 1330213, 139920, 231321, 21312, 3213231, 231231, 21332],
        type: 'line',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(255, 159, 64, .5)' // 0% 处的颜色
            }, {
              offset: .7, color: 'rgba(255, 159, 64, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        smooth: true,
        symbol: "none"
      }
    ]
  },
  bar1: {
    tooltip: { show: true, trigger: 'item', },
    color: ["rgba(255, 159, 64, 1)"],
    grid: {
      containLabel: true,
      top: 20,
      left: 0,
      right: 10,
      bottom: 10
    },
    title: {
      // text: "单位:亿",
      right: 0,
      top: 0,
      textStyle: {
        color: "rgba(202, 224, 255, 1)",
        fontSize: 10,
        fontWeight: "normal"
      }
    },
    xAxis: {
      type: 'category',
      data: ['FP00\n001', 'FP00\n001', 'FP00\n001', 'FP00\n001', 'FP00\n001', 'FP00\n001', 'FP00\n001', 'FP00\n001', 'FP00\n001'],
      axisLabel: {
        fontSize: 10,
        interval: 0,
        align: "center",
        color: "rgba(202, 224, 255, 1)",
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        interval: 0,
        color: "rgba(202, 224, 255, 1)"
      },
      splitLine: {
        lineStyle: {
          color: ["rgba(255, 255, 255, .2)"]
        }
      }
    },

    series: [
      {
        data: [12548, 22222, 33123, 34435, 12054, 13301, 13992, 23132, 21312,],
        type: 'bar',
      }
    ]
  },
  mutilLine1: {
    tooltip: { show: true, trigger: 'axis', },
    legend: {
      showw: true, itemWidth: 6, itemHeight: 6, left: 0,
      textStyle: { fontSize: 10, color: "rgba(202, 224, 255, 1)" }, icon: "rect"
    },
    color: ["rgba(92, 115, 230, 1)", "rgba(255, 159, 64, 1)", "rgba(86, 216, 173, 1)"],
    grid: {
      containLabel: true,
      top: 30,
      left: 0,
      right: 10,
      bottom: 10
    },
    title: {
      text: "单位: T",
      right: 0,
      textStyle: {
        color: "rgba(202, 224, 255, 1)",
        fontSize: 10,
        fontWeight: "normal"
      }
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLabel: {
        fontSize: 10,
        interval: 0,
        align: "left",
        color: "rgba(202, 224, 255, 1)",
        rotate: -45
      },
      axisTick: { show: false }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        fontSize: 10,
        interval: 0,
        color: "rgba(202, 224, 255, 1)"
      },
      splitLine: {
        lineStyle: {
          color: ["rgba(255, 255, 255, .2)"]
        }
      }
    },
    series: [
      {
        data: [1269, 2222, 3234, 3353, 1543, 1213, 1320, 2321, 2312, 3223, 2231, 2332],
        type: 'line',
        stack: 'Total',
        name: "碳配额总量",
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(92, 115, 230, .5)' // 0% 处的颜色
            }, {
              offset: .7, color: 'rgba(92, 115, 230, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        smooth: true,
        symbol: "none"
      },
      {
        data: [1269, 2222, 3234, 3353, 1543, 1213, 1320, 2321, 2312, 3223, 2231, 2332],
        type: 'line',
        name: "碳排放总量",
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(255, 159, 64, .5)' // 0% 处的颜色
            }, {
              offset: .7, color: 'rgba(255, 159, 64, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        smooth: true,
        symbol: "none"
      },
      {
        data: [1269, 2222, 3234, 3353, 1543, 2213, 2320, 1321, 1312, 2223, 3231, 1332],
        type: 'line',
        name: "碳购买总量",
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(86, 216, 173, .5)' // 0% 处的颜色
            }, {
              offset: .7, color: 'rgba(86, 216, 173, 0)' // 100% 处的颜色
            }],
            global: false // 缺省为 false
          }
        },
        smooth: true,
        symbol: "none"
      },
    ]
  },
  liquidFill1: {
    series: [
      {
        type: 'liquidFill',
        name: "完成率",
        data: [0.6],
        color: ["rgba(242, 153, 71, .5)"],
        radius: "92%",
        backgroundStyle: {
          borderWidth: 0,
          borderColor: 'transparent',
          color: "transparent"
        },
        outline: {
          borderDistance: 8,

          itemStyle: {
            borderWidth: 8,
            borderColor: "rgba(242, 153, 71, .5)"
          }
        },
        label: {
          rich: {
            val: { fontSize: 14, color: "#FFF", fontWeight: "bold", },
            name: { fontSize: 14, color: "rgba(202, 224, 255, .5)", lineHeight: 25 }
          },
          formatter(params) {
            return `{val|${parseFloat((params.value * 100).toPrecision(12)) + "%"}}\n{name|${params.seriesName}}`
          }
        }
      }
    ]
  }
}
export const createEcharts = (name, customOption = {}) => {
  return merge(clone(optionCache[name]), customOption)
}

export const getEchartsAndOption = (el, name, customOpt = {}) => {

  const option = createEcharts(name, customOpt)
  const char = echarts.init(el)

  return { option, char }
}