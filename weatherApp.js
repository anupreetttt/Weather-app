const express = require("express");
const https = require("https");

const app = express();


app.get("/", function(req, res){
    res.send("Server is working");
})





app .listen(3000, function(){
    console.log("Server is working");
})