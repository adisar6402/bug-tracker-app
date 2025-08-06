import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Project } from '../../types';
import { Card } from '../ui/Card';

interface ProjectCardProps {
  project: Project;
  taskStats: {
    total: number;
    completed: number;
    inProgress: number;
    overdue: number;
  };
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  taskStats,
  onClick,
}) => {
  const completionRate = taskStats.total > 0 ? (taskStats.completed / taskStats.total) * 100 : 0;

  return (
    <Card hover onClick={onClick} className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <div
              className="w-3 h-3 rounded-full mr-3"
              style={{ backgroundColor: project.color }}
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
              {project.name}
            </h3>
          </div>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 dark:text-gray-400">Progress</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {Math.round(completionRate)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${completionRate}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
            style={{ backgroundColor: project.color }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="flex items-center justify-center text-green-500 mb-1">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {taskStats.completed}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Done</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-yellow-500 mb-1">
            <Clock className="w-4 h-4" />
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {taskStats.inProgress}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Active</div>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center text-red-500 mb-1">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {taskStats.overdue}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Overdue</div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          <span>
            {new Date(project.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center">
          <Users className="w-3 h-3 mr-1" />
          <span>5 members</span>
        </div>
      </div>
    </Card>
  );
};