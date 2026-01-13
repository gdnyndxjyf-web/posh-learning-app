import { Course } from '../types';

export const coursesData: Course[] = [
  // GCSE Courses
  {
    id: 'gcse-maths-higher',
    title: 'GCSE Mathematics (Higher Tier)',
    description: 'Complete preparation for GCSE Mathematics Higher Tier covering all topics from number to calculus',
    curriculum: 'british',
    level: 'GCSE',
    category: 'Mathematics',
    thumbnail: '📐',
    duration: '12 weeks',
    instructor: 'Dr. Sarah Mitchell',
    rating: 4.8,
    enrolledStudents: 1250,
    modules: [
      {
        id: 'mod-1',
        title: 'Number and Algebra',
        description: 'Master fundamental algebraic concepts and number operations',
        order: 1,
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'Algebraic Expressions and Equations',
            description: 'Learn to manipulate algebraic expressions and solve equations',
            contentType: 'video',
            content: {
              type: 'video',
              data: {
                url: 'https://example.com/video1.mp4',
                thumbnail: '📹',
                duration: 25,
                transcript: 'Introduction to algebraic expressions...'
              }
            },
            duration: 25,
            order: 1,
            isCompleted: false
          },
          {
            id: 'lesson-1-2',
            title: 'Quadratic Equations',
            description: 'Factorization, completing the square, and quadratic formula',
            contentType: 'interactive',
            content: {
              type: 'interactive',
              data: {
                html: '<div>Interactive quadratic solver</div>',
                resources: []
              }
            },
            duration: 30,
            order: 2,
            isCompleted: false,
            quiz: {
              id: 'quiz-1-2',
              title: 'Quadratic Equations Quiz',
              passingScore: 70,
              timeLimit: 30,
              attempts: [],
              questions: [
                {
                  id: 'q1',
                  type: 'multiple-choice',
                  question: 'Solve x² - 5x + 6 = 0',
                  options: ['x = 2 or x = 3', 'x = 1 or x = 6', 'x = -2 or x = -3', 'x = 5 or x = 1'],
                  correctAnswer: 0,
                  explanation: 'Factorize to (x-2)(x-3) = 0, giving x = 2 or x = 3',
                  points: 10
                }
              ]
            }
          }
        ]
      },
      {
        id: 'mod-2',
        title: 'Geometry and Measures',
        description: 'Explore shapes, angles, and geometric relationships',
        order: 2,
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Pythagoras Theorem',
            description: 'Apply Pythagoras theorem to right-angled triangles',
            contentType: 'video',
            content: {
              type: 'video',
              data: {
                url: 'https://example.com/pythagoras.mp4',
                thumbnail: '📐',
                duration: 20,
              }
            },
            duration: 20,
            order: 1,
            isCompleted: false
          }
        ]
      }
    ]
  },

  // A-Level Courses
  {
    id: 'alevel-pure-maths',
    title: 'A-Level Pure Mathematics',
    description: 'Advanced pure mathematics covering calculus, algebra, and mathematical proof',
    curriculum: 'british',
    level: 'A-Level',
    category: 'Mathematics',
    thumbnail: '📊',
    duration: '20 weeks',
    instructor: 'Prof. James Thompson',
    rating: 4.9,
    enrolledStudents: 890,
    modules: [
      {
        id: 'mod-al-1',
        title: 'Calculus',
        description: 'Differentiation and integration techniques',
        order: 1,
        lessons: [
          {
            id: 'lesson-al-1-1',
            title: 'Introduction to Differentiation',
            description: 'Learn the fundamentals of rates of change and differentiation',
            contentType: 'video',
            content: {
              type: 'video',
              data: {
                url: 'https://example.com/calculus1.mp4',
                thumbnail: '∂',
                duration: 35
              }
            },
            duration: 35,
            order: 1,
            isCompleted: false
          }
        ]
      }
    ]
  },

  // American High School Courses
  {
    id: 'algebra-2',
    title: 'Algebra II',
    description: 'Advanced algebra topics including polynomials, exponentials, and logarithms',
    curriculum: 'american',
    level: 'Grade-11',
    category: 'Mathematics',
    thumbnail: '🔢',
    duration: '16 weeks',
    instructor: 'Ms. Emily Rodriguez',
    rating: 4.7,
    enrolledStudents: 2100,
    modules: [
      {
        id: 'mod-alg2-1',
        title: 'Polynomial Functions',
        description: 'Study polynomial functions and their properties',
        order: 1,
        lessons: [
          {
            id: 'lesson-alg2-1-1',
            title: 'Polynomial Operations',
            description: 'Add, subtract, multiply, and divide polynomials',
            contentType: 'text',
            content: {
              type: 'text',
              data: 'Polynomials are expressions consisting of variables and coefficients...'
            },
            duration: 30,
            order: 1,
            isCompleted: false
          }
        ]
      }
    ]
  },

  {
    id: 'ap-us-history',
    title: 'AP US History',
    description: 'College-level US history from pre-Columbian to modern times',
    curriculum: 'american',
    level: 'Grade-11',
    category: 'Humanities',
    thumbnail: '🗽',
    duration: '24 weeks',
    instructor: 'Dr. Michael Chen',
    rating: 4.6,
    enrolledStudents: 1560,
    modules: [
      {
        id: 'mod-apush-1',
        title: 'Colonial America',
        description: 'European colonization and early American society',
        order: 1,
        lessons: [
          {
            id: 'lesson-apush-1-1',
            title: 'The Thirteen Colonies',
            description: 'Explore the founding and development of the thirteen colonies',
            contentType: 'video',
            content: {
              type: 'video',
              data: {
                url: 'https://example.com/colonies.mp4',
                thumbnail: '🏛️',
                duration: 40
              }
            },
            duration: 40,
            order: 1,
            isCompleted: false
          }
        ]
      }
    ]
  },

  // College Courses
  {
    id: 'calc-1',
    title: 'Calculus I',
    description: 'Limits, derivatives, and introduction to integration',
    curriculum: 'american',
    level: 'Freshman',
    category: 'Mathematics',
    thumbnail: '∫',
    duration: '14 weeks',
    instructor: 'Prof. Lisa Wang',
    rating: 4.8,
    enrolledStudents: 3200,
    modules: [
      {
        id: 'mod-calc1-1',
        title: 'Limits and Continuity',
        description: 'Understanding limits and continuous functions',
        order: 1,
        lessons: [
          {
            id: 'lesson-calc1-1-1',
            title: 'Introduction to Limits',
            description: 'The concept of a limit and limit notation',
            contentType: 'video',
            content: {
              type: 'video',
              data: {
                url: 'https://example.com/limits.mp4',
                thumbnail: '→',
                duration: 45
              }
            },
            duration: 45,
            order: 1,
            isCompleted: false
          }
        ]
      }
    ]
  },

  {
    id: 'cs-101',
    title: 'Introduction to Computer Science',
    description: 'Programming fundamentals using Python',
    curriculum: 'american',
    level: 'Freshman',
    category: 'Technology',
    thumbnail: '💻',
    duration: '12 weeks',
    instructor: 'Dr. Alex Kumar',
    rating: 4.9,
    enrolledStudents: 4500,
    modules: [
      {
        id: 'mod-cs-1',
        title: 'Python Basics',
        description: 'Variables, data types, and control structures',
        order: 1,
        lessons: [
          {
            id: 'lesson-cs-1-1',
            title: 'Getting Started with Python',
            description: 'Install Python and write your first program',
            contentType: 'interactive',
            content: {
              type: 'interactive',
              data: {
                html: '<div>Python interactive coding environment</div>',
                resources: ['python.org']
              }
            },
            duration: 35,
            order: 1,
            isCompleted: false,
            quiz: {
              id: 'quiz-cs-1-1',
              title: 'Python Basics Quiz',
              passingScore: 80,
              timeLimit: 20,
              attempts: [],
              questions: [
                {
                  id: 'q-cs-1',
                  type: 'multiple-choice',
                  question: 'What is the correct way to print "Hello World" in Python?',
                  options: [
                    'print("Hello World")',
                    'echo "Hello World"',
                    'console.log("Hello World")',
                    'printf("Hello World")'
                  ],
                  correctAnswer: 0,
                  explanation: 'Python uses the print() function to output text',
                  points: 10
                }
              ]
            }
          }
        ]
      }
    ]
  }
];
