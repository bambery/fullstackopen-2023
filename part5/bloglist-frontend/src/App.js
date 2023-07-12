import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    return (
        <div>
            <Notification message={errorMessage} />
            {user === null && <LoginForm user={user} setUser={setUser} setErrorMessage={setErrorMessage} />}
            {user !== null && <div>
                <h1>blogs</h1>
                <p>{user.name} is logged in </p>
                {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />)}
            </div> }
        </div>
    )
}

export default App
