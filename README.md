# Posh Learning App

A comprehensive educational mobile application for high school and college students, supporting both British and American curricula. Built with React Native and Expo for iOS and macOS platforms.

## Features

### 🎓 Dual Curriculum Support
- **British Curriculum**: GCSE, A-Level, Foundation, and Undergraduate levels
- **American Curriculum**: High School (Grades 9-12) and College (Freshman-Senior)

### 📚 Comprehensive Course Content
- **Multiple Subject Categories**: Mathematics, Sciences, Languages, Humanities, Arts, Technology, and Business
- **Rich Learning Materials**: Video lessons, interactive content, and text-based materials
- **Structured Learning**: Organized into courses, modules, and lessons

### ✅ Assessment System
- **Interactive Quizzes**: Multiple choice, true/false, and more
- **Real-time Feedback**: Instant explanations for each question
- **Progress Tracking**: Monitor quiz scores and passing rates
- **Detailed Results**: Comprehensive quiz summary and performance analytics

### 📊 Progress Monitoring
- Course completion tracking
- Lesson progress indicators
- Quiz score history
- Learning streak tracking
- Performance analytics

### 👤 User Profiles
- Personalized learning dashboard
- Achievement badges and rewards
- Academic settings customization
- Course enrollment management

## Technology Stack

- **Framework**: React Native with Expo (~50.0.0)
- **Language**: TypeScript
- **Navigation**: React Navigation 6
- **UI Components**: React Native Paper
- **Styling**: React Native StyleSheet with custom theme
- **Icons**: Material Community Icons

## Project Structure

```
posh-learning-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CourseCard.tsx
│   │   └── CurriculumSelector.tsx
│   ├── data/               # Sample data and content
│   │   ├── courses.ts
│   │   └── curricula.ts
│   ├── navigation/         # Navigation configuration
│   │   └── MainTabNavigator.tsx
│   ├── screens/            # Application screens
│   │   ├── HomeScreen.tsx
│   │   ├── BrowseScreen.tsx
│   │   ├── MyCoursesScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── CourseDetailScreen.tsx
│   │   ├── LessonScreen.tsx
│   │   └── QuizScreen.tsx
│   ├── theme/              # Theme and styling
│   │   └── index.ts
│   └── types/              # TypeScript type definitions
│       └── index.ts
├── App.tsx                 # Main application component
├── app.json               # Expo configuration
├── package.json           # Dependencies
├── tsconfig.json          # TypeScript configuration
└── babel.config.js        # Babel configuration
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for macOS) or Xcode
- For macOS development: macOS computer with Xcode installed

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd posh-learning-app
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Start the development server:
```bash
npm start
# or
expo start
```

### Running on Devices

#### iOS (iPhone/iPad)
```bash
npm run ios
# or
expo start --ios
```

#### macOS
```bash
# macOS support requires additional configuration
# Follow Expo's macOS setup guide
```

#### Web (for testing)
```bash
npm run web
# or
expo start --web
```

## Available Courses

### British Curriculum

#### GCSE Level
- Mathematics (Foundation & Higher Tier)
- Sciences (Biology, Chemistry, Physics)
- English Literature & Language
- History (British & World)

#### A-Level
- Pure Mathematics & Further Mathematics
- Sciences (Biology, Chemistry, Physics)
- Business Studies & Economics

### American Curriculum

#### High School (Grades 9-12)
- Algebra I, II, and Pre-Calculus
- Biology, Chemistry, Physics
- English (Grades 9-12, AP options)
- US History, World History, AP US History

#### College Level
- Calculus I, II, III
- Advanced Sciences
- Computer Science (Python, Data Structures, Algorithms)
- Business (Finance, Marketing)

## Key Features Explained

### 1. Home Screen
- Welcome dashboard with curriculum selection
- Featured courses based on selected curriculum
- Quick access to subject categories
- Student statistics and engagement metrics

### 2. Browse Screen
- Advanced search functionality
- Filter by curriculum, category, and level
- Comprehensive course catalog
- Real-time search results

### 3. My Courses
- Active course tracking
- Progress indicators for each course
- Continue learning from where you left off
- Performance statistics

### 4. Course Detail
- Complete course overview
- Module and lesson structure
- Instructor information
- Enrollment options

### 5. Lesson Viewer
- Support for multiple content types (video, text, interactive)
- Progress tracking
- Key takeaways
- Seamless navigation between lessons

### 6. Quiz System
- Interactive question interface
- Multiple question types
- Real-time answer validation
- Detailed explanations
- Comprehensive results with retry options

### 7. Profile
- User information and settings
- Achievement badges
- Academic statistics
- Settings and preferences

## Customization

### Adding New Courses

Edit `src/data/courses.ts` to add new courses:

```typescript
{
  id: 'unique-course-id',
  title: 'Course Title',
  description: 'Course description',
  curriculum: 'british' | 'american',
  level: 'GCSE' | 'A-Level' | 'Grade-9' | etc.,
  category: 'Mathematics' | 'Sciences' | etc.,
  // ... other properties
}
```

### Customizing Theme

Edit `src/theme/index.ts` to customize colors and styling:

```typescript
export const colors = {
  primary: '#6366f1',
  secondary: '#8b5cf6',
  // ... customize other colors
};
```

## Future Enhancements

- [ ] Real-time video streaming integration
- [ ] Live interactive coding environments
- [ ] Peer-to-peer study groups
- [ ] AI-powered personalized learning paths
- [ ] Offline course downloads
- [ ] Certificate generation
- [ ] Teacher/instructor dashboard
- [ ] Parent/guardian monitoring
- [ ] Integration with learning management systems (LMS)
- [ ] Gamification elements (points, leaderboards)
- [ ] Push notifications for deadlines and reminders
- [ ] Calendar integration for study scheduling

## Testing

```bash
npm test
# or
yarn test
```

## Building for Production

### iOS
```bash
expo build:ios
```

### Android (future support)
```bash
expo build:android
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Contact: support@poshlearning.app

## Acknowledgments

- Expo team for the excellent development framework
- React Native community for components and tools
- Educational content providers and curriculum experts

---

**Built with ❤️ for students worldwide**
