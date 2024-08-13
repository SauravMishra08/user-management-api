import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

const App = () => {
  const [users, setUsers] = useState([]);

  const handleAddUser = (newUser) => {
      fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
      })
      .then(response => response.json())
      .then(() => {
          setUsers([...users, newUser]);
      });
  };

  return (
      <div>
          <h1>User Management App</h1>
          <UserForm onSubmit={handleAddUser} />
          <UserList />
      </div>
  );
};

export default App;
