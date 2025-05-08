// components/ui/CalendarDayItem.jsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const CalendarDayItem = ({ date, onPress, isSelected, emoji }) => {
  const theme = useTheme();

  const today = new Date().toISOString().split('T')[0];
  const isFuture = new Date(date.dateString) > new Date(today);

  return (
    <TouchableOpacity
      style={styles.dayContainer}
      onPress={() => {
        if (!isFuture) onPress?.(date.dateString);
      }}
      activeOpacity={isFuture ? 1 : 0.7}
      disabled={isFuture}
    >
      <View
        style={[
          styles.dayCircle,
          isSelected && { backgroundColor: theme.primary },
        ]}
      >
        <Text
          style={{
            color: isSelected ? '#fff' : isFuture ? '#bbb' : theme.text,
            fontWeight: 'bold',
          }}
        >
          {date.day}
        </Text>
      </View>
      {!isFuture && emoji && <Text style={styles.emoji}>{emoji}</Text>}
    </TouchableOpacity>
  );
};

export default CalendarDayItem;

const styles = StyleSheet.create({
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 14,
    marginTop: 2,
  },
});