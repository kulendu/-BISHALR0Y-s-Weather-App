const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const https = require('https');


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');



app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
    
});

app.post("/weather", function(req, res){
    var cityName = req.body.city;
    const apiKey = "6178a491287c0a7cef82793903be5460";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=metric&appid=" + apiKey;
    https.get(url, function(response){
        response.on("data", function(data){
            const weatherDetails =JSON.parse(data);
            console.log(weatherDetails);
            var data={
                temp: weatherDetails.main.temp, 
                feelsLike: weatherDetails.main.feels_like,
                maxTemp: weatherDetails.main.temp_max,
                minTemp: weatherDetails.main.temp_min,
                description: weatherDetails.weather[0].description
             }
             
                res.render('weather', data);
             
            
        });
    }); 
 
});



app.post("/", function(req, res){
    res.redirect("/");
});










app.listen(process.env.PORT || 3000, function(){
    console.log("The server is online and running in port 3000");
});


//api-key: 6178a491287c0a7cef82793903be5460
//url: api.openweathermap.org/data/2.5/weather?q={city name}&units=metric&appid={your api key}