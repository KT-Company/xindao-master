import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

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
      bottom: "0%",
      top: "5%",
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
          padding: [0, 0, 30, 0],
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
            padding: [0, 0, 30, 0],
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
                color: `rgba(${color},0)`,
              },
              {
                offset: 1,
                color: `rgba(${color})`,
              },
            ])
          }
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
        symbolSize: [30, 30],
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