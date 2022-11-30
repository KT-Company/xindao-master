import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

// 圆圈 --》（Area：区域EGP，HR:3个）
export function setYuanChart(res, obj) {
  let colorList = [
    ['rgba(213,110,42)', 'rgba(106,82,85)'],
    ['rgba(84,115,232)', 'rgba(63,84,147)'],
    ['rgba(124,95,174)', 'rgba(82,76,128)'],
    ['rgba(78,184,146)', 'rgba(70,105,121)'],
  ]
  let _colorList = obj?.color ? colorList[obj.color] : colorList[0]
  let _title = () => {
    let type = obj?.title ? obj.title : 1
    const titleMap = {
      1: [
        {
          text: res.name,
          x: 'center',
          top: '55%',
          textStyle: {
            color: '#FFFFFF',
            fontSize: chart.fontSize,
            fontWeight: '100',
          },
        },
        {
          text: `+${res.value}%`,
          x: 'center',
          top: '35%',
          textStyle: {
            fontSize: chart.fontSize + 6,
            color: '#FFFFFF',
            fontFamily: 'DINAlternate-Bold, DINAlternate',
            foontWeight: '600',
          },
        },
      ],
      2: {
        text: res.name,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: chart.fontSize + 6,
          color: '#FFFFFF',
          fontFamily: 'DINAlternate-Bold, DINAlternate',
          foontWeight: '600',
        },
      },
      2: {
        text: res.name,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: chart.fontSize + 6,
          color: '#FFFFFF',
          fontFamily: 'DINAlternate-Bold, DINAlternate',
          foontWeight: '600',
        },
      }
    }

    return titleMap[type]
  }
  var option = {
    title: _title(),
    polar: {
      radius: ['90%', '74%'],
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
        barWidth: 50,
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(66, 66, 66, .3)',
        },
        data: [res.value],
        coordinateSystem: 'polar',
        itemStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: _colorList[0],
              },
              {
                offset: 1,
                color: _colorList[1],
              },
            ]),
          },
        },
      },
    ],
  };
  return option
}

/** 柱状图 --》（Area：增加值，....）
 * @param  {object} res   数据
 * @param  {object} obj   配置项
 * 备注：obj:{
      color: [0, 2],（颜色索引）
      legend: true,（是否显示图例）
      legendType: 2,（图例类型）
      barW: "25%",（柱子宽度）
      unit: "单位：亿千瓦小时", （单位）
      interval: 0, （显示全部 x 轴 Label）
 * }
 */
export function setZhuChart(res, obj) {
  let colorList = ['rgba(92, 115, 230)', 'rgba(223,153,92)', 'rgba(72,192,151)', 'rgba(158,159,171)']
  let _colorList = obj?.color ? obj.color.map(item => colorList[item]) : colorList
  const _legend = () => {
    const type = obj?.legendType ? obj.legendType : 1
    const legendMap = {
      1: {
        show: obj?.legend ?? false,
        icon: 'rect',
        orient: 'horizontal',
        // align: 'center',
        itemWidth: 12,
        itemHeight: 8,
        textStyle: {
          fontSize: 12,
          color: chart.fontColor,
        },
      },
      2: {
        show: obj?.legend ?? false,
        icon: 'rect',
        right: "0%",
        orient: 'horizontal',
        itemWidth: 6,
        itemHeight: 6,
        itemGap: 25,
        padding: [0, 0, 0, 0],
        textStyle: {
          fontSize: 12,
          color: chart.fontColor,
        },
        formatter: (a) => {
          return a + '年'
        }
      }
    }
    return legendMap[type]
  }
  var option = {
    color: _colorList,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: _legend(),
    grid: {
      top: obj?.grid?.top || "15%",
      left: "0%",
      bottom: "0%",
      right: "0%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: res.xData,
      logBase: 5,
      axisLine: {
        show: true,
        lineStyle: {
          color: chart.xLine,
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        fontSize: chart.fontSize,
        // margin: 10,
        color: chart.fontColor,
        interval: obj?.interval ?? null,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#ffffff",
          opacity: 0.2,
          width: 1,
        },
      },
    },
    yAxis: {
      name: obj?.unit ? obj.unit : '',
      type: "value",
      nameTextStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize,
      },
      // nameGap: 20,  // 通过你生成的图表来调整
      // nameLocation: "start", // y轴name处于y轴的什么位置
      axisLine: {
        show: false,
      },
      axisLabel: {
        color: chart.fontColor,
        fontSize: chart.fontSize,
        // margin: 10,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: chart.xLine,
          opacity: 0.2,
          width: 1,
        },
      },
    },
    series: function () {
      let series = []
      for (let i = 0; i < res.data.length; i++) {
        let serie = {
          "name": res.data[i].name,
          "type": "bar",
          "barWidth": obj?.barW || "35%",
          "data": res.data[i].value
        }
        series.push(serie)
      }
      return series
    }()
  }

  return option
}

