import React from 'react';
import { Menu, Bell, Search, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

const Header = ({ onMenuClick }) => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-neutral-800 shadow-sm border-b border-neutral-200 dark:border-neutral-700">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 lg:hidden transition-colors duration-200"
          >
            <Menu className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
          </button>
          
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 w-64 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
          >
            {theme === 'light' ? (
              <Moon className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <Sun className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            )}
          </button>

          <button className="relative p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200">
            <Bell className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-error-500 rounded-full text-xs text-white flex items-center justify-center">
              3
            </span>
          </button>

          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="h-8 w-8 rounded-full object-cover"
            />
            <div className="hidden md:block">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                {user?.name}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                {user?.department}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;