import React, { useState } from 'react';
import { PhoneIcon, EnvelopeIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'; // Optional: install Heroicons

const Contact = ({ dataList }) => {
    // State to control whether to show more contacts
    const [showAll, setShowAll] = useState(false);

    // Function to toggle the state of showAll
    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    // Base URL for the placeholder images
    const baseUrl = 'https://placehold.co/600x600?text=';

    // Function to get the first letter of each contact and create a link
    const getContactImageLink = (name) => {
        const firstLetter = name.charAt(0).toUpperCase();
        return baseUrl + firstLetter;
    };

    // Determine how many contacts to show based on showAll state
    const displayedContacts = showAll ? dataList : dataList.slice(0, 5);

    return (
        <div>
            <ul>
                {displayedContacts.map((item, index) => (
                    <li key={index} className="mb-4 flex items-center px-2 rounded hover:bg-gray-100">
                        {/* Profile section */}
                        <div className='w-full flex'>
                            <div className="flex items-center">
                                <img
                                    className="w-10 h-10 rounded-full"
                                    src={getContactImageLink(item.name)}
                                    alt="Profile"
                                />
                            </div>

                            <div className='flex-1'>
                                <a href="/" className="block mx-4 py-2.5 rounded transition duration-200">{item.name}</a>
                            </div>
                            <div className='flex items-center'>
                                <PhoneIcon className="h-5 w-5 mr-2 text-gray-400 hover:text-black" />
                                <EnvelopeIcon className="h-5 w-5 mr-2 text-gray-400 hover:text-black" />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* See More / See Less Button */}
            {dataList.length > 5 && (
                <button
                onClick={toggleShowAll}
                className="mt-4 text-blue-600 hover:underline flex items-center"
            >
                {showAll ? (
                    <>
                        See Less <ChevronUpIcon className="h-4 w-4 ml-1" />
                    </>
                ) : (
                    <>
                        See More <ChevronDownIcon className="h-4 w-4 ml-1" />
                    </>
                )}
            </button>
            )}
        </div>
    );
};

export default Contact;
