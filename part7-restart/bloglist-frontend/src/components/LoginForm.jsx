import { useDispatch, useSelector } from 'react-redux';

import Toggleable from './Toggleable'

import { useField } from "../hooks";
import { logInUser, logOutUser } from '../reducers/loggedInReducer'

const LoginForm = () => {
  const username = useField("text");
  const password = useField("password");
  const dispatch = useDispatch();
  const loggedIn = useSelector(store => store.loggedIn);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(logInUser(username.value, password.value));
    username.onReset();
    password.onReset();
  };

  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logOutUser());
  }

  const logInForm = () => (
    <div>
      <h1>Log in to application</h1>
      <Toggleable buttonLabel="login">
        <form onSubmit={handleSubmit}>
          <input {...username} />
          <input {...password} />
          <button type="submit">login</button>
        </form>
      </Toggleable>
    </div>
  )

  const loggedInUsername = () => (
    <p>
      {loggedIn.name} is logged in
      <button className='inline-right-button' onClick={handleLogout}>logout</button>
    </p>
  )

  return (
    <div>
      {!loggedIn && logInForm()}
      {loggedIn && loggedInUsername()}
    </div>
  );
};

export default LoginForm;
