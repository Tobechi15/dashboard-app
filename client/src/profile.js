import React from 'react';
import { useEffect, useState } from 'react';

const Profile = ({ userId }) => {

    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
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
    }, [userId]);

    const firstLetter = user?.username.charAt(0).toUpperCase();

    // Append the first letter to a base URL
    const baseUrl = 'https://placehold.co/600x600?text=';
    const link = baseUrl + firstLetter;
    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Profile Settings</h2>
            <div className='flex flex-wrap-reverse space-x-16'>
                <div className="flex-1 mb-6">
                    <form action="#" method="POST">
                        {/*Name */}
                        <div className="mb-6">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                            <input type="text" id="name" name="name" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={user.username} />
                        </div>

                        {/*email */}
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input type="email" id="email" name="email" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder={user.email} />
                        </div>

                        {/*password*/}
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">New Password</label>
                            <input type="password" id="password" name="password" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="New Password" />
                        </div>

                        {/*Confirm password */}
                        <div className="mb-6">
                            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input type="password" id="confirm_password" name="confirm_password" className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" placeholder="Confirm Password" />
                        </div>

                        {/*Save button */}
                        <div className="mt-6">
                            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                Save Changes
                            </button>
                        </div>
                    </form>
                </div>
                <div>
                    <img className='h-30 w-40 rounded-full shadow-lg outline-' src={link} alt='profile' />
                </div>
            </div>


        </div>
    );
};

export default Profile;
