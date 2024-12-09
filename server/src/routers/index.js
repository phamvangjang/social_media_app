const { notFound, errHandler } = require('../middleware/errHandler')
const authRouter = require('./auth')
const userRouter = require('./user')
const insertRouter = require('./insert')
const postRouter = require('./post')
const initRouter = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/user', userRouter)
    app.use('/api/insert', insertRouter)
    app.use('/api/post', postRouter)

    app.use(notFound)
    app.use(errHandler)
}
module.exports = initRouter