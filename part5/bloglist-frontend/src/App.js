import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong username or password')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const handleLogOut = () => {
        setNotificationMessage(`${user.name} has logged out`)
        setTimeout(() => {
            setNotificationMessage(null)
        }, 5000)
        setUser(null)
        blogService.setToken(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    return (
        <div>
            {user === null && <h1>Log in to application</h1>}
            {user !== null && <h1>Blogs</h1>}
            <Notification message={errorMessage} type='error'/>
            <Notification message={notificationMessage} type='info'/>
            {user === null && <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
            />}
            {user !== null && <div>
                <p>{user.name} is logged in <button onClick={handleLogOut}>logout</button></p>
                <BlogForm
                    blogs={blogs}
                    setBlogs={setBlogs}
                    setErrorMessage={setErrorMessage}
                    setNotificationMessage={setNotificationMessage}
                />
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />)}
            </div> }
        </div>
    )
}

export default App
