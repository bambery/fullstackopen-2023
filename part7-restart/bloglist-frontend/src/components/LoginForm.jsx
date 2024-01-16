import { useField } from "../hooks";

const LoginForm = ({ handleLogin }) => {
  const username = useField("text");
  const password = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({
      username: username.value,
      password: password.value,
    });
    username.onReset();
    password.onReset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input {...username} />
      <input {...password} />
      <button type="submit">login</button>
    </form>
  );
};

export default LoginForm;
