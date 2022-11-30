import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state

export function setJinduChart(res, obj) {
  return {
    color: ['rgba(131,146,176)'],
    grid: {
      top: '-50%',
      bottom: 0,
      left: '0%',
      right: '0%',
    },
    xAxis: {
      show: false,
      type: 'value',
      boundaryGap: [0, 0],
    },
    yAxis: [
      {
        type: 'category',
        data: [''],
        axisLine: { show: false },
        axisTick: [
          {
            show: false,
          },
        ],
      },
    ],
    series: [
      {
        name: '金额',
        type: 'bar',
        zlevel: 1,
        itemStyle: {
          normal: {
            barBorderRadius: 10,
          },
        },
        barWidth: 10,
        barBorderRadius: 10,
        data: [res],
      },
      {
        name: '背景',
        type: 'bar',
        barWidth: 10,
        barGap: '-100%',
        data: [100],
        itemStyle: {
          normal: {
            color: 'rgba(131,146,176, 0.19)',
            borderWidth: 0,
            // borderColor: 'rgba(48, 236, 166, 1)',
            barBorderRadius: 10,
          },
        },
      },
    ],
  };
}