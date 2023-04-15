import React, { useState } from 'react';

function SignupPage(props) {
  const [newUser, setNewUser] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');

  function handleSignUp(event) {
    event.preventDefault();
  
    fetch('http://localhost:2000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUser,
        password: newPassword
      })
    })
    .then(response => {
      if (!response.ok) {
        if (response.status === 409) {
          throw new Error('Username already exists');
        }
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('New user created:', data);
    })
    .catch(error => {
      console.error('Error adding new user:', error);
      setError(error.message);
    });
  }
  function handleBack() {
    props.setShowSignup(false);
  }

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label>Username:</label>
          <input type="text" value={newUser} onChange={(e) => setNewUser(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={handleBack}>Back to Login</button>
      {error && <div>{error}</div>}
    </div>
  );
}

export default SignupPage;
