import React, { useState } from 'react';
import { createUser } from '../api/user';

export const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await createUser({ name, email, age: Number(age) });
      setMessage(`User created: ${user.name}`);
    } catch (error) {
      setMessage('Error creating user');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <label>Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <label>Email: </label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <br />
          <label>Age: </label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} />
        </div>
        <br />
        <button type="submit">Create User</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};
