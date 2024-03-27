const mongoose = require('mongoose');
const Joi = require("joi"); //Validation

// email, subject, message
const contactSchema = new mongoose.Schema({
    name: {

    },
    email: {
        type:String,
        require:true,
        minlength: 2,
        maxlength: 255,
        trim:true
    },
    number:{
        type:String,
        require:true,
        minlength: 2,
        maxlength: 255, 
    },
    message:{
        type:String,
        require:true,
        minlength: 6,
        maxlength: 255,
    },
});

//validation
const schemavalidation = data => {
    const schemaValid = Joi.object({
        name:Joi.string(),
        email:Joi.string().min(6).max(255).email().required(),
        number: Joi.string().required(),
        message:Joi.string().min(2).max(255).required(),
    });
    return schemaValid.validate(data)
}  

const Contact = mongoose.model('Contact', contactSchema);

exports.Contact = Contact;
exports.schemavalidation = schemavalidation;