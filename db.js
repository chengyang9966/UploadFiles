const mongoose=require('mongoose');
const mongURI=require('./mongooURI');
module.exports= async function connection(){
    try {
        const connnectionParam={
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
          }
        await mongoose.connect(mongURI,connnectionParam)
        console.log('Connected to Database')
    } catch (error) {
        console.log(error);
        console.log('Could not Connect to Database');
    }
}