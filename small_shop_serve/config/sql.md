#  微商城项目

## 前台/移动端/小程序

1.页面

+ home  主页
+ goods 全部商品
+ details 商品详情页
+ login/register ==> 对话框组件
+ order 订单页
+ collect 收藏页
+ car 购物车
+ about 关于页面
+ checkout  确认订单页面
+ confirm  订单支付页面
+ profile   个人中心页面
+ orderDetail   订单详情页面



## 后台管理系统

1.页面

+ user  用户信息页面
+ swiper  首页轮播图展示
+ shop   商品信息页面
+ category  分类列表
+ details  商品详情
+ swiper  首页轮播

## 数据库设计

### 1.用户信息表(user)

| 字段名        | 类型    | 是否必填 | 说明        | 备注              |
| ------------- | ------- | -------- | ----------- | ----------------- |
| userId        | int     | 是       | 用户id      | 主键              |
| username      | varchar | 是       | 用户账号    |                   |
| password      | varchar | 是       | 用户密码    |                   |
| name          | varchar | 是       | 用户昵称    |                   |
| phone         | varchar | 否       | 手机号      |                   |
| avatar        | varchar | 否       | 用户头像    |                   |
| sex           | varchar | 是       | 性别1/2     | 1男2女(默认1)     |
| city          | varchar | 否       | 所在城市    |                   |
| register_time | varchar | 否       | 注册时间    |                   |
| email         | varchar | 否       | 邮箱        |                   |
| status        | varchar | 否       | 用户状态1/2 | 1正常2异常(默认1) |



### 2.商品分类表(category)

| 字段名     | 类型    | 是否必填 | 说明     | 备注 |
| ---------- | ------- | -------- | -------- | ---- |
| categoryId | int     | 是       | 分类id   | 主键 |
| name       | varchar | 是       | 分类名称 |      |
| parent     | int     | 否       | 父级id   |      |

### 3.管理员信息表(admin)

| 字段名     | 类型    | 是否必填 | 说明          | 备注              |
| ---------- | ------- | -------- | ------------- | ----------------- |
| id         | int     | 是       | 管理员id      | 主键              |
| username   | varchar | 是       | 管理员账号    |                   |
| password   | varchar | 是       | 管理员密码    |                   |
| name       | varchar | 是       | 管理员昵称    |                   |
| phone      | varchar | 否       | 管理员手机号  |                   |
| avatar     | varchar | 否       | 管理员头像    |                   |
| sex        | varchar | 是       | 性别1/2       | 1男2女(默认1)     |
| city       | varchar | 否       | 所在城市      |                   |
| status     | varchar | 是       | 管理员状态1/2 | 1正常2异常(默认1) |
| createTime | varchar | 是       | 创建时间      |                   |

### 4.商品详情表(shopdetail)

| 字段名       | 类型    | 是否必填 | 说明         | 备注                 |
| ------------ | ------- | -------- | ------------ | -------------------- |
| detailId     | int     | 是       | 商品详情id   | 主键                 |
| categoryId   | int     | 是       | 分类id       | （与商品分类表关联） |
| categoryName | varchar | 否       | 所属分类名称 |                      |
| parent       | varchar | 否       | 父级id       |                      |
| title        | varchar | 是       | 商品名称     |                      |
| descs        | varchar | 是       | 商品描述     |                      |
| titleImg     | varchar | 是       | 商品图片     |                      |
| prePrice     | int     | 否       | 原价         |                      |
| price        | int     | 是       | 现价         |                      |
| tag          | varchar | 否       | 商品标签     |                      |
| detailDesc   | varchar | 是       | 详细描述     |                      |
| createTime   | varchar | 是       | 创建时间     |                      |



### 5.商品详情轮播图(shopdswiper)

| 字段名   | 类型    | 是否必填 | 说明       | 备注                 |
| -------- | ------- | -------- | ---------- | -------------------- |
| id       | int     | 是       | 轮播id     | 主键                 |
| detailId | int     | 是       | 商品详情id | （与商品详情表关联） |
| imgs     | varchar | 是       | 商品图片   |                      |

### 6.首页轮播图(swiper)

| 字段名 | 类型    | 是否必填 | 说明     | 备注 |
| ------ | ------- | -------- | -------- | ---- |
| id     | int     | 是       | 轮播id   | 主键 |
| imgs   | varchar | 是       | 商品图片 |      |

### 7.收货地址表(address)

| 字段名        | 类型    | 是否必填 | 说明        | 备注              |
| ------------- | ------- | -------- | ----------- | ----------------- |
| addressId     | int     | 是       | 收获地址id  | 主键              |
| createTime    | varchar | 是       | 创建时间    |                   |
| userId        | int     | 是       | 用户id      | （与用户表关联）  |
| name          | varchar | 是       | 收货人      |                   |
| phone         | varchar | 是       | 手机号码    |                   |
| city          | varchar | 是       | 所在地区    |                   |
| detailAddress | varchar | 是       | 详细地址    |                   |
| type          | varchar | 否       | 是否默认0/1 | 0无效1默认(默认0) |



### 8.订单详情表(orderdetail)

| 字段名           | 类型    | 是否必填 | 说明              | 备注                                         |
| ---------------- | ------- | -------- | ----------------- | -------------------------------------------- |
| orderId          | int     | 是       | 订单id            | 主键                                         |
| userId           | int     | 是       | 用户id            | （与用户表关联）                             |
| addressId        | int     | 是       | 地址id            | （与收货地址表关联）                         |
| type             | int     | 是       | 订单状态0/1/2/3/4 | 0无效1加入购物车2待付款3待发货4待评价(默认0) |
| createTime       | varchar | 是       | 创建时间          |                                              |
| pay              | varchar | 是       | 支付方式          |                                              |
| payTime          | varchar | 是       | 支付时间          |                                              |
| sendTime         | varchar | 是       | 发货时间          |                                              |
| detailId         | int     | 是       | 商品id            | （与商品详情表关联）                         |
| orderNumber      | varchar | 是       | 订单编号          |                                              |
| payNumber        | varchar | 是       | 支付交易编号      |                                              |
| num              | int     | 是       | 选购数量          |                                              |
| price            | int     | 是       | 单价              |                                              |
| singleTotalPrice | int     | 是       | 单个商品总价      |                                              |

### 9.购物车(car)

| 字段名     | 类型    | 是否必填 | 说明     | 备注                 |
| ---------- | ------- | -------- | -------- | -------------------- |
| carId      | int     | 是       | 购物车id | 主键                 |
| createTime | varchar | 是       | 创建时间 |                      |
| detailId   | int     | 是       | 商品id   | （与商品详情表关联） |
| userId     | int     | 是       | 用户id   | （与用户表关联）     |
| num        | int     | 是       | 选购数量 |                      |
| price      | int     | 是       | 单价     |                      |

### 10.收藏表(collect)

| 字段名      | 类型    | 是否必填 | 说明     | 备注                 |
| ----------- | ------- | -------- | -------- | -------------------- |
| collectId   | int     | 是       | 收藏id   | 主键                 |
| collectTime | varchar | 是       | 收藏时间 |                      |
| userId      | int     | 是       | 用户id   | （与用户表关联）     |
| detailId    | int     | 是       | 商品id   | （与商品详情表关联） |



