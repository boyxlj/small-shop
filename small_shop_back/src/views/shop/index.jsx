import React from 'react'
import ShopTable from './components/shopTable'
import ShopDialog from './components/dialog'
import { getShopList,categoryList } from "../../api/request"
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Select } from "antd"
import style from "./style/index.module.scss"
import { useNavigate } from "react-router-dom"
const { Option } = Select;
export default function Shop() {
  const navigate = useNavigate()
  const [shopData, setShopData] = useState([])
  const [pageOn, setPageOn] = useState(1)
  const [type, setType] = useState(0)
  const [categoryData, setCategoryData] = useState([])
  const [loading,setLoading] =useState(false) 

  const handleChange = (value) => {
    sessionStorage.removeItem("shopListPage")
    setPageOn(1)
    setType(value)
  };

  useEffect(() => {
    setLoading(true)
    const storePageOn = sessionStorage.getItem("shopListPage")
    if (storePageOn) {
      setPageOn(storePageOn)
    } else {
      setPageOn(1)
    }
    getShopData()
    getCategory()
  }, [type])

  //获取所有商品
  const getShopData = async () => {
    setLoading(true)
    const { data: res } = await getShopList(type).finally(()=>{
      setLoading(false)
  })
    if (res.code != 200) return setShopData([])
    setShopData(res.data)
  }
  //查询商品分类
  const getCategory = async () => {
    const { data: res } = await categoryList()
    if (res.code != 200) return setCategoryData([])
    setCategoryData(res.data)
  }

  //添加或者修改后更新数据
  const reLoad = () => {
    getShopData()

  }

  //点前所在的页面
  const getPageOn = (value) => {
    sessionStorage.setItem("shopListPage", value)
    setPageOn(value)
  }
  return (
    <div>
      <div className={style.add}>
        <Button onClick={() => navigate("/editor")} type='primary'>添加商品</Button>
        <Select
          defaultValue="0"
          style={{
            width: 120,
          }}
          onChange={handleChange}
        >
          <Option value="0">全部</Option>
          {categoryData?.map(item=>(
            <Option key={item.detailId} value={item.detailId}>{item.categoryName}</Option>
          ))}

        </Select>
      </div>
      <ShopTable loading={loading} getPageOn={(value) => getPageOn(value)} pageOn={pageOn} reLoad={reLoad} shopData={shopData} />
      <ShopDialog reLoad={reLoad} />
    </div>
  )
}
