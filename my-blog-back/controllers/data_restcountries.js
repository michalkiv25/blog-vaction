const request = require('request'); //possible to make http calls



const restcountries = async (req,res,next) =>{
    const { country } = req.body

    const apiUrl = `https://restcountries.com/v3.1/name/${country}?language=he`;

    try{
        request(apiUrl, function (error, response, body) {
            if (error) {
                return res.status(500).json({ mes: "Internal server error" }); // Handle the error
            };
        
            if (response.statusCode !== 200) {
                return res.status(404).json({ mes: "Not found" });
            };
            
            let data = JSON.parse(body);
            let chinaData = data.find(country => country.name.common === 'China');
            let capital;
            if(chinaData != undefined)
                capital = chinaData.capital[0];
            else 
                capital = data[0].capital[0];
            
            const region = data[0]?.region;
            const  timezones = data[0]?.timezones[0];

            res.status(200).json({ region: region, timezones:timezones, capital:capital });
        });

    }catch(err) {
        res.status(400).send(err).json({mes:err})
    };
};


exports.restcountries = restcountries;


// const axios = require('axios');
// const translate = require('translate-google');
// const request = require('request');


// const restcountries = async (req, res, next) => {
//     const { country } = req.body;
//     const apiUrl = https://restcountries.com/v3.1/name/${country}?language=he;

//     async function translateToHebrew(text) {
//         try {
//             const res = await translate(text, { to: 'iw' }); // 'iw' is the code for Hebrew
//             return res.text;
//         } catch (error) {
//             console.error('Translation Error:', error.message);
//             return text; // Return original text in case of an error
//         }
//     }

//     try {
//         request(apiUrl, function (error, response, body) {
//             if (error) {
//                 return res.status(500).json({ mes: "Internal server error" });
//             }

//             if (response.statusCode !== 200) {
//                 return res.status(404).json({ mes: "Not found" });
//             }

//             const data = JSON.parse(body);

//             // Note: translateToHebrew is an async function, so you need to await its result
//             translateToHebrew(data[0].capital[0]).then(capitalHeb => {
//                 const regionHeb = data[0].region;
//                 const languagesHeb = data[0].languages;
//                 const timezones = data[0].timezones[0];

//                 res.status(200).json({ capitalHeb, regionHeb, languagesHeb, timezones });
//             });
//         });
//     } catch (err) {
//         res.status(400).json({ mes: err.message });
//     }
// };