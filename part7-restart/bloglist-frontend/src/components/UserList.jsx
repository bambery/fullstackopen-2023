import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setUsers } from '../reducers/userReducer';
import userService from '../services/users';

const UserList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    userService.getAll().then((users) => dispatch(setUsers(users)));
  }, [dispatch]);

  const users = useSelector(state => state.users);

  return (
    <div>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users
              .toSorted((a, b) => b.blogs.length - a.blogs.length)
              .map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList;
