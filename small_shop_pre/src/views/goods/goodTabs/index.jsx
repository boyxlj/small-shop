import { Tabs } from 'antd';
import React, { useState, useEffect } from 'react';
const { TabPane } = Tabs;
import { useNavigate,useLocation } from 'react-router-dom';
import { getCategory } from "../../../api/request"
import { setPageOn } from '../store/pageNation';
import { useDispatch } from 'react-redux';
export default function GoodTabs(props) {
  const dispatch = useDispatch()
  const { getDetailId,disabledTabs } = props
  const [categoryList, setCategoryList] = useState([])
  const navigate = useNavigate()
  const location = useLocation()
  const activeKey = location.search.split("=")[1]
  useEffect(() => {
    getCategoryData()
  }, [])
  //查询所有分类
  const getCategoryData = async () => {
    const { data: res } = await getCategory("category")
    setCategoryList(res.data)
  }
  const onChange = (e) => {
    if(!e) return navigate(`/goods`)
    navigate(`/goods?category=${e}`)
    dispatch(setPageOn(1))
  };
  return (
    <Tabs defaultActiveKey="1" activeKey={activeKey} type="card" onChange={onChange} size="large">
      <TabPane disabled={disabledTabs}  key="" tab="全部商品" ></TabPane>
      {categoryList.map(item => (
        <TabPane disabled={disabledTabs}  key={item.detailId} tab={item.categoryName} ></TabPane>
      ))}
    </Tabs>

  );
};

