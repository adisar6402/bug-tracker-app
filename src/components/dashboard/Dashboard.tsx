import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Users,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { StatsCard } from './StatsCard';
import { TaskChart } from './TaskChart';
import { ActivityFeed } from './ActivityFeed';

const statsData = [
  {
    title: 'Total Tasks',
    value: 248,
    icon: CheckCircle,
    color: 'bg-gradient-to-r from-blue-500 to-blue-600',
    trend: {
      value: 12,
      isPositive: true,
    },
  },
  {
    title: 'In Progress',
    value: 42,
    icon: Clock,
    color: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    trend: {
      value: 8,
      isPositive: true,
    },
  },
  {
    title: 'Overdue',
    value: 7,
    icon: AlertTriangle,
    color: 'bg-gradient-to-r from-red-500 to-red-600',
    trend: {
      value: 15,
      isPositive: false,
    },
  },
  {
    title: 'Team Members',
    value: 12,
    icon: Users,
    color: 'bg-gradient-to-r from-purple-500 to-purple-600',
    trend: {
      value: 3,
      isPositive: true,
    },
  },
];

const statusData = [
  { name: 'To Do', value: 89, color: '#EF4444' },
  { name: 'In Progress', value: 42, color: '#F59E0B' },
  { name: 'Done', value: 117, color: '#10B981' },
];

const priorityData = [
  { name: 'Low', value: 45 },
  { name: 'Medium', value: 89 },
  { name: 'High', value: 67 },
  { name: 'Urgent', value: 23 },
];

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Welcome back! Here's what's happening with your projects.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span>{new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</span>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statsData.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.1 }}
          >
            <StatsCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <TaskChart statusData={statusData} priorityData={priorityData} />
      </motion.div>

      {/* Activity Feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ActivityFeed />
      </motion.div>
    </div>
  );
};