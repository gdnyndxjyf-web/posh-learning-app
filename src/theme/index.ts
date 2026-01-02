import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6366f1', // Indigo
    accent: '#f59e0b', // Amber
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#1e293b',
    error: '#ef4444',
    success: '#10b981',
    warning: '#f59e0b',
    info: '#3b82f6',
  },
  roundness: 12,
};

export const colors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  accent: '#f59e0b',
  background: '#f8fafc',
  surface: '#ffffff',
  text: '#1e293b',
  textSecondary: '#64748b',
  border: '#e2e8f0',
  error: '#ef4444',
  success: '#10b981',
  warning: '#f59e0b',
  info: '#3b82f6',

  // Curriculum specific colors
  british: '#991b1b', // Deep red for British curriculum
  american: '#1e3a8a', // Deep blue for American curriculum

  // Category colors
  mathematics: '#8b5cf6',
  sciences: '#10b981',
  languages: '#f59e0b',
  humanities: '#ef4444',
  arts: '#ec4899',
  technology: '#3b82f6',
  business: '#06b6d4',
};
