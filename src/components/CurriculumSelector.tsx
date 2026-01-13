import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CurriculumType } from '../types';
import { colors } from '../theme';

interface CurriculumSelectorProps {
  selected: CurriculumType;
  onSelect: (curriculum: CurriculumType) => void;
}

export default function CurriculumSelector({ selected, onSelect }: CurriculumSelectorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Select Curriculum:</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'british' && styles.buttonActive,
            { borderColor: colors.british },
          ]}
          onPress={() => onSelect('british')}
        >
          <Text
            style={[
              styles.buttonText,
              selected === 'british' && styles.buttonTextActive,
              { color: selected === 'british' ? '#fff' : colors.british },
            ]}
          >
            🇬🇧 British
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selected === 'american' && styles.buttonActive,
            { borderColor: colors.american },
          ]}
          onPress={() => onSelect('american')}
        >
          <Text
            style={[
              styles.buttonText,
              selected === 'american' && styles.buttonTextActive,
              { color: selected === 'american' ? '#fff' : colors.american },
            ]}
          >
            🇺🇸 American
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    alignItems: 'center',
    backgroundColor: colors.surface,
  },
  buttonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buttonTextActive: {
    color: '#fff',
  },
});
