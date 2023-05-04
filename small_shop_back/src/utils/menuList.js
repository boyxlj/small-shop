import {
  PartitionOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarsOutlined,
  FundOutlined,
  SlidersOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import {authControl} from "./authControl"
let data =  [
  {
    key: '/small-shop/statistics',
    icon:  <FundOutlined />,
    label: '商城数据',
  },
  {
    key: '/shop',
    icon:   <BarsOutlined />,
    label: '商品列表',
  },
  {
    key: '/editor',
    icon: <VideoCameraOutlined />,
    label: '添加商品',
  },
  {
    key: '/category',
    icon: <PartitionOutlined />,
    label: '商品分类',
  },
  {
    key: '/order',
    icon: <SlidersOutlined />,
    label: '商品订单',
  },
  {
    key: '/swiper',
    icon: <BulbOutlined />,
    label: '首页轮播',
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: '用户列表',
  },
]

if(!authControl(false)){
  data = data.filter(item=>item.key!="/user")
}

export default data