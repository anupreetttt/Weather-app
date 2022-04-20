const express = require("express");
const https = require("https");

const app = express();

app.get("/", function (req, res) {

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=36250669e4f7a660e4f5c82806699d60&units=metric"

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
            res.write("<h2>Weather in Chicago is: " + temprature + " C</h2>")
            res.write("<img src=" + imgURL +">");
            res.send();
        })
    });
})


app.listen(3000, function () {
    console.log("Server is working at port 3000");
})