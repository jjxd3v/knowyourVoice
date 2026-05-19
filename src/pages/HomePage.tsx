import React from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,
  MessageSquareIcon,
  HeartHandshakeIcon } from
'lucide-react';
export const HomePage: React.FC = () => {
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
      className="flex flex-col items-center">
      
      {/* Hero Section */}
      <section className="w-full bg-primary/5 dark:bg-primary/10 py-12 sm:py-20 md:py-32 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <motion.div
          initial={{
            y: 20,
            opacity: 0
          }}
          animate={{
            y: 0,
            opacity: 1
          }}
          transition={{
            delay: 0.1
          }}
          className="max-w-3xl mx-auto">
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold text-text dark:text-text-dark mb-6 leading-tight">
            Know Your Rights Online
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed font-light">
            An educational platform to learn about digital rights, online safety,
            and responsible communication. Access research articles and gain knowledge to apply
            on your social media platforms.
          </p>
          <button
            onClick={() => {
              const event = new CustomEvent('open-chatbot');
              window.dispatchEvent(event);
            }}
            className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-medium rounded-full text-white bg-primary hover:bg-primary-hover transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1">
            
            <MessageSquareIcon className="mr-2" size={24} />
            Start Chatting
          </button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-text dark:text-text-dark mb-4">
            Our Core Values
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            We believe that open dialogue and mutual respect are the foundations
            of a healthy digital society.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <motion.div
            initial={{
              y: 20,
              opacity: 0
            }}
            whileInView={{
              y: 0,
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.1
            }}
            className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark text-center">
            
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ShieldCheckIcon size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-text dark:text-text-dark mb-4">
              Educational Content
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Access curated articles and resources about digital rights,
              online safety, and effective communication. Learn at your own pace
              with expert-vetted content.
            </p>
          </motion.div>

          <motion.div
            initial={{
              y: 20,
              opacity: 0
            }}
            whileInView={{
              y: 0,
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.2
            }}
            className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark text-center">
            
            <div className="w-16 h-16 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageSquareIcon size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-text dark:text-text-dark mb-4">
              AI Learning Assistant
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Chat with our AI guide to understand complex topics, ask questions,
              and get personalized advice for your social media presence.
            </p>
          </motion.div>

          <motion.div
            initial={{
              y: 20,
              opacity: 0
            }}
            whileInView={{
              y: 0,
              opacity: 1
            }}
            viewport={{
              once: true
            }}
            transition={{
              delay: 0.3
            }}
            className="bg-white dark:bg-surface-dark p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark text-center">
            
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HeartHandshakeIcon size={32} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-text dark:text-text-dark mb-4">
              Respectful Expression
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Learn and practice digital etiquette. We focus on attacking ideas,
              not people, to foster constructive conversations.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>);

};