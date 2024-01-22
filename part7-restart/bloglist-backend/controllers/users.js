const usersRouter = require('express').Router()
const saltPassword = require('../utils/user_helper.js');
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({})
//        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })

    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body
    if(!password || password.length < 4) {
        return response.status(400).json({ error: 'password must be longer than 3 characters' })
    }
  const passwordHash = await saltPassword(password);

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
})

module.exports = usersRouter
