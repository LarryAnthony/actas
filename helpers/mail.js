const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'ajacobozare@gmail.com', // generated ethereal user
        pass: 'hqjbdcnasybpabsz', // generated ethereal password
    },
});

transporter.verify().then(() => {

}).catch((error) => {
});

module.exports = transporter;