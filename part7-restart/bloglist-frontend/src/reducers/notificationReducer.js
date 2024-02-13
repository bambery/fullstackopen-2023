import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createNotification(state, action) {
      const notification = {
        type: "info",
        message: action.payload,
      };

      return notification;
    },
    createError(state, action) {
      const notification = {
        type: "error",
        message: action.payload,
      };
      return notification;
    },
    clearNotification() {
      return "";
    },
  },
});

export const newNotification = (message) => {
  return async (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const newError = (message) => {
  return async (dispatch) => {
    dispatch(createError(message));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };
};

export const { createNotification, createError, clearNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;
