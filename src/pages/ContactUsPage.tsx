import React from 'react';
import { motion } from 'framer-motion';
import {
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  UserIcon
} from 'lucide-react';

export const ContactUsPage: React.FC = () => {
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
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
          <PhoneIcon size={32} />
        </div>
        <h1 className="font-serif text-4xl md:text-5xl font-bold text-text dark:text-text-dark mb-4">
          Contact Us
        </h1>
        <p className="text-xl text-gray-500 dark:text-gray-400 font-light max-w-2xl mx-auto">
          Get in touch with the KYRO team. We're here to help and answer any questions you may have.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* KYRO Profile Section */}
        <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark h-full">
          
          <div className="flex items-center mb-6">
            <img 
                src="/images/glen-profile.jpg?t=2026051309" 
                alt="Glen Mark Plaza" 
                className="w-20 h-20 rounded-full object-cover mr-4"
              />
            <div>
              <h3 className="font-bold text-lg text-text dark:text-text-dark">Glen Mark Plaza</h3>
              <p className="text-gray-600 dark:text-gray-300">UI/UX Designer</p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Creative UI/UX designer focused on crafting intuitive and engaging digital experiences. 
            Specializing in user-centered design, interface aesthetics, and creating seamless interactions that make digital platforms both beautiful and functional.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MapPinIcon size={20} className="mr-3 text-primary" />
              <span>Philippines</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MailIcon size={20} className="mr-3 text-primary" />
              <span>support@kyro.digital</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <PhoneIcon size={20} className="mr-3 text-primary" />
              <span>09510361541</span>
            </div>
          </div>
          
          {/* Follow Me Social Media */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-border-dark">
            <h3 className="font-semibold text-text dark:text-text-dark mb-4">Follow Me</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.facebook.com/glenmark.plaza?rdid=KesqcobTpdeELhfA&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1Da7oMgfX8%2F#"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <FacebookIcon size={18} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-text group-hover:text-gray-700">Facebook</p>
                  <p className="text-xs text-gray-500">@glenmark.plaza</p>
                </div>
              </a>
              <a
                href="https://www.instagram.com/gleenmarkk?igsh=eWQxcGNvNzQ4NXA0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <InstagramIcon size={18} className="text-pink-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-text group-hover:text-gray-700">Instagram</p>
                  <p className="text-xs text-gray-500">@gleenmarkk</p>
                </div>
              </a>
              <a
                href="https://github.com/settings/admin"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <GithubIcon size={20} className="mr-2 text-gray-700 dark:text-gray-300" />
                <div>
                  <p className="font-medium text-sm text-text group-hover:text-gray-700">GitHub</p>
                  <p className="text-xs text-gray-500">Settings Admin</p>
                </div>
              </a>
              <a
                href="mailto:glenmark.plaza@example.com"
                className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors group"
              >
                <MailIcon size={20} className="mr-2 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-medium text-sm text-text dark:text-text-dark group-hover:text-red-600 dark:group-hover:text-red-400">Gmail</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">glenmark.plaza@example.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Partner Profile Section */}
        <div className="bg-white dark:bg-surface-dark p-8 md:p-10 rounded-3xl shadow-sm border border-gray-100 dark:border-border-dark h-full">
          
          <div className="flex items-center mb-6">
            <div className="relative">
              <img 
                src="/images/joemar-profile.png" 
                alt="Joemar Jay Rogero" 
                className="w-20 h-20 rounded-full object-cover mr-4"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="w-20 h-20 bg-gradient-to-br from-secondary to-accent rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4 hidden">
                JR
              </div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-text dark:text-text-dark">Joemar Jay Rogero</h3>
              <p className="text-gray-600 dark:text-gray-300">Developer</p>
            </div>
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Passionate developer focused on creating educational platforms that empower users with knowledge about digital rights and online safety. 
            Specializing in React, TypeScript, and modern web technologies to build intuitive and impactful applications.
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MapPinIcon size={20} className="mr-3 text-secondary" />
              <span>Philippines</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <MailIcon size={20} className="mr-3 text-secondary" />
              <span>jjarogero@nemsu.edu.ph</span>
            </div>
            <div className="flex items-center text-gray-700 dark:text-gray-300">
              <PhoneIcon size={20} className="mr-3 text-secondary" />
              <span>+63 931 860 8026</span>
            </div>
          </div>
          
          {/* Follow Me Social Media */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-border-dark">
            <h3 className="font-semibold text-text dark:text-text-dark mb-4">Follow Me</h3>
            <div className="grid grid-cols-2 gap-3">
              <a
                href="https://www.facebook.com/joemarjay.rogero/"
                target="https://www.facebook.com/joemarjay.rogero/"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
              >
                <FacebookIcon size={20} className="mr-2 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-medium text-sm text-text dark:text-text-dark group-hover:text-blue-600 dark:group-hover:text-blue-400">Facebook</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">@joemarjay.Rogero</p>
                </div>
              </a>
              
              <a
                href="https://instagram.com/joemarjay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg hover:bg-pink-100 dark:hover:bg-pink-900/30 transition-colors group"
              >
                <InstagramIcon size={20} className="mr-2 text-pink-600 dark:text-pink-400" />
                <div>
                  <p className="font-medium text-sm text-text dark:text-text-dark group-hover:text-pink-600 dark:group-hover:text-pink-400">Instagram</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">@joemarjay</p>
                </div>
              </a>
              
              <a
                href="https://github.com/joemarjay"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors group"
              >
                <GithubIcon size={20} className="mr-2 text-gray-700 dark:text-gray-300" />
                <div>
                  <p className="font-medium text-sm text-text dark:text-text-dark group-hover:text-gray-700 dark:group-hover:text-gray-300">GitHub</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">@https://github.com/jjxd3v</p>
                </div>
              </a>
              
              <a
                href="mailto:joemar.rogacion@example.com"
                className="flex items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors group"
              >
                <MailIcon size={20} className="mr-2 text-red-600 dark:text-red-400" />
                <div>
                  <p className="font-medium text-sm text-text dark:text-text-dark group-hover:text-red-600 dark:group-hover:text-red-400">Gmail</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">joemar.rogacion@example.com</p>
                </div>
              </a>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
