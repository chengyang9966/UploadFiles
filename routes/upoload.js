const upload=require('../middleware/upload');
const express =require('express');
const router =express.Router();

router.post("/upload",upload.single("file"),(req,res,next)=>{
    if(req.file===undefined) return res.send("You must select a file")
    const imgURL=`http:localhost:4200/file/${req.file.fieldname}`
    return res.send(imgURL)
})

module.exports=router;
