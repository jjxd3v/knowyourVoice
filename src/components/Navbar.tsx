import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpenIcon, MenuIcon, XIcon, SunIcon, MoonIcon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Guidelines', path: '/guidelines' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-40 w-full bg-background/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary text-white p-2 rounded-lg group-hover:bg-primary-hover transition-colors">
              <BookOpenIcon size={24} />
            </div>
            <span className="font-serif text-2xl font-bold text-text dark:text-text-dark tracking-tight">
              Know Your Voice
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon size={20} /> : <MoonIcon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none p-2"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <SunIcon size={24} /> : <MoonIcon size={24} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none p-2"
            >
              {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-border-dark shadow-lg absolute w-full">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  isActive(link.path)
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};