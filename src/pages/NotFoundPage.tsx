import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, SearchXIcon } from 'lucide-react';
export const NotFoundPage: React.FC = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      exit={{
        opacity: 0
      }}
      className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
      
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-8">
        <SearchXIcon size={40} />
      </div>
      <h1 className="font-serif text-5xl md:text-6xl font-bold text-text dark:text-text-dark mb-4">
        404
      </h1>
      <p className="text-xl text-gray-500 dark:text-gray-400 mb-10 font-light">
        This page doesn't exist. It may have been moved or the link might be
        incorrect.
      </p>
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-primary hover:bg-primary-hover transition-colors shadow-sm">
        
        <HomeIcon className="mr-2" size={18} />
        Back to Home
      </Link>
    </motion.div>);

};