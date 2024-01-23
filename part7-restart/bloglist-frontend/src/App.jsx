import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Link, Outlet } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import userService from "./services/users";
import blogService from "./services/blogs";
import { setBlogs } from "./reducers/blogReducer";
import { setUsers } from "./reducers/userReducer";
import { newNotification, newError } from "./reducers/notificationReducer";

const GlobalStyle = createGlobalStyle`
  :root {
    --champagne: #F9CDAD;
    --pink: #FE4365;
    --palePink: #FC9D9A;
    --mint: #83AF9B;
    --tan: #C8C8A9;
  }
`;

const StyledCenteringDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--tan);
`;

const MainContainer = styled.div`
  width: 800px;
`;

const App = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.loggedIn);

  useEffect(() => {
    blogService.getAll().then((blogs) => dispatch(setBlogs(blogs)));
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, [dispatch]);

  return (
    <StyledCenteringDiv>
      <MainContainer>
        <Notification />
        {!loggedIn && <LoginForm />}
        {loggedIn && (
          <div>
            <Nav loggedIn={loggedIn} />
            <h1>Blog app</h1>
            <Outlet />
          </div>
        )}
      </MainContainer>
    </StyledCenteringDiv>
  );
};

export default App;
