import React from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User,
  Calendar,
  MessageSquare
} from 'lucide-react';
import { Card } from '../ui/Card';

interface Activity {
  id: string;
  type: 'task_completed' | 'task_created' | 'task_overdue' | 'comment_added';
  user: string;
  description: string;
  time: string;
  project: string;
}

const activities: Activity[] = [
  {
    id: '1',
    type: 'task_completed',
    user: 'John Doe',
    description: 'completed task "Fix login bug"',
    time: '2 minutes ago',
    project: 'Frontend Redesign',
  },
  {
    id: '2',
    type: 'task_created',
    user: 'Jane Smith',
    description: 'created new task "API Integration"',
    time: '15 minutes ago',
    project: 'Backend API',
  },
  {
    id: '3',
    type: 'comment_added',
    user: 'Mike Johnson',
    description: 'commented on "Database optimization"',
    time: '1 hour ago',
    project: 'Performance',
  },
  {
    id: '4',
    type: 'task_overdue',
    user: 'System',
    description: 'Task "Update documentation" is overdue',
    time: '2 hours ago',
    project: 'Documentation',
  },
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'task_completed':
      return { icon: CheckCircle2, color: 'text-green-500' };
    case 'task_created':
      return { icon: Clock, color: 'text-blue-500' };
    case 'task_overdue':
      return { icon: AlertCircle, color: 'text-red-500' };
    case 'comment_added':
      return { icon: MessageSquare, color: 'text-purple-500' };
    default:
      return { icon: Clock, color: 'text-gray-500' };
  }
};

export const ActivityFeed: React.FC = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Recent Activity
        </h3>
        <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const { icon: Icon, color } = getActivityIcon(activity.type);
          
          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center ${color}`}>
                <Icon className="w-4 h-4" />
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 dark:text-white">
                  <span className="font-medium">{activity.user}</span>{' '}
                  {activity.description}
                </p>
                <div className="flex items-center mt-1 space-x-2 text-xs text-gray-500 dark:text-gray-400">
                  <Calendar className="w-3 h-3" />
                  <span>{activity.time}</span>
                  <span>•</span>
                  <span>{activity.project}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};