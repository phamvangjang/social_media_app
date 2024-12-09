const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const { makeOTP } = require('../utils/contansts')
const sendMail = require('../utils/sendEmail')
const { generateAccessToken } = require('../middleware/jwt')
const bcrypt = require('bcrypt')


const register = asyncHandler(async (req, res) => {
    const { email, username, fullname, password } = req.body;
    //check if the user already exists
    const user = await User.findOne({ email })
    if (user) {
        throw new Error('User has existed');
    } else {
        const token = makeOTP();
        const newUser = await User.create({
            email, password, username, fullname, otp: token     
        });
        if (newUser) {
            const html = `<h2>Register code:<br><blockquote>${token}</blockquote><h3>This code is only valid five minutes from now.</h3></h2>`;
            await sendMail({ email, html, subject: 'Confirm register account' })
        }
        // setTimeout(async () => {
        //     if (newUser?.otp !== null) {
        //         await User.deleteOne({ email })
        //     }
        // }, [300000])
        return res.json({
            success: newUser ? true : false,
            mes: newUser ? 'Please check your email to active account' : 'Somthing was wrong, please try later'
        })
    }
})

// confirm one time password 
const finalRegister = asyncHandler(async (req, res) => {
    const { otp, email } = req.body;
    // Find the user with the email and OTP
    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({
            success: false,
            mes: 'User not found.'
        });
    }
    if (user.otpAttempts >= 3) {
        await User.deleteOne({ email })
        return res.status(400).json({
            success: false,
            mes: 'Maximum OTP attempts exceeded. Please register again.'
        });
    }
    if (user.otp !== otp) {
        user.otpAttempts += 1;
        await user.save();
        return res.status(400).json({
            success: false,
            mes: `Invalid OTP. You have ${3 - user.otpAttempts} attempts left.`,
        });
    }
    user.email = email;
    user.otp = null;
    user.otpAttempts = 1;
    await user.save();
    return res.json({
        success: true,
        mes: 'Register was successfully, Please go to login.'
    })
})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const response = await User.findOne({ email });
    if (response && await response.isCorrectPassword(password)) {
        const { password, refreshToken, ...userData } = response.toObject();
        const accessToken = generateAccessToken(response._id, response.username);
        const newRefreshToken = generateAccessToken(response._id);
        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 5 * 60 * 1000 });
        return res.status(200).json({
            success: true,
            accessToken,
            userData,
        })
    } else {
        throw new Error('Login was failed')
    }
})

const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        const otpCode = makeOTP();
        user.otp = otpCode;
        await user.save();
        const html = `<h2>Comfirm forgot password code:<br><blockquote>${otpCode}</blockquote></h2>`;
        const data = {
            email,
            html,
            subject: `Forgot Password`
        }
        const result = await sendMail(data);
        return res.status(200).json({
            success: result.response?.includes('OK') ? true : false,
            mes: result.response?.includes('OK') ? 'Please check your email' : 'Something was wrong. Please try later'
        })
    } else throw new Error('User not found');
})

const resetPassword = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, bcrypt.genSaltSync(10))
    const response = await User.findOne({ email });
    if (!response) {
        throw new Error('User not found');
    }
    await User.findByIdAndUpdate(response._id, { password: hashPassword })
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? 'Change password was successfully. Please login to go on' : 'Something was wrongs. Please try later'
    })
})

module.exports = {
    register,
    finalRegister,
    login,
    forgotPassword,
    resetPassword
}