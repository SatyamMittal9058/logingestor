const mongoose =require('mongoose');
const LogSchema=new mongoose.Schema({
    level:String,
    message:String,
    resourceId:String,
    timestamp:String,
    traceId:String,
    spanId:String,
    commit:String,
    metadata:{
        parentResourceId:String,
    }
})
const Logs=mongoose.model('Logs',LogSchema);
module.exports=Logs ;