import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

// 圆圈 --》区域EGP
export function setYuanChart(res) {
  var option = {
    title: [
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
          fontSize: chart.fontSize + 5,
          color: '#FFFFFF',
          fontFamily: 'DINAlternate-Bold, DINAlternate',
          foontWeight: '600',
        },
      },
    ],
    polar: {
      radius: ['90%', '70%'],
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
                color: 'rgba(213,110,42)',
              },
              {
                offset: 1,
                color: 'rgba(106,82,85)',
              },
            ]),
          },
        },
      },
    ],
  };
  return option
}

// 柱状图 --》增加值
export function setZhuChart(res, obj) {
  let colorList = ['rgba(92, 115, 230)']
  let _colorList = obj?.color ? obj.color.map(item => colorList[item]) : colorList
  var option = {
    color: _colorList,
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    grid: {
      top: "15%",
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
      // nameGap: -250,  // 通过你生成的图表来调整
      // nameLocation: "start", // y轴name处于y轴的什么位置
      max: function (value) {
        return parseInt(value.max * 1.2);
      },
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
          color: "rgba(35,51,81)",
          opacity: 0.2,
          width: 1,
        },
      },
    },
    // legend: {
    //   show: true,
    //   right: "7%",
    //   top: '5%',
    //   // itemWidth: 20,
    //   // itemHeight: 20,
    //   // data: [
    //   //     { icon: 'image://' + require('@/2d/assets/images/zft-lan.png'), name: res.data[0].name },
    //   //     { icon: 'image://' + require('@/2d/assets/images/zft-ju.png'), name: res.data[1].name },
    //   // ],
    //   textStyle: {
    //     color: chart.fontColor,
    //   },
    // },
    series: function () {
      let series = []
      for (let i = 0; i < res.data.length; i++) {
        let serie = {
          "name": res.data[i].name,
          "type": "bar",
          "barWidth": "35%",
          "data": res.data[i].value
        }
        series.push(serie)
      }
      return series
    }()
  }

  return option
}

// 曲线图 --》消费
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
          color: chart.xLine
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

// 饼图 --》区域资产结构
export function setBingChart(res) {
  var colorList = ['rgba(72,124,223)', 'rgba(72,176,162)', 'rgba(112,100,188)'];
  var option = {
    color: colorList,
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      right: '10%',
      top: 'middle',
      itemWidth: 13,
      itemHeight: 13,
      icon: 'circle',
      itemGap: 20,
      formatter(name) {
        let result = res.find((item) => item.name == name);
        return `{a|${result.name}} {b|${result.value}}`;
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
            fontSize: chart.fontSize,
            color: chart.fontColor,
            padding: [0, 6, 0, 6],
          },
        },
      },
    },
    series: [
      // 展示层
      {
        type: 'pie',
        center: ['25%', '50%'],
        radius: ['45%', '85%'],
        itemStyle: {
          borderWidth: 2, //描边线宽
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

// *************************

export function setStackedChart(res) {
  var option = {
    color: ['rgba(0,214,78)', '#F4A419', '#3CBE89',],
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
