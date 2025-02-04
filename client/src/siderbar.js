import React, { useState } from 'react';
import {HomeIcon, ChartBarIcon, CurrencyDollarIcon, Cog6ToothIcon, ChevronDownIcon, ChevronRightIcon, WalletIcon, ArrowTrendingUpIcon} from '@heroicons/react/24/outline'; // Optional: install Heroicons
import Logout from './logout';

const DropdownTab = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {/* Toggle Dropdown */}
            <div
                className="px-2 mb-4 hover:bg-slate-100 cursor-pointer flex items-center"
                onClick={() => setIsOpen(!isOpen)}
            >
                <WalletIcon className="h-5 w-5 mr-2" color='#2667ec' />
                <span className="flex-1 py-2.5 rounded transition duration-200 ">Earnings</span>
                <span>{isOpen ? <ChevronDownIcon className="h-5 w-5 mr-2" color='#2667ec'/> : <ChevronRightIcon className="h-5 w-5 mr-2" color='#2667ec'/>}</span>
            </div>

            {/* Dropdown content */}
            {isOpen && (
                <ul className="pl-4">
                    <li className="mb-4 flex items-center px-2 rounded hover:bg-slate-100">
                        <HomeIcon className="h-5 w-5 mr-2" color='#2667ec'/>
                        <a href="/dashboard/portfolio" className="block py-2.5 rounded transition duration-200 hover:bg-slate-100">Portfolio</a>
                    </li>
                    <li className="mb-4 flex items-center px-2 rounded hover:bg-slate-100">
                        <ArrowTrendingUpIcon className="h-5 w-5 mr-2" color='#2667ec' />
                        <a href="/dashboard/stock-option" className="block py-2.5 rounded transition duration-200 hover:bg-slate-100">Stock Options</a>
                    </li>
                </ul>
            )}
        </div>
    );
};

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex">
            {/* Sidebar */}
            <div className={`fixed top-0 left-0 h-full w-64 bg-white backdrop-blur-sm bg-opacity-70 border border-gray-200 text-black transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className="p-6">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                </div>
                <nav className="p-4">
                    <ul>
                        <li className="mb-4 flex items-center px-2 rounded hover:bg-slate-100">
                            <HomeIcon className="h-5 w-5 mr-2" color='#2667ec'/>
                            <a href="/dashboard" className="block py-2.5 rounded transition duration-200 hover:bg-slate-100">Home</a>
                        </li>
                        {/* <li className="mb-4 flex items-center px-2 rounded hover:bg-slate-100">
                            <ChartBarIcon className="h-5 w-5 mr-2" color='#2667ec' />
                            <a href="/" className="block py-2.5 rounded transition duration-200 hover:bg-slate-100">Analytics</a>
                        </li> */}
                        <DropdownTab />
                        <li className="mb-4 flex items-center px-2 rounded hover:bg-slate-100">
                            <Cog6ToothIcon className="h-5 w-5 mr-2" color='#2667ec'/>
                            <a href="/dashboard/profile" className="block py-2.5 rounded transition duration-200 hover:bg-slate-100">Settings</a>
                        </li>
                        <li className="mb-4 flex items-center px-2 rounded hover:bg-slate-100">
                            <CurrencyDollarIcon className="h-5 w-5 mr-2" color='#2667ec'/>
                            <a href="/dashboard/crypto-payment" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-slate-100">
                                Payment
                            </a>
                        </li>
                    </ul>
                    <ul>
                        <Logout/>
                    </ul>
                </nav>

            </div>

            {/* Mobile Toggle Button */}
            <button
                className="md:hidden p-4 text-white bg-blue-800 fixed top-4 left-4 z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? 'Close' : 'Menu'}
            </button>

        </div>
    );
};

export default Sidebar;
