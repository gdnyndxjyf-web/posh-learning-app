import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '../theme';
import { RootStackParamList, CurriculumType } from '../types';
import { coursesData } from '../data/courses';
import CourseCard from '../components/CourseCard';
import CurriculumSelector from '../components/CurriculumSelector';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumType>('british');

  const filteredCourses = coursesData
    .filter(course => course.curriculum === selectedCurriculum)
    .slice(0, 3);

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={[colors.primary, colors.secondary]}
        style={styles.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.heroTitle}>Welcome to Posh Learning</Text>
        <Text style={styles.heroSubtitle}>
          Excel in your studies with expert-led courses
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>10K+</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.8★</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>
      </LinearGradient>

      {/* Curriculum Selector */}
      <View style={styles.section}>
        <CurriculumSelector
          selected={selectedCurriculum}
          onSelect={setSelectedCurriculum}
        />
      </View>

      {/* Featured Courses */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Courses</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Browse', {})}>
            <Text style={styles.seeAll}>See All →</Text>
          </TouchableOpacity>
        </View>
        {filteredCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            onPress={() => navigation.navigate('CourseDetail', { courseId: course.id })}
          />
        ))}
      </View>

      {/* Quick Access Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {[
            { name: 'Mathematics', icon: 'calculator', color: colors.mathematics },
            { name: 'Sciences', icon: 'flask', color: colors.sciences },
            { name: 'Languages', icon: 'book-alphabet', color: colors.languages },
            { name: 'Humanities', icon: 'bank', color: colors.humanities },
            { name: 'Technology', icon: 'laptop', color: colors.technology },
            { name: 'Business', icon: 'briefcase', color: colors.business },
          ].map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.categoryCard, { backgroundColor: category.color + '20' }]}
              onPress={() => navigation.navigate('Browse', {})}
            >
              <MaterialCommunityIcons
                name={category.icon as any}
                size={32}
                color={category.color}
              />
              <Text style={[styles.categoryName, { color: category.color }]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  hero: {
    padding: 24,
    paddingTop: 40,
    paddingBottom: 32,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  categoryCard: {
    width: (width - 48) / 2,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
});
