import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState(null)
    const blogFormRef = useRef()

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

    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login({
                username, password
            })
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUser(user)
            blogService.setToken(user.token)
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

    const handleNewBlog = async ({ title, author, url }) => {
        blogFormRef.current.toggleVisibility()
        try {
            const newBlog = await blogService.create({
                title, author, url
            })
            const newBlogs = blogs.concat(newBlog)
            setBlogs(newBlogs)
            setNotificationMessage(`New blog: "${newBlog.title}" by ${newBlog.author} added`)
            setTimeout(() => {
                setNotificationMessage(null)
            }, 5000)
        } catch (exception) {
            setErrorMessage(exception)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const updateBlog = async (blogObj) => {
        try {
            const updatedBlog = await blogService.update(blogObj)
            const updatedBlogList = blogs.map(b => b.id === blogObj.id ? updatedBlog : b)
            setBlogs(updatedBlogList)
            // do I want to post a notificaton for updating likes? Not really....
        } catch (exception) {
            setErrorMessage(exception.response.data.error)
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    // used for dev db setup *************************
    const populateBlogs = async () => {
        try {
            const fetchedBlogs = await blogService.createAllDummies()
            setBlogs(blogs.concat(fetchedBlogs))
        } catch (exception) {
            setErrorMessage(exception)
        }
    }

    const deleteAllUserBlogs = async () => {
        try {
            await blogService.dropBlogDb()
            setBlogs(blogs.filter(blog => blog.user.username !== user.username))
        } catch (exception) {
            setErrorMessage(exception)
        }
    }
    //***********************************************

    return (
        <div className='centering-div'>
            <div className='main-container'>
                {!user && <h1>Log in to application</h1>}
                {user && <h1>Blogs</h1>}
                <Notification message={errorMessage} type='error'/>
                <Notification message={notificationMessage} type='info'/>
                {!user &&
                    <Toggleable buttonLabel='login'>
                        <LoginForm
                        handleLogin={handleLogin}
                        />
                    </Toggleable>
                }
                {user && <div>
                    <p>{user.name} is logged in <button onClick={handleLogOut}>logout</button></p>
                    <Toggleable buttonLabel='new blog' ref={blogFormRef}>
                        <BlogForm
                            handleNewBlog={handleNewBlog}
                        />
                    </Toggleable>
                    <div className='blog-list'>
                        {blogs.map(blog =>
                        <Blog key={blog.id} blog={blog} updateBlog={updateBlog}/>)}
                    </div>
                    { /* used for dev db setuep> *******************/}
                    {process.env.NODE_ENV === 'development' &&
                    <div className='button-populate-db'>
                        <button onClick={populateBlogs}>populate test</button>
                        <button onClick={deleteAllUserBlogs}>drop blog db</button>
                    </div>
                    }
                    { /* ***************************************** */}
                </div> }
            </div>
        </div>
    )
}

export default App
