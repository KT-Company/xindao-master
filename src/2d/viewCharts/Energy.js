import Highcharts from 'highcharts'
import * as echarts from 'echarts'
import store from '@/2d/store/index'
const { chart } = store.state
export function setHChart1(res) {
    return {
        chart: {
            type: "pie",
            animation: false,
            events: {
                load: function (item) {
                    var each = Highcharts.each,
                        points = this.series[0].points;
                    each(points, function (p, i) {
                        p.graphic.attr({
                            translateY: -p.shapeArgs.ran,
                        });
                        // p.graphic.side1.attr({
                        //     translateY: -p.shapeArgs.ran,
                        // });
                        // p.graphic.side2.attr({
                        //     translateY: -p.shapeArgs.ran,
                        // });
                    });
                },
            },
            options3d: {
                enabled: true,
                alpha: 70,
                beta: 0,
            },
        },
        title: null,
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
                // showInLegend: true, // 是否打开图例
                depth: 35,
                dataLabels: {
                    enabled: false,
                },
            },
        },
        series: [
            {
                type: "pie",
                name: "Browser share",
                data: res
            },
        ],
    }
}

// 火力发电量统计图---伪3d柱状图
export function setFireChart(res) {
    // 绘制左侧面
    const wid = 10;
    const w1 = Math.sin(Math.PI / 6) * wid; //4
    const w2 = Math.sin(Math.PI / 3) * wid; // 6.8
    const snapHeight = wid / 2;
    const CubeLeft = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint;
            const c0 = [shape.x, shape.y];
            const c1 = [shape.x - w2, shape.y];
            const c2 = [shape.x - w2, xAxisPoint[1]];
            const c3 = [shape.x, xAxisPoint[1]];
            ctx
                .moveTo(c0[0], c0[1])
                .lineTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .closePath();
        },
    });
    // 绘制右侧面
    const CubeRight = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            const xAxisPoint = shape.xAxisPoint;
            const c1 = [shape.x, shape.y];
            const c2 = [shape.x, xAxisPoint[1]];
            const c3 = [shape.x + w1, xAxisPoint[1] - w2 + snapHeight];
            const c4 = [shape.x + w1, shape.y - w2 + snapHeight];
            ctx
                .moveTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .lineTo(c4[0], c4[1])
                .closePath();
        },
    });
    // 绘制顶面
    const CubeTop = echarts.graphic.extendShape({
        shape: {
            x: 0,
            y: 0,
        },
        buildPath: function (ctx, shape) {
            //
            const c1 = [shape.x, shape.y];
            const c2 = [shape.x + w1, shape.y - w2 + snapHeight]; //右点
            const c3 = [shape.x - w2 + w1, shape.y - w2 + snapHeight];
            const c4 = [shape.x - w2, shape.y];
            ctx
                .moveTo(c1[0], c1[1])
                .lineTo(c2[0], c2[1])
                .lineTo(c3[0], c3[1])
                .lineTo(c4[0], c4[1])
                .closePath();
        },
    });
    // 三个面图形
    echarts.graphic.registerShape("CubeLeft", CubeLeft);
    echarts.graphic.registerShape("CubeRight", CubeRight);
    echarts.graphic.registerShape("CubeTop", CubeTop);
    const p1 = -8, p2 = 8
    let xData = res.xData;
    return {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
            // backgroundColor: "rgba(9, 24, 48, 0.5)",
            // borderColor: "rgba(75, 253, 238, 0.4)",
            // textStyle: {
            //     color: "#CFE3FC",
            // },
            // borderWidth: 1,
        },
        grid: {
            top: "20%",
            left: "7%",
            bottom: "5%",
            right: "5%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: xData,
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
        dataZoom: {
            type: 'slider',
            show: false,
            handleSize: 32, // 两边的按钮大小
            startValue: 0,  // 重点在这   -- 开始的值
            endValue: 6   // 重点在这   -- 结束的值
        },
        yAxis: {
            name: "单位：亿千瓦小时",
            type: "value",
            nameTextStyle: {
                color: chart.fontColor,
                fontSize: chart.fontSize,
            },
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
            nameGap: 20,
        },
        legend: {
            show: true,
            right: "7%",
            top: '5%',
            itemWidth: 20,
            itemHeight: 20,
            data: [
                { icon: 'image://' + require('@/2d/assets/images/zft-lan.png'), name: res.data[0].name },
                { icon: 'image://' + require('@/2d/assets/images/zft-ju.png'), name: res.data[1].name },
            ],
            textStyle: {
                color: chart.fontColor,
            },
        },
        series: [
            {
                name: res.data[0].name,
                stack: "1",
                type: "custom",
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)]);
                    location[0] = location[0] + wid * 0;
                    const xlocation = api.coord([api.value(0), 0]);
                    xlocation[0] = xlocation[0] + wid * 0;
                    return {
                        type: "group",
                        children: [
                            {
                                type: "CubeLeft",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0] + p1,
                                    y: location[1] + p1,
                                    xAxisPoint: xlocation,
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: '#17c6ffFF',
                                        },
                                        {
                                            offset: 1,
                                            color: '#2890ec4F',
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeRight",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0] + p1,
                                    y: location[1] + p1,
                                    xAxisPoint: xlocation,
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#17c6ff0D",
                                        },
                                        {
                                            offset: 1,
                                            color: "#2890ecFF",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeTop",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0] + p1,
                                    y: location[1] + p1,
                                    xAxisPoint: xlocation,
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#2890ecFF",
                                        },
                                        {
                                            offset: 1,
                                            color: "#17c6ffFF",
                                        },
                                    ]),
                                },
                            },
                        ],
                    };
                },
                color: "rgba(9,179,249)",
                data: res.data[0].value,
            },
            {
                name: res.data[1].name,
                stack: "2",
                type: "custom",
                renderItem: (params, api) => {
                    const location = api.coord([api.value(0), api.value(1)]);
                    location[0] = location[0] + wid * 0;
                    const xlocation = api.coord([api.value(0), 0]);
                    xlocation[0] = xlocation[0] + wid * 0;
                    return {
                        type: "group",
                        children: [
                            {
                                type: "CubeLeft",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0] + p2,
                                    y: location[1] + p2,
                                    xAxisPoint: xlocation,
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#ff841f80",
                                        },
                                        {
                                            offset: 1,
                                            color: "#ffb64e80",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeRight",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0] + p2,
                                    y: location[1] + p2,
                                    xAxisPoint: xlocation,
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "#ffb64e80",
                                        },
                                        {
                                            offset: 1,
                                            color: "#ff841f80",
                                        },
                                    ]),
                                },
                            },
                            {
                                type: "CubeTop",
                                shape: {
                                    api,
                                    xValue: api.value(0),
                                    yValue: api.value(1),
                                    x: location[0] + p2,
                                    y: location[1] + p2,
                                    xAxisPoint: xlocation,
                                },
                                style: {
                                    fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                        {
                                            offset: 0,
                                            color: "rgba(255,133,28)",
                                        },
                                        {
                                            offset: 1,
                                            color: "rgba(255,133,28)",
                                        },
                                    ]),
                                },
                            },
                        ],
                    };
                },
                color: "rgba(255,133,28)",
                data: res.data[1].value,
            },
        ],
    };




}

