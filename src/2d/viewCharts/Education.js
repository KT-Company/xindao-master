import Highcharts from 'highcharts'
import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

// 院校分布与数量
export function setSchoolChart(res, unit = '所') {
  return {
    chart: {
      type: "pie",
      animation: false,
      backgroundColor: null,
      marginTop: 30,
      events: {
        load: function (item) {
          var each = Highcharts.each,
            points = this.series[0].points;
          each(points, function (p, i) {
            p.graphic.attr({
              translateY: -p.shapeArgs.ran,
            });
          });
        },
      },
      options3d: {
        enabled: true,
        alpha: 60,
        beta: 0,
      },
    },
    colors: ['rgb(29,115,255)', 'rgb(0,229,138)', 'rgb(197,198,39)', 'rgb(202,119,48)'],
    title: null,
    legend: {
      useHTML: true, // 设置允许使用 html
      symbolWidth: 0.001,
      symbolHeight: 0.001,
      symbolRadius: 0.001,
      verticalAlign: 'top',
      floating: true,
      itemStyle: {
        "height": '1.5vw'
      },
      labelFormatter() {
        return `<p class='yuanxiao-chart-box'>${this.name}<span class='yuanxiao-val yuanxiao-val${this.index}'>${this.y}${unit}</span></p>`
      }
    },
    credits: {
      enabled: false
    },
    plotOptions: {
      series: {
        animation: false,
      },
      pie: {
        innerSize: "70%",
        cursor: "pointer",
        showInLegend: true, // 是否打开图例
        depth: 35,
        dataLabels: {
          enabled: false,
        },
      },
    },
    series: [
      {
        type: "pie",
        size: '110%',
        data: res
      },
    ],
  }
}

