import React from 'react'
import style from "./style/index.module.scss"
import { NavLink } from 'react-router-dom'
import {GithubOutlined} from '@ant-design/icons';

export default function Footer() {
  const data = [
    { title: "百强企业 品质保证", icon: "https://res.vmallres.com/uomcdn/CN/cms/202203/35029C2650265248A5C45BC46E0D7578.png" },
    { title: "7天退货 15天换货", icon: "https://res.vmallres.com/uomcdn/CN/cms/202203/848285C26D6B91405D84D71CC8D738F2.png" },
    { title: "48元起免运费", icon: "https://res.vmallres.com/uomcdn/CN/cms/202203/09CE412E94E10830D00A2487756EBEE4.png" },
    { title: "2000家服务店 全国联保", icon: "https://res.vmallres.com/uomcdn/CN/cms/202203/EABCAA990C477793FB6F09658BF80B82.png" },
  ]
  return (
    <div className={style.footer}>
      <div className={style.top}>
        {data.map(item => (
          <p key={item.title}>
            <img src={item.icon} alt="" />
            <span>{item.title}</span>
          </p>
        ))}
      </div>
      <div className={style.center}>
        <div className={style.github}><GithubOutlined onClick={()=>window.open("https://github.com/boyxlj/small_shop_pre")} className={style.gitLogo} /></div>
        <div className={style.links}>
        <NavLink to="/">商城首页</NavLink><span>|</span>
        <NavLink to="goods">全部商品</NavLink><span>|</span>
        <NavLink to="/about">关于微商城</NavLink>
        </div>
        <p className={style.ba}>备案号:  <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"> 津ICP备2021007424号-1</a></p>
        <div className={style.copy}>
           Small-Shop 微商城 © 2021-{new Date().getFullYear()} Promise helloxlj.top All Rights Reserved
        </div>
      </div>
    </div>
  )
}
