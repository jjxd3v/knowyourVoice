import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './store/AppContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatBot } from './components/ChatBot';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { GuidelinesPage } from './pages/GuidelinesPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactPage } from './pages/ContactPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-background dark:bg-background-dark font-sans text-text dark:text-text-dark selection:bg-primary/20">
            <Navbar />

            <main className="flex-grow relative">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogPostPage />} />
                <Route path="/post/:id" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact-us" element={<ContactUsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>

            <Footer />
            <ChatBot />
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}