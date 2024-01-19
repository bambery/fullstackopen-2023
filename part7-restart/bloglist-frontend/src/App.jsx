import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Link,
  Outlet,
} from 'react-router-dom';

import Nav from './components/Nav';
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import userService from './services/users';
import blogService from "./services/blogs";
import { setBlogs } from "./reducers/blogReducer";
import { setUsers } from './reducers/userReducer';
import { newNotification, newError } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector(state => state.loggedIn)

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, [dispatch]);

  return (
    <div className="centering-div">
      <div className="main-container">
        <Notification />
        {!loggedIn && <LoginForm />}
        {loggedIn && (
          <div>
            <Nav loggedIn={loggedIn} />
            <h1>Blog app</h1>
            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
