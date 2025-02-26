import { useState, useEffect } from 'react';
import { getUser } from '../api/user';

interface User {
  _id: string;
  name: string;
  email: string;
  age: number;
}

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await getUser();
        setUsers(users);
      } catch (error) {
        setMessage('Error fetching users');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      {message && <p className="message">{message}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            Name: {user.name}
            <li>Email: {user.email}</li>
            <li>Age: {user.age}</li>
          </li>
        ))}
      </ul>
    </div>
  );
};
