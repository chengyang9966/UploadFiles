const multer=require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const mongURI=require('../mongooURI')
const storage = new GridFsStorage({
    url:mongURI,
    options:{ useNewUrlParser: true,
        useUnifiedTopology: true,},
        file:(req,file)=>{
            const match=["image/png","image/jpeg","image/svg"];
            if(match.indexOf(file.mimetype)===-1){
                const filename=`${Date.now()}-${file.originalname}`
                return filename
            }

            return{
                bucketName:'photos',
                filename:`${Date.now()}-${file.originalname}`
            }
        }
})

module.exports=multer({storage})