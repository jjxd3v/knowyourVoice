import React from 'react';
import { motion } from 'framer-motion';
import { BookOpenIcon, TargetIcon, GlobeIcon, CpuIcon } from 'lucide-react';
export const AboutPage: React.FC = () => {
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
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
          About Know Your Voice
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
          Educational resources for digital expression and online safety.
          Learn to use your voice responsibly on social media platforms.
        </p>
      </div>

      <div className="space-y-12">
        <section className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-6">
            <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center sm:mr-4 flex-shrink-0">
              <BookOpenIcon size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-text dark:text-text-dark">
              Background of the Study
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            This educational platform was developed to help people learn about
            digital expression, online safety, and responsible communication.
            Users can read articles, access resources, and chat with an AI guide
            to better understand how to express themselves effectively on social
            media platforms like Facebook, Instagram, and TikTok.
          </p>
        </section>

        <section className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-6">
            <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center sm:mr-4 flex-shrink-0">
              <TargetIcon size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-text dark:text-text-dark">
              Our Purpose
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Our goal is to provide educational content and AI guidance to help
            users understand digital rights, online safety, and effective communication.
            This is a read-only educational platform where users can learn and
            prepare to apply these principles on their own social media accounts.
            We believe education is the key to fostering healthier online communities.
          </p>
        </section>

        <section className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-6">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center sm:mr-4 flex-shrink-0">
              <GlobeIcon size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-text dark:text-text-dark">
              Why Freedom of Expression Matters
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Freedom of expression is a fundamental human right. It is the
            bedrock upon which democracies are built and the mechanism through
            which societies progress. In the digital age, it's crucial to create
            platforms that encourage open dialogue while promoting respect and
            understanding, ensuring that all voices have the opportunity to be
            heard without fear of harassment.
          </p>
        </section>

        <section className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-0 mb-6">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl flex items-center justify-center sm:mr-4 flex-shrink-0">
              <CpuIcon size={24} />
            </div>
            <h2 className="font-serif text-2xl font-bold text-text dark:text-text-dark">
              The Role of AI
            </h2>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
            Our AI chatbot serves as a facilitator for constructive
            conversations. It is designed not to judge or censor, but to help
            users explore complex topics, provide educational context on digital
            rights, and gently guide discussions away from harmful language. By
            acting as a neutral sounding board, the AI helps users practice
            articulating their thoughts respectfully.
          </p>
        </section>
      </div>
    </motion.div>);

};