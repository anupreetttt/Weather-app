const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){
    // console.log(req.body.cityy);
    const location = req.body.cityy;
    const keyApi = "36250669e4f7a660e4f5c82806699d60";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + location + "&appid=" + keyApi + "&units=" + unit;
    
    https.get(url, function (response) {
        console.log(response.statusCode);
    
        response.on("data", function(data){
            const weather = JSON.parse(data)
            const temprature = weather.main.temp;
            const weatherDes = weather.weather[0].description;
            const icon = weather.weather[0].icon
            const imgURL = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
            console.log("Currently, it is " + weatherDes);
            console.log("Weather is " + temprature + " C");
            res.write("<p>Currently it is, " + weatherDes + ".</p>")
            res.write("<h2>Weather in " + req.body.cityy + " is: " + temprature + " C</h2>")
            res.write("<img src=" + imgURL +">");
            res.send();
        })
    });
    

})


app.listen(3000, function () {
    console.log("Server is working at port 3000");
})