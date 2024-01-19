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
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import { newNotification, newError } from './reducers/notificationReducer'

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch();

  const loggedIn = useSelector(state => state.loggedIn)


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
            </Routes>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
