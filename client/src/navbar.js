import React from 'react';

const Navbar = ({user}) => {
  const firstLetter = user?.username.charAt(0).toUpperCase();

  // Append the first letter to a base URL
  const baseUrl = 'https://placehold.co/600x600?text=';
  const link = baseUrl + firstLetter;

  if (!user) {
    return (
      <nav className="bg-white backdrop-blur-md bg-opacity-70 border border-gray-200 text-black p-4 fixed w-full top-0 z-50">
        <div className="container mx-auto flex pb-2 justify-between items-center">
          {/* Logo */}
          <div className="text-2xl mx-20 font-bold">Dashboard</div>
        </div>
      </nav>
    );
  }
  return (
    <nav className="bg-white backdrop-blur-md bg-opacity-70 border border-gray-200 text-black p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl mx-20 font-bold">Dashboard</div>

        {/* Search bar (optional) */}
        <div className="hidden md:block">
          <input
            type="text"
            placeholder="Search..."
            className="bg-slate-100 border border-gray-200 text-black p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Profile section */}
        <a href='/dashboard/profile'>
          <div className="flex items-center space-x-4">

            <span className="hidden md:block">Hello, {user.username}</span>
            <img
              className="w-10 h-10 rounded-full"
              src={link}
              alt="Profile"
            />
          </div>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
