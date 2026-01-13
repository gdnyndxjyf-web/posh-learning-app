import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Course } from '../types';
import { colors } from '../theme';

interface CourseCardProps {
  course: Course;
  onPress: () => void;
}

export default function CourseCard({ course, onPress }: CourseCardProps) {
  const curriculumColor = course.curriculum === 'british' ? colors.british : colors.american;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={[styles.thumbnail, { backgroundColor: curriculumColor + '20' }]}>
        <Text style={styles.thumbnailText}>{course.thumbnail}</Text>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={[styles.badge, { backgroundColor: curriculumColor }]}>
            <Text style={styles.badgeText}>
              {course.curriculum === 'british' ? '🇬🇧' : '🇺🇸'} {course.level}
            </Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="clock-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{course.duration}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="star" size={16} color={colors.warning} />
            <Text style={styles.infoText}>{course.rating}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialCommunityIcons name="account-group" size={16} color={colors.textSecondary} />
            <Text style={styles.infoText}>{course.enrolledStudents}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    overflow: 'hidden',
  },
  thumbnail: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnailText: {
    fontSize: 48,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});
