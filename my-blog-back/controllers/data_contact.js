const httpStatus = require('http-status');
const mg = require("mailgun-js"); //for email
const nodemailer = require('nodemailer');
const config= require("config");//Information storage - hidden, config
require('dotenv').config(); //env

// const nodemailer = require('nodemailer');

// import from to project
const {Contact , schemavalidation} = require("../modals/Contact");

const dataPostContact = async (req,res,next) =>{
    // const mailgun = () =>
    // mg({
    //   apiKey: process.env.MAILGUN_API_KEY,
    //   domain: ${config.get("MMAILGUN_DOMAIN")},
    // });

    // Create a transporter using SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // e.g., 'smtp.gmail.com'
        port: 587, // SMTP port (e.g., 587 for Gmail)
        secure: false, // Set to true if you're using a secure connection (e.g., with Gmail)
        auth: {
        user: 'michalkiv25@gmail.com', // Your email address
        pass: 'michalkiv012' // Your email password
        }
    });

    const { name, email, number, message } = req.body;//Distraction parametr of user

    try{
        //Lets Validate 
        const {error} = schemavalidation(req.body)
        if (error) return res
        .status(httpStatus.BAD_REQUEST)//400
        .send(error.details[0].message);


        // Cheking if the user is already in the db
        // let user = await Contact.findOne({ email });
        // if (!user) throw new HttpError("Could not identify user, credentials seem to be wrong", 401);


        const contactUser= new Contact({ //create new row in table
            name,
            email,
            number,
            message,
        });


        const save_contactUser= await contactUser.save(); //save in db

        // Define your email data
        // const emailData = {
        //     from: contactUser.email,
        //     to: 'michaelkiv25@gmail.com',
        //     name: contactUser.name,
        //     text: contactUser.message,
        // };

        // console.log('emailData',emailData)
        // Send the email
        // mg.messages().send(emailData, (error, contactUser) => {
        //     if (error) {
        //     console.error('Error sending email:', error);
        //     } else {
        //     console.log('Email sent successfully:', contactUser);
        //     }
        // });

        transporter.sendMail({
            from: contactUser.email, // Sender address
            to: 'michaelkiv25@gmail.com', // Recipient address
            subject: contactUser.name, // Email subject
            text: contactUser.message // Plain text body
          });

          console.log('Contact message sent successfully.');


        //Returns all information stored in the database for Contact
        // const data = await Contact.find();
        // return res.json(data)
     
        return res.status(httpStatus.OK).json({ //200
            message: 'The message has been sent',
        })

    }catch(err){
        res.status(httpStatus.UNAUTHORIZED).json({ //401
            message: `Auth failed ${err}`
        });
    };
};
exports.dataPostContact = dataPostContact;