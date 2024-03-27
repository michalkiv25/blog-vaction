[8:55, 21.2.2024] מיכאלה נעם: const mongoose = require('mongoose');
const Joi = require("joi"); //Validation

// email, subject, message

const contactSchema = new mongoose.Schema({
    name: {

    },
    email: {
        type:String,
        // require:true,
        // minlength: 2,
        // maxlength: 255,
        // trim:true
    },
    number:{
        type:String,
        // require:true,
        // minlength: 2,
        // maxlength: 255, 
    },
    message:{
        type:String,
        // require:true,
        // minlength: 6,
        // maxlength: 255,
    },
});

//validation
const schemavalidation = data => {
    const schemaValid = Joi.object({
        name:Joi.string(),
        email:Joi.string(),
        number: Joi.string(),
        message:Joi.string(),

        // em…
[8:55, 21.2.2024] מיכאלה נעם: const checkAuth = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        next();
    } catch(error) {
        res.status(401).json({
            message: 'Auth failed'
        })
        // const error = new HttpError('Authentication failed!', 403);
        // return next(error);
    }
}

module.exports = checkAuth;