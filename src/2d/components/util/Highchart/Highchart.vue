<script setup>
//按需导入需要用到的 vue函数 和 echarts
import { ref, defineProps, watch, onMounted, reactive } from "vue";
//获取 dom 和 父组件数据 并定义"myChart"用于初始化图表
import Highcharts from "./highcharts";
import Highcharts3D from './highcharts-3d';

const props = defineProps({
  option: Object,
  uid: String,
});
watch(
  () => props.option,
  () => Highcharts.chart(props.uid, props.option),
  { deep: true }
);

Highcharts3D(Highcharts);
onMounted(function () {
  var each = Highcharts.each,
    round = Math.round,
    cos = Math.cos,
    sin = Math.sin,
    deg2rad = Math.deg2rad;
  Highcharts.wrap(
    Highcharts.seriesTypes.pie.prototype,
    "translate",
    function (proceed) {
      proceed.apply(this, [].slice.call(arguments, 1));
      // Do not do this if the chart is not 3D
      if (!this.chart.is3d()) {
        return;
      }
      var series = this,
        chart = series.chart,
        options = chart.options,
        seriesOptions = series.options,
        depth = seriesOptions.depth || 0,
        options3d = options.chart.options3d,
        alpha = options3d.alpha,
        beta = options3d.beta,
        z = seriesOptions.stacking
          ? (seriesOptions.stack || 0) * depth
          : series._i * depth;
      z += depth / 2;
      if (seriesOptions.grouping !== false) {
        z = 0;
      }
      each(series.data, function (point) {
        var shapeArgs = point.shapeArgs,
          angle;
        point.shapeType = "arc3d";
        var ran = point.options.h;
        shapeArgs.z = z;
        shapeArgs.depth = depth * 0.75 + ran;
        shapeArgs.alpha = alpha;
        shapeArgs.beta = beta;
        shapeArgs.center = series.center;
        shapeArgs.ran = ran;
        angle = (shapeArgs.end + shapeArgs.start) / 2;
        point.slicedTranslation = {
          translateX: round(
            cos(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
          ),
          translateY: round(
            sin(angle) * seriesOptions.slicedOffset * cos(alpha * deg2rad)
          ),
        };
      });
    }
  );
  (function (H) {
    H.wrap(Highcharts.SVGRenderer.prototype, "arc3dPath", function (proceed) {
      // Run original proceed method
      var ret = proceed.apply(this, [].slice.call(arguments, 1));
      ret.zTop = (ret.zOut + 0.5) / 100;
      return ret;
    });
  })(Highcharts);
  Highcharts.chart(props.uid, props.option);
});
</script>

<template>
  <div :id="props.uid"></div>
</template>

<style lang="less" scoped>
.hechart {
  width: 100%;
  height: 100%;
}
</style>