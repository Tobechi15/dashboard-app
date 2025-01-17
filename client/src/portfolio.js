import React from 'react';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'; // Optional: install Heroicons

const Portfolio = () => {
    return (
        <div>
            {/* main */}
            <br />
            <h2 className="text-3xl font-semibold">Portfolio Content</h2>
            <p className="mt-4">This is the main content of the portfolio.</p>

            <div className="grid grid-cols-1 my-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Example cards for analytics */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Salary</h3>
                    <p className="text-2xl mt-2">$1500</p>
                    
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Bonus</h3>
                    <p className="text-2xl mt-2">$3000</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Stock</h3>
                    <p className="text-2xl mt-2">$0</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">Queries</h3>
                    <p className="text-2xl mt-2">1</p>
                </div>
            </div>
            <div>
                <div className='flex flex-wrap space-x-0 sm:space-x-4'>
                    <div className="flex-auto bg-white p-6 my-4 rounded-lg shadow-md h-auto w-[500px]">
                        <h3 className="text-xl mb-2 font-semibold">Overview</h3>
                        <hr />
                    </div>
                    <div className="flex-1 bg-white p-6 my-4 rounded-lg shadow-md min-w-80">
                        <h3 className="text-xl mb-2 font-semibold">Collegue</h3>
                        <hr />
                        <br />
                        <ul>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>

                        </ul>

                    </div>
                </div>
                <div className='flex flex-wrap space-x-0 sm:space-x-4'>
                    <div className="flex-1 bg-white p-6 my-4 rounded-lg shadow-md h-auto">
                        <h3 className="text-xl mb-2 font-semibold">Overview</h3>
                        <hr />
                    </div>
                    <div className="flex-1 bg-white p-6 my-4 rounded-lg shadow-md min-w-72">
                        <h3 className="text-xl mb-2 font-semibold">Collegue</h3>
                        <hr />
                        <br />
                        <ul>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>
                            <li className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                                {/* Profile section */}
                                <div className='w-full flex'>
                                    <div className="flex items-center">
                                        <img
                                            className="w-10 h-10 rounded-full"
                                            src="https://via.placeholder.com/40"
                                            alt="Profile"
                                        />
                                    </div>

                                    <div className='flex-1'>
                                        <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">Home</a>
                                    </div>
                                    <div className='flex items-center'>
                                        <PhoneIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                        <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-200 hover:text-black" />
                                    </div>
                                </div>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portfolio;