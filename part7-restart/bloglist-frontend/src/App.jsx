import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";

import blogService from "./services/blogs";
import { setBlogs }from './reducers/blogReducer'
import loginService from "./services/login";

import { newNotification, newError } from './reducers/notificationReducer'

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  const blogs = useSelector(state => state.blogs)

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

  return (
    <div className="centering-div">
      <div className="main-container">
        {!user && <h1>Log in to application</h1>}
        {user && <h1>Blogs</h1>}
        <Notification />
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
              <BlogForm toggleForm={() => blogFormRef.current.toggleVisibility()} />
            </Toggleable>
            <div className="blog-list">
              {blogs
                .toSorted((a, b) => b.likes - a.likes)
                .map((blog) => (
                  <Blog
                    key={blog.id}
                    blog={blog}
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
