import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bug, Sparkles } from 'lucide-react';
import { LoginForm } from './LoginForm';
import { SignupForm } from './SignupForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%239C92AC%22 fill-opacity=%220.1%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative z-10 w-full max-w-6xl flex items-center justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          {/* Branding Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="relative">
                <Bug className="w-12 h-12 text-purple-400" />
                <Sparkles className="w-6 h-6 text-blue-400 absolute -top-1 -right-1" />
              </div>
              <h1 className="text-4xl font-bold text-white ml-4">
                Bug<span className="text-purple-400">Tracker</span>
              </h1>
            </div>
            
            <div className="max-w-md">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                The Future of
                <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  {' '}Project Management
                </span>
              </h2>
              <p className="text-lg text-gray-300 mb-8">
                Experience seamless bug tracking and project management with our cutting-edge platform designed for modern teams.
              </p>
              
              <div className="space-y-4 text-left">
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mr-3"></div>
                  <span>Drag & Drop Kanban Boards</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  <span>Real-time Analytics & Reports</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-indigo-400 rounded-full mr-3"></div>
                  <span>Team Collaboration Tools</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Auth Forms */}
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm key="login" onSwitchToSignup={() => setIsLogin(false)} />
              ) : (
                <SignupForm key="signup" onSwitchToLogin={() => setIsLogin(true)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};