// 曲线图 --》（Area：消费）
export function setQuXianChart(res, obj) {
  let colorList = ['85,106,215', '239,150,63']
  let _colorList = obj?.color ? obj.color.map(item => colorList[item]) : colorList
  var datas = []
  res.data.forEach((item, i) => {
    datas.push({
      name: item.name,
      data: item.value,
      type: 'line',
      smooth: true, // 平滑过渡
      symbol: 'none', // 拐点设置为实心圆点 默认是空心圆点 ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none' 可以通过 'image://url' 设置为图片，其中 URL 为图片的链接
      // symbolSize: 8, // 拐点圆的大小
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: `rgba(${_colorList[i]},1)`,
          },
          {
            offset: 0.5,
            color: `rgba(${_colorList[i]},.3)`,
          },
          {
            offset: 1,
            color: `rgba(${_colorList[i]},0)`,
          },
        ],
          false
        ),
      },
      lineStyle: {
        //线条样式
        width: 2,
        color: `rgba(${_colorList[i]})`,
        type: 'solid' //虚线  dotted 点线 solid 实线 dashed 虚线
      },

    })
  })
  var option = {
    tooltip: {
      trigger: "axis",
    },
    grid: {
      top: "15%",
      left: "0%",
      bottom: "0%",
      right: "0%",
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: true, // 紧挨边缘
      axisLabel: {
        fontSize: chart.fontSize,
        // margin: 10,
        color: chart.fontColor,
        interval: obj?.interval ?? null,
      },
      axisTick: {
        // x轴上的小刻度
        show: false
      },
      data: res.xData
    },
    yAxis: {
      type: 'value',
      splitLine: {
        // 网格线
        show: true,
        lineStyle: {
          type: 'dotted', // dotted 虚线 solid 实线
          color: chart.xLine,
          opacity: 0.2,
        }
      },
      axisLabel: {
        formatter: '{value}',
        color: chart.fontColor,
        fontSize: chart.fontSize
      }
    },
    series: datas
  };
  return option
}

// 饼图 --》（Area：区域资产结构，Education：院校分布与数量）
export function setBingChart(res, obj) {
  const legendStyle = () => {
    if (obj?.legend === 1) {
      return {
        orient: 'vertical',
        right: '3%',
        top: 'middle',
        itemWidth: 10,
        itemHeight: 10,
        itemStyle: {
          borderColor: null,
        },
        icon: 'rect',
        itemGap: 10,
        formatter(name) {
          let result = res.find((item) => item.name == name);
          return `{a|${result.name}} {b|${result.value}所}`;
        },
        textStyle: {
          color: '#000',
          rich: {
            a: {
              fontSize: chart.fontSize,
              color: 'rgba(177,197,255)',
              padding: [0, 3, 0, 3],
            },
            b: {
              fontSize: 14,
              color: 'rgba(255,255,255)',
              padding: [0, 0, 0, 6],
            },
          },
        },
      }
    } else {
      return {
        orient: 'vertical',
        right: '4%',
        top: 'middle',
        itemWidth: 10,
        itemHeight: 10,
        itemStyle: {
          borderColor: null,
        },
        icon: 'rect',
        itemGap: 20,
        formatter(name) {
          let result = res.find((item) => item.name == name);
          return `{a|${result.name}} {b|${result.value}%}`;
        },
        textStyle: {
          color: '#000',
          rich: {
            a: {
              fontSize: chart.fontSize,
              color: chart.fontColor,
              padding: [0, 10, 0, 6],
            },
            b: {
              fontSize: 14,
              color: 'rgba(255,255,255)',
              padding: [0, 0, 0, 6],
            },
          },
        },
      }
    }
  }
  var colorList = ['rgba(72,124,223)', 'rgba(72,176,162)', 'rgba(112,100,188)', 'rgba(255,159,64)'];
  var option = {
    color: colorList,
    tooltip: {
      trigger: 'item',
    },
    legend: legendStyle(),
    series: [
      // 展示层
      {
        type: 'pie',
        center: ['25%', '50%'],
        radius: ['45%', '85%'],
        itemStyle: {
          borderWidth: 1, //描边线宽
          borderColor: '#fff',
        },
        label: {
          show: false,
        },
        data: res,
      },
    ],
  };
  return option
}

