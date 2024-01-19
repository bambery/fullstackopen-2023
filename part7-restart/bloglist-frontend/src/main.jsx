import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import ErrorPage from "./error-page";

import App from "./App";
import Blogs from './components/Blogs';
import Blog from './components/Blog';
import User from './components/User';
import UserList from './components/UserList';

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import loggedInReducer from './reducers/loggedInReducer'

// configureStore handles setup of redux-devtools
const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    loggedIn: loggedInReducer,
    users: userReducer
  }
})

const router  = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Blogs />
      },
      {
        path: "blogs/",
        element: <Blogs />
      },
      {
        path: "blogs/:id",
        element: <Blog />
      },
      {
        path: "users/",
        element: <UserList />
      },
      {
        path: "users/:id",
        element: <User />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
