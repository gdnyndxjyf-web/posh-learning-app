// Curriculum Types
export type CurriculumType = 'british' | 'american';
export type EducationLevel = 'high-school' | 'college';

// British Education Levels
export type BritishLevel =
  | 'GCSE' // Ages 14-16
  | 'A-Level' // Ages 16-18
  | 'Foundation' // Pre-university
  | 'Undergraduate'; // University

// American Education Levels
export type AmericanLevel =
  | 'Grade-9' | 'Grade-10' | 'Grade-11' | 'Grade-12' // High School
  | 'Freshman' | 'Sophomore' | 'Junior' | 'Senior'; // College

export type AcademicLevel = BritishLevel | AmericanLevel;

// Subject Categories
export type SubjectCategory =
  | 'Mathematics'
  | 'Sciences'
  | 'Languages'
  | 'Humanities'
  | 'Arts'
  | 'Technology'
  | 'Business';

// Content Types
export type ContentType = 'video' | 'text' | 'interactive' | 'quiz' | 'assignment';

// User Interface
export interface User {
  id: string;
  name: string;
  email: string;
  curriculum: CurriculumType;
  level: AcademicLevel;
  enrolledCourses: string[]; // Course IDs
  completedLessons: string[]; // Lesson IDs
  progress: UserProgress;
}

export interface UserProgress {
  totalLessons: number;
  completedLessons: number;
  totalQuizzes: number;
  completedQuizzes: number;
  averageScore: number;
  streakDays: number;
  lastActive: Date;
}

// Course Structure
export interface Course {
  id: string;
  title: string;
  description: string;
  curriculum: CurriculumType;
  level: AcademicLevel;
  category: SubjectCategory;
  thumbnail: string;
  duration: string; // e.g., "8 weeks"
  modules: Module[];
  instructor: string;
  rating: number;
  enrolledStudents: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  order: number;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  content: LessonContent;
  duration: number; // in minutes
  order: number;
  isCompleted: boolean;
  quiz?: Quiz;
}

export interface LessonContent {
  type: ContentType;
  data: string | VideoContent | InteractiveContent;
}

export interface VideoContent {
  url: string;
  thumbnail: string;
  duration: number;
  transcript?: string;
}

export interface InteractiveContent {
  html: string;
  resources: string[];
}

// Quiz System
export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  passingScore: number; // percentage
  timeLimit?: number; // in minutes
  attempts: QuizAttempt[];
}

export interface Question {
  id: string;
  type: 'multiple-choice' | 'true-false' | 'short-answer' | 'essay';
  question: string;
  options?: string[]; // for multiple choice
  correctAnswer: string | number;
  explanation: string;
  points: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  userId: string;
  answers: Answer[];
  score: number;
  completedAt: Date;
  timeTaken: number; // in minutes
}

export interface Answer {
  questionId: string;
  answer: string | number;
  isCorrect: boolean;
  pointsEarned: number;
}

// Curriculum Mapping
export interface CurriculumMapping {
  [key: string]: {
    levels: AcademicLevel[];
    subjects: Subject[];
  };
}

export interface Subject {
  id: string;
  name: string;
  category: SubjectCategory;
  description: string;
  icon: string;
  courses: string[]; // Course IDs
}

// Navigation Types
export type RootStackParamList = {
  Home: undefined;
  CourseDetail: { courseId: string };
  Lesson: { lessonId: string; courseId: string };
  Quiz: { quizId: string; lessonId: string };
  Profile: undefined;
  Settings: undefined;
  MyCourses: undefined;
  Browse: { curriculum?: CurriculumType; level?: AcademicLevel };
};
