import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state


// 柱状图&折线
export function setZhuLineChart(res, obj) {
  var option = {
    color: ['rgba(223,153,92)', 'rgba(202,202,206)'],
    grid: {
      top: "28%",
      left: '0%',
      right: "0%",
      bottom: "0%",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",

    },
    legend: {
      orient: 'horizontal',
      // align: 'center',
      itemWidth: 15,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
        color: chart.fontColor,
      },
      // itemGap: 50,
      // itemHeight: 10,
    },
    xAxis: {
      data: res.xData,
      axisLine: {
        show: true, //隐藏X轴轴线
        lineStyle: {
          color: '#85B1B4'
        }
      },
      axisTick: {
        show: false //隐藏X轴刻度
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize,
        }
      },
    },
    yAxis: [{
      type: "value",
      name: obj?.unit ? obj.unit[0] : '',
      nameTextStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(33,35,98,1)'
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#85B1B4'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: chart.fontSize,
          color: chart.fontColor
        }
      },
    },
    {
      type: "value",
      name: obj?.unit ? obj.unit[1] : '',
      nameTextStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize
      },
      splitLine: {
        show: true,
        show: false,
        lineStyle: {
          color: chart.xLine
        }
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false,
        lineStyle: {
          color: '#85B1B4'
        }
      },
      axisLabel: {
        show: true,
        textStyle: {
          fontSize: chart.fontSize,
          color: chart.fontColor
        }
      },
    },

    ],
    series: [
      {
        name: res.data[0].name,
        type: "bar",
        barWidth: '30%',
        yAxisIndex: 0,
        showBackground: false,
        label: {
          normal: {
            show: false,
            textStyle: {
              color: '#FFF'
            },

          }
        },
        data: res.data[0].value
      }, {
        name: res.data[1].name,
        type: "line",
        yAxisIndex: 1,
        smooth: false, //平滑曲线显示
        showAllSymbol: true, //显示所有图形。
        symbol: "emptyCircle", //标记的图形为实心圆
        symbolSize: 5, //标记的大小
        data: res.data[1].value
      },
    ]
  };
  return option
}

// 渐变折线图
export function setZhexianChart(res, obj) {
  let colorList = ['79,110,224',]
  let _colorList = obj?.color ? obj.color.map(item => colorList[item]) : colorList
  let option = {
    tooltip: {
      trigger: 'axis',
    },
    //  legend: {
    //      align: "left",
    //      right: '10%',
    //      top:'10%',
    //      textStyle:{
    //          color:'#F3FFFF',
    //          fontSize:14
    //      },
    //      // icon:'rect',
    //      itemGap:20,
    //      itemWidth:20,
    //      itemHeight:12,
    //      data: [
    //          {
    //              name: '总案件'
    //          },
    //          {
    //              name: '民商事案件'
    //          }
    //      ]
    //  },
    grid: {
      top: '10%',
      left: '0%',
      right: '0%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: { //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: chart.xLine
        },
      },
      axisLabel: { //坐标轴刻度标签的相关设置
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize
        },
        // formatter: function (data) {
        //   return data
        // }
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: res.xData
    }],
    yAxis: [{
      //  name: '单位：件',
      nameTextStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize,
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
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize
        },
      },
      axisTick: {
        show: false,
      },
    }],
    series: (() => {
      let _series = []
      res.data.forEach((item, index) => {
        _series.push({
          name: item.name,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 0,
          smooth: false,
          lineStyle: {
            normal: {
              width: 2,
              color: `rgba(${_colorList[index]},1)`, // 线条颜色
            },
            borderColor: `rgba(${_colorList[index]},.4)`,
          },
          itemStyle: {
            color: `rgba(${_colorList[index]},1)`,
            borderColor: "#646ace",
            borderWidth: 2

          },
          areaStyle: { //区域填充样式
            normal: {
              //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: `rgba(${_colorList[index]},.3)`
              },
              {
                offset: 1,
                color: `rgba(${_colorList[index]},0)`
              }
              ], false),
              shadowColor: `rgba(${_colorList[index]},.5)`, //阴影颜色
              shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: item.value
        })
      });

      return _series
    })()
  };
  return option
}

// 折线图
export function setZhexiantu(res, obj) {
  let colorList = ['rgba(255,159,64)', 'rgba(92,115,230)']
  let _colorList = obj?.color ? obj.color.map(item => colorList[item]) : colorList
  let option = {
    color: _colorList,
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: '0%',
      textStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize
      },
      icon: 'rect',
      orient: 'horizontal',
      // align: 'center',
      itemGap: 30,
      itemWidth: 8,
      itemHeight: 8,
    },
    grid: {
      top: '20%',
      left: '0%',
      right: '5%',
      bottom: '0%',
      containLabel: true
    },
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      axisLine: { //坐标轴轴线相关设置。数学上的x轴
        show: true,
        lineStyle: {
          color: chart.xLine
        },
      },
      axisLabel: { //坐标轴刻度标签的相关设置
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize
        },
        // formatter: function (data) {
        //   return data
        // }
      },
      splitLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      data: res.xData
    }],
    yAxis: [{
      //  name: '单位：件',
      nameTextStyle: {
        color: chart.fontColor,
        fontSize: chart.fontSize,
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
      axisLine: {
        show: false,
      },
      axisLabel: {
        show: true,
        textStyle: {
          color: chart.fontColor,
          fontSize: chart.fontSize
        },
      },
      axisTick: {
        show: false,
      },
    }],
    series: (() => {
      let _series = []
      res.data.forEach((item, index) => {
        _series.push({
          name: item.name,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 0,
          smooth: false,
          data: item.value
        })
      });
      return _series
    })()
  };

  return option
}