import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

export function setStackedChart(res) {
  var option = {
    color: ['rgb(0,214,78)', '#F4A419', '#3CBE89',],
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '5%',
      right: '4%',
      bottom: '10%',
      top: '10%',
    },
    legend: {
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.45)',
        },
      },
      axisLabel: {
        // interval:0,
        fontSize: 12,
        color: '#6A93B9',
      },
      // axisTick: {
      //   show: false,
      // },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
    yAxis: {
      type: 'value',
      // min: 0,
      // minInterval: 1,
      nameTextStyle: {
        fontSize: 12,
        color: '#BAE7FF',
        align: 'center',
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          // type: 'dashed', // dotted 虚线
        },
      },
      axisLabel: {
        fontSize: 12,
        color: '#6A93B9',
        fontFamily: 'Bebas',
      },
    },
    series: [
      { name: '红码', type: 'bar', barWidth: 25, stack: 'total', data: [6, 8, 9, 3, 2, 5, 8, 10], },
      { name: '黄码', type: 'bar', barWidth: 25, stack: 'total', data: [6, 8, 9, 3, 2, 5, 8, 10], },
      { name: '绿码', type: 'bar', barWidth: 25, stack: 'total', data: [7, 4, 2, 9, 5, 7, 8, 9] },
    ],
  };

  return option
}


// 区域纳税总额
export function setLineCharts(res, color1, color2, color3, color4, max, legendData) {
  console.log(res);
  let xData = res.map(item => item.name)
  let yData = res.map(item => item.value)

  return {
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
      bottom: '10%',
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
      // // icon: 'rect',
      // itemWidth: 30,
      // itemHeight: 15,
      // itemGap: 20,
      // // data: legendData,
      // right: '10',
      // position: 'left',
      // textStyle: {
      //   fontSize: 18,
      //   color: '#fff'
      // },
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      data: [
        {
          name: legendData,
          icon: 'image://http://example.website/a/b.png',
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#FFFFFF'
          },
          icon: 'stack'

        },
        // {
        //   name: name.length>1?name[1]:'',
        //   icon: 'image://http://example.website/a/b.png',
        //   textStyle: {
        //     fontSize: 12,
        //     fontWeight: 'bolder',
        //     color: '#df3434'
        //   },
        //   icon: 'pie'
        // }
      ]

    },
    // legend: {
    //   show: true,
    //   icon: 'rect',
    //   orient: 'horizontal',
    //   left: 'right',
    //   itemWidth: 12,
    //   itemHeight: 12
    // },
    xAxis: [{
      type: 'category',
      boundaryGap: true,

      axisLabel: {
        interval: 0,

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
      min: 0,
      max: max,
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
      name: legendData, type: 'line', stack: '',
      // 修改的是线下区域的颜色
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: color1
        }, {
          offset: 1,
          color: color2
        }])
      },
      // 修改的是线的颜色
      lineStyle: {
        normal: {
          color: {
            type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
            // 0% 处的颜色                           // 100% 处的颜色
            colorStops: [{ offset: 0, color: '#fff' }, { offset: .25, color: color4 }, { offset: .75, color: '#fff' }, { offset: 1, color: '#fff' }],
            global: false // 缺省为 false
          }, width: 3,
          shadowBlur: 1,
          shadowColor: color3,
          shadowOffsetY: 10
        }
      },
      symbol: 'none',
      data: yData,

    },
    {
      name: legendData, type: 'line', stack: '',
      // 修改的是线下区域的颜色
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: color1
        }, {
          offset: 1,
          color: color2
        }])
      },
      // 修改的是线的颜色
      lineStyle: {
        normal: {
          color: {
            type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
            // 0% 处的颜色                           // 100% 处的颜色
            colorStops: [{ offset: 0, color: '#fff' }, { offset: .25, color: color4 }, { offset: .75, color: '#fff' }, { offset: 1, color: '#fff' }],
            global: false // 缺省为 false
          }, width: 3,
          shadowBlur: 1,
          shadowColor: color3,
          shadowOffsetY: 10
        }
      },
      symbol: 'none',
      data: yData,

    },
    ]
  };

}

