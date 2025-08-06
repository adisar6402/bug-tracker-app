export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'project_manager' | 'developer';
  avatar?: string;
  created_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  color: string;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  project_id: string;
  assignee_id?: string;
  created_by: string;
  deadline?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}

export interface Comment {
  id: string;
  task_id: string;
  user_id: string;
  content: string;
  created_at: string;
}

export interface Activity {
  id: string;
  user_id: string;
  action: string;
  resource_type: 'task' | 'project' | 'comment';
  resource_id: string;
  created_at: string;
}