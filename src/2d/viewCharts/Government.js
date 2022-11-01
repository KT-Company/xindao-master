import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

export function setLineChart(res, obj, color3, color4,) {
  return {
    grid: {
      left: '3%',
      right: '3%',
      top: '15%',
      bottom: '25%',
      containLabel: true
    },
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'line', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    legend: {
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        fontSize: chart.fontSize,
        color: chart.fontColor,
      },
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLabel: {
        interval: 0,
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize,
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
      data: res.xData
    },
    ],
    yAxis: [{
      type: 'value',
      min: 0,
      max: (a) => {
        return a.max * 1.2
      },
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
          color: chart.fontColor,
          fontSize: chart.fontSize,
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
      name: res.data[0].name,
      type: 'line',
      stack: '',
      // 修改的是线下区域的颜色
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: obj.jianbian[0]
        }, {
          offset: 1,
          color: obj.jianbian[1]
        }])
      },
      // 修改的是线的颜色
      lineStyle: {
        normal: {
          color: {
            type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
            // 0% 处的颜色                           // 100% 处的颜色
            colorStops: [{ offset: 0, color: '#fff' },
            { offset: .25, color: 'rgba(83,223,132)' },
            { offset: .75, color: '#fff' },
            { offset: 1, color: '#fff' }],
            global: false // 缺省为 false
          }, width: 3,
          shadowBlur: 1,
          shadowColor: color3,
          shadowOffsetY: 10
        }
      },
      symbol: 'none',
      data: res.data[0].value,

    },
    {
      name: res.data[1].name,
      type: 'line',
      stack: '',
      // // 修改的是线下区域的颜色
      // areaStyle: {
      //   color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
      //     offset: 0,
      //     color: color1
      //   }, {
      //     offset: 1,
      //     color: color2
      //   }])
      // },
      // 修改的是线的颜色
      lineStyle: {
        normal: {
          color: {
            type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
            // 0% 处的颜色                           // 100% 处的颜色
            colorStops: [{ offset: 0, color: '#fff' }, { offset: .25, color: color4 }, { offset: .75, color: '#fff' }, { offset: 1, color: '#fff' }],
            global: false // 缺省为 false
          }, width: 3,
        }
      },
      symbol: 'none',
      data: res.data[1].value,

    },
    ]
  };

}