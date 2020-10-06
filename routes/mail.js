const express = require('express');
var router = express.Router();
var db = require("../core/db");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");


router.post('/sendmail/:user/:tel', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ilyasbelkacem08@gmail.com",
            pass: "Ilyasse1999@"
        }
    });
    const user = req.params.user;
    const tel = req.params.tel;
    var result = '';
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 10; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    var sql ="update KP_Authentification set ";
    sql+="verificationcode = '"+result+"'";
    sql+="where TEL = '"+tel+"'";
    db.executeSql(sql , (error, result) => {
        if (error) throw error;
        res.send(result);
    });
            const html = `Hello there,
            <br/>
            Thank you for registering!
            <br/><br/>
            Please verify your email address by entering the following code:
            <br/>
            Verification Code: <b>${result}</b>
            <br/><br/>
            <br/>
            Have a pleasant day!`;
            transporter.sendMail({ from: 'ilyasbelkacem08@gmail.com', subject: 'Email Verification', to: user, html }
                , (err, info) => {

                });
});
module.exports = router;