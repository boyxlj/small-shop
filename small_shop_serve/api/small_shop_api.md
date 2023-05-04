---
title: 微商城 v1.0.0
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: "@tarslib/widdershins v4.0.15"

---

# 微商城

> v1.0.0

# 微商城项目/前台/收藏接口

## POST 添加收藏

POST /api/user/addcollect

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "3"
detailId: "3"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|
|» detailId|body|string| 是 |商品id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加收藏成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 查询是否已收藏当前文章

POST /api/user/iscollect

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "3"
detailId: 1--

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|
|» detailId|body|string| 是 |商品id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "已收藏"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 移除收藏

POST /api/user/delcollectnews

```text
## * 需要token
## 通过用户id和商品id
```

> Body 请求参数

```yaml
userId: "4"
detailId: "1"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |收藏id|
|» detailId|body|string| 是 |商品详情id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "移除收藏成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 移除收藏

POST /api/user/delcollect

```text
## * 需要token
## 移除收藏-通过收藏id
```

> Body 请求参数

```yaml
collectId: "4"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» collectId|body|string| 是 |收藏id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "移除收藏成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 查询用户收藏列表

POST /api/user/usercollect

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "4"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "descs": "小屏5g",
      "title": "小米6s",
      "detailId": 2,
      "titleImg": "",
      "prePrice": "2199",
      "price": "699",
      "collectTime": "2022-06-12T07:37:35.000Z"
    },
    {
      "descs": "小屏5g",
      "title": "小米6s",
      "detailId": 2,
      "titleImg": "",
      "prePrice": "2199",
      "price": "699",
      "collectTime": "2022-06-12T07:38:24.000Z"
    },
    {
      "descs": "大屏15.6",
      "title": "华为电脑1",
      "detailId": 3,
      "titleImg": "",
      "prePrice": "8999",
      "price": "6999",
      "collectTime": "2022-06-12T07:38:24.000Z"
    },
    {
      "descs": "大屏5g，高分辨率",
      "title": "苹果13",
      "detailId": 4,
      "titleImg": "",
      "prePrice": "6999",
      "price": "4399",
      "collectTime": "2022-06-12T07:38:24.000Z"
    },
    {
      "descs": "大屏15.6",
      "title": "Mac",
      "detailId": 5,
      "titleImg": "",
      "prePrice": "19999",
      "price": "9999",
      "collectTime": "2022-06-12T07:38:24.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» descs|string|true|none||none|
|»» title|string|true|none||none|
|»» detailId|integer|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|»» collectTime|string|true|none||none|

# 微商城项目/前台/用户接口

## POST 用户注册

POST /api/user/register

```text
## * 无需token
```

> Body 请求参数

```yaml
username: "678"
password: "678"
name: 测试3

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |用户名|
|» password|body|string| 是 |密码|
|» name|body|string| 是 |昵称|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "注册成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 查询用户测试

GET /api/user/allUser1

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|Authorization|header|string| 是 |-|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "注册成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 用户登录

POST /api/user/login

```text
## * 无需token
```

> Body 请求参数

```yaml
username: "123"
password: "123"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |用户名|
|» password|body|string| 是 |密码|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "登录成功",
  "data": [
    {
      "userId": 4,
      "username": "123",
      "name": "测试1",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-12T03:07:26.000Z",
      "email": "",
      "status": "1"
    }
  ],
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjEyMyIsInBhc3N3b3JkIjoiMTIzIiwiaWF0IjoxNjU1MDA1MDczLCJleHAiOjE2NTUwOTE0NzN9.6aZjp__Uttol3Ag5j5AFyE7syOpek-1vwi2fDTq-H_8"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» userId|integer|false|none||none|
|»» username|string|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» avatar|string|false|none||none|
|»» sex|string|false|none||none|
|»» city|string|false|none||none|
|»» register_time|string|false|none||none|
|»» email|string|false|none||none|
|»» status|string|false|none||none|
|» token|string|true|none||none|

## POST 修改用户信息

POST /api/user/update/userInfo

```text
暂无描述
```

> Body 请求参数

```yaml
userId: "1"
name: 李四
sex: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户ID|
|» name|body|string| 是 |用户昵称|
|» sex|body|string| 否 |性别 1 男 2 女|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改成功",
  "data": [
    {
      "userId": 1,
      "username": "234",
      "name": "李四",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": null,
      "email": "",
      "status": "1"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» userId|integer|false|none||none|
|»» username|string|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» avatar|string|false|none||none|
|»» sex|string|false|none||none|
|»» city|string|false|none||none|
|»» register_time|null|false|none||none|
|»» email|string|false|none||none|
|»» status|string|false|none||none|

# 微商城项目/前台/分类商品接口

## GET 随机查询数据

GET /api/user/shop/random

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|number|query|string| 否 |随机展示的条数  如果为空默认展示20条数据|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 首页轮播

GET /api/user/swiper

```text
## * 无需token
```

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "id": 1,
      "imgs": "https://api.helloxlj.top/public/static/file1654265272371129640555.png"
    },
    {
      "id": 2,
      "imgs": "https://api.helloxlj.top/public/static/file1654265395652254213522.png"
    },
    {
      "id": 3,
      "imgs": "https://api.helloxlj.top/public/static/file1654265133600116530411.png"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» imgs|string|true|none||none|

## POST 查询商品轮播

POST /api/user/detailSwiper

```text
## * 无需token
```

> Body 请求参数

```yaml
detailId: "1"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |商品详情id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "id": 1,
      "detailId": 1,
      "imgs": "http://101.132.181.9:3000/public/imgs/phone/Redmi-k30.png\r\n"
    },
    {
      "id": 2,
      "detailId": 1,
      "imgs": "http://101.132.181.9:3000/public/imgs/phone/picture/Redmi-k30-5.png"
    },
    {
      "id": 3,
      "detailId": 1,
      "imgs": "http://101.132.181.9:3000/public/imgs/phone/picture/Redmi-k30-4.png"
    },
    {
      "id": 4,
      "detailId": 1,
      "imgs": "http://101.132.181.9:3000/public/imgs/phone/picture/Redmi-k30-1.png"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|true|none||none|
|»» detailId|integer|true|none||none|
|»» imgs|string|true|none||none|

## POST 查询指定商品信息

POST /api/user/shopdetails

```text
暂无描述
```

> Body 请求参数

```yaml
detailId: "1"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |商品详情id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 1,
      "categoryId": 1,
      "categoryName": "",
      "parent": "6",
      "title": "华为",
      "descs": "大屏5g",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
      "prePrice": "8999",
      "price": "6999",
      "detailDesc": "120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC",
      "createTime": "2022-06-12T05:35:47.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|false|none||none|
|»» categoryId|integer|false|none||none|
|»» categoryName|string|false|none||none|
|»» parent|string|false|none||none|
|»» title|string|false|none||none|
|»» descs|string|false|none||none|
|»» titleImg|string|false|none||none|
|»» prePrice|string|false|none||none|
|»» price|string|false|none||none|
|»» detailDesc|string|false|none||none|
|»» createTime|string|false|none||none|

## POST 搜索查询商品

POST /api/user/shopsearch

```text
## * 无需token
```

> Body 请求参数

```yaml
key: 华为
pageOn: "1"
pageCount: "3"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» key|body|string| 是 |搜索关键字|
|» pageOn|body|string| 是 |当前页码|
|» pageCount|body|string| 是 |每页的数量|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 1,
      "categoryId": 1,
      "categoryName": "",
      "parent": "6",
      "title": "华为",
      "descs": "大屏5g",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
      "prePrice": "8999",
      "price": "6999",
      "detailDesc": "120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC",
      "createTime": "2022-06-12T05:35:47.000Z"
    },
    {
      "detailId": 3,
      "categoryId": 2,
      "categoryName": "",
      "parent": "7",
      "title": "华为电脑1",
      "descs": "大屏15.6",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202112/gbom/6941487262038/428_428_F5608DB88FB841A47DFCE5A1E057CF0Amp.png",
      "prePrice": "8999",
      "price": "6999",
      "detailDesc": "",
      "createTime": "2022-06-12T05:38:21.000Z"
    },
    {
      "detailId": 18,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "华为畅享 50 ",
      "descs": "新品预订省50元|晒单抽水杯",
      "titleImg": "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png",
      "prePrice": "4249",
      "price": "4499",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|true|none||none|
|»» categoryId|integer|true|none||none|
|»» categoryName|string|true|none||none|
|»» parent|string|true|none||none|
|»» title|string|true|none||none|
|»» descs|string|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|»» detailDesc|string|true|none||none|
|»» createTime|string|true|none||none|

## POST 查询全部商品

POST /api/user/categoryalls

```text
## * 无需token
```

> Body 请求参数

```yaml
pageOn: "1"
pageCount: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» pageOn|body|string| 是 |当前页码|
|» pageCount|body|string| 是 |每页的数量|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 45,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/09/14/Cgbj0GHeNiCAOP4XAA53a1iUygY459.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    },
    {
      "detailId": 44,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/73/Cgbj0GBZn_CAEKgxAAf6NjETDZY827.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    }
  ],
  "total": 38
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|true|none||none|
|»» categoryId|integer|true|none||none|
|»» categoryName|string|true|none||none|
|»» parent|string|true|none||none|
|»» title|string|true|none||none|
|»» descs|string|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|»» detailDesc|string|true|none||none|
|»» createTime|string|true|none||none|
|» total|integer|true|none||none|

## GET 全部分类查询

GET /api/user/category

```text
## * 无需token
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 是 |分类名称  category表示查询分类 为空则是查询分类及商品|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 7,
      "categoryId": 0,
      "categoryName": "电脑",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T05:55:36.000Z",
      "children": [
        {
          "detailId": 3,
          "categoryId": 2,
          "categoryName": "",
          "parent": "7",
          "title": "华为电脑1",
          "descs": "大屏15.6",
          "titleImg": "",
          "prePrice": "8999",
          "price": "6999",
          "detailDesc": "",
          "createTime": "2022-06-12T05:38:21.000Z"
        },
        {
          "detailId": 5,
          "categoryId": 2,
          "categoryName": "",
          "parent": "7",
          "title": "Mac",
          "descs": "大屏15.6",
          "titleImg": "",
          "prePrice": "19999",
          "price": "9999",
          "detailDesc": "",
          "createTime": "2022-06-12T05:38:21.000Z"
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|false|none||none|
|»» categoryId|integer|false|none||none|
|»» categoryName|string|false|none||none|
|»» parent|null|false|none||none|
|»» title|string|false|none||none|
|»» descs|string|false|none||none|
|»» titleImg|string|false|none||none|
|»» prePrice|string|false|none||none|
|»» price|string|false|none||none|
|»» detailDesc|string|false|none||none|
|»» createTime|string|false|none||none|
|»» children|[object]|false|none||none|
|»»» detailId|integer|true|none||none|
|»»» categoryId|integer|true|none||none|
|»»» categoryName|string|true|none||none|
|»»» parent|string|true|none||none|
|»»» title|string|true|none||none|
|»»» descs|string|true|none||none|
|»»» titleImg|string|true|none||none|
|»»» prePrice|string|true|none||none|
|»»» price|string|true|none||none|
|»»» detailDesc|string|true|none||none|
|»»» createTime|string|true|none||none|

## GET 指定查询(通过分类名称)

GET /api/user/categoryone

```text
## * 无需token
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 是 |-|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 7,
      "categoryId": 0,
      "categoryName": "电脑",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T05:55:36.000Z",
      "children": [
        {
          "detailId": 3,
          "categoryId": 2,
          "categoryName": "",
          "parent": "7",
          "title": "华为电脑1",
          "descs": "大屏15.6",
          "titleImg": "",
          "prePrice": "8999",
          "price": "6999",
          "detailDesc": "",
          "createTime": "2022-06-12T05:38:21.000Z"
        },
        {
          "detailId": 5,
          "categoryId": 2,
          "categoryName": "",
          "parent": "7",
          "title": "Mac",
          "descs": "大屏15.6",
          "titleImg": "",
          "prePrice": "19999",
          "price": "9999",
          "detailDesc": "",
          "createTime": "2022-06-12T05:38:21.000Z"
        }
      ]
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|false|none||none|
|»» categoryId|integer|false|none||none|
|»» categoryName|string|false|none||none|
|»» parent|null|false|none||none|
|»» title|string|false|none||none|
|»» descs|string|false|none||none|
|»» titleImg|string|false|none||none|
|»» prePrice|string|false|none||none|
|»» price|string|false|none||none|
|»» detailDesc|string|false|none||none|
|»» createTime|string|false|none||none|
|»» children|[object]|false|none||none|
|»»» detailId|integer|true|none||none|
|»»» categoryId|integer|true|none||none|
|»»» categoryName|string|true|none||none|
|»»» parent|string|true|none||none|
|»»» title|string|true|none||none|
|»»» descs|string|true|none||none|
|»»» titleImg|string|true|none||none|
|»»» prePrice|string|true|none||none|
|»»» price|string|true|none||none|
|»»» detailDesc|string|true|none||none|
|»»» createTime|string|true|none||none|

## POST 查询分类下的商品

POST /api/user/categoryparent

```text
## * 无需token
```

> Body 请求参数

```yaml
detailId: "7"
pageOn: "1"
pageCount: "3"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |分类id|
|» pageOn|body|string| 是 |当前页码|
|» pageCount|body|string| 是 |每页的数量|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 22,
      "categoryId": 0,
      "categoryName": "",
      "parent": "7",
      "title": "MateBook D 14 2022款",
      "descs": "预订省300｜享3期免息",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487239511/428_428_E0AFB3C16007C7DC5B495D8E071D159Dmp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 21,
      "categoryId": 0,
      "categoryName": "",
      "parent": "7",
      "title": "HUAWEI MateBook 14s",
      "descs": "1代酷睿标压处理器 i5 16GB 512GB 2.5K触控全面屏 ",
      "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487243563/428_428_C341573C94BAEB18069835528FE7C0A3mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 5,
      "categoryId": 2,
      "categoryName": "",
      "parent": "7",
      "title": "Mac",
      "descs": "大屏15.6",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png",
      "prePrice": "19999",
      "price": "9999",
      "detailDesc": "",
      "createTime": "2022-06-12T05:38:21.000Z"
    }
  ],
  "total": 4
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|true|none||none|
|»» categoryId|integer|true|none||none|
|»» categoryName|string|true|none||none|
|»» parent|string|true|none||none|
|»» title|string|true|none||none|
|»» descs|string|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|»» detailDesc|string|true|none||none|
|»» createTime|string|true|none||none|
|» total|integer|true|none||none|

# 微商城项目/前台/购物车

## POST 添加至购物车

POST /api/user/addcar

```text
## * 需要token
```

> Body 请求参数

```yaml
detailId: "4"
userId: "8"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |商品详情id|
|» userId|body|string| 是 |用户id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 查询购物车商品

POST /api/user/selectcar

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "8"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "carId": 36,
      "createTime": "2022-06-15T12:26:50.000Z",
      "detailId": 37,
      "num": 1,
      "userId": 8,
      "title": "HUAWEI WATCH GT 3 Pro",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487245703/428_428_FA332C84941E42AC0E0F00EFACAC7567mp.png",
      "prePrice": "2499",
      "price": "2699"
    },
    {
      "carId": 35,
      "createTime": "2022-06-15T11:59:27.000Z",
      "detailId": 5,
      "num": 1,
      "userId": 8,
      "title": "Mac",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png",
      "prePrice": "19999",
      "price": "9999"
    },
    {
      "carId": 34,
      "createTime": "2022-06-15T11:56:10.000Z",
      "detailId": 14,
      "num": 1,
      "userId": 8,
      "title": "nova 9 系列",
      "titleImg": "https://res2.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png",
      "prePrice": "2999",
      "price": "2699"
    },
    {
      "carId": 33,
      "createTime": "2022-06-15T11:56:06.000Z",
      "detailId": 1,
      "num": 1,
      "userId": 8,
      "title": "华为",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
      "prePrice": "8999",
      "price": "6999"
    },
    {
      "carId": 32,
      "createTime": "2022-06-15T11:44:51.000Z",
      "detailId": 44,
      "num": 1,
      "userId": 8,
      "title": "HUAWEI WATCH GT 3 Pro",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/73/Cgbj0GBZn_CAEKgxAAf6NjETDZY827.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699"
    }
  ],
  "total": 5
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» carId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» detailId|integer|true|none||none|
|»» num|integer|true|none||none|
|»» userId|integer|true|none||none|
|»» title|string|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|» total|integer|true|none||none|

## POST 清空购物车商品

POST /api/user/clearcar

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "3"
carId: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|
|» carId|body|string| 否 |购物车id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "清空成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 修改购物车中商品的数量

POST /api/user/updatecarnum

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "8"
carId: "1"
num: "3"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|
|» carId|body|string| 是 |购物车id|
|» num|body|string| 是 |商品数量|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改数量成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 查询购物车商品总数

POST /api/user/selectcartotal

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "8"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "total": 1
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» total|integer|true|none||none|

# 微商城项目/前台/订单

## POST 订单提交

POST /api/user/submitorder

```text
## * 需要token

## 字段

| 字段名      | 类型    | 是否必填 | 说明              | 备注                                         |
| ----------- | ------- | -------- | ----------------- | -------------------------------------------- |
| orderId     | int| 是       | 订单id            | 主键                                         |
| type        | int| 是       | 订单状态0/1/2/3/4 | 0无效1加入购物车2待付款3待发货4待评价(默认0) |
| createTime  | varchar | 是       | 创建时间          |                                              |
| pay         | varchar | 是       | 支付方式          |                                              |
| payTime     | varchar | 是       | 支付时间          |                                              |
| sendTime    | varchar | 是       | 发货时间          |                                              |
| detailId    | int| 是       | 商品id            | （与商品详情表关联）                         |
| orderNumber | varchar | 是       | 订单编号          |                                              |
| payNumber   | varchar | 是       | 支付交易编号      |                                              |
| userId      | int| 是       | 用户id            | （与用户表关联）                             |
| num         | int| 是       | 选购数量          |                                              |
| price       | int| 是       | 单价              |                                              |
| singleTotalPrice| int| 是       | 单个商品总价|                                              |
                                       

##  数据传递格式
[
  {
    detailId: 45,
    num: 1,
    price: '2699',
    carId: 39，
    singleTotalPrice: 2699
  }
] 8 'qGKx3wTOmNaHReNbfobnX'

```

> Body 请求参数

```yaml
userId: "8"
detailId: "1"
orderNumber: "3"
num: "-"
price: "-"
singleTotalPrice: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|
|» detailId|body|string| 是 |购物车id|
|» orderNumber|body|string| 是 |订单号|
|» num|body|string| 是 |商品数量|
|» price|body|string| 是 |价格|
|» singleTotalPrice|body|string| 是 |单个商品总价|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "提交成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 确认订单查询

POST /api/user/confirmorder

```text
## * 需要token
```

> Body 请求参数

```yaml
orderNumber: aw_QEBi55T1eTnJX1bpnB

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "确认订单查询列表成功",
  "data": [
    {
      "orderId": 44,
      "singleTotalPrice": 2699,
      "orderNumber": "aw_QEBi55T1eTnJX1bpnB",
      "type": "0",
      "createTime": "2022-07-03T00:17:24.000Z",
      "sendTime": "",
      "pay": "",
      "detailId": 37,
      "num": 1,
      "price": 2699,
      "title": "HUAWEI WATCH GT 3 Pro",
      "prePrice": "2499",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487245703/428_428_FA332C84941E42AC0E0F00EFACAC7567mp.png",
      "name": "莉莉",
      "phone": "110",
      "detailAddress": "河南省南阳市",
      "city": "undefined"
    }
  ],
  "totalNum": 1,
  "totalPrice": 2699,
  "total": 1
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» orderId|integer|false|none||none|
|»» singleTotalPrice|integer|false|none||none|
|»» orderNumber|string|false|none||none|
|»» type|string|false|none||none|
|»» createTime|string|false|none||none|
|»» sendTime|string|false|none||none|
|»» pay|string|false|none||none|
|»» detailId|integer|false|none||none|
|»» num|integer|false|none||none|
|»» price|integer|false|none||none|
|»» title|string|false|none||none|
|»» prePrice|string|false|none||none|
|»» titleImg|string|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» detailAddress|string|false|none||none|
|»» city|string|false|none||none|
|» totalNum|integer|true|none||none|
|» totalPrice|integer|true|none||none|
|» total|integer|true|none||none|

## POST 设置订单的收货地址

POST /api/user/set/order/address

```text
暂无描述
```

> Body 请求参数

```yaml
orderNumber: "-"
addressId: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|
|» addressId|body|string| 是 |收货地址ID|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 设置商品信息(状态,收货地址)

POST /api/user/setorderaddress

```text
## * 需要token
```

> Body 请求参数

```yaml
orderNumber: "-"
addressId: "-"
removeCarList: "-"
type: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|
|» addressId|body|string| 是 |地址id|
|» removeCarList|body|string| 是 |选中购物车中的商品   购物车Id列表|
|» type|body|string| 是 |2|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "设置商品的收货地址成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 删除订单

POST /api/user/delete/order

```text
暂无描述
```

> Body 请求参数

```yaml
orderNumber: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除订单成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 设置商品当前状态

POST /api/user/set/order/state

```text
暂无描述
```

> Body 请求参数

```yaml
orderNumber: "-"
type: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|
|» type|body|string| 是 |订单状态  2为待付款   3为待收货|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 结算(支付)订单查询

POST /api/user/confirm/pay/order

```text
## * 需要token
```

> Body 请求参数

```yaml
orderNumber: aw_QEBi55T1eTnJX1bpnB

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "结算(支付)订单查询成功",
  "data": [
    {
      "orderId": 44,
      "singleTotalPrice": 2699,
      "orderNumber": "aw_QEBi55T1eTnJX1bpnB",
      "type": "0",
      "createTime": "2022-07-03T00:17:24.000Z",
      "sendTime": "",
      "pay": "",
      "detailId": 37,
      "num": 1,
      "price": 2699,
      "title": "HUAWEI WATCH GT 3 Pro",
      "prePrice": "2499",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487245703/428_428_FA332C84941E42AC0E0F00EFACAC7567mp.png",
      "name": "莉莉",
      "phone": "110",
      "detailAddress": "河南省南阳市"
    }
  ],
  "totalNum": 1,
  "totalPrice": 2699,
  "total": 1
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» orderId|integer|false|none||none|
|»» singleTotalPrice|integer|false|none||none|
|»» orderNumber|string|false|none||none|
|»» type|string|false|none||none|
|»» createTime|string|false|none||none|
|»» sendTime|string|false|none||none|
|»» pay|string|false|none||none|
|»» detailId|integer|false|none||none|
|»» num|integer|false|none||none|
|»» price|integer|false|none||none|
|»» title|string|false|none||none|
|»» prePrice|string|false|none||none|
|»» titleImg|string|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» detailAddress|string|false|none||none|
|» totalNum|integer|true|none||none|
|» totalPrice|integer|true|none||none|
|» total|integer|true|none||none|

## POST 查询用户订单

POST /api/user/select/order/list

```text
暂无描述
```

> Body 请求参数

```yaml
userId: "8"
type: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |-|
|» type|body|string| 是 |订单状态  2为待付款   3为待收货|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "name": "张三哈哈",
      "type": "2",
      "createTime": "2022-07-03T02:18:25.000Z",
      "orderNumber": "hhAQLjSrUe2KJehdebnUL",
      "totalPrice": 4699,
      "orderList": [
        {
          "orderId": 64,
          "singleTotalPrice": 4699,
          "type": "2",
          "orderNumber": "hhAQLjSrUe2KJehdebnUL",
          "createTime": "2022-07-03T02:18:25.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 16,
          "num": 1,
          "price": 4699,
          "title": "HUAWEI P50E",
          "prePrice": "4499",
          "titleImg": "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487253319/428_428_A1A370ED9D04CF6DED31AA0B84C48FC0mp.png",
          "name": "张三哈哈",
          "phone": "175383536006",
          "detailAddress": "天津市津南区海河教育园区"
        }
      ]
    },
    {
      "name": "李四",
      "type": "2",
      "createTime": "2022-07-03T05:58:14.000Z",
      "orderNumber": "5mRMfegYf4ANIhL_qBSCO",
      "totalPrice": 24794,
      "orderList": [
        {
          "orderId": 65,
          "singleTotalPrice": 13998,
          "type": "2",
          "orderNumber": "5mRMfegYf4ANIhL_qBSCO",
          "createTime": "2022-07-03T05:58:14.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 3,
          "num": 2,
          "price": 6999,
          "title": "华为电脑1",
          "prePrice": "8999",
          "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202112/gbom/6941487262038/428_428_F5608DB88FB841A47DFCE5A1E057CF0Amp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        },
        {
          "orderId": 66,
          "singleTotalPrice": 8097,
          "type": "2",
          "orderNumber": "5mRMfegYf4ANIhL_qBSCO",
          "createTime": "2022-07-03T05:58:14.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 25,
          "num": 3,
          "price": 2699,
          "title": "华为智慧屏 SE 65 MEMC",
          "prePrice": "2499",
          "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487210169/428_428_DCA9929CCA8B17006663DFF9596765B3mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        },
        {
          "orderId": 67,
          "singleTotalPrice": 2699,
          "type": "2",
          "orderNumber": "5mRMfegYf4ANIhL_qBSCO",
          "createTime": "2022-07-03T05:58:14.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 21,
          "num": 1,
          "price": 2699,
          "title": "HUAWEI MateBook 14s",
          "prePrice": "2499",
          "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487243563/428_428_C341573C94BAEB18069835528FE7C0A3mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        }
      ]
    }
  ],
  "total": 2
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» name|string|true|none||none|
|»» type|string|true|none||none|
|»» createTime|string|true|none||none|
|»» orderNumber|string|true|none||none|
|»» totalPrice|integer|true|none||none|
|»» orderList|[object]|true|none||none|
|»»» orderId|integer|true|none||none|
|»»» singleTotalPrice|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» orderNumber|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» sendTime|string|true|none||none|
|»»» pay|string|true|none||none|
|»»» detailId|integer|true|none||none|
|»»» num|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» title|string|true|none||none|
|»»» prePrice|string|true|none||none|
|»»» titleImg|string|true|none||none|
|»»» name|string|true|none||none|
|»»» phone|string|true|none||none|
|»»» detailAddress|string|true|none||none|
|» total|integer|true|none||none|

## GET 扫码模拟支付

GET /api/sao/code

```text
暂无描述
```

> 返回示例

> 成功

```json
{
  "code": 200,
  "data": null,
  "msg": "扫码成功",
  "tips": "想啥呢？还真打算支付呢？"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» data|null|true|none||none|
|» msg|string|true|none||none|
|» tips|string|true|none||none|

## POST 订单详情查询

POST /api/user/select/order/list/detail

```text
暂无描述
```

> Body 请求参数

```yaml
orderNumber: UzqQk0PMEnjeaBQOjt5gD

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "info": [
        {
          "name": "李四",
          "type": "3",
          "time": "2022-07-03T10:55:11.000Z",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "phone": "175383506123",
          "address": "天津市津南区海河教育园区",
          "totalPrice": 42093
        }
      ],
      "orderList": [
        {
          "orderId": 68,
          "singleTotalPrice": 14097,
          "type": "3",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "createTime": "2022-07-03T10:55:11.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 16,
          "num": 3,
          "price": 4699,
          "title": "HUAWEI P50E",
          "prePrice": "4499",
          "titleImg": "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487253319/428_428_A1A370ED9D04CF6DED31AA0B84C48FC0mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        },
        {
          "orderId": 69,
          "singleTotalPrice": 27996,
          "type": "3",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "createTime": "2022-07-03T10:55:11.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 1,
          "num": 4,
          "price": 6999,
          "title": "华为",
          "prePrice": "8999",
          "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        }
      ]
    }
  ],
  "total": 2
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» info|[object]|false|none||none|
|»»» name|string|false|none||none|
|»»» type|string|false|none||none|
|»»» time|string|false|none||none|
|»»» orderNumber|string|false|none||none|
|»»» phone|string|false|none||none|
|»»» address|string|false|none||none|
|»»» totalPrice|integer|false|none||none|
|»» orderList|[object]|false|none||none|
|»»» orderId|integer|true|none||none|
|»»» singleTotalPrice|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» orderNumber|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» sendTime|string|true|none||none|
|»»» pay|string|true|none||none|
|»»» detailId|integer|true|none||none|
|»»» num|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» title|string|true|none||none|
|»»» prePrice|string|true|none||none|
|»»» titleImg|string|true|none||none|
|»»» name|string|true|none||none|
|»»» phone|string|true|none||none|
|»»» detailAddress|string|true|none||none|
|» total|integer|true|none||none|

# 微商城项目/前台/收货地址

## POST 修改用户收货地址

POST /api/user/updateaddress

```text
## * 需要token
```

> Body 请求参数

```yaml
addressId: "1"
name: 康康
phone: "15937750854"
city: 北京市
detailAddress: 北京市海淀区
type: "0"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» addressId|body|string| 是 |地址id|
|» name|body|string| 是 |收货人|
|» phone|body|string| 是 |电话|
|» city|body|string| 是 |城市|
|» detailAddress|body|string| 是 |详细地址|
|» type|body|string| 是 |是否设为默认0/1（1默认 )|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改收货地址成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 添加用户收货地址

POST /api/user/addaddress

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "8"
name: 张三
phone: "175383536006"
city: 天津市津南区
detailAddress: 天津市津南区海河教育园区
type: "1"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户id|
|» name|body|string| 是 |收货人|
|» phone|body|string| 是 |电话|
|» city|body|string| 是 |城市|
|» detailAddress|body|string| 是 |详细地址|
|» type|body|string| 是 |是否设为默认0/1（1默认 )|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加收货地址成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 查询用户收货地址

