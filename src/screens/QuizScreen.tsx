import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { colors } from '../theme';
import { RootStackParamList, Quiz, Question, Answer } from '../types';
import { coursesData } from '../data/courses';

type QuizRouteProp = RouteProp<RootStackParamList, 'Quiz'>;
type QuizNavigationProp = StackNavigationProp<RootStackParamList>;

export default function QuizScreen() {
  const route = useRoute<QuizRouteProp>();
  const navigation = useNavigation<QuizNavigationProp>();
  const { quizId, lessonId } = route.params;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: string]: string | number;
  }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Find the quiz
  let quiz: Quiz | undefined;
  for (const course of coursesData) {
    for (const module of course.modules) {
      for (const lesson of module.lessons) {
        if (lesson.quiz?.id === quizId) {
          quiz = lesson.quiz;
          break;
        }
      }
      if (quiz) break;
    }
    if (quiz) break;
  }

  if (!quiz) {
    return (
      <View style={styles.errorContainer}>
        <Text>Quiz not found</Text>
      </View>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;
  const hasAnsweredCurrent = selectedAnswers[currentQuestion.id] !== undefined;

  const handleSelectAnswer = (answer: string | number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNext = () => {
    if (!hasAnsweredCurrent) {
      Alert.alert('Please select an answer', 'You must select an answer before continuing');
      return;
    }

    if (isLastQuestion) {
      handleSubmit();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    let totalScore = 0;
    let earnedPoints = 0;

    quiz.questions.forEach(question => {
      const userAnswer = selectedAnswers[question.id];
      if (userAnswer === question.correctAnswer) {
        earnedPoints += question.points;
      }
      totalScore += question.points;
    });

    const percentage = (earnedPoints / totalScore) * 100;
    setScore(percentage);
    setShowResults(true);
  };

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <View style={styles.optionsContainer}>
            {currentQuestion.options?.map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              const isCorrect = index === currentQuestion.correctAnswer;
              const showCorrectness = showResults;

              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    showCorrectness && isSelected && !isCorrect && styles.optionWrong,
                    showCorrectness && isCorrect && styles.optionCorrect,
                  ]}
                  onPress={() => !showResults && handleSelectAnswer(index)}
                  disabled={showResults}
                >
                  <View style={styles.optionContent}>
                    <View
                      style={[
                        styles.radio,
                        isSelected && styles.radioSelected,
                        showCorrectness && isCorrect && styles.radioCorrect,
                        showCorrectness && isSelected && !isCorrect && styles.radioWrong,
                      ]}
                    >
                      {isSelected && (
                        <View style={styles.radioInner} />
                      )}
                    </View>
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {option}
                    </Text>
                  </View>
                  {showCorrectness && isCorrect && (
                    <MaterialCommunityIcons
                      name="check-circle"
                      size={24}
                      color={colors.success}
                    />
                  )}
                  {showCorrectness && isSelected && !isCorrect && (
                    <MaterialCommunityIcons
                      name="close-circle"
                      size={24}
                      color={colors.error}
                    />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        );

      case 'true-false':
        return (
          <View style={styles.optionsContainer}>
            {['True', 'False'].map((option, index) => {
              const isSelected = selectedAnswers[currentQuestion.id] === index;
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                  ]}
                  onPress={() => handleSelectAnswer(index)}
                >
                  <View style={styles.optionContent}>
                    <View style={[styles.radio, isSelected && styles.radioSelected]}>
                      {isSelected && <View style={styles.radioInner} />}
                    </View>
                    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                      {option}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        );

      default:
        return (
          <Text style={styles.placeholderText}>
            This question type is not yet supported
          </Text>
        );
    }
  };

  if (showResults) {
    const passed = score >= quiz.passingScore;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.resultsContainer}>
          <View style={[styles.resultsCard, passed ? styles.passedCard : styles.failedCard]}>
            <MaterialCommunityIcons
              name={passed ? 'check-circle' : 'close-circle'}
              size={80}
              color={passed ? colors.success : colors.error}
            />
            <Text style={styles.resultsTitle}>
              {passed ? 'Congratulations!' : 'Keep Practicing!'}
            </Text>
            <Text style={styles.scoreText}>{score.toFixed(0)}%</Text>
            <Text style={styles.scoreSubtext}>
              {passed
                ? `You passed! (${quiz.passingScore}% required)`
                : `You need ${quiz.passingScore}% to pass`}
            </Text>
          </View>

          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Quiz Summary</Text>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Questions</Text>
              <Text style={styles.summaryValue}>{quiz.questions.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Your Score</Text>
              <Text style={[styles.summaryValue, { color: passed ? colors.success : colors.error }]}>
                {score.toFixed(0)}%
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Passing Score</Text>
              <Text style={styles.summaryValue}>{quiz.passingScore}%</Text>
            </View>
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.retryButton]}
              onPress={() => {
                setCurrentQuestionIndex(0);
                setSelectedAnswers({});
                setShowResults(false);
                setScore(0);
              }}
            >
              <MaterialCommunityIcons name="refresh" size={20} color="#fff" />
              <Text style={styles.buttonText}>Retry Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.continueButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[
              styles.progressFill,
              { width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          Question {currentQuestionIndex + 1} of {quiz.questions.length}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Question */}
        <View style={styles.questionCard}>
          <View style={styles.questionHeader}>
            <Text style={styles.questionType}>
              {currentQuestion.type.split('-').map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}
            </Text>
            <Text style={styles.points}>{currentQuestion.points} pts</Text>
          </View>
          <Text style={styles.questionText}>{currentQuestion.question}</Text>
        </View>

        {/* Options */}
        {renderQuestion()}

        {/* Explanation (shown after answering) */}
        {hasAnsweredCurrent && (
          <View style={styles.explanationCard}>
            <MaterialCommunityIcons
              name="information"
              size={24}
              color={colors.info}
            />
            <View style={styles.explanationContent}>
              <Text style={styles.explanationTitle}>Explanation</Text>
              <Text style={styles.explanationText}>
                {currentQuestion.explanation}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.navButton, currentQuestionIndex === 0 && styles.navButtonDisabled]}
          onPress={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          <MaterialCommunityIcons name="chevron-left" size={24} color="#fff" />
          <Text style={styles.navButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.navButton, styles.navButtonPrimary, !hasAnsweredCurrent && styles.navButtonDisabled]}
          onPress={handleNext}
          disabled={!hasAnsweredCurrent}
        >
          <Text style={styles.navButtonText}>
            {isLastQuestion ? 'Submit' : 'Next'}
          </Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#fff" />
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
  scrollView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    backgroundColor: colors.surface,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: colors.surface,
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  questionType: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  points: {
    fontSize: 12,
    color: colors.warning,
    fontWeight: '600',
  },
  questionText: {
    fontSize: 18,
    color: colors.text,
    fontWeight: '600',
    lineHeight: 28,
  },
  optionsContainer: {
    padding: 16,
  },
  optionButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: colors.border,
  },
  optionSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  optionCorrect: {
    borderColor: colors.success,
    backgroundColor: colors.success + '10',
  },
  optionWrong: {
    borderColor: colors.error,
    backgroundColor: colors.error + '10',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  radioSelected: {
    borderColor: colors.primary,
  },
  radioCorrect: {
    borderColor: colors.success,
  },
  radioWrong: {
    borderColor: colors.error,
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: colors.text,
    flex: 1,
  },
  optionTextSelected: {
    fontWeight: '600',
  },
  explanationCard: {
    flexDirection: 'row',
    backgroundColor: colors.info + '10',
    margin: 16,
    marginTop: 0,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
  },
  explanationContent: {
    flex: 1,
    marginLeft: 12,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.info,
    marginBottom: 4,
  },
  explanationText: {
    fontSize: 14,
    color: colors.text,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: colors.textSecondary,
    gap: 8,
  },
  navButtonPrimary: {
    backgroundColor: colors.primary,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    padding: 16,
  },
  resultsCard: {
    backgroundColor: colors.surface,
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  passedCard: {
    borderWidth: 2,
    borderColor: colors.success,
  },
  failedCard: {
    borderWidth: 2,
    borderColor: colors.error,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.primary,
  },
  scoreSubtext: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: 8,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summaryLabel: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  buttonsContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  retryButton: {
    backgroundColor: colors.textSecondary,
  },
  continueButton: {
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  placeholderText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    padding: 32,
  },
});
