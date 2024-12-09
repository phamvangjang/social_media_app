const mongoose = require('mongoose')

const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        if (conn.connection.readyState === 1) {
            console.log('Connection has been established successfully.');
        } else {
            console.log('DB connecting')
        }
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectdb