import React from 'react';
import { useEffect, useState } from 'react';
import { EnvelopeIcon, PhoneIcon, UserIcon, UserPlusIcon } from '@heroicons/react/24/outline'; // Optional: install Heroicons
import TaskDropdown from './dropdownren';
import Contact from './contact';

const Mainsec = ({ userId }) => {
    const [user, setUser] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`https://dashboard-app-uzy6.onrender.com/api/users/${userId}`, {
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

    if (!user) {
        return <div>Loading user data...</div>;
    }
    console.log(user.task);
    return (
        <div>
            {/* main */}
            <br />
            <h2 className="text-3xl font-semibold">Dashboard Content</h2>
            <p className="mt-4">This is the main content of the dashboard.</p>

            <div className="grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Example cards for analytics */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Active Campaigns</h3>
                    <p className="text-2xl mt-2">1</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Pending Tasks</h3>
                    <p className="text-2xl mt-2">{user.task.task.length}</p>
                </div>
                <div className="flex flex-wrap space-x-0 sm:space-x-4 bg-white p-6 rounded-lg shadow-md">
                    <div className='flex-1'>
                        <h3 className="text-xl font-semibold">New Followers</h3>
                        <div className="flex text-2xl mt-2">30 </div>
                    </div>
                    <div className="w-20 flex flex-col items-center justify-center">
                        <UserPlusIcon className="h-10 w-10 ml-6 text-gray-600 hover:text-black" />
                    </div>
                </div>
                <div className="flex flex-wrap space-x-0 sm:space-x-4 bg-white p-6 rounded-lg shadow-md">
                    <div className='flex-1'>
                        <h3 className="text-xl font-semibold">Total Followers</h3>
                        <div className="flex text-2xl mt-2">330k</div>
                    </div>
                    <div className="w-20 flex flex-col items-center justify-center">
                        <UserIcon className="h-10 w-10 ml-6 text-gray-600 hover:text-black" />
                    </div>
                </div>
            </div>
            <div>
                <div className='flex flex-wrap space-x-0 sm:space-x-4'>
                    <div className="flex-auto bg-white p-6 my-4 rounded-lg shadow-md h-auto w-[500px]">
                        <h3 className="text-xl mb-2 font-semibold">Tasks</h3>
                        <hr />
                        <TaskDropdown dataList={user.task.task} />
                    </div>
                    <div className="flex-1 bg-white p-6 my-4 rounded-lg shadow-md min-w-80">
                        <h3 className="text-xl mb-2 font-semibold">Collegue</h3>
                        <hr />
                        <br />
                        <Contact dataList={user.colleagues} />

                    </div>
                </div>
                <div className='flex flex-wrap space-x-0 sm:space-x-4'>
                    <div className="flex-1 bg-white p-6 my-4 rounded-lg shadow-md h-auto">
                        <h3 className="text-xl mb-2 font-semibold">Overview</h3>
                        <hr />
                        <section className="max-w-7xl mx-auto mt-6 p-4">

                            <h2 className="text-xl font-bold mb-4">Campaign Management</h2>
                            <p><strong>Campaign Name:</strong> Fall Fashion Launch 2024/2025</p>
                            <p><strong>Start Date:</strong> October 15, 2024</p>
                            <p><strong>End Date:</strong> November 30, 2025</p>
                            <p><strong>Target Audience:</strong> Women aged 18-35, focusing on urban areas with a high interest in fashion trends.</p>
                            <p><strong>Budget:</strong> $25,000.00</p>

                            <h3 className="text-lg font-semibold mt-4">Campaign Performance:</h3>
                            <ul className="list-disc list-inside ml-4 mt-2">
                                <li>Views: 15,000</li>
                                <li>Clicks: 4,200</li>
                                <li>Conversions: 930</li>
                                <li>Return on Investment (ROI): 18%</li>
                            </ul>
                            <p className="mt-4"><strong>Next Steps:</strong> Monitor the engagement metrics after the first week and adjust the targeting strategy if the click-through rate (CTR) falls below 10%.</p>

                        </section>
                    </div>
                    <div className="flex-1 bg-white p-6 my-4 rounded-lg shadow-md min-w-72">
                        <h3 className="text-xl mb-2 font-semibold">ROI</h3>
                        <hr />
                        <br />
                        <div className='flex items-center justify-center'>
                            <div className='h-40 w-40 flex flex-col text-6xl bg-blue-300 rounded-full items-center justify-center '>
                                <p className='text-xl'>ROI</p>
                                26%
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mainsec;