const { createTransport } = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

const transporter = createTransport(
    smtpTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    })
);

module.exports = transporter;