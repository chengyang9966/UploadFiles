const express =require('express');
const connection = require('./db');
const upload=require('./routes/upoload');
const mongoose=require('mongoose');
// const Image = require('./Models/Image');
const methodOverride = require('method-override');
let Grid = require('gridfs-stream');

let gfs;
connection();
const conn=mongoose.connection;
conn.once("open",()=>{
  gfs=Grid(conn.db,mongoose.mongo);
  gfs.collection("photos");
})




// MiddleWear 

const app=express();
app.set('view engine','ejs');
app.use(express.json());
app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin' , 'http://localhost:4200');
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append("Access-Control-Allow-Headers", "Origin, Accept,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  res.append('Access-Control-Allow-Credentials', true);
  next();
});
app.use("/file",upload);
app.use(methodOverride('_method'));


// Route GET
// desc Loads form
app.get('/',(req,res)=>{
    res.render('index')
})

app.get("file/:filename",async(req,res,next)=>{
try {
  const file=await gfs.file.findOne({filname:req.params.filename});
  const readStream=gfs.createReadStream(file.filename);
  readStream.pipe(res)
} catch (error) {
  res.send('not found')
}
})

app.delete("file/:filename",async(req,res,next)=>{
  try {
    await gfs.files.delete({filname:req.params.filename})
    res.send("succss")
  } catch (error) {
    res.send("an error occur")
  }
})
// POST Upload
// desc Upload file to db

app.get('/images',(req,res)=>{
    Image.find().
    then((images)=>{
        return res.json({"status":'200',data:images})
    })
})

app.listen(4200,()=>console.log(`App listen at ${4200}`))