import { useNavigate } from 'react-router-dom';
import {ArrowRightStartOnRectangleIcon} from '@heroicons/react/24/outline'; // Optional: install Heroicons
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove the token from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('uid');
        // Redirect to the login page
        navigate('/login');
    };

    return (
        // <button onClick={handleLogout}>
        //   Logout
        // </button>
        <li className="absolute bottom-5 mb-4 flex items-center px-2 rounded hover:bg-gray-600">
            <ArrowRightStartOnRectangleIcon color='red' className="h-5 w-5 mr-2" />
            <a href="/login" onClick={handleLogout} className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-600">
                Sign Out
            </a>
        </li>
    );
};

export default Logout;
