import { Link } from 'react-router-dom';

const Nav = () => {
  const padding = {
    padding: 5
  };

  return (
      <div>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
  );
}

export default Nav;
