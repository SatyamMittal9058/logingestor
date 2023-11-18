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
const logs=mongoose.model('log',LogSchema);
module.exports=logs ;