// 火力发电量统计图 备用 
export function setFireChartB(res) {
    let colorList = ["#c36dff", "#3bb3ff","#7d89ff",  "#ff9344", "#f3c304", "#36d97b", "#12d5ce", "#f2956f", "#f2d66f", "#cdf26f", "#8cf26f", "#6ff294"]
    var option = {
        color: colorList,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "shadow",
            },
        },
        grid: {
            top: "20%",
            left: "7%",
            bottom: "5%",
            right: "5%",
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
            name: "单位：亿千瓦小时",
            type: "value",
            nameTextStyle: {
                color: chart.fontColor,
                fontSize: chart.fontSize,
            },
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
            nameGap: 20,
        },
        legend: {
            show: true,
            right: "7%",
            top: '5%',
            // itemWidth: 20,
            // itemHeight: 20,
            // data: [
            //     { icon: 'image://' + require('@/2d/assets/images/zft-lan.png'), name: res.data[0].name },
            //     { icon: 'image://' + require('@/2d/assets/images/zft-ju.png'), name: res.data[1].name },
            // ],
            textStyle: {
                color: chart.fontColor,
            },
        },
        series: function () {
            let series = []
            for (let i = 0; i < res.data.length; i++) {
                let serie = {
                    "name": res.data[i].name,
                    "type": "bar",
                    "barWidth": "20%",
                    "data": res.data[i].value
                }
                series.push(serie)
            }
            return series
        }()
    }

    return option
}



