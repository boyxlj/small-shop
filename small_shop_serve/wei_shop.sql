-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1:3307
-- 生成日期： 2022-07-04 04:51:15
-- 服务器版本： 10.4.24-MariaDB
-- PHP 版本： 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `wei_shop`
--

-- --------------------------------------------------------

--
-- 表的结构 `address`
--

CREATE TABLE `address` (
  `addressId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `city` varchar(100) NOT NULL,
  `detailAddress` varchar(200) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收货地址表';

--
-- 转存表中的数据 `address`
--

INSERT INTO `address` (`addressId`, `createTime`, `userId`, `name`, `phone`, `city`, `detailAddress`, `type`) VALUES
(1, '2022-06-17 08:10:42', 8, '康康1', '15937750854', 'undefined', '北京市海淀区', '0'),
(2, '2022-06-17 08:11:43', 8, '李四', '175383506123', 'undefined', '天津市津南区海河教育园区', '0'),
(3, '2022-06-17 08:12:02', 8, '张三哈哈', '175383536006', 'undefined', '天津市津南区海河教育园区', '0'),
(7, '2022-06-18 06:09:34', 8, '李四11', '21313313', 'undefined', '天津市', '0'),
(8, '2022-06-18 06:09:53', 8, '张三啊', '21312313123', 'undefined', '上海市', '0'),
(9, '2022-07-02 23:22:52', 8, '莉莉', '110', 'undefined', '河南省南阳市', '0'),
(10, '2022-07-03 11:48:18', 4, '娃哈哈1', '1234567890', 'undefined', '河南省郑州市二七区', '1');

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `avatar` varchar(50) NOT NULL,
  `sex` varchar(50) NOT NULL DEFAULT '1',
  `city` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT '1',
  `createTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员信息表';

-- --------------------------------------------------------

--
-- 表的结构 `car`
--

CREATE TABLE `car` (
  `carId` int(11) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `detailId` int(50) NOT NULL,
  `userId` int(50) NOT NULL,
  `num` int(100) DEFAULT 1,
  `price` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='购物车';

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `parent` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品分类表';

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`categoryId`, `name`, `parent`) VALUES
(1, '手机', 0),
(2, '相机', 0),
(3, '电脑', 0),
(4, '电视机', 0),
(5, '空调', 0),
(6, '洗衣机', 0);

-- --------------------------------------------------------

--
-- 表的结构 `collect`
--

CREATE TABLE `collect` (
  `collectId` int(11) NOT NULL,
  `collectTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `userId` int(50) NOT NULL,
  `detailId` int(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='收藏表';

--
-- 转存表中的数据 `collect`
--

INSERT INTO `collect` (`collectId`, `collectTime`, `userId`, `detailId`) VALUES
(3, '2022-06-12 07:38:24', 6, 3),
(7, '2022-06-12 08:12:21', 3, 3),
(20, '2022-06-14 12:22:06', 4, 21),
(23, '2022-06-14 12:23:12', 4, 2),
(29, '2022-06-14 12:32:14', 8, 44),
(30, '2022-06-14 13:47:32', 8, 45),
(31, '2022-06-14 13:49:19', 8, 42),
(33, '2022-06-15 08:54:14', 8, 1),
(34, '2022-06-15 11:43:33', 8, 31);

-- --------------------------------------------------------

--
-- 表的结构 `orderdetail`
--

CREATE TABLE `orderdetail` (
  `orderId` int(11) NOT NULL,
  `userId` int(50) NOT NULL,
  `addressId` int(50) NOT NULL,
  `type` varchar(50) NOT NULL DEFAULT '1',
  `createTime` timestamp NOT NULL DEFAULT current_timestamp(),
  `pay` varchar(50) NOT NULL,
  `payTime` varchar(100) NOT NULL,
  `sendTime` varchar(100) NOT NULL,
  `detailId` int(50) NOT NULL,
  `orderNumber` varchar(50) NOT NULL,
  `payNumber` varchar(50) NOT NULL,
  `num` int(250) NOT NULL,
  `price` int(250) NOT NULL,
  `singleTotalPrice` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='订单详情表';

--
-- 转存表中的数据 `orderdetail`
--

INSERT INTO `orderdetail` (`orderId`, `userId`, `addressId`, `type`, `createTime`, `pay`, `payTime`, `sendTime`, `detailId`, `orderNumber`, `payNumber`, `num`, `price`, `singleTotalPrice`) VALUES
(68, 8, 2, '3', '2022-07-03 10:55:11', '', '', '', 16, 'UzqQk0PMEnjeaBQOjt5gD', '', 3, 4699, 14097),
(69, 8, 2, '3', '2022-07-03 10:55:11', '', '', '', 1, 'UzqQk0PMEnjeaBQOjt5gD', '', 4, 6999, 27996),
(70, 8, 3, '3', '2022-07-03 10:57:54', '', '', '', 30, 'hNhH53eq94Rq_k0lxpMaH', '', 5, 2699, 13495),
(71, 8, 9, '3', '2022-07-03 11:39:45', '', '', '', 21, '1AODbb3xc0U5YzHD2C8F1', '', 3, 2699, 8097),
(72, 8, 9, '3', '2022-07-03 11:39:45', '', '', '', 23, '1AODbb3xc0U5YzHD2C8F1', '', 2, 2699, 5398),
(75, 4, 10, '3', '2022-07-03 11:57:18', '', '', '', 2, 'EWmAiUEj2CWrV-LqffxQX', '', 1, 699, 699);

-- --------------------------------------------------------

--
-- 表的结构 `shopdetail`
--

CREATE TABLE `shopdetail` (
  `detailId` int(11) NOT NULL,
  `categoryId` int(50) NOT NULL,
  `categoryName` varchar(50) NOT NULL,
  `parent` varchar(50) DEFAULT NULL,
  `title` varchar(50) NOT NULL,
  `descs` varchar(200) NOT NULL,
  `titleImg` varchar(1000) NOT NULL,
  `prePrice` varchar(50) NOT NULL,
  `price` varchar(50) NOT NULL,
  `detailDesc` varchar(2000) NOT NULL,
  `createTime` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品详情表';

--
-- 转存表中的数据 `shopdetail`
--

INSERT INTO `shopdetail` (`detailId`, `categoryId`, `categoryName`, `parent`, `title`, `descs`, `titleImg`, `prePrice`, `price`, `detailDesc`, `createTime`) VALUES
(1, 1, '', '6', '华为', '大屏5g123', 'https://res5.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487261369/428_428_7A92945BBD883E9D61A9606C7CEDC778mp.png', '8999', '6999', '120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速6400万前后六摄 / 6.6120Hz高帧率流速屏/ 索尼6400万前后六摄 / 6.67\'小孔径全面屏 / 最高可选8GB+256GB大存储 / 高通骁龙730G处理器 / 3D四曲面玻璃机身 / 4500mAh+27W快充 / 多功能NFC', '2022-06-12 05:35:47'),
(2, 1, '', '6', '小米6s', '小屏5g123', 'https://res6.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png', '2199', '699', '', '2022-06-12 05:38:21'),
(3, 2, '', '7', '华为电脑1', '大屏12315.6', 'https://res5.vmallres.com/pimages/uomcdn/CN/pms/202112/gbom/6941487262038/428_428_F5608DB88FB841A47DFCE5A1E057CF0Amp.png', '8999', '6999', '', '2022-06-12 05:38:21'),
(4, 1, '', '6', '苹果13', '大屏1235g，高分辨率', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487235780/428_428_13F0DCAEF75D98517492F714F0B9A177mp.png', '6999', '4399', '', '2022-06-12 05:38:21'),
(5, 2, '', '7', 'Mac', '大屏123', 'https://res8.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png', '19999', '9999', '', '2022-06-12 05:38:21'),
(6, 0, '手机', NULL, '', '', '', '', '', '', '2022-06-12 05:54:00'),
(7, 0, '电脑', NULL, '', '', '', '', '', '', '2022-06-12 05:55:36'),
(8, 0, '路由器', NULL, '', '', '', '', '', '', '2022-06-12 06:31:43'),
(10, 0, '手环', NULL, '', '', '', '', '', '', '2022-06-12 06:33:50'),
(12, 0, '相机', NULL, '', '', '', '', '', '', '2022-06-12 06:44:03'),
(13, 0, '', '6', 'Redmi K40S  1799元起 ', '口碑真旗舰 智能穿戴', 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/28febc579eaea6b07c96c0ec48b89f7a.jpg?thumb=1&w=250&h=25', '', '', '', '2022-06-13 10:52:47'),
(14, 0, '', '6', 'nova 9 系列', '高性能', 'https://res2.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png', '2999', '2699', '', '2022-06-14 01:05:53'),
(15, 0, '', '6', 'nova 9 系列', '高性能', 'https://res2.vmallres.com/pimages/product/6941487236916/428_428_91912968C8D4646CC08A14346A175E3CBF1844EB9FE11118mp.png', '2999', '2699', '', '2022-06-14 01:06:04'),
(16, 0, '', '6', 'HUAWEI P50E', '预订省50元|尾款12期免息', 'https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487253319/428_428_A1A370ED9D04CF6DED31AA0B84C48FC0mp.png', '4499', '4699', '', '2022-06-14 01:16:51'),
(17, 0, '', '6', 'HUAWEI P50 Pro ', '8GB+256GB 星河蓝', 'https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487256372/428_428_49DE1CE8BEB62D268EE95B8FE2E416FFmp.png', '4499', '4699', '', '2022-06-14 01:16:51'),
(18, 0, '', '6', '华为畅享 50 ', '新品预订省50元|晒单抽水杯', 'https://res2.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png', '4249', '4499', '', '2022-06-14 01:16:51'),
(19, 0, '', '6', 'HUAWEI nova 9 Pro ', '限时直降300', 'https://res7.vmallres.com/pimages/product/6941487236541/428_428_FEFF272C0ACD787A29C40D83FB75F09F6A6F5303F3C06654mp.png', '2499', '2699', '', '2022-06-14 01:16:51'),
(20, 0, '', '6', 'nova 9 SE ', '赠充电器|直降50元', 'https://res2.vmallres.com/pimages/uomcdn/CN/pms/202206/gbom/6941487255092/428_428_CD14ACEE1DBD4E04C65BC2380BC9989Bmp.png', '2349', '2599', '', '2022-06-14 01:16:51'),
(21, 0, '', '7', 'HUAWEI MateBook 14s', '1代酷睿标压处理器 i5 16GB 512GB 2.5K触控全面屏 ', 'https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487243563/428_428_C341573C94BAEB18069835528FE7C0A3mp.png', '2499', '2699', '', '2022-06-14 01:16:51'),
(22, 0, '', '7', 'MateBook D 14 2022款', '预订省300｜享3期免息', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487239511/428_428_E0AFB3C16007C7DC5B495D8E071D159Dmp.png', '2499', '2699', '', '2022-06-14 01:16:51'),
(23, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487264940/428_428_6E8DA488DAD823854834589C10745B78mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(24, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res5.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487233328/428_428_377A883BEF8846E33089A10191655077mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(25, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487210169/428_428_DCA9929CCA8B17006663DFF9596765B3mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(26, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487210169/428_428_DCA9929CCA8B17006663DFF9596765B3mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(27, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res2.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487217007/428_428_8BD0A5A1BEA7E2C90B92724240BFD351mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(28, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487233342/428_428_703C5377E6C17B3C7639B50CD236F5E0mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(29, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res6.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487224142/428_428_338AF1445F12DD9C81784B094710EBA4mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(30, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487211173/428_428_601FD8B22DC814A48D6E944C1A28B575mp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(31, 0, '', '8', '华为智慧屏 SE 65 MEMC', '莱茵护眼 HarmonyOS', 'https://res3.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487217014/428_428_AFDFF6955E372A89187A0029FCB13EBEmp.png', '2499', '2699', '', '2022-06-14 01:22:07'),
(32, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res2.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487249428/428_428_D0425B49F36377EBC15687B3E52E955Amp.png', '2499', '2699', '', '2022-06-14 01:22:52'),
(33, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res7.vmallres.com/pimages/product/6941487224364/428_428_EF8C02B11B0053549E1A0766706AFB8910ED4B828F655657mp.png', '2499', '2699', '', '2022-06-14 01:22:52'),
(34, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res5.vmallres.com/pimages/uomcdn/CN/pms/202202/gbom/6941487220687/428_428_A317C546F298036E9BE20B8D30378A3Dmp.png', '2499', '2699', '', '2022-06-14 01:22:52'),
(35, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res4.vmallres.com/pimages/uomcdn/CN/pms/202202/gbom/6941487214921/428_428_F97868B124B91DB759E822F748AAF767mp.png', '2499', '2699', '', '2022-06-14 01:22:52'),
(36, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202204/gbom/6941487260522/428_428_98F4C26BB746ABFA1687C9ED26E63E8Amp.png', '2499', '2699', '', '2022-06-14 01:24:21'),
(37, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res8.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487245703/428_428_FA332C84941E42AC0E0F00EFACAC7567mp.png', '2499', '2699', '', '2022-06-14 01:24:21'),
(38, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res6.vmallres.com/pimages/product/6972453165985/428_428_93BCD651C90D2B5EFD779DB353F1A2E36DFAE529FA49026Emp.png', '2499', '2699', '', '2022-06-14 01:24:21'),
(39, 0, '', '10', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://res1.vmallres.com/pimages/uomcdn/CN/pms/202205/gbom/6941487201433/428_428_8090B052C4EF1A9A3EACEA95383CB6D9mp.png', '2499', '2699', '', '2022-06-14 01:24:21'),
(40, 0, '', '6', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://openfile.meizu.com/group1/M00/08/D8/Cgbj0WFD_MGADSsqAAfmpmbsmOI365.png@480x480.jpg', '2499', '2699', '', '2022-06-14 01:30:45'),
(41, 0, '', '6', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://openfile.meizu.com/group1/M00/08/DC/Cgbj0WFESyqAKb8gAAKGwY7jH6k807.png@480x480.jpg', '2499', '2699', '', '2022-06-14 01:31:54'),
(42, 0, '', '6', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://openfile.meizu.com/group1/M00/08/DC/Cgbj0WFETByAf6j8AAOqMS-Erfk097.png@480x480.jpg', '2499', '2699', '', '2022-06-14 01:31:54'),
(43, 0, '', '6', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://openfile.meizu.com/group1/M00/08/75/Cgbj0WA-HaGAfAzXAAaBocwqRik813.png@480x480.jpg', '2499', '2699', '', '2022-06-14 01:31:54'),
(44, 0, '', '6', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://openfile.meizu.com/group1/M00/08/73/Cgbj0GBZn_CAEKgxAAf6NjETDZY827.png@480x480.jpg', '2499', '2699', '', '2022-06-14 01:31:54'),
(45, 0, '', '6', 'HUAWEI WATCH GT 3 Pro', '莱茵护眼 HarmonyOS', 'https://openfile.meizu.com/group1/M00/09/14/Cgbj0GHeNiCAOP4XAA53a1iUygY459.png@480x480.jpg', '2499', '2699', '', '2022-06-14 01:31:54');

-- --------------------------------------------------------

--
-- 表的结构 `shopswiper`
--

CREATE TABLE `shopswiper` (
  `id` int(11) NOT NULL,
  `detailId` int(50) NOT NULL,
  `imgs` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='商品详情轮播图';

--
-- 转存表中的数据 `shopswiper`
--

INSERT INTO `shopswiper` (`id`, `detailId`, `imgs`) VALUES
(1, 1, 'http://101.132.181.9:3000/public/imgs/phone/Redmi-k30.png\r\n'),
(2, 1, 'http://101.132.181.9:3000/public/imgs/phone/picture/Redmi-k30-5.png'),
(3, 1, 'http://101.132.181.9:3000/public/imgs/phone/picture/Redmi-k30-4.png'),
(4, 1, 'http://101.132.181.9:3000/public/imgs/phone/picture/Redmi-k30-1.png');

-- --------------------------------------------------------

--
-- 表的结构 `swiper`
--

CREATE TABLE `swiper` (
  `id` int(11) NOT NULL,
  `imgs` varchar(1000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='首页轮播图';

--
-- 转存表中的数据 `swiper`
--

INSERT INTO `swiper` (`id`, `imgs`) VALUES
(1, 'https://res.vmallres.com/uomcdn/CN/cms/202206/B4420FCAA97863871803BD3B20E8E799.jpg'),
(2, 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/ab68a46dca21775807ab861d48a26320.jpg?thumb=1&w=1533&h=575&f=webp&q=90'),
(3, 'https://res.vmallres.com/uomcdn/CN/cms/202206/3E08FB452A4D7D1CAC65F3D6F56F430A.png'),
(4, 'https://res.vmallres.com/uomcdn/CN/cms/202205/12ECC885513BF79F8C285DCCCD8AD68A.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE `user` (
  `userId` int(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `phone` varchar(50) NOT NULL,
  `avatar` varchar(100) NOT NULL DEFAULT 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg',
  `sex` varchar(50) NOT NULL DEFAULT '1',
  `city` varchar(50) NOT NULL,
  `register_time` timestamp NULL DEFAULT current_timestamp(),
  `email` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户表';

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`userId`, `username`, `password`, `name`, `phone`, `avatar`, `sex`, `city`, `register_time`, `email`, `status`) VALUES
(1, '234', '', '李四', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '0000-00-00 00:00:00', '', '1'),
(2, '阿达', '', '', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '0000-00-00 00:00:00', '', '1'),
(3, '敖德萨多', '', '', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '2022-06-12 01:50:10', '', '1'),
(4, '123', '123', '测试1', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '2022-06-12 03:07:26', '', '1'),
(5, '123123', '123123', '测试1', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '2022-06-12 03:08:15', '', '1'),
(6, '456', '456', '测试2', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '2022-06-12 03:15:32', '', '1'),
(7, '678', '678', '测试3', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '2022-06-12 03:15:45', '', '1'),
(8, '111', '111', '你好世界', '', 'https://api.helloxlj.top/public/static/file1653916611054493990198.jpg', '1', '', '2022-06-13 01:49:03', '', '1');

--
-- 转储表的索引
--

--
-- 表的索引 `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`addressId`);

--
-- 表的索引 `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `car`
--
ALTER TABLE `car`
  ADD PRIMARY KEY (`carId`);

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryId`);

