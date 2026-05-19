import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ClockIcon, UserIcon, FileTextIcon, DownloadIcon } from 'lucide-react';
import { Article } from '../store/AppContext';
interface BlogCardProps {
  post: Article;
  index?: number;
}
export const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 20
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.1
      }}
      className="bg-white dark:bg-surface-dark rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 dark:border-border-dark flex flex-col h-full group">
      
      <Link
        to={`/blog/${post.id}`}
        className="block overflow-hidden aspect-[16/10]">
        
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
        
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center space-x-2 mb-3">
          <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider">
            {post.category}
          </span>
          <span className="text-gray-400 text-xs">{post.date}</span>
        </div>

        <Link
          to={`/blog/${post.id}`}
          className="block group-hover:text-primary transition-colors">
          
          <h3 className="font-serif text-2xl font-bold text-text dark:text-text-dark mb-2 line-clamp-2 leading-tight">
            {post.title}
          </h3>
        </Link>

        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-sm flex-grow">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-2 mt-auto pt-4 border-t border-gray-100 dark:border-border-dark">
          <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-300">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              <UserIcon size={14} />
            </div>
            <span className="font-medium">{post.author}</span>
          </div>
          <div className="flex items-center space-x-3">
            {post.pdfUrl && (
              <a
                href={post.pdfUrl}
                download
                className="flex items-center space-x-1 text-xs text-primary hover:text-primary-hover transition-colors"
                title="Download PDF"
              >
                <FileTextIcon size={14} />
                <span>PDF</span>
                <DownloadIcon size={12} />
              </a>
            )}
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <ClockIcon size={14} />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.article>);

};