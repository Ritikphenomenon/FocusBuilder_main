import { useState } from 'react';
import useUserProfile from './useUserProfile';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userProfile = useUserProfile();
  const [showLogout, setShowLogout] = useState(false);

  const handleProfileClick = () => {
    setShowLogout(!showLogout);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="w-full h-[55px] flex justify-end items-center pr-4"> {/* Adjusted padding right */}
      {userProfile && (
        <div className="relative mr-4"> {/* Added margin right */}
          <img
            src={userProfile.profilePhoto}
            alt={userProfile.name}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={handleProfileClick}
          />
          {showLogout && (
            <div
              className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2"
              onClick={handleLogout}
            >
              <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
