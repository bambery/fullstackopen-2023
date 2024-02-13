const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    const { username, password } = request.body

    const user = await User.findOne({ username })
    const passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

    if (!(user && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid username or password'
        })
    }

    const userForToken = {
        username: user.username,
        id: user._id,
    }

    // token expires in one hour, but only in prod
    const tokenExpires = process.env.NODE_ENV === 'production' ? { expiresIn: 60*60 } : null

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        tokenExpires
    )

    response
        .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = loginRouter
