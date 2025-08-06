import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, 
  FolderOpen, 
  BarChart3, 
  Settings, 
  Users, 
  Bug,
  Sparkles,
  Moon,
  Sun
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center">
          <div className="relative">
            <Bug className="w-8 h-8 text-purple-600" />
            <Sparkles className="w-4 h-4 text-blue-500 absolute -top-1 -right-1" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 dark:text-white ml-3">
            Bug<span className="text-purple-600">Tracker</span>
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </motion.button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Theme Toggle */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleTheme}
          className="w-full flex items-center px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          {isDark ? (
            <Sun className="w-5 h-5 mr-3" />
          ) : (
            <Moon className="w-5 h-5 mr-3" />
          )}
          <span className="font-medium">
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </span>
        </motion.button>
      </div>
    </div>
  );
};