import * as echarts from 'echarts';
import { categoryAndChildren } from '../../../api/request'
import { message } from 'antd';
//获取商品分类
const getCategory = async () => {
  const { data: res } = await categoryAndChildren()
  if (res.code != 200) return message.error("数据获取异常")
  const categoryData = res.data?.map(item => {
    return { value: item.children?.length > 0 ? item.children?.length : 0 || 0, name: item.categoryName }
  })
  const total = res.data?.reduce((pre, item) => {
    return pre += item.children?.length > 0 ? item.children?.length : 0 || 0
  }, 0)

  const xData = res.data?.map(item => item.categoryName)
  const yData = res.data?.map(item => item.children?.length > 0 ? item.children?.length : 0 || 0)
  getInitEcharts(total, categoryData)
  getInitEchartsBar(xData, yData)
}

//初始化echarts
const getInitEcharts = (total = 0, data = []) => {
  const chartDom = document.getElementById('categoryPie');
  const myChart = echarts.init(chartDom);
  const option = {
    title: {
      text: `微商城全部商品 (${total})件商品`,
      subtext: `所有分类及商品数量`,
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: '分类名称',
        type: 'pie',
        radius: '50%',
        data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          formatter: '{b}'
        }
      }
    ]
  };
  myChart.setOption(option);
}
const getInitEchartsBar = (xData, yData) => {
  const chartDom = document.getElementById('categoryPieBar');
  const myChart = echarts.init(chartDom);
  const option = {
   
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    
    xAxis: [
      {
        type: 'category',
        name:"分类",
        nameTextStyle:{
          fontWeight:"bold"  ,
          fontSize:13
        },
        data: xData,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        name:"数量",
        nameTextStyle:{
          fontWeight:"bold" ,
          fontSize:13
        },
      }
    ],
    series: [
      {
        name: '商品总数量',
        type: 'bar',
        barWidth: '60%',
        data: yData,
        label: {
          show: true,
          position: 'top'
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#83bff6' },
            { offset: 0.5, color: '#188df0' },
            { offset: 1, color: '#188df0' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#2378f7' },
              { offset: 0.7, color: '#2378f7' },
              { offset: 1, color: '#83bff6' }
            ])
          }
        }
      },

    ]
  };
  myChart.setOption(option);
}

export const getCategoryPieData = () => {
  getCategory()
}