// 全国碳排放---1
export function setCarbonChart1(res) {
    return {
        grid: {
            left: "5%",
            right: "5%",
            top: "35%",
            bottom: "5%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            show: true,
            x: "center",
            top: '7%',
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: chart.fontColor,
            },
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLabel: {
                    color: chart.fontColor,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#397cbc",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#195384",
                    },
                },
                data: res.xData,
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "单位：吨",
                nameTextStyle: {
                    color: chart.fontColor
                },
                axisLabel: {
                    color: chart.fontColor
                },
                axisLine: {
                    lineStyle: {
                        color: "#27b4c2",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#11366e",
                    },
                },
            },
            {
                type: "value",
                name: "单位：百万吨",
                nameTextStyle: {
                    color: chart.fontColor
                },
                axisLabel: {
                    color: chart.fontColor
                },
                axisLine: {
                    lineStyle: {
                        color: "#186afe",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#11366e",
                    },
                },
            },
        ],
        series: [
            {
                name: "全国人均碳排放量",
                yAxisIndex: 0,
                type: "line",
                stack: "总量",
                symbol: "circle",
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: "rgba(0,235,224)",
                        lineStyle: {
                            color: "rgba(0,235,224)",
                            width: 1,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(0,235,224,0)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,235,224)",
                                },
                            ]),
                        },
                    },
                },
                data: res.data[0].value,
            },
            {
                name: "全国碳排放总量",
                yAxisIndex: 1,
                type: "line",
                stack: "总量",
                symbol: "circle",
                symbolSize: 8,
                itemStyle: {
                    normal: {
                        color: "rgba(0,181,235)",
                        lineStyle: {
                            color: "rgba(0,181,235)",
                            width: 1,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(0,181,235,0)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,181,235)",
                                },
                            ]),
                        },
                    },
                },
                data: res.data[1].value,
            },
        ],
    };

}

// 全国碳排放---2
export function setCarbonChart2(res) {
    return {
        grid: {
            left: "5%",
            right: "5%",
            top: "35%",
            bottom: "5%",
            containLabel: true,
        },
        tooltip: {
            trigger: "axis",
        },
        legend: {
            show: true,
            x: "center",
            top: '7%',
            icon: "circle",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: chart.fontColor,
            },
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                axisLabel: {
                    color: chart.fontColor,
                },
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: "#397cbc",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#195384",
                    },
                },
                data: res.xData,
            },
        ],
        yAxis: [
            {
                type: "value",
                name: "单位：吨",
                nameTextStyle: {
                    color: chart.fontColor,
                },
                axisLabel: {
                    color: chart.fontColor,
                },
                axisLine: {
                    lineStyle: {
                        color: "#27b4c2",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#11366e",
                    },
                },
            },
            {
                type: "value",
                name: "单位：百万吨",
                nameTextStyle: {
                    color: chart.fontColor,
                },
                axisLabel: {
                    color: chart.fontColor,
                },
                axisLine: {
                    lineStyle: {
                        color: "#186afe",
                    },
                },
                axisTick: {
                    show: false,
                },
                splitLine: {
                    show: false,
                    lineStyle: {
                        color: "#11366e",
                    },
                },
            },
        ],
        series: [
            {
                name: "北京人均碳排放量",
                yAxisIndex: 0,
                type: "line",
                stack: "总量",
                smooth: true,
                symbol: "circle",
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 3,
                    },
                },
                itemStyle: {
                    normal: {
                        color: "rgba(0,155,249)",
                        lineStyle: {
                            color: "rgba(0,155,249)",
                            width: 1,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(0,155,249,0)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(0,155,249)",
                                },
                            ]),
                        },
                    },
                },
                data: res.data[0].value,
            },
            {
                name: "北京碳排放总量",
                type: "line",
                stack: "总量",
                yAxisIndex: 1,
                symbol: "circle",
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 3,
                    },
                },
                itemStyle: {
                    normal: {
                        color: "rgba(36,185,103)",
                        lineStyle: {
                            color: "rgba(36,185,103)",
                            width: 1,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                                {
                                    offset: 0,
                                    color: "rgba(36,185,103,0)",
                                },
                                {
                                    offset: 1,
                                    color: "rgba(36,185,103)",
                                },
                            ]),
                        },
                    },
                },
                data: res.data[1].value,
            },
        ],
    };

}