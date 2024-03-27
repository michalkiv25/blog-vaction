const mongoose = require('mongoose');
const Joi = require("joi"); //Validation

const dataSchema = new mongoose.Schema({
    title: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    video:  {
        type: String,
    },
    imageContact:  {
        type: String,
    },
    backgroundImage: {
        type: [String],
    },
    regions: {
        type: [
            {
                country: String,
                areas: [],
                image: String,
                countryEng: String,
                imagePage: [String],
                storyOfOurTrip: String,
                hotels: [],
                attractions: [String],
                information: {},
                images:[String]
            }
        ]
    },

});


const schemavalidation = (data) => {
    const schema = Joi.object({
        title: Joi.alternatives().try(
            Joi.string().required(),
            Joi.array().items(Joi.string()).required()
        ),
        icon: Joi.string().required(),
        image: Joi.string().required(),
        regions: Joi.array().items(
            Joi.object({
                country: Joi.string().required(),
                areas: Joi.array().items(Joi.string()),
                image: Joi.string().required(),
                countryEng: Joi.string().required(),
                imagePage: Joi.array().items(Joi.string()),
                storyOfOurTrip: Joi.string().required(),
                hotels: Joi.array().items(Joi.string()),
                attractions: Joi.array().items(Joi.string()),
                information: Joi.object().unknown(true) // Allow additional properties
            })
        ),
        video: Joi.string(),
        imageContact: Joi.string(),
        backgroundImage: Joi.alternatives().try(
            Joi.string(),
            Joi.array().items(Joi.string())
        )
    });

    return schema.validate(data);
};

const Modal = mongoose.model('Modals', dataSchema);

exports.Modal = Modal;
exports.schemavalidation = schemavalidation;