import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";

import blogService from "./services/blogs";
import loginService from "./services/login";

//import { createNotification, clearNotification } from "./reducers/notificationReducer";
import { newNotification, newError } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(newError("Wrong username or password"));
    }
  };

  const handleLogout = () => {
    dispatch(newNotification(`${user.name} has logged out`));
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogAppUser");
  };

  const handleNewBlog = async ({ title, author, url }) => {
    blogFormRef.current.toggleVisibility();
    try {
      const newBlog = await blogService.create({
        title,
        author,
        url,
      });
      const newBlogs = blogs.concat(newBlog);
      setBlogs(newBlogs);
      dispatch(newNotification(`New blog: "${newBlog.title}" by ${newBlog.author} added`));
    } catch (exception) {
      exception.response?.data?.error
        ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
    }
  };

  const handleUpdateBlog = async (blogObj) => {
    try {
      const updatedBlog = await blogService.update(blogObj);
      const updatedBlogList = blogs.map((b) => (blogObj.id=== b.id ? updatedBlog : b));
      setBlogs(updatedBlogList)
    } catch (exception) {
      exception.response?.data?.error
        ? dispatch(newError(exception.response.data.error))
        : dispatch(newError(exception));
    }
  };

  const handleDeleteBlog = async ( blogId ) => {
    try {
      await blogService.remove(blogId);
      setBlogs(blogs.filter((blog) => {
        if (blog.id === blogId) {
          dispatch(newNotification(`"${blog.title}" by ${blog.author} deleted`));
        }
        return blog.id !== blogId;
      }))
    } catch (exception) {
      console.log(exception);
      dispatch(newError(exception.response.data.error));
    }
  };

  return (
    <div className="centering-div">
      <div className="main-container">
        {!user && <h1>Log in to application</h1>}
        {user && <h1>Blogs</h1>}
        <Notification message={errorMessage} type="error" />
        {!user && (
          <Toggleable buttonLabel="login">
            <LoginForm handleLogin={handleLogin} />
          </Toggleable>
        )}
        {user && (
          <div>
            <p>
              {user.name} is logged in{" "}
              <button onClick={handleLogout}>logout</button>
            </p>
            <Toggleable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm handleNewBlog={handleNewBlog} />
            </Toggleable>
            <div className="blog-list">
              {blogs
                .sort((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    handleUpdateBlog={handleUpdateBlog}
                    handleDeleteBlog={handleDeleteBlog}
                    userIsAuthor={blog.user.username === user.username}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
