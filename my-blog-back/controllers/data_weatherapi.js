const config= require("config");//Information storage - hidden, config
const request = require('request'); //possible to make http calls


const dataWeatherapi = async (req,res,next) =>{
    //https://www.weatherapi.com/docs/    
    const {dataCountry} = req.body;
    const URL= `http://api.weatherapi.com/v1/forecast.json?q=${dataCountry}&key=${config.get("KEY_WEATHER")}`;
  
    if(!dataCountry){ //User does not write anything in the field of the input
        return res.status(400).json({mes: "לא התקבל עיר"})
    };

    try{
        request(URL, function (error, response, body) {
            if (error) {
                return res.status(500).json({ mes: "Internal server error" }); // Handle the error
            };
        
            if (response.statusCode !== 200) {
                return res.status(404).json({ mes: "Not found" });
            };
            
            let data = JSON.parse(body);
            res.status(200).json({ mes: data });
        });
    }catch(err) {
        res.status(400).send(err).json({mes:err})
    };
};


exports.dataWeatherapi = dataWeatherapi;