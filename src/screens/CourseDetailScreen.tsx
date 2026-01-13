import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';

import { colors } from '../theme';
import { RootStackParamList } from '../types';
import { coursesData } from '../data/courses';

type CourseDetailRouteProp = RouteProp<RootStackParamList, 'CourseDetail'>;
type CourseDetailNavigationProp = StackNavigationProp<RootStackParamList>;

export default function CourseDetailScreen() {
  const route = useRoute<CourseDetailRouteProp>();
  const navigation = useNavigation<CourseDetailNavigationProp>();
  const { courseId } = route.params;

  const course = coursesData.find(c => c.id === courseId);

  if (!course) {
    return (
      <View style={styles.errorContainer}>
        <Text>Course not found</Text>
      </View>
    );
  }

  const curriculumColor = course.curriculum === 'british' ? colors.british : colors.american;

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <LinearGradient
          colors={[curriculumColor, curriculumColor + 'DD']}
          style={styles.header}
        >
          <Text style={styles.headerEmoji}>{course.thumbnail}</Text>
          <Text style={styles.title}>{course.title}</Text>
          <Text style={styles.instructor}>by {course.instructor}</Text>
          <View style={styles.badges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {course.curriculum === 'british' ? '🇬🇧' : '🇺🇸'} {course.level}
              </Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{course.category}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="clock-outline" size={24} color={colors.primary} />
            <Text style={styles.statLabel}>Duration</Text>
            <Text style={styles.statValue}>{course.duration}</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="star" size={24} color={colors.warning} />
            <Text style={styles.statLabel}>Rating</Text>
            <Text style={styles.statValue}>{course.rating}★</Text>
          </View>
          <View style={styles.statBox}>
            <MaterialCommunityIcons name="account-group" size={24} color={colors.info} />
            <Text style={styles.statLabel}>Students</Text>
            <Text style={styles.statValue}>{course.enrolledStudents}</Text>
          </View>
        </View>

        {/* Description */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About this course</Text>
          <Text style={styles.description}>{course.description}</Text>
        </View>

        {/* Course Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Course Content</Text>
          {course.modules.map((module, moduleIndex) => (
            <View key={module.id} style={styles.moduleCard}>
              <View style={styles.moduleHeader}>
                <View style={styles.moduleNumber}>
                  <Text style={styles.moduleNumberText}>{moduleIndex + 1}</Text>
                </View>
                <View style={styles.moduleInfo}>
                  <Text style={styles.moduleTitle}>{module.title}</Text>
                  <Text style={styles.moduleDescription}>{module.description}</Text>
                  <Text style={styles.lessonCount}>
                    {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                  </Text>
                </View>
              </View>

              {/* Lessons */}
              {module.lessons.map((lesson, lessonIndex) => (
                <TouchableOpacity
                  key={lesson.id}
                  style={styles.lessonItem}
                  onPress={() =>
                    navigation.navigate('Lesson', {
                      lessonId: lesson.id,
                      courseId: course.id,
                    })
                  }
                >
                  <View style={styles.lessonLeft}>
                    <MaterialCommunityIcons
                      name={
                        lesson.contentType === 'video'
                          ? 'play-circle-outline'
                          : lesson.contentType === 'interactive'
                          ? 'cube-outline'
                          : 'file-document-outline'
                      }
                      size={20}
                      color={colors.primary}
                    />
                    <View style={styles.lessonInfo}>
                      <Text style={styles.lessonTitle}>
                        {moduleIndex + 1}.{lessonIndex + 1} {lesson.title}
                      </Text>
                      <View style={styles.lessonMeta}>
                        <Text style={styles.lessonDuration}>{lesson.duration} min</Text>
                        {lesson.quiz && (
                          <>
                            <Text style={styles.dot}>•</Text>
                            <Text style={styles.quizBadge}>Quiz</Text>
                          </>
                        )}
                      </View>
                    </View>
                  </View>
                  {lesson.isCompleted && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={20}
                      color={colors.success}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Enroll Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.enrollButton, { backgroundColor: curriculumColor }]}
        >
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    padding: 24,
    paddingTop: 32,
    alignItems: 'center',
  },
  headerEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  instructor: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    margin: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 2,
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
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
  },
  moduleCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  moduleHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  moduleNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  moduleNumberText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  lessonCount: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
  },
  lessonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  lessonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  lessonInfo: {
    marginLeft: 12,
    flex: 1,
  },
  lessonTitle: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  lessonMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lessonDuration: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  dot: {
    marginHorizontal: 6,
    fontSize: 12,
    color: colors.textSecondary,
  },
  quizBadge: {
    fontSize: 11,
    color: colors.warning,
    fontWeight: '600',
  },
  footer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  enrollButton: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