--
-- 表的索引 `collect`
--
ALTER TABLE `collect`
  ADD PRIMARY KEY (`collectId`);

--
-- 表的索引 `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD PRIMARY KEY (`orderId`);

--
-- 表的索引 `shopdetail`
--
ALTER TABLE `shopdetail`
  ADD PRIMARY KEY (`detailId`);

--
-- 表的索引 `shopswiper`
--
ALTER TABLE `shopswiper`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `swiper`
--
ALTER TABLE `swiper`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userId`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `address`
--
ALTER TABLE `address`
  MODIFY `addressId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用表AUTO_INCREMENT `car`
--
ALTER TABLE `car`
  MODIFY `carId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `categoryId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- 使用表AUTO_INCREMENT `collect`
--
ALTER TABLE `collect`
  MODIFY `collectId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- 使用表AUTO_INCREMENT `orderdetail`
--
ALTER TABLE `orderdetail`
  MODIFY `orderId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- 使用表AUTO_INCREMENT `shopdetail`
--
ALTER TABLE `shopdetail`
  MODIFY `detailId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- 使用表AUTO_INCREMENT `shopswiper`
--
ALTER TABLE `shopswiper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `swiper`
--
ALTER TABLE `swiper`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- 使用表AUTO_INCREMENT `user`
--
ALTER TABLE `user`
  MODIFY `userId` int(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
