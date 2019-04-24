const jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');

module.exports.checkToken = function(application, request, response) {
    var token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (token) {
        jwt.verify(token, S3CR37, function (err, decoded) {
            if (err) {
                response.send({success: true, response: false});
            } 
            else {
                response.send({success: true, response: true});
            }
        });
    } 
    else {
        response.send({success: true, response: false});
    }
}

module.exports.sendMail = function(application, request, response) {
       const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "elginveracity@gmail.com",
            pass: "ElginVeracity1123"
        },
        tls: { 
            rejectUnauthorized: false 
        }
    });
    
    const mailOptions = {
        from: 'elginveracity@gmail.com',
        to: request.body.email,
        subject: 'E-mail enviado usando Node!',
        text: 'Testando',
        attachments: [{
            filename: 'file.pdf',
            path: request.body.file,
            contentType: 'application/pdf',
            //encoding: 'base64'    //this line!!!!
          }]
    };
    
    transporter.sendMail(mailOptions, function(err, info){
        if (err) {
            response.send({success: true, response: false});
        } 
        else {
            response.send({success: true, response: true});
        }
    });
}
