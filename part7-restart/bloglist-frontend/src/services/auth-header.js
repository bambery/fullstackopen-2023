// in the interest of remembering where I saw this simple pattern: https://www.bezkoder.com/react-redux-jwt-auth/
export default function authHeader() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user && user.token) {
    return { Authorization: "Bearer " + user.token };
  } else {
    return {};
  }
}
