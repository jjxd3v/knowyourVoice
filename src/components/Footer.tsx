import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon } from 'lucide-react';
export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface dark:bg-surface-dark border-t border-gray-200 dark:border-border-dark mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <BookOpenIcon size={20} className="text-primary" />
            <span className="font-serif text-xl font-bold text-text dark:text-text-dark">
              Know Your Voice
            </span>
          </div>

          <div className="text-center md:text-left max-w-md mb-6 md:mb-0">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Educational resources for digital expression and online safety.
              Learn to communicate effectively on your social media platforms.
            </p>
          </div>

          <div className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <Link to="/about" className="hover:text-primary dark:hover:text-primary transition-colors">
              About
            </Link>
            <Link
              to="/guidelines"
              className="hover:text-primary dark:hover:text-primary transition-colors">
              
              Guidelines
            </Link>
            <Link
              to="/contact"
              className="hover:text-primary dark:hover:text-primary transition-colors">
              
              Contact
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-100 dark:border-border-dark text-center text-sm text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} Know Your Voice. All rights
          reserved.
        </div>
      </div>
    </footer>);

};