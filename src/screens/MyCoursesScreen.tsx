import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '../theme';
import { RootStackParamList } from '../types';
import { coursesData } from '../data/courses';
import CourseCard from '../components/CourseCard';

type MyCoursesScreenNavigationProp = StackNavigationProp<RootStackParamList>;

export default function MyCoursesScreen() {
  const navigation = useNavigation<MyCoursesScreenNavigationProp>();

  // In a real app, this would come from user's enrolled courses
  const enrolledCourses = coursesData.slice(0, 4);

  return (
    <ScrollView style={styles.container}>
      {/* Progress Overview */}
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Your Progress</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{enrolledCourses.length}</Text>
            <Text style={styles.statLabel}>Active Courses</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Completed Lessons</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>7</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
        </View>
      </View>

      {/* Continue Learning */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Continue Learning</Text>
        {enrolledCourses.length > 0 ? (
          enrolledCourses.map(course => (
            <View key={course.id} style={styles.courseWrapper}>
              <CourseCard
                course={course}
                onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
              />
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '35%' }]} />
              </View>
              <Text style={styles.progressText}>35% Complete</Text>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <MaterialCommunityIcons
              name="book-open-variant"
              size={64}
              color={colors.textSecondary}
            />
            <Text style={styles.emptyText}>No courses yet</Text>
            <Text style={styles.emptySubtext}>
              Browse courses to start learning
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  progressCard: {
    backgroundColor: colors.primary,
    margin: 16,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  courseWrapper: {
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    marginHorizontal: 16,
    marginTop: -8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: 'right',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
  },
});
