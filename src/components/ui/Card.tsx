import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
}) => {
  const Component = onClick ? motion.div : 'div';
  
  return (
    <Component
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 ${hover ? 'hover:shadow-lg hover:border-purple-200 dark:hover:border-purple-800 transition-all duration-200 cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      {...(onClick && {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.98 },
      })}
    >
      {children}
    </Component>
  );
};