 import {IIndexData} from "./shop"
 interface IOrderDetail {
  createTime:string,
  name:string,
  orderNumber:string,
  totalPrice:string,
  type:string,
  detailId:number,
  checked:boolean,
  titleImg:string
  price:number,
  carId:number,
  tag?:string,
}


export interface IOrderData extends IOrderDetail{
  orderList?:IIndexData[]
}


export type ICarOrderData = IOrderDetail & IIndexData


//购物车订单提交参数
export interface ICarOrderParams {
  detailId: IOrderDetail[],
  userId:number,
  orderNumber:string
}


