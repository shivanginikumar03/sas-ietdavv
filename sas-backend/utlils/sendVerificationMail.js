const transporter = require("./mailTranspoter");

//Function to send verification mail
const sendVerificationMail = (sendTo, verificationToken) => {
    const mailConfigurations = {
        from: process.env.EMAIL_USERNAME,
        to: sendTo,
        subject: 'Verify your SAS-IETDAVV Account',
        text: `Thank you for signup to SAS-IETDAVV please click the link to verifiy your account:
    ${process.env.BACKEND_ENDPOINT}/api/auth/verify/${verificationToken}
    
    Please ignore this email if this was not attemted by you.`,
    };

    transporter.sendMail(mailConfigurations, (error, info) => {
        console.error(error);
        console.log(info);
    });

    return true;
};

module.exports = sendVerificationMail;