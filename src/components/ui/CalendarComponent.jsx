import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useTheme } from '../../contexts/ThemeContext';
import { handleGetNotes } from '../../firebase/db';

LocaleConfig.locales['tr'] = {
  monthNames: [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ],
  monthNamesShort: [
    'Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz',
    'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'
  ],
  dayNames: ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'],
  dayNamesShort: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Pzr']
};
LocaleConfig.defaultLocale = 'tr';

const CalendarComponent = ({ onDateSelect }) => {
  const theme = useTheme();
  const today = new Date().toISOString().split('T')[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [emojiMap, setEmojiMap] = useState({});

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const notes = await handleGetNotes();
        const mapped = {};
        notes.forEach(note => {
          const date = note.date?.split('T')[0];
          if (date && note.emoji) {
            mapped[date] = note.emoji;
          }
        });
        setEmojiMap(mapped);
      } catch (error) {
        console.error('Emoji verileri alınamadı:', error.message);
      }
    };
    fetchNotes();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Calendar
        style={styles.calendar}
        markingType="custom"
        markedDates={{
          ...Object.fromEntries(Object.entries(emojiMap).map(([date, emoji]) => ([
            date,
            {
              customText: emoji,
              customStyles: {
                container: {},
                text: {}
              }
            }
          ]))),
          [selectedDate]: {
            customStyles: {
              container: {
                backgroundColor: theme.primary,
                borderRadius: 18,
              },
              text: {
                color: '#fff',
                fontWeight: 'bold'
              }
            }
          }
        }}
        dayComponent={({ date }) => {
          const emoji = emojiMap[date.dateString];
          const isSelected = date.dateString === selectedDate;
          const isToday = date.dateString === today;
          const isDisabled = new Date(date.dateString) > new Date(today);

          return (
            <TouchableOpacity
              style={[
                styles.dayWrapper,
                isSelected && styles.selectedDayWrapper,
                isDisabled && { opacity: 0.4 }
              ]}
              onPress={() => {
                if (!isDisabled) {
                  setSelectedDate(date.dateString);
                  onDateSelect?.(date.dateString);
                }
              }}
              disabled={isDisabled}
              activeOpacity={0.7}
            >
              <View style={[styles.dayCircle, isSelected && { backgroundColor: theme.primary }]}>
                <Text style={[styles.dayText, isSelected && styles.selectedDayText, isToday && !isSelected && { color: '#FF6347' }]}>
                  {date.day}
                </Text>
              </View>
              {emoji && <Text style={styles.emoji}>{emoji}</Text>}
            </TouchableOpacity>
          );
        }}
        theme={{
          backgroundColor: theme.card,
          calendarBackground: theme.card,
          textSectionTitleColor: theme.text,
          todayTextColor: '#FF6347',
          dayTextColor: theme.text,
          textDisabledColor: '#ccc',
          monthTextColor: theme.text,
          arrowColor: theme.primary,
          textDayFontWeight: '500',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 16,
          textMonthFontSize: 18,
          textDayHeaderFontSize: 14,
        }}
      />
    </View>
  );
};

export default CalendarComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    marginHorizontal: 8,
    marginTop: 16,
    borderRadius: 12,
    elevation: 2,
  },
  dayWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    height: 60,
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emoji: {
    fontSize: 14,
    marginTop: 2,
  },
});
