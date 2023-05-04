const manyUploadRouter = require("express")()
const query = require("../../util/mysql2")
const multer  = require('multer')
const arr = []
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/upload')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()  + Math.round(Math.random() * 1E9)
    const type = file.originalname.split('.')[1]
    arr.push(file.fieldname  + uniqueSuffix+'.'+type)
    cb(null,file.fieldname  + uniqueSuffix+'.'+type)
  }
})

const upload = multer({ storage: storage }).array('Miraitowa',6)

// upload.array('photos', 12), 
manyUploadRouter.post('/upload', function (req, res) {
  const {detailId,id} = req.query
  console.log(id)
  if(!detailId && !id){
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
    	res.send({code:404,msg:"图片上传失败"})
    } else if (err) {
      res.send({code:404,msg:"图片上传失败"})
    }else{
      // console.log(req.files)
      const BASEURL = 'http://localhost:3303'
        const typeList = req.files.map(item=>item.originalname.split(".")[1])
        if(typeList.includes("gif")) return res.send({code:403,msg:"不能上传gif格式的图片"})
        const urlList = req.files.map(item=>"/upload/"+item.filename)
        const temp_pathList = urlList.map(item=>BASEURL+item)
        res.send({code:200,msg:"图片上传成功",urlList,temp_pathList})
    }
  })
}else if(Number(id)==123){
  console.log("laile--123")
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
    	res.send({code:404,msg:"图片上传失败"})
    } else if (err) {
      res.send({code:404,msg:"图片上传失败"})
    }else{
      const BASEURL = 'http://localhost:3303'
        const typeList = req.files?.map(item=>item.originalname.split(".")[1])
        if(typeList?.includes("gif")) return res.send({code:403,msg:"不能上传gif格式的图片"})
        const urlList = req.files?.map(item=>"/upload/"+item.filename)
        const temp_pathList = urlList?.map(item=>BASEURL+item)
        query(`insert into swiper (imgs) values('${temp_pathList[0]}')`,async(result)=>{
          if(result.length==false) res.send({code:404,msg:"图片上传失败"})
          res.send({code:200,msg:"图片上传成功",urlList,temp_pathList})
        })
    }
  })
  return 
}
else{
  console.log("laile--elses")
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
    	res.send({code:404,msg:"图片上传失败"})
    } else if (err) {
      res.send({code:404,msg:"图片上传失败"})
    }else{
      // console.log(req.files)
      const BASEURL = 'http://localhost:3303'
        const typeList = req.files?.map(item=>item.originalname.split(".")[1])
        if(typeList?.includes("gif")) return res.send({code:403,msg:"不能上传gif格式的图片"})
        const urlList = req.files?.map(item=>"/upload/"+item.filename)
        const temp_pathList = urlList?.map(item=>BASEURL+item)
        query(`insert into shopswiper (detailId,imgs) values('${detailId}','${temp_pathList[0]}')`,async(result)=>{
          if(result.length==false) res.send({code:404,msg:"图片上传失败"})
          res.send({code:200,msg:"图片上传成功",urlList,temp_pathList})
        })
    }
  })
}
})

// //上传至商品轮播中
// manyUploadRouter.post('/upload', function (req, res) {
//   const {detailId} = req.body
//   console.log(req)
//   console.log(detailId)
//   if(!detailId){
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//     	res.send({code:404,msg:"图片上传失败"})
//     } else if (err) {
//       res.send({code:404,msg:"图片上传失败"})
//     }else{
//       // console.log(req.files)
//       const BASEURL = 'http://localhost:3303'
//         const typeList = req.files.map(item=>item.originalname.split(".")[1])
//         if(typeList.includes("gif")) return res.send({code:403,msg:"不能上传gif格式的图片"})
//         const urlList = req.files.map(item=>"/upload/"+item.filename)
//         const temp_pathList = urlList.map(item=>BASEURL+item)
//         res.send({code:200,msg:"图片上传成功",urlList,temp_pathList})
//     }
//   })
// }else{
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//     	res.send({code:404,msg:"图片上传失败"})
//     } else if (err) {
//       res.send({code:404,msg:"图片上传失败"})
//     }else{
//       // console.log(req.files)
//       const BASEURL = 'http://localhost:3303'
//         const typeList = req.files.map(item=>item.originalname.split(".")[1])
//         if(typeList.includes("gif")) return res.send({code:403,msg:"不能上传gif格式的图片"})
//         const urlList = req.files.map(item=>"/upload/"+item.filename)
//         const temp_pathList = urlList.map(item=>BASEURL+item)
//         query(`insert into (detailId,imgs) values('${detailId}','${temp_pathList[0]}')`,result=>{
//           if(result.length==false) res.send({code:404,msg:"图片上传失败"})
//           res.send({code:200,msg:"图片上传成功",urlList,temp_pathList})
//         })
//     }
//   })
// }
// })
module.exports = manyUploadRouter

