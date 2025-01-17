import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import {useEffect, useState } from 'react';
import Sidebar from './siderbar';
import Mainsec from './mainsec'
import Profile from './profile';
import CryptoPayment from './CryptoPayment';
import Portfolio from './portfolio';
import Stock from './stock';
import Reg from './reg'
import Login from './login'


function Dashboard() {
    const navigate = useNavigate();
    const userId = localStorage.getItem('uid');
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            // Redirect to login page if no token is found
            navigate('/login');
        }

        // You could also make an API call to validate the token here if needed
    }, [navigate]);



  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const response = await fetch(`https://dashboard-app-uzy6.onrender.com:5000/api/users/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }

          const data = await response.json();
          setUser(data);
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUser();
    }
  }, [user, userId]);

    return (
        <div className="relative">
            <br />
            <Navbar user={user} />
            <Sidebar />
            
            <div className="flex-1 md:ml-64 p-10 pt-16">
                <Routes>
                    <Route path="/profile" element={<Profile userId={userId} />} />
                    <Route path="/Portfolio" element={<Portfolio />} />
                    <Route path="/stock-option" element={<Stock user={user}/>} />
                    <Route path="/adduser" element={<Reg />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/crypto-payment" element={<CryptoPayment user={user} />} />
                    <Route path="/" element={<Mainsec userId={userId} />} />
                </Routes>
            </div>
        </div>
    );
}

export default Dashboard;
