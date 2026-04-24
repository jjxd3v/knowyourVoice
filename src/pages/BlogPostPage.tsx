import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeftIcon, ClockIcon, UserIcon, CalendarIcon } from 'lucide-react';
import { useAppContext } from '../store/AppContext';

export const BlogPostPage: React.FC = () => {
  const { id } = useParams<{
    id: string;
  }>();
  const { articles } = useAppContext();
  const navigate = useNavigate();
  const post = articles.find((p: any) => p.id === id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  if (!post) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-background dark:bg-background-dark">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          Post not found
        </h2>
        <button
          onClick={() => navigate('/')}
          className="text-primary hover:underline">
          
          Return to home
        </button>
      </div>);

  }
  // Split content into paragraphs for rendering
  const paragraphs = post.content.split('\n\n');
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
      exit={{
        opacity: 0
      }}
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <Link
        to="/blog"
        className="inline-flex items-center text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-8 transition-colors">
        
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to articles
      </Link>

      <div className="mb-8">
        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full uppercase tracking-wider mb-4 inline-block">
          {post.category}
        </span>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-6 leading-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-border-dark pb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
              <UserIcon size={16} />
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">{post.author}</span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center space-x-1">
            <CalendarIcon size={14} />
            <span>
              {new Date(post.date).toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          </div>
          <span className="hidden sm:inline">•</span>
          <div className="flex items-center space-x-1">
            <ClockIcon size={14} />
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      <img
        src={post.imageUrl}
        alt={post.title}
        className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-sm" />
      

      <div className="prose prose-lg max-w-none text-gray-800 dark:text-gray-200 font-sans">
        <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 font-medium italic">
          {post.excerpt}
        </p>

        {paragraphs.map((paragraph: any, index: number) =>
        <p key={index} className="mb-6 leading-relaxed text-lg">
            {paragraph}
          </p>
        )}
      </div>
    </motion.article>);

};