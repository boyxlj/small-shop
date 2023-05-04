import React from 'react'
import { Button, Table, message, Popconfirm } from 'antd';
import style from "./style/index.module.scss"
import { getDate } from "../../../../utils/time"
import { useDispatch, } from 'react-redux';
import { changeIsShow } from "../../store"
import { deleteCategory } from "../../../../api/request"
import {authControl} from "../../../../utils/authControl"
export default function CategoryTable(props) {
  const { categoryData, reLoad,loading } = props
  const dispatch = useDispatch()
  const columns = [
    {
      title: '序号',
      dataIndex: 'detailId',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '分类名称',
      dataIndex: 'categoryName',
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      render: (value) => getDate(value)
    },
    {
      title: '操作',
      render: (_, record) => (
        <>
          <Button type="text" onClick={() => editor(record.detailId)} className={style.editor}>编辑</Button>
          <Popconfirm
            title="你确定将永久删除该分类吗?"
            onConfirm={() => deletes(record.detailId)}
            okText="是的"
            cancelText="再想想"
          >
            <Button type="text"  className={style.delete}>删除</Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  //编辑按钮
  const editor = (detailId) => {
    if(!authControl()) return 
    dispatch(changeIsShow({ isShow: true, detailId }))
  }
  //删除按钮
  const deletes = async (detailId) => {
    if(!authControl()) return 
    const { data: res } = await deleteCategory(detailId)
    if (res.code != 200) return message.error("删除失败")
    reLoad()
    message.success("删除成功")
  }
  return (
    <Table loading={loading} columns={columns} rowKey="detailId" dataSource={categoryData} />
  )
}
