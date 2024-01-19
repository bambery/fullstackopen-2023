import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';

import BlogList from './components/BlogList';
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Toggleable from "./components/Toggleable";

import { newNotification, newError } from './reducers/notificationReducer'

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const loggedIn = useSelector(state => state.loggedIn)

  return (
    <div className="centering-div">
      <div className="main-container">
        <Notification />
        <LoginForm />
        {loggedIn && (
          <div>
            <h1>Blogs</h1>
            <Toggleable buttonLabel="new blog" ref={blogFormRef}>
              <BlogForm toggleForm={() => blogFormRef.current.toggleVisibility()} />
            </Toggleable>
            <BlogList />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
