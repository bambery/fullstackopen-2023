import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import App from "./App";
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

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
