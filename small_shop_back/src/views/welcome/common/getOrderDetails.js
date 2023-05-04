import * as echarts from 'echarts';
import { selectAllOrder,carData } from '../../../api/request'
import { message } from 'antd';
//获取商品分类
const getOrder = async () => {
  const { data: res } = await selectAllOrder()
  const {data:res2} = await carData()
  if (res.code != 200) return message.error("数据获取异常")
  const awaitCar = res.data?.filter(item =>item.type=='1' )?.length || 0//加入购物车
  const awaitPay = res.data?.filter(item =>item.type=='2' )?.length  || 0 //待付款
  const awaitSend = res.data?.filter(item =>item.type=='3' )?.length || 0 //待发货

  getInitEcharts(res2?.total,awaitPay,awaitSend)
}

//初始化echarts
const getInitEcharts = (carTotal,awaitPay,awaitSend) => {
  const chartDom = document.getElementById('orderPie');
  const myChart = echarts.init(chartDom);
  const option = {
    
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: carTotal, name: '已在购物车' },
          { value: awaitPay, name: '待付款' },
          { value: awaitSend, name: '待发货' },
        ]
      }
    ]
  };
  myChart.setOption(option);
}


export const getOrderData = ()=>{
  getOrder()
}
