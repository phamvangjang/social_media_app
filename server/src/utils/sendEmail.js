const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const sendMail = asyncHandler(async ({ email, html, subject }) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD
        },
    });

    //send mail with defined transport object
    let infor = await transporter.sendMail({
        from: '"Instagram" <no-reply@instagram.com>',
        to: email,
        subject: subject,
        html: html,
    })
    return infor
})
module.exports = sendMail