POST /api/user/selectaddress

```text
## * 需要token
```

> Body 请求参数

```yaml
userId: "8"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |-|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询收货地址成功",
  "default": [
    {
      "addressId": 3,
      "createTime": "2022-06-17T08:12:02.000Z",
      "userId": 8,
      "name": "张三",
      "phone": "175383536006",
      "city": "天津市津南区",
      "detailAddress": "天津市津南区海河教育园区",
      "type": "1"
    }
  ],
  "data": [
    {
      "addressId": 1,
      "createTime": "2022-06-17T08:10:42.000Z",
      "userId": 8,
      "name": "张三",
      "phone": "18812788888",
      "city": "河南南阳",
      "detailAddress": "河南南阳西峡县",
      "type": "0"
    },
    {
      "addressId": 2,
      "createTime": "2022-06-17T08:11:43.000Z",
      "userId": 8,
      "name": "李四",
      "phone": "17538366666",
      "city": "天津市津南区",
      "detailAddress": "天津市津南区海河教育园区",
      "type": "0"
    },
    {
      "addressId": 3,
      "createTime": "2022-06-17T08:12:02.000Z",
      "userId": 8,
      "name": "张三",
      "phone": "17538366666",
      "city": "天津市津南区",
      "detailAddress": "天津市津南区海河教育园区",
      "type": "1"
    }
  ],
  "total": 3
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» default|[object]|true|none||none|
|»» addressId|integer|false|none||none|
|»» createTime|string|false|none||none|
|»» userId|integer|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» city|string|false|none||none|
|»» detailAddress|string|false|none||none|
|»» type|string|false|none||none|
|» data|[object]|true|none||none|
|»» addressId|integer|true|none||none|
|»» createTime|string|true|none||none|
|»» userId|integer|true|none||none|
|»» name|string|true|none||none|
|»» phone|string|true|none||none|
|»» city|string|true|none||none|
|»» detailAddress|string|true|none||none|
|»» type|string|true|none||none|
|» total|integer|true|none||none|

## POST 查询指定收货地址

POST /api/user/selectaddressone

```text
## * 需要token
```

> Body 请求参数

```yaml
addressId: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» addressId|body|string| 是 |地址id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询收货地址成功",
  "data": [
    {
      "addressId": 2,
      "createTime": "2022-06-17T08:11:43.000Z",
      "userId": 8,
      "name": "李四",
      "phone": "175383536006",
      "city": "天津市津南区",
      "detailAddress": "天津市津南区海河教育园区",
      "type": "0"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» addressId|integer|false|none||none|
|»» createTime|string|false|none||none|
|»» userId|integer|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» city|string|false|none||none|
|»» detailAddress|string|false|none||none|
|»» type|string|false|none||none|

## POST 删除用户收货地址

POST /api/user/removeaddress

```text
## * 需要token
```

> Body 请求参数

```yaml
addressId: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» addressId|body|string| 是 |地址id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除收货地址成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 设置默认收货地址

POST /api/user/setdefaultaddress

```text
## * 需要token
```

> Body 请求参数

```yaml
addressId: "2"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» addressId|body|string| 是 |地址id|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "设置默认地址成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 微商城项目/前台/关于

## GET 关于介绍

GET /api/select/article/small/shop

```text
## https://api.helloxlj.top/api
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|artId|query|string| 是 |-|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "content": "## 说明\n> 本项目前后端分离，前端参考小米商城实现，但与小米官方没有关系，纯属个人瞎搞。\n\n> 当前是本项目的前台，后台管理请移步到 <a href='http://www.11e.top/xlj/back' target=shuangyinghao_blankshuangyinghao>点击跳转</a>。\n\n> 前台已经部署在阿里云，欢迎访问 http://www.11e.top/xlj/pre （未兼容移动端，请使用PC端进行访问）。\n\n\n\n## 项目介绍\n本项目前后端分离，前端基于`React`+`react-router-dom`+`redux`+`antd`+`Axios`，参考小米商城实现。后端基于`Node.js(express框架`)+`Mysql`实现。\n\n前端包含了12个页面：首页、登录、注册、商品展示、商品详情、关于微商城、我的收藏、购物车、确认订单、订单结算、我的订单以及用于信息页面。\n\n实现了商品的展示、商品分类查询、关键字搜索商品、商品详细信息展示、登录、注册、用户购物车、订单的确认、订单结算、用户订单、用户收藏列表等功能。\n\n## 技术栈\n前端：`React`+`react-router-dom`+`redux`+`antd`+`Axios`\n\n后端：`Node.js`、`express框架`\n\n数据库：`Mysql`\n\n## 项目地址\n> 前台：<a href='https://github.com/codeXlj/small-shop' target=shuangyinghao_blankshuangyinghao>点击跳转</a>\n\n> 后台：<a href='https://github.com/codeXlj/small-shop-back' target=shuangyinghao_blankshuangyinghao>点击跳转</a>\n\n> 后端：<a href='https://github.com/codeXlj/small-shop-serve' target=shuangyinghao_blankshuangyinghao>点击跳转</a>\n\n## 项目运行\n\n---\n"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» content|string|true|none||none|

# 微商城项目/后台/分类商品接口

## POST 添加分类

POST /api/back/add/category

```text
暂无描述
```

> Body 请求参数

```yaml
categoryName: 衣服

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» categoryName|body|string| 是 |分类名称|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加分类成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 全部分类查询

GET /api/back/category

```text
## * 无需token
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 否 |type == "category" ?查询分类 : 查询商品|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询分类成功",
  "data": [
    {
      "detailId": 6,
      "categoryId": 0,
      "categoryName": "手机",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T05:54:00.000Z"
    },
    {
      "detailId": 7,
      "categoryId": 0,
      "categoryName": "电脑",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T05:55:36.000Z"
    },
    {
      "detailId": 8,
      "categoryId": 0,
      "categoryName": "路由器",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T06:31:43.000Z"
    },
    {
      "detailId": 10,
      "categoryId": 0,
      "categoryName": "手环",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T06:33:50.000Z"
    },
    {
      "detailId": 12,
      "categoryId": 0,
      "categoryName": "相机",
      "parent": null,
      "title": "",
      "descs": "",
      "titleImg": "",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-12T06:44:03.000Z"
    }
  ],
  "total": 5
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|true|none||none|
|»» categoryId|integer|true|none||none|
|»» categoryName|string|true|none||none|
|»» parent|null|true|none||none|
|»» title|string|true|none||none|
|»» descs|string|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|»» detailDesc|string|true|none||none|
|»» createTime|string|true|none||none|
|» total|integer|true|none||none|

## POST 修改分类

POST /api/back/update/category

```text
暂无描述
```

> Body 请求参数

```yaml
categoryName: 外套
detailId: "47"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» categoryName|body|string| 是 |分类名称|
|» detailId|body|string| 是 |分类ID|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "修改分类成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## POST 删除分类

POST /api/back/delete/category

```text
暂无描述
```

> Body 请求参数

```yaml
detailId: "47"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |分类ID|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除分类成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 微商城项目/后台/商品信息

## POST 修改商品

POST /api/back/update/shop/base/info

```text
暂无描述
```

> Body 请求参数

```yaml
title: "-"
descs: "-"
parent: "-"
prePrice: "-"
price: "-"
detailDesc: "-"
titleImg: "-"
detailId: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» title|body|string| 是 |名称|
|» descs|body|string| 是 |基本描述|
|» parent|body|string| 是 |所属分类|
|» prePrice|body|string| 是 |原价|
|» price|body|string| 是 |现价|
|» detailDesc|body|string| 是 |详细描述|
|» titleImg|body|string| 是 |图片|
|» detailId|body|string| 是 |商品ID|

> 返回示例

> 成功

```json
{
  "code:200": null,
  "msg:\"修改成功\"": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 删除商品

POST /api/back/delete/shop

```text
暂无描述
```

> Body 请求参数

```yaml
detailId: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |商品ID|

> 返回示例

> 成功

```json
{
  "code:200": null,
  "msg:\"删除成功\"": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询所有商品

GET /api/back/select/shop

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|type|query|string| 否 |分类ID|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 45,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/09/14/Cgbj0GHeNiCAOP4XAA53a1iUygY459.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    },
    {
      "detailId": 44,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/73/Cgbj0GBZn_CAEKgxAAf6NjETDZY827.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    },
    {
      "detailId": 43,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/75/Cgbj0WA-HaGAfAzXAAaBocwqRik813.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    },
    {
      "detailId": 42,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/DC/Cgbj0WFETByAf6j8AAOqMS-Erfk097.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    },
    {
      "detailId": 41,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/DC/Cgbj0WFESyqAKb8gAAKGwY7jH6k807.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:31:54.000Z"
    },
    {
      "detailId": 40,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://openfile.meizu.com/group1/M00/08/D8/Cgbj0WFD_MGADSsqAAfmpmbsmOI365.png@480x480.jpg",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:30:45.000Z"
    },
    {
      "detailId": 39,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487201433/428_428_8090B052C4EF1A9A3EACEA95383CB6D9mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:24:21.000Z"
    },
    {
      "detailId": 38,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res6.vmallres.com/pimages/product/6972453165985/428_428_93BCD651C90D2B5EFD779DB353F1A2E36DFAE529FA49026Emp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:24:21.000Z"
    },
    {
      "detailId": 37,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487245703/428_428_FA332C84941E42AC0E0F00EFACAC7567mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:24:21.000Z"
    },
    {
      "detailId": 36,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487260522/428_428_98F4C26BB746ABFA1687C9ED26E63E8Amp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:24:21.000Z"
    },
    {
      "detailId": 35,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res4.vmallres.com/pimages/uomcdn/CN/pms/202202/gbom/6941487214921/428_428_F97868B124B91DB759E822F748AAF767mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:52.000Z"
    },
    {
      "detailId": 34,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202202/gbom/6941487220687/428_428_A317C546F298036E9BE20B8D30378A3Dmp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:52.000Z"
    },
    {
      "detailId": 33,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res7.vmallres.com/pimages/product/6941487224364/428_428_EF8C02B11B0053549E1A0766706AFB8910ED4B828F655657mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:52.000Z"
    },
    {
      "detailId": 32,
      "categoryId": 0,
      "categoryName": "",
      "parent": "10",
      "title": "HUAWEI WATCH GT 3 Pro",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487249428/428_428_D0425B49F36377EBC15687B3E52E955Amp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:52.000Z"
    },
    {
      "detailId": 31,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487217014/428_428_AFDFF6955E372A89187A0029FCB13EBEmp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 30,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487211173/428_428_601FD8B22DC814A48D6E944C1A28B575mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 29,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487224142/428_428_338AF1445F12DD9C81784B094710EBA4mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 28,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487233342/428_428_703C5377E6C17B3C7639B50CD236F5E0mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 27,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487217007/428_428_8BD0A5A1BEA7E2C90B92724240BFD351mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 26,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487210169/428_428_DCA9929CCA8B17006663DFF9596765B3mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 25,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487210169/428_428_DCA9929CCA8B17006663DFF9596765B3mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 24,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487233328/428_428_377A883BEF8846E33089A10191655077mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 23,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "华为智慧屏 SE 65 MEMC",
      "descs": "莱茵护眼 HarmonyOS",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487264940/428_428_6E8DA488DAD823854834589C10745B78mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:22:07.000Z"
    },
    {
      "detailId": 22,
      "categoryId": 0,
      "categoryName": "",
      "parent": "7",
      "title": "MateBook D 14 2022款",
      "descs": "预订省300｜享3期免息",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487239511/428_428_E0AFB3C16007C7DC5B495D8E071D159Dmp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 21,
      "categoryId": 0,
      "categoryName": "",
      "parent": "7",
      "title": "HUAWEI MateBook 14s",
      "descs": "1代酷睿标压处理器 i5 16GB 512GB 2.5K触控全面屏 ",
      "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487243563/428_428_C341573C94BAEB18069835528FE7C0A3mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 20,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "nova 9 SE ",
      "descs": "赠充电器|直降50元",
      "titleImg": "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png",
      "prePrice": "2349",
      "price": "2599",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 19,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI nova 9 Pro ",
      "descs": "限时直降300",
      "titleImg": "https://res7.vmallres.com/pimages/product/6941487236541/428_428_FEFF272C0ACD787A29C40D83FB75F09F6A6F5303F3C06654mp.png",
      "prePrice": "2499",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 18,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "华为畅享 50 ",
      "descs": "新品预订省50元|晒单抽水杯",
      "titleImg": "https://res2.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png",
      "prePrice": "4249",
      "price": "4499",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 17,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI P50 Pro ",
      "descs": "8GB+256GB 星河蓝",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487256372/428_428_49DE1CE8BEB62D268EE95B8FE2E416FFmp.png",
      "prePrice": "4499",
      "price": "4699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 16,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "HUAWEI P50E",
      "descs": "预订省50元|尾款12期免息",
      "titleImg": "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487253319/428_428_A1A370ED9D04CF6DED31AA0B84C48FC0mp.png",
      "prePrice": "4499",
      "price": "4699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:16:51.000Z"
    },
    {
      "detailId": 15,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "nova 9 系列",
      "descs": "高性能",
      "titleImg": "https://res2.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png",
      "prePrice": "2999",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:06:04.000Z"
    },
    {
      "detailId": 14,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "nova 9 系列",
      "descs": "高性能",
      "titleImg": "https://res2.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png",
      "prePrice": "2999",
      "price": "2699",
      "detailDesc": "",
      "createTime": "2022-06-14T01:05:53.000Z"
    },
    {
      "detailId": 13,
      "categoryId": 0,
      "categoryName": "",
      "parent": "6",
      "title": "Redmi K40S  1799元起 ",
      "descs": "口碑真旗舰 智能穿戴",
      "titleImg": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/28febc579eaea6b07c96c0ec48b89f7a.jpg?thumb=1&w=250&h=25",
      "prePrice": "",
      "price": "",
      "detailDesc": "",
      "createTime": "2022-06-13T10:52:47.000Z"
    },
    {
      "detailId": 5,
      "categoryId": 2,
      "categoryName": "",
      "parent": "7",
      "title": "Mac",
      "descs": "大屏123",
      "titleImg": "https://res8.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png",
      "prePrice": "19999",
      "price": "9999",
      "detailDesc": "",
      "createTime": "2022-06-12T05:38:21.000Z"
    },
    {
      "detailId": 4,
      "categoryId": 1,
      "categoryName": "",
      "parent": "6",
      "title": "苹果13",
      "descs": "大屏1235g，高分辨率",
      "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487235780/428_428_13F0DCAEF75D98517492F714F0B9A177mp.png",
      "prePrice": "6999",
      "price": "4399",
      "detailDesc": "",
      "createTime": "2022-06-12T05:38:21.000Z"
    },
    {
      "detailId": 3,
      "categoryId": 2,
      "categoryName": "",
      "parent": "7",
      "title": "华为电脑1",
      "descs": "大屏12315.6",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202112/gbom/6941487262038/428_428_F5608DB88FB841A47DFCE5A1E057CF0Amp.png",
      "prePrice": "8999",
      "price": "6999",
      "detailDesc": "",
      "createTime": "2022-06-12T05:38:21.000Z"
    },
    {
      "detailId": 2,
      "categoryId": 1,
      "categoryName": "",
      "parent": "6",
      "title": "小米6s",
      "descs": "小屏5g123",
      "titleImg": "https://res6.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png",
      "prePrice": "2199",
      "price": "699",
      "detailDesc": "",
      "createTime": "2022-06-12T05:38:21.000Z"
    },
    {
      "detailId": 1,
      "categoryId": 1,
      "categoryName": "",
      "parent": "6",
      "title": "华为",
      "descs": "大屏5g123",
      "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
      "prePrice": "8999",
      "price": "6999",
      "detailDesc": "120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC",
      "createTime": "2022-06-12T05:35:47.000Z"
    }
  ],
  "total": 38
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|true|none||none|
|»» categoryId|integer|true|none||none|
|»» categoryName|string|true|none||none|
|»» parent|string|true|none||none|
|»» title|string|true|none||none|
|»» descs|string|true|none||none|
|»» titleImg|string|true|none||none|
|»» prePrice|string|true|none||none|
|»» price|string|true|none||none|
|»» detailDesc|string|true|none||none|
|»» createTime|string|true|none||none|
|» total|integer|true|none||none|

## POST 添加商品

POST /api/back/add/shop

```text
暂无描述
```

> Body 请求参数

```yaml
title: 得到的
descs: "1313"
parent: "13123"
prePrice: "3131"
price: "123123"
detailDesc: "131231"
titleImg: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» title|body|string| 是 |名称|
|» descs|body|string| 是 |基本描述|
|» parent|body|string| 是 |所属分类|
|» prePrice|body|string| 是 |原价|
|» price|body|string| 是 |现价|
|» detailDesc|body|string| 是 |详细描述|
|» titleImg|body|string| 是 |图片|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功",
  "detailId": 52
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» detailId|integer|true|none||none|

## POST 添加商品轮播

POST /api/back/add/shop/swiper

```text
### 上架商品时
```

> Body 请求参数

```yaml
detailId: "-"
imgs: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |商品ID|
|» imgs|body|string| 是 |图片地址|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询指定商品信息或轮播

GET /api/back/select/shop/any/one

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|detailId|query|string| 是 |商品ID|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "detailId": 54,
      "categoryId": 0,
      "categoryName": "",
      "parent": "8",
      "title": "小米",
      "descs": "好啊",
      "titleImg": "http://localhost:3303/upload/Miraitowa1658052943096.jpeg",
      "prePrice": "5600",
      "price": "4300",
      "detailDesc": "苹果啊啊啊啊啊啊啊啊",
      "createTime": "2022-07-09T11:02:45.000Z"
    }
  ],
  "swiper": [],
  "dataTotal": 1,
  "swiperTotal": 0
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» detailId|integer|false|none||none|
|»» categoryId|integer|false|none||none|
|»» categoryName|string|false|none||none|
|»» parent|string|false|none||none|
|»» title|string|false|none||none|
|»» descs|string|false|none||none|
|»» titleImg|string|false|none||none|
|»» prePrice|string|false|none||none|
|»» price|string|false|none||none|
|»» detailDesc|string|false|none||none|
|»» createTime|string|false|none||none|
|» swiper|[string]|true|none||none|
|» dataTotal|integer|true|none||none|
|» swiperTotal|integer|true|none||none|

## GET 删除指定轮播

GET /api/back/delete/shop/swiper/any/one

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |轮播ID|

> 返回示例

> 成功

```json
{
  "code:200": null,
  "msg:\"删除成功\"": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 添加轮播

POST /api/back/add/shop/swiper/editor

```text
### 修改商品轮播时
```

> Body 请求参数

```yaml
detailId: "-"
imgs: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» detailId|body|string| 是 |商品ID|
|» imgs|body|string| 是 |图片地址|

> 返回示例

> 200 Response

```json
{}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

# 微商城项目/后台/上传图片

## POST 商品轮播图片上传

POST /api/back/upload

```text
参数  ？detailId=123
```

> Body 请求参数

```yaml
Miraitowa: C:\Users\薛林杰\Pictures\dev\404.png

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» Miraitowa|body|string| 否 |是|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "图片上传成功",
  "urlList": [
    "/upload/Miraitowa1657515610412.png",
    "/upload/Miraitowa1658272211199.png"
  ],
  "temp_pathList": [
    "http://localhost:3303/upload/Miraitowa1657515610412.png",
    "http://localhost:3303/upload/Miraitowa1658272211199.png"
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» urlList|[string]|true|none||none|
|» temp_pathList|[string]|true|none||none|

# 微商城项目/后台/用户信息

## POST 添加用户

POST /api/back/add/user

```text
暂无描述
```

> Body 请求参数

```yaml
name: "-"
username: "-"
password: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» name|body|string| 是 |昵称|
|» username|body|string| 是 |用户名|
|» password|body|string| 是 |密码|

> 返回示例

> 成功

```json
{
  "code:200": null,
  "msg:\"添加成功\"": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询所有用户

GET /api/back/all/user

```text
暂无描述
```

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "userId": 1,
      "username": "234",
      "password": "",
      "name": "李四",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": null,
      "email": "",
      "status": "1"
    },
    {
      "userId": 2,
      "username": "阿达",
      "password": "",
      "name": "",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": null,
      "email": "",
      "status": "1"
    },
    {
      "userId": 3,
      "username": "敖德萨多",
      "password": "",
      "name": "",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-12T01:50:10.000Z",
      "email": "",
      "status": "1"
    },
    {
      "userId": 4,
      "username": "123",
      "password": "123",
      "name": "测试1",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-12T03:07:26.000Z",
      "email": "",
      "status": "1"
    },
    {
      "userId": 5,
      "username": "123123",
      "password": "123123",
      "name": "测试1",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-12T03:08:15.000Z",
      "email": "",
      "status": "1"
    },
    {
      "userId": 6,
      "username": "456",
      "password": "456",
      "name": "测试2",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-12T03:15:32.000Z",
      "email": "",
      "status": "1"
    },
    {
      "userId": 7,
      "username": "678",
      "password": "678",
      "name": "测试3",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-12T03:15:45.000Z",
      "email": "",
      "status": "1"
    },
    {
      "userId": 8,
      "username": "111",
      "password": "111",
      "name": "你好世界",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-13T01:49:03.000Z",
      "email": "",
      "status": "1"
    }
  ],
  "total": 8
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» userId|integer|true|none||none|
|»» username|string|true|none||none|
|»» password|string|true|none||none|
|»» name|string|true|none||none|
|»» phone|string|true|none||none|
|»» avatar|string|true|none||none|
|»» sex|string|true|none||none|
|»» city|string|true|none||none|
|»» register_time|string¦null|true|none||none|
|»» email|string|true|none||none|
|»» status|string|true|none||none|
|» total|integer|true|none||none|

## GET 删除用户

GET /api/back/delete/user/any/one

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|string| 是 |用户ID|

> 返回示例

> 成功

```json
{
  "code:200": null,
  "msg:\"删除成功\"": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## POST 修改用户

POST /api/back/update/user

```text
暂无描述
```

> Body 请求参数

```yaml
userId: "-"
name: "-"
password: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» userId|body|string| 是 |用户ID|
|» name|body|string| 是 |昵称|
|» password|body|string| 是 |密码|

> 返回示例

> 成功

```json
{
  "code:200": null,
  "msg:\"修改成功\"": null
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

## GET 查询指定用户

GET /api/back/all/user/any/one

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|userId|query|string| 是 |用户ID|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "userId": 8,
      "username": "111",
      "password": "111",
      "name": "你好世界",
      "phone": "",
      "avatar": "https://api.helloxlj.top/public/static/file1653916611054493990198.jpg",
      "sex": "1",
      "city": "",
      "register_time": "2022-06-13T01:49:03.000Z",
      "email": "",
      "status": "1"
    }
  ]
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» userId|integer|false|none||none|
|»» username|string|false|none||none|
|»» password|string|false|none||none|
|»» name|string|false|none||none|
|»» phone|string|false|none||none|
|»» avatar|string|false|none||none|
|»» sex|string|false|none||none|
|»» city|string|false|none||none|
|»» register_time|string|false|none||none|
|»» email|string|false|none||none|
|»» status|string|false|none||none|

# 微商城项目/后台/订单接口

## POST 订单详情查询

POST /api/back/select/order/list/detail

```text
暂无描述
```

> Body 请求参数

```yaml
orderNumber: UzqQk0PMEnjeaBQOjt5gD

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "info": [
        {
          "name": "李四",
          "type": "3",
          "time": "2022-07-03T10:55:11.000Z",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "phone": "175383506123",
          "address": "天津市津南区海河教育园区",
          "totalPrice": 42093
        }
      ],
      "orderList": [
        {
          "orderId": 68,
          "singleTotalPrice": 14097,
          "type": "3",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "createTime": "2022-07-03T10:55:11.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 16,
          "num": 3,
          "price": 4699,
          "title": "HUAWEI P50E",
          "prePrice": "4499",
          "titleImg": "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487253319/428_428_A1A370ED9D04CF6DED31AA0B84C48FC0mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        },
        {
          "orderId": 69,
          "singleTotalPrice": 27996,
          "type": "3",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "createTime": "2022-07-03T10:55:11.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 1,
          "num": 4,
          "price": 6999,
          "title": "华为",
          "prePrice": "8999",
          "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        }
      ]
    }
  ],
  "total": 2
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» info|[object]|false|none||none|
|»»» name|string|false|none||none|
|»»» type|string|false|none||none|
|»»» time|string|false|none||none|
|»»» orderNumber|string|false|none||none|
|»»» phone|string|false|none||none|
|»»» address|string|false|none||none|
|»»» totalPrice|integer|false|none||none|
|»» orderList|[object]|false|none||none|
|»»» orderId|integer|true|none||none|
|»»» singleTotalPrice|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» orderNumber|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» sendTime|string|true|none||none|
|»»» pay|string|true|none||none|
|»»» detailId|integer|true|none||none|
|»»» num|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» title|string|true|none||none|
|»»» prePrice|string|true|none||none|
|»»» titleImg|string|true|none||none|
|»»» name|string|true|none||none|
|»»» phone|string|true|none||none|
|»»» detailAddress|string|true|none||none|
|» total|integer|true|none||none|

## POST 查询所有订单

POST /api/back/select/order/list

```text
暂无描述
```

> Body 请求参数

```yaml
type: "3"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» type|body|string| 否 |订单状态  2为待付款   3为待收货   为空时查询所有|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "name": "娃哈哈1",
      "type": "3",
      "createTime": "2022-07-03T11:57:18.000Z",
      "orderNumber": "EWmAiUEj2CWrV-LqffxQX",
      "totalPrice": 699,
      "orderList": [
        {
          "orderId": 75,
          "singleTotalPrice": 699,
          "type": "3",
          "orderNumber": "EWmAiUEj2CWrV-LqffxQX",
          "createTime": "2022-07-03T11:57:18.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 2,
          "num": 1,
          "price": 699,
          "title": "小米6s",
          "prePrice": "2199",
          "titleImg": "https://res6.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png",
          "name": "娃哈哈1",
          "phone": "1234567890",
          "detailAddress": "河南省郑州市二七区"
        }
      ]
    },
    {
      "name": "李四",
      "type": "3",
      "createTime": "2022-07-03T10:55:11.000Z",
      "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
      "totalPrice": 42093,
      "orderList": [
        {
          "orderId": 68,
          "singleTotalPrice": 14097,
          "type": "3",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "createTime": "2022-07-03T10:55:11.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 16,
          "num": 3,
          "price": 4699,
          "title": "HUAWEI P50E",
          "prePrice": "4499",
          "titleImg": "https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487253319/428_428_A1A370ED9D04CF6DED31AA0B84C48FC0mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        },
        {
          "orderId": 69,
          "singleTotalPrice": 27996,
          "type": "3",
          "orderNumber": "UzqQk0PMEnjeaBQOjt5gD",
          "createTime": "2022-07-03T10:55:11.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 1,
          "num": 4,
          "price": 6999,
          "title": "华为",
          "prePrice": "8999",
          "titleImg": "https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png",
          "name": "李四",
          "phone": "175383506123",
          "detailAddress": "天津市津南区海河教育园区"
        }
      ]
    },
    {
      "name": "莉莉",
      "type": "3",
      "createTime": "2022-07-03T11:39:45.000Z",
      "orderNumber": "1AODbb3xc0U5YzHD2C8F1",
      "totalPrice": 13495,
      "orderList": [
        {
          "orderId": 71,
          "singleTotalPrice": 8097,
          "type": "3",
          "orderNumber": "1AODbb3xc0U5YzHD2C8F1",
          "createTime": "2022-07-03T11:39:45.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 21,
          "num": 3,
          "price": 2699,
          "title": "HUAWEI MateBook 14s",
          "prePrice": "2499",
          "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487243563/428_428_C341573C94BAEB18069835528FE7C0A3mp.png",
          "name": "莉莉",
          "phone": "110",
          "detailAddress": "河南省南阳市"
        },
        {
          "orderId": 72,
          "singleTotalPrice": 5398,
          "type": "3",
          "orderNumber": "1AODbb3xc0U5YzHD2C8F1",
          "createTime": "2022-07-03T11:39:45.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 23,
          "num": 2,
          "price": 2699,
          "title": "华为智慧屏 SE 65 MEMC",
          "prePrice": "2499",
          "titleImg": "https://res1.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487264940/428_428_6E8DA488DAD823854834589C10745B78mp.png",
          "name": "莉莉",
          "phone": "110",
          "detailAddress": "河南省南阳市"
        }
      ]
    },
    {
      "name": "张三哈哈",
      "type": "3",
      "createTime": "2022-07-03T10:57:54.000Z",
      "orderNumber": "hNhH53eq94Rq_k0lxpMaH",
      "totalPrice": 13495,
      "orderList": [
        {
          "orderId": 70,
          "singleTotalPrice": 13495,
          "type": "3",
          "orderNumber": "hNhH53eq94Rq_k0lxpMaH",
          "createTime": "2022-07-03T10:57:54.000Z",
          "sendTime": "",
          "pay": "",
          "detailId": 30,
          "num": 5,
          "price": 2699,
          "title": "华为智慧屏 SE 65 MEMC",
          "prePrice": "2499",
          "titleImg": "https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487211173/428_428_601FD8B22DC814A48D6E944C1A28B575mp.png",
          "name": "张三哈哈",
          "phone": "175383536006",
          "detailAddress": "天津市津南区海河教育园区"
        }
      ]
    }
  ],
  "total": 4
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» name|string|true|none||none|
|»» type|string|true|none||none|
|»» createTime|string|true|none||none|
|»» orderNumber|string|true|none||none|
|»» totalPrice|integer|true|none||none|
|»» orderList|[object]|true|none||none|
|»»» orderId|integer|true|none||none|
|»»» singleTotalPrice|integer|true|none||none|
|»»» type|string|true|none||none|
|»»» orderNumber|string|true|none||none|
|»»» createTime|string|true|none||none|
|»»» sendTime|string|true|none||none|
|»»» pay|string|true|none||none|
|»»» detailId|integer|true|none||none|
|»»» num|integer|true|none||none|
|»»» price|integer|true|none||none|
|»»» title|string|true|none||none|
|»»» prePrice|string|true|none||none|
|»»» titleImg|string|true|none||none|
|»»» name|string|true|none||none|
|»»» phone|string|true|none||none|
|»»» detailAddress|string|true|none||none|
|» total|integer|true|none||none|

## POST 删除订单

POST /api/back/delete/order

```text
暂无描述
```

> Body 请求参数

```yaml
orderNumber: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» orderNumber|body|string| 是 |订单号|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除订单成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 微商城项目/后台/管理员

## POST 管理员登录

POST /api/back/login

```text
暂无描述
```

> Body 请求参数

```yaml
username: "111"
password: "111"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» username|body|string| 是 |用户名|
|» password|body|string| 是 |密码|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "登录成功",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IjExMSIsInBhc3N3b3JkIjoiMTExIiwiaWF0IjoxNjU3NTM4MzY4LCJleHAiOjE2NTc2MjQ3Njh9._v62795ikGK5xHjhnOqyvYlulC4p8_Ka58Ki67SfFWw"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» token|string|true|none||none|

# 微商城项目/后台/轮播接口

## GET 查询所有轮播

GET /api/back/select/index/swiper

```text
暂无描述
```

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "查询成功",
  "data": [
    {
      "id": 5,
      "imgs": "https://api.helloxlj.top/public/static/file1654265802627389491411.png"
    }
  ],
  "total": 1
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|
|» data|[object]|true|none||none|
|»» id|integer|false|none||none|
|»» imgs|string|false|none||none|
|» total|integer|true|none||none|

## POST 添加轮播

POST /api/back/add/editor/index/swiper

```text
暂无描述
```

> Body 请求参数

```yaml
imgs: "-"

```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|body|body|object| 否 |none|
|» imgs|body|string| 是 |图片地址|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "添加成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

## GET 删除轮播

GET /api/back/delete/index/swiper

```text
暂无描述
```

### 请求参数

|名称|位置|类型|必选|说明|
|---|---|---|---|---|
|id|query|string| 是 |轮播ID|

> 返回示例

> 成功

```json
{
  "code": 200,
  "msg": "删除成功"
}
```

### 返回结果

|状态码|状态码含义|说明|数据模型|
|---|---|---|---|
|200|[OK](https://tools.ietf.org/html/rfc7231#section-6.3.1)|成功|Inline|

### 返回数据结构

状态码 **200**

|名称|类型|必选|约束|中文名|说明|
|---|---|---|---|---|---|
|» code|integer|true|none||none|
|» msg|string|true|none||none|

# 数据模型