// 饼图2 --》（Transportation：铁路总里程）
export function setBingChart2(res, obj) {
  let color = ['rgba(72,124,223)', 'rgba(112,100,188)'];
  let _title = () => {
    let type = obj?.title ? obj.title : 1
    const titleMap = {
      1: {
        text: res.name,
        x: 'center',
        y: 'center',
        textStyle: {
          fontSize: chart.fontSize + 6,
          color: '#FFFFFF',
          fontFamily: 'DINAlternate-Bold, DINAlternate',
          foontWeight: '600',
        },
      },
      2: [
        {
          text: '铁路总里程',
          x: 'center',
          top: '47%',
          textStyle: {
            fontSize: chart.fontSize,
            color: 'rgba(168, 198, 245)',
            fontWeight: '100',
          },
        },
        {
          text: '单位(公里)',
          x: 'center',
          top: '63%',
          textStyle: {
            fontSize: chart.fontSize,
            color: 'rgba(168, 198, 245)',
            fontWeight: '100',
          },
        },
        {
          text: `${res.data[0].value + res.data[1].value}`,
          x: 'center',
          top: '25%',
          textStyle: {
            fontSize: chart.fontSize + 6,
            color: '#FFFFFF',
            fontFamily: 'DINAlternate-Bold, DINAlternate',
            foontWeight: '600',
          },
        },
      ],
    }

    return titleMap[type]
  }
  var option = {
    color: color,
    title: _title(),
    series: [
      {
        name: '已纳管',
        type: 'pie',
        radius: ['100%', '80%'],
        center: ['50%', '50%'],
        data: res.data,
        hoverAnimation: false,
        labelLine: {
          normal: {
            length: 0,
            length2: 20,
            lineStyle: {
              color: '#0099EA',
            },
          },
        },
        label: {
          normal: {
            show: false,
            formatter: '{a|{a}}\n{hr|}\n{c|{c}人}',
            rich: {
              a: {
                fontSize: 14,
                fontFamily: 'PingFang SC',
                fontWeight: 400,
                color: '#fff',
                padding: 10,
                lineHeight: 40,
                textAlign: 'center'
              },
              hr: {
                borderColor: '#4681ec',
                width: '100%',
                borderWidth: 2,
                height: 0,
              },
              c: {
                fontSize: 14,
                fontFamily: 'Source Han Sans CN',
                color: '#E7B943',
                fontWeight: 400,
                lineHeight: 30,
                align: 'center',
              },
            }
          },
        },
      },
    ],
  };

  return option
}

// 饼图3 --》（Energy：全国碳排放）
export function setBingChart3(res, obj) {
  res.data.sort((a, b) => {
    return a.index - b.index
  })
  var option = {
    tooltip: {
      show: true,
    },
    series: [
      {
        type: "pie",
        selectedMode: false,
        radius: ["25%", "40%"],
        itemStyle: {
          normal: {
            color: (item) => {
              return `rgba(${item.data.color},1)`
            }
          }
        },
        label: {
          normal: {
            position: 'outside',
            overflow: 'brea',
            formatter: (a, b) => {
              const { name, value } = { ...a.data }
              return `{b|${name}：}{c|${value}%}`
            },
            textStyle: {
              rich: {
                b: {
                  fontSize: chart.fontSize,
                  color: chart.fontColor,
                },
                c: {
                  fontSize: chart.fontSize + 1,
                  color: 'rgba(255,255,255)',
                },
              },
            },
          },
        },
        labelLine: {
          normal: {
            length: 20,
            length2: 20
          },

        },
        data: res.data,
      },
      {
        type: "pie",
        radius: ["40%", "100%"],
        itemStyle: {
          normal: {
            color: (item) => {
              return `rgba(${item.data.color},.2)`
            }
          }
        },
        label: {
          show: false
        },
        data: res.data,
      },
    ],
  };
  return option
}

/** 折线图 --》（Energy：全国人均碳排放，本市人均排放）
 * @param  {object} res   数据
 * @param  {object} obj   配置项
 * 备注：obj:{
 *    color: [2,3]  =》 注：取 _colorList[2], _colorList[3] 的颜色
 *    legend: 1     =》 ：全国人均碳排放，本市人均排放
 * }
 */
