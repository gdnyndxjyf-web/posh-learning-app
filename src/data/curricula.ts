import { CurriculumMapping, Subject } from '../types';

export const curriculaData: CurriculumMapping = {
  british: {
    levels: ['GCSE', 'A-Level', 'Foundation', 'Undergraduate'],
    subjects: [
      {
        id: 'maths-gcse',
        name: 'GCSE Mathematics',
        category: 'Mathematics',
        description: 'Core mathematics for GCSE examinations covering algebra, geometry, and statistics',
        icon: '📐',
        courses: ['gcse-maths-foundation', 'gcse-maths-higher']
      },
      {
        id: 'sciences-gcse',
        name: 'GCSE Sciences',
        category: 'Sciences',
        description: 'Combined science or separate sciences (Biology, Chemistry, Physics)',
        icon: '🔬',
        courses: ['gcse-biology', 'gcse-chemistry', 'gcse-physics']
      },
      {
        id: 'english-gcse',
        name: 'GCSE English Literature',
        category: 'Languages',
        description: 'Study of classic and contemporary literature',
        icon: '📚',
        courses: ['gcse-english-lit', 'gcse-english-lang']
      },
      {
        id: 'history-gcse',
        name: 'GCSE History',
        category: 'Humanities',
        description: 'British and world history from medieval to modern times',
        icon: '🏛️',
        courses: ['gcse-history-britain', 'gcse-history-world']
      },
      {
        id: 'maths-alevel',
        name: 'A-Level Mathematics',
        category: 'Mathematics',
        description: 'Advanced mathematics including calculus, mechanics, and statistics',
        icon: '📊',
        courses: ['alevel-pure-maths', 'alevel-further-maths']
      },
      {
        id: 'sciences-alevel',
        name: 'A-Level Sciences',
        category: 'Sciences',
        description: 'Advanced study in Biology, Chemistry, or Physics',
        icon: '⚗️',
        courses: ['alevel-biology', 'alevel-chemistry', 'alevel-physics']
      },
      {
        id: 'business-alevel',
        name: 'A-Level Business Studies',
        category: 'Business',
        description: 'Business management, economics, and entrepreneurship',
        icon: '💼',
        courses: ['alevel-business', 'alevel-economics']
      }
    ]
  },
  american: {
    levels: ['Grade-9', 'Grade-10', 'Grade-11', 'Grade-12', 'Freshman', 'Sophomore', 'Junior', 'Senior'],
    subjects: [
      {
        id: 'algebra-hs',
        name: 'High School Algebra',
        category: 'Mathematics',
        description: 'Algebra I, II, and Pre-Calculus',
        icon: '🔢',
        courses: ['algebra-1', 'algebra-2', 'pre-calculus']
      },
      {
        id: 'sciences-hs',
        name: 'High School Sciences',
        category: 'Sciences',
        description: 'Biology, Chemistry, Physics, and Earth Science',
        icon: '🧪',
        courses: ['hs-biology', 'hs-chemistry', 'hs-physics']
      },
      {
        id: 'english-hs',
        name: 'High School English',
        category: 'Languages',
        description: 'American and British literature, composition, and rhetoric',
        icon: '✍️',
        courses: ['english-9', 'english-10', 'english-11-ap', 'english-12-ap']
      },
      {
        id: 'history-hs',
        name: 'High School History',
        category: 'Humanities',
        description: 'US History, World History, and Government',
        icon: '🗽',
        courses: ['us-history', 'world-history', 'ap-us-history']
      },
      {
        id: 'calculus-college',
        name: 'College Calculus',
        category: 'Mathematics',
        description: 'Calculus I, II, III, and Differential Equations',
        icon: '∫',
        courses: ['calc-1', 'calc-2', 'calc-3']
      },
      {
        id: 'sciences-college',
        name: 'College Sciences',
        category: 'Sciences',
        description: 'Advanced Biology, Chemistry, and Physics',
        icon: '🧬',
        courses: ['college-bio', 'college-chem', 'college-physics']
      },
      {
        id: 'compsci-college',
        name: 'Computer Science',
        category: 'Technology',
        description: 'Programming, algorithms, and data structures',
        icon: '💻',
        courses: ['cs-101', 'data-structures', 'algorithms']
      },
      {
        id: 'business-college',
        name: 'College Business',
        category: 'Business',
        description: 'Business administration, finance, and marketing',
        icon: '📈',
        courses: ['intro-business', 'finance-101', 'marketing-101']
      }
    ]
  }
};
