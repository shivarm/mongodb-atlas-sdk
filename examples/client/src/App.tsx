import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import './App.css';

function App() {
  return (
    <div>
      <h1>Full-Stack App</h1>
      <UserForm />
      <h2>Fetch users</h2>
      <UserList />
    </div>
  );
}

export default App;
