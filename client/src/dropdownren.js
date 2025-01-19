import React from 'react';
import { useState } from 'react';
import { ChevronDownIcon, WalletIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Optional: install Heroicons

const TaskDropdown = ({ dataList }) => {
  const [openIndex, setOpenIndex] = useState(null); // Track the index of the currently open dropdown

  // Function to render dropdown content
  const renderDropdownContent = (item) => {
    return (
      <div className='pl-16'>
        <h2 className="text-xl font-bold mb-4">Task Management</h2>
        <p><strong>Assigned Task:</strong>{item.name}</p>
        <p><strong>Description:</strong> {item.description}</p>
        <p><strong>Status:</strong> In Progress</p>
        <p><strong>Priority:</strong> High</p>
        <p><strong>Due Date:</strong> march 20, 2025</p>

        <h3 className="text-lg font-semibold mt-4">Next Steps:</h3>
        <ul className="list-disc list-inside ml-4 mt-2">
          <li>Collaborate with the photographer to schedule a photoshoot.</li>
          <li>Draft initial post ideas and get approval from the marketing team.</li>
          <li>Upload final content for review by the end of the week.</li>
        </ul>
      </div>
    );
  };

  return (
    <ul>
      {/* Toggle Dropdown */}
      {dataList.map((item, index) => (
        <li key={index}>
          <div
            className="px-2 mb-4 cursor-pointer flex items-center"
            onClick={() => {
              setOpenIndex(openIndex === index ? null : index); // Toggle current index
            }}
          >
            <WalletIcon className="h-5 w-5 mr-2" color='#2667ec' />
            <span className="flex-1 py-2.5 rounded transition duration-200">{item.name}</span>
            <span>{openIndex === index ? <ChevronDownIcon className="h-5 w-5 mr-2" color='#2667ec' /> : <ChevronRightIcon className="h-5 w-5 mr-2" color='#2667ec'/>}</span>
          </div>

          {/* Dropdown content */}
          {openIndex === index && renderDropdownContent(item)} {/* Render only if this index is open */}
        </li>
      ))}
    </ul>
  );
};

export default TaskDropdown;
