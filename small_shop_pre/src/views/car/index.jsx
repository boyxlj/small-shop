import React, { useState, useEffect } from 'react'
import { Button, Popconfirm, message, Table, InputNumber, Result, Input } from 'antd';
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons';
import UpdateTitle from '../../components/updateTitle'
import { selectCar, clearCar, submitOrder, updateCarNum } from "../../api/request"
import style from "./style/index.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Spin } from 'antd';
import { setCarTotal, setRemoveCar } from '../../store/reducer/global';
export default function Car() {
  const dispatch = useDispatch()
  const columns = [
    {
      title: '商品图片',
      dataIndex: 'titleImg',
      width: 200,
      render: (a,b) => (
        <div className={style.img}>
        <img className={style.titleImg} src={a} onClick={() => clickDetail(b.detailId)} alt="" />
        <span className={style.tag}>{b.tag}</span>
        </div>
      ),
    },
    {
      title: '商品名称',
      dataIndex: 'title',
      width: 360,
      render: (a, b) => (<p className={style.title} onClick={() => clickDetail(b.detailId)}>{a}</p>),
    },
    {
      title: '单价',
      width: 140,
      dataIndex: 'price',

    },
    {
      title: '数量',
      dataIndex: 'num',
      width: 120,
      render: (a, b) => (<InputNumber  type='number' value={a}  min={1} max={6} onChange={(e) => changeNumber(e, b.carId)} ></InputNumber>),

    },
    {
      title: '小计',
      width: 180,
      dataIndex: 'price',
      render: (a, b) => (
        <p className={style.xiaoji} >{Number(b.num) * Number(b.price)}</p>
      )
    },
    {
      title: '操作',
      render: (a, b) => (
        <div>
          <Popconfirm
            title="确认删除所选商品吗?"
            onConfirm={() => remove(b.carId)}
            okText="是的"
            cancelText="再想想"
          >
            <p className={style.deletes}>
              <DeleteOutlined />
            </p>
          </Popconfirm>
        </div>
      )
    },
  ]
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [payTotal, setPayTotal] = useState(0);
  const [selectedAll, setSelectedAll] = useState([]);
  const [disableNum, setDisableNum] = useState(false);
  // const [disableNum, setDisableNum] = useState(false);
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true)
  const userId = useSelector(state => state.userInfo.userId)
  const total = carData.filter(item => selectedRowKeys.includes(item.carId))
    .reduce((total, item) => total += Number(item.num) * Number(item.price), 0)
  useEffect(() => {
    document.documentElement.scrollTop = 0
    setLoading(true)
    getCarData()
    dispatch(setCarTotal(userId))
  }, [])


  //修改选购数量
  const changeNumber = async (e, carId) => {
    setDisableNum(true)
    const obj = { userId, num: e, carId }
    const { data: res } = await updateCarNum(obj).finally(() => setDisableNum(false))
    if (res.code != 200) return message.error("数量修改失败")
    getCarData()
    setPayTotal(total)
  }
  //结算
  const jiesuan = async () => {
    if (!selectedRowKeys.length) return message.warning("请至少选择一种商品")
    const detailIdList = selectedAll.map(item => item.detailId)
    const list = carData.filter(item => {
      return detailIdList.includes(item.detailId)
    }).map(item => ({ detailId: item.detailId, num: item.num, price: item.price, carId: item.carId, singleTotalPrice: Number(item.price) * Number(item.num) }))
    const obj = {
      detailId: list,
      userId,
      orderNumber: new Date().getTime()
    }
    dispatch(setRemoveCar(list.map(item => item.carId)))
    const { data: res } = await submitOrder(obj)
    if (res.code != 200) return message.error("订单提交失败")
    getCarData()
    setPayTotal(total)
    dispatch(setCarTotal(userId))
    navigate(`/checkout?orderNumber=${res.orderNumber}`)
  }

  //移除购物车
  const remove = async (value) => {
    const { data: res } = await clearCar(userId, value)
    if (res.code != 200) return message.error("移除失败")
    message.success("已从购物车中移除")
    dispatch(setCarTotal(userId))
    getCarData()
    setPayTotal(total)
  }

  //点击名称跳转详情页
  const clickDetail = (detailId) => {
    navigate(`/details?detailId=${detailId}`)
  }
  //获取购物车的数据
  const getCarData = async () => {
    const { data: res } = await selectCar(userId).finally(()=>{
      setTimeout(() => {
        setLoading(false)
      }, 300);
    })
    if (res.code != 200) return setCarData([])
    setCarData(res.data)
  }
  //清空购物车
  const clearEmpty = async () => {
    const { data: res } = await clearCar(userId, 0)
    if (res.code != 200) return message.error("清空失败")
    message.success("清空成功")
    dispatch(setCarTotal(userId))
    getCarData()
    setPayTotal(total)
  }
  const onSelectChange = (newSelectedRowKeys, selectedRows) => {
    const total = selectedRows.reduce((total, item) => { return total += Number(item.price) * Number(item.num) }, 0)
    setPayTotal(total)
    const res = selectedRows.map(item => ({ detailId: item.detailId, carId: item.carId }))
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedAll(res)
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div className={style.box}>
      <div className={style.car}>
        <UpdateTitle title="购物车" />
        <h1 >我的购物车</h1>
        {loading &&(
        <div className={style.loading} style={{padding:loading?'220px 0':'0'}}>
         <Spin size='large' />
      </div>
      )}
        {(!loading && carData.length > 0) && <Table rowSelection={rowSelection} columns={columns} rowKey="carId" dataSource={carData} />}
      </div>
     
      {(!loading && carData.length > 0) && (
        <div className={style.sticky}>
          <div className={style.left}>
            <span onClick={() => navigate("/goods")}>继续购物</span>
            <span>已选择<b>{selectedRowKeys.length}</b>种商品</span>
            <Popconfirm
              title="确认清空购物车吗?"
              onConfirm={() => clearEmpty()}
              okText="是的"
              cancelText="再想想"
            >
              <span><DeleteOutlined className={style.clearIcon} /> 清空购物车</span>
            </Popconfirm>
          </div>
          <div className={style.right}>
            <div className={style.price}>
              <span>合计:</span>
              <span>{payTotal}</span>
              <span>元</span>
            </div>
            <div className={style.jiesuan} onClick={jiesuan}>去结算</div>
          </div>
        </div>
      )}
      {(!loading && !carData.length > 0) && (
        <Result
          className={style.results}
          icon={<SmileOutlined />}
          title="嗨! 您的购物车还是空的！"
          extra={<Button type="primary" onClick={() => navigate("/goods")}>马上去购物</Button>}
        />
      )}
    </div>
  )
}
