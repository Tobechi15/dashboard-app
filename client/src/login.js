import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('https://dashboard-app-uzy6.onrender.com:5000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    // Redirect to dashboard

    const data = await response.json();
    const token = data.token;
    const uid = data.uid;
    console.log(token);
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('uid', uid);
      navigate('/');
    }
    console.log(data);
  };


  return (
    <div>
      <nav className="bg-gray-800 text-white p-4 fixed w-full top-0 z-50">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl mx-20 font-bold">Dashboard</div>
        </div>
      </nav>
      <div className='bg-gray-100 flex items-center justify-center h-screen'>
        <div className="w-full max-w-md mx-8 bg-white p-8 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">Portal Login</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 mb-4">
                <input type="text" name="username" placeholder="Username" onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 mb-8">
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="mb-4 block md:flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember_me" name="remember_me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
              </div>
              <div className="text-sm">
                <a href="/" className="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
              </div>
            </div>
            <div>
              <a href='/'><button type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign In
              </button>
              </a>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-gray-500">
            Don't have an account?
            <a href="/" className="font-medium text-blue-600 hover:text-blue-500"> Sign up</a>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