export function setLineChart(res, obj) {
  const colorList = ["rgba(202,202,205)", "rgba(243,162,84)", "rgba(106,189,154)", "rgba(94,118,223)"]
  let _colorList = obj?.color ? obj.color.map(item => colorList[item]) : colorList
  const _legend = () => {
    let legend = {
      orient: "horizontal",
      textStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize,
      },
    }
    if (obj?.legend === 1) {
      legend = {
        orient: "horizontal",
        // itemGap: 5,
        // right: "3%",
        // itemWidth: 20,
        // itemHeight: 4,
        // icon: "react",
        // itemGap: 17,
        // align: "right",
        formatter: (a) => {
          const _a = a.split('/')
          return `${_a[0]}\n${_a[1]}`
        },
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize,
        },
      }
    }
    return legend
  }
  var option = {
    color: _colorList,
    grid: {
      top: "30%",
      left: "1%",
      right: "3%",
      bottom: "1%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
    },
    legend: _legend(),
    xAxis: {
      data: res.xData,
      boundaryGap: true,
      axisLine: {
        show: true,
        lineStyle: {
          color: chart.xLine,
        },
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [
      {
        name: obj.hasOwnProperty('unit') ? obj?.unit[0] : null,
        nameTextStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize,
        },
        axisLabel: {
          color: "#AEC9FF",
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: chart.xLine,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: chart.xLine,
            opacity: 0.2,
            type: 'dotted',
            width: 1,
          },
        },
      }, {
        name: obj.hasOwnProperty('unit') ? obj?.unit[1] : null,
        nameTextStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize,
        },
        axisLabel: {
          color: chart.fontColor,
          fontSize: chart.fontSize,
        },
        axisLine: {
          show: false,
          lineStyle: {
            color: chart.xLine,
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: chart.xLine,
            opacity: 0.2,
            type: 'dotted',
            width: 1,
          },
        },
      }
    ],
    series: function () {
      let series = []
      for (let i = 0; i < res.data.length; i++) {
        let serie = {
          name: res.data[i].name,
          yAxisIndex: i,
          data: res.data[i].value,
          type: "line",
          symbol: "circle",
          symbolSize: 6,
          // itemStyle: {
          //     color: "#FF845A",
          //     shadowColor: "#FF845A",
          //     shadowBlur: 10,
          //     borderColor: "#FF845A",
          //     borderWidth: 3,
          //     lineStyle: {
          //         color: "#FF845A",
          //     },
          // },
        }
        series.push(serie)
      }
      return series
    }(),
  };
  return option
}

export function setBingChart4(res, obj) {
  let option = {
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: res.name,
        type: 'pie',
        radius: '70%',
        center: ['50%', '50%'],
        label: {
          fontSize: chart.fontSize,
          formatter: function (params) {
            return `{p${params.dataIndex}|${params.data.value + '%'}}`;
          },
          rich: {
            p0: {
              color: 'rgba(92,115,230)',
            },
            p1: {
              color: 'rgba(255,159,64)',
            },
            p2: {
              color: 'rgba(72,192,151)',
            },
          },
        },
        labelLine: {
          lineStyle: {
            type: [5, 4],
            dashOffset: 5
          },
        },
        data: (() => {
          let _data = []
          res.data.forEach(item => {
            _data.push({
              name: item.name,
              value: item.value,
              itemStyle: {
                normal: {
                  color: `rgba(${item.color},.4)`,
                  borderColor: `rgba(${item.color},1)`,
                  borderWidth: 1,
                }
              },
            })
          })
          return _data
        })(

        ),
        roseType: 'area',
      },
      {
        name: '外部刻度',
        type: 'gauge',
        center: ['50%', '50%'],
        radius: '95%',
        startAngle: 90,
        endAngle: -270,
        // endAngle: -45,
        axisLine: {
          show: true,
          lineStyle: {
            width: 1,
            color: [[1, 'rgba(0,0,0,0)']],
          },
        }, //仪表盘轴线
        axisLabel: {
          show: false,
          color: '#4d5bd1',
          distance: 25,
        }, //刻度标签。
        axisTick: {
          show: true,
          splitNumber: 8,
          lineStyle: {
            color: 'rgba(72,76,98)', //用颜色渐变函数不起作用
            width: 1,
          },
          length: -6,
        }, //刻度样式
        splitLine: {
          show: false,
          length: -20,
          lineStyle: {
            color: 'rgba(72,76,98)', //用颜色渐变函数不起作用
          },
        }, //分隔线样式
        detail: {
          show: false,
        },
        pointer: {
          show: false,
        },
      },
    ],
  };
  return option
}

// 水球图
export function setShuiQiuChart(res, obj) {
  const colorList = ['70,77,172']
  const color = obj?.color ? colorList[obj.color] : colorList[0]
  console.log(res.value * 0.01, 'res.value * 0.01');
  return {
    series: [
      {
        name: res.name,
        type: 'liquidFill',
        color: [`rgba(${color},.5)`],
        data: [res.value * 0.01],
        center: ['50%', '50%'],
        radius: obj?.size || '80%',
        outline: {
          itemStyle: {
            borderWidth: 10,
            borderColor: `rgba(${color},.5)`,
          },
        },
        backgroundStyle: {
          color: 'rgba(0, 0, 0, 0)',
        },
        label: {
          formatter: function (p) {
            console.log('p: ', p);
            return `{a|${parseFloat((p.value * 100).toPrecision(12))}%}\n{b|${p.seriesName}}`;
          },
          rich: {
            a: {
              fontSize: chart.fontSize + 5,
              color: '#fff',
              fontWeight: 'bold',
              padding: [0, 0, 5, 0]
            },
            b: {
              fontSize: chart.fontSize,
              color: '#a5a8af'
            }
          },
          position: ['50%', '50%'],
        },
      },
    ],
  };


}