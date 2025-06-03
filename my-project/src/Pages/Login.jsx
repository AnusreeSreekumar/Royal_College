import React, { useState } from 'react';
import login from '../college_website/login.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
  
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
    
      console.log('Response status:', response.status);
      
      if (response.ok) {
        console.log('Login successful');
        navigate('/Dashboard');
      } else {
        const data = await response.json();
        console.log('Login failed with message:', data);
        const msg = data?.message || 'Login failed. Check your credentials.';
        setError(msg);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Something went wrong. Please try again later.');
    }
    
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center max-w-5xl w-full shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 w-full">
          <img src={login} alt="login" className="w-full h-full object-cover" />
        </div>

        <div className="md:w-1/2 w-full p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <h2 className="text-2xl font-bold text-center underline">Login</h2>

            {error && <p className="text-red-500 text-center">{error}</p>}

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>

            <p className="text-center text-sm">
              Don’t have an account?{' '}
              <a href="/SignUp" className="text-blue-500 underline">
                Signup
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;