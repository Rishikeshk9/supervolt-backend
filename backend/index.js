const express = require("express");
const cors = require('cors');
var mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
const PORT = process.env.PORT || 3030;



const app = express();
app.use(cors({
    origin: '*'
}));
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

require('dotenv').config();

const uri = process.env.ATLAS_URI;
mongoose.connect(uri).then(()=>{
    console.log('connected to mongodb')
}).catch((err)=>{
    console.log(err)
})
const dbName = 'directory'; 

 app.use("/api/stations", require("./routes/api/stations"));
app.use("/api/types", require("./routes/api/types"));
app.use("/api/vehicles", require("./routes/api/vehicles"));
app.use("/api/designations", require("./routes/api/designations"));

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
  });