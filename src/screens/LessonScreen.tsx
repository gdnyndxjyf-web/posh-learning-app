import React, { useState } from 'react';
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

import { colors } from '../theme';
import { RootStackParamList, Lesson } from '../types';
import { coursesData } from '../data/courses';

type LessonRouteProp = RouteProp<RootStackParamList, 'Lesson'>;
type LessonNavigationProp = StackNavigationProp<RootStackParamList>;

export default function LessonScreen() {
  const route = useRoute<LessonRouteProp>();
  const navigation = useNavigation<LessonNavigationProp>();
  const { lessonId, courseId } = route.params;
  const [isCompleted, setIsCompleted] = useState(false);

  const course = coursesData.find(c => c.id === courseId);
  let lesson: Lesson | undefined;

  if (course) {
    for (const module of course.modules) {
      const foundLesson = module.lessons.find(l => l.id === lessonId);
      if (foundLesson) {
        lesson = foundLesson;
        break;
      }
    }
  }

  if (!course || !lesson) {
    return (
      <View style={styles.errorContainer}>
        <Text>Lesson not found</Text>
      </View>
    );
  }

  const handleComplete = () => {
    setIsCompleted(true);
    if (lesson?.quiz) {
      navigation.navigate('Quiz', { quizId: lesson.quiz.id, lessonId: lesson.id });
    }
  };

  const renderContent = () => {
    switch (lesson.contentType) {
      case 'video':
        const videoData = lesson.content.data as any;
        return (
          <View style={styles.videoContainer}>
            <View style={styles.videoPlaceholder}>
              <MaterialCommunityIcons name="play-circle" size={64} color="#fff" />
            </View>
            <Text style={styles.contentTitle}>Video Lesson</Text>
            <Text style={styles.contentText}>
              Duration: {videoData.duration || lesson.duration} minutes
            </Text>
            {videoData.transcript && (
              <View style={styles.transcriptContainer}>
                <Text style={styles.transcriptTitle}>Transcript:</Text>
                <Text style={styles.transcriptText}>{videoData.transcript}</Text>
              </View>
            )}
          </View>
        );

      case 'interactive':
        return (
          <View style={styles.interactiveContainer}>
            <MaterialCommunityIcons
              name="cube-outline"
              size={64}
              color={colors.primary}
            />
            <Text style={styles.contentTitle}>Interactive Content</Text>
            <Text style={styles.contentText}>
              Engage with interactive materials to enhance your learning
            </Text>
            <View style={styles.interactivePlaceholder}>
              <Text style={styles.placeholderText}>
                Interactive content would be displayed here
              </Text>
            </View>
          </View>
        );

      case 'text':
      default:
        return (
          <View style={styles.textContainer}>
            <Text style={styles.contentTitle}>{lesson.title}</Text>
            <Text style={styles.textContent}>
              {typeof lesson.content.data === 'string'
                ? lesson.content.data
                : 'Content not available'}
            </Text>
          </View>
        );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <Text style={styles.lessonTitle}>{lesson.title}</Text>
          <Text style={styles.description}>{lesson.description}</Text>
          <View style={styles.metaRow}>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name="clock-outline"
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>{lesson.duration} min</Text>
            </View>
            <View style={styles.metaItem}>
              <MaterialCommunityIcons
                name={
                  lesson.contentType === 'video'
                    ? 'video'
                    : lesson.contentType === 'interactive'
                    ? 'cube'
                    : 'text'
                }
                size={16}
                color={colors.textSecondary}
              />
              <Text style={styles.metaText}>
                {lesson.contentType.charAt(0).toUpperCase() + lesson.contentType.slice(1)}
              </Text>
            </View>
            {lesson.quiz && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="help-circle"
                  size={16}
                  color={colors.warning}
                />
                <Text style={[styles.metaText, { color: colors.warning }]}>
                  Quiz included
                </Text>
              </View>
            )}
          </View>
        </View>

        {/* Content */}
        <View style={styles.content}>{renderContent()}</View>

        {/* Additional Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Takeaways</Text>
          <View style={styles.takeawayItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={colors.success}
            />
            <Text style={styles.takeawayText}>
              Master the fundamental concepts covered in this lesson
            </Text>
          </View>
          <View style={styles.takeawayItem}>
            <MaterialCommunityIcons
              name="check-circle"
              size={20}
              color={colors.success}
            />
            <Text style={styles.takeawayText}>
              Practice applying these concepts to real problems
            </Text>
          </View>
          {lesson.quiz && (
            <View style={styles.takeawayItem}>
              <MaterialCommunityIcons
                name="check-circle"
                size={20}
                color={colors.success}
              />
              <Text style={styles.takeawayText}>
                Test your understanding with the quiz
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        {!isCompleted ? (
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.completeButtonText}>
              {lesson.quiz ? 'Continue to Quiz' : 'Mark as Complete'}
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.completedBanner}>
            <MaterialCommunityIcons
              name="check-circle"
              size={24}
              color={colors.success}
            />
            <Text style={styles.completedText}>Lesson Completed!</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: colors.surface,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  courseTitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginBottom: 8,
  },
  lessonTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  content: {
    padding: 20,
  },
  videoContainer: {
    alignItems: 'center',
  },
  videoPlaceholder: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: colors.text,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  interactiveContainer: {
    alignItems: 'center',
  },
  interactivePlaceholder: {
    width: '100%',
    padding: 32,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    borderStyle: 'dashed',
    alignItems: 'center',
    marginTop: 16,
  },
  placeholderText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  textContainer: {},
  contentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  textContent: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 28,
  },
  transcriptContainer: {
    marginTop: 16,
    width: '100%',
  },
  transcriptTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  transcriptText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  section: {
    padding: 20,
    backgroundColor: colors.surface,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  takeawayItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  takeawayText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    marginLeft: 12,
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  completeButton: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  completedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  completedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.success,
  },
});
