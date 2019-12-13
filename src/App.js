const path = require('path');
const chalk = require('chalk');
const express = require('express');
const app = express();
const hbs = require('hbs');
const Port = (process.env.PORT || 3000); // Port Value for Heroku which will be provided by heroku. and a default value if we run it on machiine

const geocode = require('./Modules/geocode');
const getWeather = require('./Modules/getWeather');

// Define File Paths for Express Configuration
const pubDirPath = path.join(__dirname,'../Public');
const ViewPath = path.join(__dirname,'../Public/Templates/Views');
const partialsPath = path.join(__dirname,'../Public/Templates/Partials');

// Set up handlebar Engine and View Location
app.set('view engine','hbs');
app.set('views',ViewPath); 
// If not done then Views Folder must be in root dir and name of the folder should also be view and nothing else 
hbs.registerPartials(partialsPath);

// setup for static directory
app.use(express.static(pubDirPath));

app.get('',(req,res) => {
    res.render('index',{
        title : 'Home Page!!!',
        heading : 'Dynamic Weather App.',
        name : 'Krishna Sonawane.'
    });
});

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About Me.',
        heading : 'About Me.',
        name : 'Krishna Sonawane.'
    });
});

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help Page!!!',
        heading : 'Help Page.',
        name : 'Krishna Sonawane.'
    });
});

app.get('/weather',(req,res) => {
    if(!req.query.address){
        res.send({
            Error: "Error!!! Address Needs to Be Provided in Query String."
        });
    }else{
        geocode(req.query.address,(error,response) => {
            if(error){
                res.send({
                    Error : error
                })
            }else{
                getWeather(response.latitude,response.longitude,(error,data) => {
                    if(error){
                        res.send({
                            Error : error
                        });
                    }else{
                        res.send({
                            Location : response.place,
                            Latitude : response.latitude,
                            Longitude : response.longitude,
                            Temperature : data.body.currently.temperature + " °C",
                            Chances_Of_Rain : data.body.currently.precipProbability + "%"
                        });
                    }
                })
            }
        });
    }
});

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Not Found',
        heading : 'Page Not Found',
        name : 'Krishna Sonawane.',
        error : 'Error 404! Page Not found.'
    });
});

app.listen(Port,() => {
    console.log(chalk.black.bgGreen("Server Running at Port "+Port+"!!!"));
});