const jwt = require('jsonwebtoken')

const generateAccessToken = (uid, username) => jwt.sign({ _id: uid, username }, process.env.JWT_SECRET, { expiresIn: '5m' })
const generateRefreshToken = (uid) => jwt.sign({ _id: uid }, process.env.JWT_SECRET, { expiresIn: '7d' })
module.exports = {
    generateAccessToken,
    generateRefreshToken
}