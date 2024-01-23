import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { logOutUser } from "../reducers/loggedInReducer";

const StyledNav = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const Nav = ({ loggedIn }) => {
  const dispatch = useDispatch();

  const padding = {
    padding: 5,
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logOutUser());
  };

  return (
    <StyledNav>
      <div className="nav-links">
        <Link style={padding} to="/">
          blogs
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
      </div>
      <div className="logged-in-user">
        {loggedIn.name} is logged in
        <button className="inline-right-button" onClick={handleLogout}>
          logout
        </button>
      </div>
    </StyledNav>
  );
};

export default Nav;
