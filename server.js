const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const mongoose = require("mongoose");
require('dotenv').config();
const Log = require("./models/Logschema");



mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("connected", () => {
    console.log("Mongodb connected successfully");
})



const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 4000;



app.post('/logs', async (req, res) => {
    const data=req.body;
    let log = new Log(data);
    
    const doc = await log.save();
    res.json(doc);
})
app.post('/search', async (req, res) => {
    let query = {};

    if (req.body.level) {
        query.level = req.body.level;
    }
    if (req.body.message) {
        query.message = req.body.message;
    }
    if (req.body.resourceId) {
        query.resourceId = req.body.resourceId;
    }
    if (req.body.timestamp) {
        query.timestamp = req.body.timestamp;
    }
    if (req.body.traceId) {
        query.traceId = req.body.traceId;
    }
    if (req.body.spanId) {
        query.spanId = req.body.spanId;
    }
    if (req.body.commit) {
        query.commit = req.body.commit;
    }
    if (req.body.parentResourceId) {
        query['metadata.parentResourceId'] = req.body.parentResourceId;
    }
    // console.log(req.body)
    const getlogs = await Log.find(query);
    res.json(getlogs);
})




app.listen(4000);



