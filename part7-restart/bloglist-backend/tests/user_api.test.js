const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const User = require('../models/user')
const app = require('../app')

const api = supertest(app)

test('fetching all users returns all users', async () => {
    await User.deleteMany({})
    const users = []

    const passwordHash0 = await bcrypt.hash(helper.premadeUsers[0].password, 10)
    const user0 = new User({ username: helper.premadeUsers[0].username, passwordHash: passwordHash0 })
    await user0.save()
    users.push(user0)

    const passwordHash1 = await bcrypt.hash(helper.premadeUsers[1].password, 10)
    const user1 = new User({ username: helper.premadeUsers[1].username, passwordHash: passwordHash1 })
    await user1.save()
    users.push(user1)

    const response = await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(2)
})

describe('creating new users', () => {
    describe('when there is initially one user in the db', () => {
        beforeEach(async () => {
            await User.deleteMany({})

            const passwordHash = await bcrypt.hash('sekret', 10)
            const user = new User({ username: 'root', passwordHash })

            await user.save()
        })

        test('creation succeeds with a fresh username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'lwszolek',
                name: 'Lauren Wszolek',
                password: 'mySecretPassword'
            }

            await api
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

            const usernames = usersAtEnd.map(u => u.username)
            expect(usernames).toContain(newUser.username)
        })
    })

    describe('creating user fails', () => {
        test('when creating a user with a duplicate username', async () => {
            const usersAtStart = await helper.usersInDb()
            const existingUser = usersAtStart[0]

            const newUser = {
                username: existingUser.username,
                name: 'A different Lauren',
                password: 'myCoolPassword'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
            expect(result.body.error).toContain('expected `username` to be unique')
        })

        test('when missing username', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                name: 'A Lauren without a username',
                password: 'myFunPassword'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
            expect(result.body.error).toContain('`username` is required')
        })

        test('when missing password', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'passwordlessLauren',
                name: 'A Lauren without a username',
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
            expect(result.body.error).toContain('password must be longer than 3 characters')
        })

        test('when username is less than 3 characters', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'lw',
                name: 'Too Short Lauren',
                password: 'myGreatPassword'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
            expect(result.body.error).toMatch(/`username` \(`.*`\) is shorter than the minimum allowed length/)
        })

        test('when password is less than 3 characters', async () => {
            const usersAtStart = await helper.usersInDb()

            const newUser = {
                username: 'passwordLauren',
                name: 'Too Short Again Lauren',
                password: 'pw'
            }

            const result = await api
                .post('/api/users')
                .send(newUser)
                .expect(400)
                .expect('Content-Type', /application\/json/)

            const usersAtEnd = await helper.usersInDb()
            expect(usersAtEnd).toEqual(usersAtStart)
            expect(result.body.error).toContain('password must be longer than 3 characters')
        })
    })
})
