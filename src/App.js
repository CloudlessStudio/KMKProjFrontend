import React, { useState } from 'react';
import SignupPage from './components/SignupPage';

function LoginPage() {
  const [userid, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showSignup, setShowSignup] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
  
    fetch(`http://localhost:2000/authenticate?name=${userid}&password=${password}`)
      .then(response => {
        if (response.status === 401) {
          throw new Error("Incorrect password");
        }
        if (response.status === 404) {
          throw new Error("User not found");
        }
        if (!response.ok) {
          throw new Error("Something went wrong");
        }
        return response.json();
      })
      .then(data => {
        console.log('User Found:', data);
        setShowSignup(false);
      })
      .catch(error => {
        console.log(error.message);
        setError(error.message);
      });
  }

  return (
    <div className='main'>
      {showSignup ? (
        <SignupPage setShowSignup={setShowSignup} />
      ) : (
        <div>
          <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username:</label>
            <input type="text" value={userid} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div>
            <label>Password:</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={() => setShowSignup(true)}>Sign Up</button>
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}

export default LoginPage;
