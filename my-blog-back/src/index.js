// import from project
const { mongoose } = require("../src/config/data.Mongoose"); //import db
const app = require('./config/express');

// listen to requests
const port= process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listeningggggg to port ${port}, click http://localhost:${port}`)
})