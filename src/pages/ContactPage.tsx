import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MailIcon, SendIcon, CheckCircleIcon } from 'lucide-react';
export const ContactPage: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1000);
  };
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
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <MailIcon size={32} />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
          Share Your Feedback
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light">
          Your feedback helps us improve Know Your Voice and create a better
          experience for everyone.
        </p>
      </div>

      <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark relative overflow-hidden">
        <AnimatePresence>
          {isSuccess &&
          <motion.div
            initial={{
              opacity: 0,
              y: -50
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            exit={{
              opacity: 0,
              y: -50
            }}
            className="absolute top-0 left-0 right-0 bg-green-500 text-white p-4 flex items-center justify-center z-10">
            
              <CheckCircleIcon className="mr-2" size={20} />
              <span className="font-medium">
                Thank you for your feedback! It has been received.
              </span>
            </motion.div>
          }
        </AnimatePresence>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Name (Optional)
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-border-dark bg-white dark:bg-background-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="How should we call you?"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
              >
                Email (Optional)
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value
                  })
                }
                className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-border-dark bg-white dark:bg-background-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                placeholder="For replies, if needed"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Message *
            </label>
            <textarea
              id="message"
              required
              rows={6}
              value={formData.message}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  message: e.target.value
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-border-dark bg-white dark:bg-background-dark text-text dark:text-text-dark focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none"
              placeholder="Tell us what you think, report an issue, or suggest a feature..."
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isSubmitting || !formData.message.trim()}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium rounded-full text-white bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:transform-none disabled:hover:shadow-lg"
            >
              {isSubmitting ?
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" /> :

                <>
                  <SendIcon className="mr-2" size={18} />
                  Submit Feedback
                </>
              }
            </button>
          </div>
        </form>
      </div>
    </motion.div>);

};