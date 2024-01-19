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
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
  }, [dispatch]);

  const blogs = useSelector(state => state.blogs)
  const loggedIn = useSelector(state => state.loggedIn)

  return (
    <div className="centering-div">
      <div className="main-container">
        <Notification />
        <LoginForm loggedIn={loggedIn}/>
        {loggedIn && (
          <div>
            <h1>Blogs</h1>
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
                    userIsAuthor={blog.user.username === loggedIn.username}
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
