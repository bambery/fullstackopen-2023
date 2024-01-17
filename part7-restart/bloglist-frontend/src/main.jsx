import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from '@reduxjs/toolkit';

import App from "./App";
import notificationReducer from './reducers/notificationReducer'

// configureStore handles setup of redux-devtools
const store = configureStore({
  reducer: {
    notification: notificationReducer,
  }
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
