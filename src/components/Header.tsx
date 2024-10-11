import React from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PreferencesMenu from './PreferencesMenu';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Gym Management</h1>
      <div className="flex items-center">
        <PreferencesMenu />
        <button className="mr-4 text-gray-600 hover:text-gray-800">
          <Bell size={24} />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center text-gray-600 hover:text-gray-800"
        >
          <LogOut size={24} className="mr-2" />
          Cerrar sesión
        </button>
      </div>
    </header>
  );
};

export default Header;