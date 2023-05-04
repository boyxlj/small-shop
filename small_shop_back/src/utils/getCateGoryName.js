
export const getCateGoryName = (list,id)=>{
  if(list.length && id){
    const res = list?.filter(item=>item.detailId==id)
    return res[0].categoryName
  }else{
    return "数据异常"
  }
}

