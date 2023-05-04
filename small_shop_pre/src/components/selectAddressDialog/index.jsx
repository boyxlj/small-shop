import { useDispatch, useSelector } from "react-redux"
import { setSelectAddress, selectAddressAlls } from '../../store/reducer/address';
import style from "./style/index.module.scss"
import { Tag, Radio, Modal, message, Popconfirm } from 'antd';
import { setDefaultAddress, removeAddress } from "../../api/request"
import { useState } from "react";
import { DeleteOutlined } from '@ant-design/icons';
export default function SelectAddressDialog() {
  const dispatch = useDispatch()
  const [isDelete, setIsDelete] = useState(false)
  const selectAddressDialog = useSelector(state => state.address.selectAddressDialog)
  const allAddress = useSelector(state => state.address.allAddress)
  const handleCancel = () => {
    dispatch(setSelectAddress(false))
  };
  const radioChange = async (e) => {
    if (isDelete) {
      return
    }
    const { data: res } = await setDefaultAddress(e.target.value)
    if (res.code != 200) return
    dispatch(selectAddressAlls())
    dispatch(setSelectAddress(false))
  }

  //删除收货地址
  const deleteAddress = async (e, addressId) => {
    e.stopPropagation()
    setIsDelete(true)
    const { data: res } = await removeAddress(addressId)
    if (res.code != 200) return message.error('删除失败');
    message.success('删除成功');
    dispatch(selectAddressAlls())
    setIsDelete(false)

  };

  const cancel = (e) => {
    setIsDelete(false)
  };
  return (
    <Modal title="选择收货地址" width={560} style={{ textAlign: "center" }} keyboard={false} maskClosable={false} footer={null} visible={selectAddressDialog} onCancel={handleCancel}>
      <div className={style.boxx}>
        {!allAddress && <h1>您还没有添加收货地址</h1>}
        {allAddress?.length > 0 && allAddress?.map(item => (
          <Radio.Group key={item.addressId} onChange={radioChange} className={style.radio} value={item.type == '1'} size="large">
            <Radio.Button className={style.items} value={item.addressId}>
              <div className={style.itemBox}>
                <div className={style.name}>
                  <div className={style.nameLeft}>
                    <span className={style.default}>
                      {item.type == "1" && <Tag color="#CF0A2C" className={style.tag}>默认</Tag>}</span>
                    <span>收货人:</span>
                    <span className={style.nameDetails}>
                      {item.name}
                      </span>
                  </div>
                  <div className={style.nameRight}>
                    <Popconfirm
                      title="您确定要永久删除当前收货地址吗？"
                      onConfirm={(e) => deleteAddress(e, item.addressId)}
                      onCancel={cancel}
                      okText="确认删除"
                      cancelText="取消"
                    >
                      <div className={style.deleteAddress}><DeleteOutlined /></div>
                    </Popconfirm>
                  </div>

                </div>
                <div className={style.phone}><span>联系电话:</span>{item.phone}</div>
                <div className={style.detailAddress}><span>收货地址:</span>{item.detailAddress}</div>
              </div>
            </Radio.Button>
          </Radio.Group>
        ))}
      </div>
    </Modal>
  );
};
