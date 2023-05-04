const getData = (arr,parent,list,ids="detailId")=>{
  for(let x of  arr){
    if(x.parent == parent){
      list.push(x)
    }
  }
  for(let y of list){
    y.children = []
    getData(arr,y[ids],y.children)
    if(y.children.length==0) delete y.children 
  }
  return list.reverse()
}

module.exports = getData