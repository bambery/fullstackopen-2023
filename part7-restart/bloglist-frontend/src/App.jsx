import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import {
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Nav from './components/Nav';
import UserList from './components/UserList';
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
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
        <Nav />
        <LoginForm />
        {loggedIn && (
          <div>
            <h1>Blog app</h1>
            <Routes>
              <Route path="/" element={<Blogs />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<Blog />} />
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
