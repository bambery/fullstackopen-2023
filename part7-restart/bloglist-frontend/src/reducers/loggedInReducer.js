import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import { newError, newNotification } from './notificationReducer'

const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: JSON.parse(window.localStorage.getItem('loggedInUser')),
  reducers: {
    setLogInUser(state, action) {
      return action.payload;
    },
    setLogOutUser(state, action) {
      return null;
    }
  }
})

export const logInUser = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password });
      dispatch(setLogInUser(user))
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (e) {
      dispatch(newError('wrong username or password'))
    }
  }
}

export const logOutUser = () => {
  return async (dispatch, getState) => {
    const state = getState();
    dispatch(newNotification(`${state.loggedIn.name} has logged out`));
    dispatch(setLogOutUser())
    window.localStorage.removeItem('loggedInUser')
  }
}

export const { setLogInUser, setLogOutUser } = loggedInSlice.actions

export default loggedInSlice.reducer
