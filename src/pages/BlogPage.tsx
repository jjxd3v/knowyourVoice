import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SearchIcon } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import { BlogCard } from '../components/BlogCard';
export const BlogPage: React.FC = () => {
  const { articles } = useAppContext();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = [
  'All',
  ...Array.from(new Set(articles.map((post: any) => post.category)))];

  // Filter by category and search
  const filteredPosts = articles.filter((post: any) => {
    const matchesCategory =
    activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch =
    searchQuery.trim() === '' ||
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
          Articles & Resources
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
          Read about freedom of expression, digital etiquette, and online
          safety.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-xl mx-auto mb-10">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <SearchIcon size={20} className="text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles by title, topic, or author..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 dark:border-border-dark bg-white dark:bg-surface-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all shadow-sm text-base" />
          
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((category: any) =>
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-surface-dark text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-border-dark'}`}>
          
            {category}
          </button>
        )}
      </div>

      {/* Post Grid */}
      {filteredPosts.length > 0 ?
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post: any, index: number) =>
        <BlogCard key={post.id} post={post} index={index} />
        )}
        </div> :

      <div className="text-center py-20 bg-white dark:bg-surface-dark rounded-3xl border border-gray-100 dark:border-border-dark border-dashed">
          <h3 className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-2">
            No articles found
          </h3>
          <p className="text-gray-400 dark:text-gray-500">
            Try adjusting your search or category filter.
          </p>
        </div>
      }
    </motion.div>);

};