// 服务增值
export function setAddValue(res, color, img) {
  // { name: '红码', type: 'bar', barWidth: 25, stack: 'total', data: [6, 8, 9, 3, 2, 5, 8, 10], },
  //第二种获取target值的方式，通过json序列化之后可获取值
  let data = JSON.parse(JSON.stringify(res.data));
  data.forEach((item, index) => {
    item.type = 'bar';
    item.barWidth = 25;
    item.stack = 'total';
    item.data = item.value;
    item.itemStyle = {
      normal: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 1,
              color: color[index][0], // 0% 处的颜色
            },
            {
              offset: 1,
              color: color[index][0], // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },

    }
  })
  var option = {
    color: ['rgb(0,214,78)', '#F4A419', '#3CBE89',],
    tooltip: {
      confine: true,
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: '10%',
      right: '4%',
      bottom: '10%',
      top: '10%',
    },
    legend: {
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,0.45)',
        },
      },
      axisLabel: {
        // interval:0,
        fontSize: 12,
        color: '#6A93B9',
      },
      // axisTick: {
      //   show: false,
      // },
      data: res.xData,
    },
    yAxis: {
      type: 'value',
      // min: 0,
      // minInterval: 1,
      nameTextStyle: {
        fontSize: 12,
        color: '#BAE7FF',
        align: 'center',
      },
      axisLine: { show: false },
      axisTick: { show: false },
      splitArea: { show: false },
      splitLine: {
        lineStyle: {
          color: 'rgba(255, 255, 255, 0.15)',
          // type: 'dashed', // dotted 虚线
        },
      },
      axisLabel: {
        fontSize: 12,
        color: '#6A93B9',
        fontFamily: 'Bebas',
      },
    },
    series: data,
  };

  return option
}


// 企业家 
export function setLineChartsQYJ(res, color1, color2, color3, color4, max, xftjdata2) {
  let xData = res.map(item => item.name)
  let yData = res.map(item => item.value)

  return {
    grid: {
      left: '3%',
      right: '3%',
      top: '20%',
      bottom: '10%',
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
      // // icon: 'rect',
      // itemWidth: 30,
      // itemHeight: 15,
      // itemGap: 20,
      // // data: legendData,
      // right: '10',
      // position: 'left',
      // textStyle: {
      //   fontSize: 18,
      //   color: '#fff'
      // },
      icon: 'rect',
      orient: 'horizontal',
      left: 'right',
      itemWidth: 12,
      itemHeight: 12,
      formatter: ['{a|{name}}'].join('\n'),
      textStyle: {
        fontSize: 12,
        color: '#6A93B9',
        height: 8,
        rich: {
          a: {
            verticalAlign: 'bottom',
          },
        },
      },
      data: [
        {
          name: '企业数量/家',
          // icon: 'image://http://example.website/a/b.png',
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#FFFFFF'
          },
          icon: 'stack'

        },
        {
          name: '总资产/亿',
          // icon: 'image://http://example.website/a/b.png',
          textStyle: {
            fontSize: 12,
            fontWeight: 'bolder',
            color: '#FFFFFF'
          },
          icon: 'stack'

        },

      ]

    },
    // legend: {
    //   show: true,
    //   icon: 'rect',
    //   orient: 'horizontal',
    //   left: 'right',
    //   itemWidth: 12,
    //   itemHeight: 12
    // },
    xAxis: [{
      type: 'category',
      boundaryGap: true,

      axisLabel: {
        interval: 0,

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
      min: 0,
      max: max,
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
      name: '企业数量/家', type: 'line', stack: '',
      // 修改的是线下区域的颜色
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: color1
        }, {
          offset: 1,
          color: color2
        }])
      },
      // 修改的是线的颜色
      lineStyle: {
        normal: {
          color: {
            type: 'linear', x: 0, y: 1, x2: 0, y2: 0,
            // 0% 处的颜色                           // 100% 处的颜色
            colorStops: [{ offset: 0, color: '#fff' }, { offset: .25, color: '#FFCD6D' }, { offset: .75, color: '#fff' }, { offset: 1, color: '#fff' }],
            global: false // 缺省为 false
          }, width: 3,
          shadowBlur: 1,
          shadowColor: color3,
          shadowOffsetY: 10
        }
      },
      symbol: 'none',
      data: yData,

    },
    {
      name: '总资产/亿', type: 'line', stack: '',
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
      data: xftjdata2,

    },
    ]
  };

}
