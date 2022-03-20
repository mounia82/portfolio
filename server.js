const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const dotenv= require('dotenv');

const port = process.env.PORT || 3000

dotenv.config();

let initialPath = path.join(__dirname, 'public');
let app = express();

app.use(express.static(initialPath));
app.use(express.json()) //express json cela activera les données de formulaire partagé

app.get('/', (req, res) => {  
    res.sendFile(path.join(initialPath, 'index.html'));
})

app.post('/mail', (req, res) => {
    const {firstname, lastname,email, msg }= req.body;


    var data = {
        Nom:firstname,
        Prenom:lastname,
        Email:email,
        Msg:msg
    };
    
    if(data.Nom!="" && data.Prenom!="" && data.Email!="" && data.Msg!="")
    {
        console.log("Message Can be Send!");
        var Transport = nodemailer.createTransport(smtpTransport({
            host: "smtp.gmail.com",
            service: "Gmail",
            auth: {
                user: "mouniaatif02@gmail.com",
                pass: process.env.PASS 
            }
        }));
        Transport.sendMail({
            from: "Message Envoyé depuis le Site" + "<mouniaatif02@gmail.com>", // sender address
            to: data.Email, // comma separated list of receivers
            subject: "Test", // Subject line
            text:data.Msg,  // Plain-Text Body
            html: data.Msg // Html Body
        },
        (err, info) => {
            console.log(err)
            if (err)
            {
                console.log(err);
                res.json('opps! it seems like some error occured plz. try again.')
            }
            else
            {
                res.json('thanks for e-mailing me I will reply to you within 2 working days');
            }
        })
    }
})


app.listen(port, () => {
   console.log('listening....'); 
})