// 横轴柱状图 
export function setHistogramChartMore(res, num) {
  const _data = res.map(item => item.value)
  const bgData = _data.map(() => 100)
  const xData = res.map(item => item.name)
  const units = res.map(item => item.unit)
  const setFontColor = (index) => {
    return index <= num - 1 ? '#FFB628FF' : '#4071FFFF'
  }
  const _rich = {}
  _data.forEach((item, index) => {
    _rich[index] = { color: setFontColor(index) }
  });
  const getSymbolData = (data) => {
    let arr = [];
    for (var i = 0; i < data.length; i++) {
      arr.push({
        value: data[i],
        symbolPosition: "end",
      });
    }
    return arr;
  };
  return {
    grid: {
      left: "10%",
      right: "10%",
      bottom: "5%",
      top: "10%",
      containLabel: false,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "none",
      },
      formatter: function (params) {
        return (
          params[0].name +
          " : " +
          params[0].value
        );
      },
    },
    xAxis: {
      show: false,
      type: "value",
    },
    yAxis: [
      {
        type: "category",
        inverse: true,
        margin: 10,
        axisLabel: {
          textStyle: {
            fontSize: 12,
            align: 'left',
            fontFamily: 'MiSans-Normal',
          },
          padding: [0, 0, 60, 0],
          formatter: (name, index) => {
            return `{num| ${name}}`;
          },
          rich: {
            num: {
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
        data: xData,
      },
      {
        type: "category",
        inverse: true,
        axisLabel: {
          show: true,
          textStyle: {
            color: "#fff",
            size: chart.fontSize,
            align: 'right',
            padding: [0, 0, 60, 0],
          },
          formatter: (name, index) => {
            return `{${index}|${name}${units[index]}}`;
          },
          rich: _rich,
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: _data,
      },
    ],
    series: [
      {
        name: "金额",
        type: "bar",
        zlevel: 1,
        itemStyle: {
          color: function (item) {
            const { dataIndex } = item
            const color = dataIndex <= num - 1 ? '252, 175, 31' : '64, 113, 255'
            return new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              {
                offset: 0,
                color: `rgb(${color},0)`,
              },
              {
                offset: 1,
                color: `rgb(${color})`,
              },
            ])
          }
          // normal: { // 252, 175, 31

          // },
        },
        barWidth: 5,
        data: _data,
      },
      {
        name: "XXX",
        type: "pictorialBar",
        zlevel: 2,
        symbol: function (a, b, c) {
          const index = b.dataIndex
          var img = index <= num - 1 ? require('@/2d/assets/images/jiantou-huang.png') : require('@/2d/assets/images/jiantou-lan.png')
          const url = 'image://' + img
          return url
        },
        symbolSize: [50, 50],
        symbolOffset: [20, 0],
        itemStyle: {
          normal: {
            color: "#14b1eb",
          },
        },
        data: getSymbolData(_data),
      },
      {
        name: "背景",
        type: "bar",
        barWidth: 5,
        barGap: "-100%",
        data: bgData,
        itemStyle: {
          normal: {
            color: "rgba(36,47,69)",
          },
        },
      },
    ],
  };
}

// 柱状图
export function setColumnChart(res, params = {}) {
  const _obj = params
  var obj = {
    legend: _obj?.legend ?? true,
    grid: {
      top: _obj?.grid?.top || '23%',
      left: _obj?.grid?.left || '15%',
      right: _obj?.grid?.right || '5%',
      bottom: _obj?.grid?.bottom || '10%',
    },
    barW: _obj?.barW || 25,
    barImgW: _obj?.barImgW || 34,
    barImgH: _obj?.barImgH || 30,
    unit: _obj?.unit || '',
    color: _obj?.color || '',
    rotate: _obj?.rotate || 0,
  }
  var colorList = ['5,62,190', '197,129,4', '5,62,190']
  var imgMap = {
    0: require('@/2d/assets/images/buling-lan.png'),
    1: require('@/2d/assets/images/buling-huang.png')
  }
  if (obj.color === 1) {
    colorList = ['197,129,4', '5,62,190', '5,62,190']
    imgMap = {
      1: require('@/2d/assets/images/buling-lan.png'),
      0: require('@/2d/assets/images/buling-huang.png')
    }
  }
  var option = {
    legend: {
      show: obj.legend,
      top: '5%',
      icon: 'square',
      textStyle: {
        color: chart.fontColor
      },
      itemWidth: 10,
      itemHeight: 10,
    },
    tooltip: {
      trigger: 'axis',
    },
    grid: obj.grid,
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: {
          type: 'solid',
          color: '#2d4b83',
          width: '0.5'
        }
      },
      axisLabel: {
        interval: 0,
        rotate: _obj.rotate ,
        textStyle: {
          color: chart.fontColor
        },

      },
      data: res.xData
    },
    yAxis: [
      {
        name: obj.unit,
        nameTextStyle: {
          fontSize: chart.fontSize,
          color: chart.fontColor
        },
        type: 'value',
        axisLine: {
          lineStyle: {
            show: false,
            type: 'solid',
            color: 'transparent',
            width: '0.5'
          }
        },
        axisLabel: {
          textStyle: {
            color: chart.fontColor
          }
        },
        splitLine: {
          lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
            color: ['#2d4b83'],
            width: 0.5,
            type: 'solid'
          }
        }
      }
    ],
    series: []
  };
  res.data.forEach((item, index) => {
    option.series.push({
      name: item.name,
      type: 'bar',
      barWidth: obj.barW,
      label: {
        show: true,
        position: 'top',
        offset: [2, 0],
        formatter(value, index) {
          let str = '{a|} '
          return str
        },
        rich: {
          a: {
            align: 'left',
            padding: [0, 0, -38, 0],
            width: obj.barImgW,
            height: obj.barImgH,
            backgroundColor: { image: imgMap[index] },
          },
        },
      },
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
            offset: 0,
            color: `rgb(${colorList[index]},1)` // 0% 处的颜色
          }, {
            offset: 1,
            color: `rgb(${colorList[index]},0)` // 100% 处的颜色
          }]),
        }
      },
      data: item.value
    })
  })
  return option
}