const express = require("express");
const https = require("https");
const ejs = require("ejs");

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static("public"))

app.set("view engine", "ejs");

app.get("/", function(req,res){
    res.render("homepage")
});

app.post("/", function(req,res){
    const city = req.body.cityName;

    const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4b559d9be9e3b6c13b0154a8804ee491&units=metric`
    
    https.get(api, function(response){
        console.log(response.statusCode);
        if(response.statusCode === 200 ){
            response.on("data", function(d){
                const weather = JSON.parse(d);
                const temp = weather.main.temp;
                const description = weather.weather[0].description;
                const icon = weather.weather[0].icon;
    
                res.render("result", {city: city,temp: temp, desc: description, icon: icon})
            })    
        }else{
            res.render("oops");
        }
    })
})

app.listen(process.env.PORT || 3000, function(){
    console.log("This serever is running on port 3000 ...");
})