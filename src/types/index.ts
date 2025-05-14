export interface Project {
  id: string;
  title: string;
  description: string;
  progress: number;
  roi: number;
  investmentAmount: number;
  projectedReturn: number;
  startDate: string;
  endDate: string;
  status: 'planning' | 'in-progress' | 'completed' | 'on-hold';
  riskLevel: 'low' | 'medium' | 'high';
  category: string;
  imageUrl: string;
}

export interface FinancialReport {
  id: string;
  projectId: string;
  quarter: string;
  year: number;
  revenue: number;
  expenses: number;
  profit: number;
  profitMargin: number;
  date: string;
}

export interface QuarterlyData {
  quarter: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
}

export interface Document {
  id: string;
  projectId: string;
  title: string;
  description: string;
  category: 'report' | 'presentation' | 'legal' | 'other';
  fileUrl: string;
  uploadDate: string;
  fileSize: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  date: string;
  read: boolean;
  projectId?: string;
}

export interface Comment {
  id: string;
  projectId: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  date: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'investor' | 'visitor';
  avatar: string;
}