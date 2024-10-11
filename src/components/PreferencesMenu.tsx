import React, { useState } from 'react';
import { Settings } from 'lucide-react';

const PreferencesMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
    // Implement dark mode logic here
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // Implement language change logic here
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="p-2 rounded-full hover:bg-gray-200">
        <Settings size={24} />
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">Preferences</h3>
            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={handleDarkModeToggle}
                  className="mr-2"
                />
                Dark Mode
              </label>
            </div>
            <div>
              <label className="block mb-1">Language</label>
              <select
                value={language}
                onChange={handleLanguageChange}
                className="w-full p-1 border rounded"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PreferencesMenu;