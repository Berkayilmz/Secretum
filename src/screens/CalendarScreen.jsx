import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

import CalendarComponent from '../components/ui/CalendarComponent';
import DairyCard from '../components/ui/DairyCard';
import PrivateDiaryPopup from '../components/popup/PrivateDiaryPopup';

import { handleGetNotesByDate } from '../firebase/db';
import { useTheme } from '../contexts/ThemeContext';

const CalendarScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [notes, setNotes] = useState([]);
  const [showPrivatePopup, setShowPrivatePopup] = useState(false);
  const [pendingNote, setPendingNote] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchNotesByDate = async () => {
        try {
          const result = await handleGetNotesByDate(selectedDate);
          setNotes(result);
        } catch (error) {
          console.error("Seçilen tarihe ait notlar alınamadı:", error.message);
        }
      };

      fetchNotesByDate();
    }, [selectedDate])
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <CalendarComponent onDateSelect={setSelectedDate} />

        <View style={styles.cardContainer}>
          {notes.length > 0 ? (
            <FlatList
              data={notes}
              numColumns={2}
              keyExtractor={(item) => item.id}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              scrollEnabled={false}
              renderItem={({ item }) => {
                const formattedDate = new Date(item.date).toLocaleDateString('tr-TR');
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (item.isPrivate) {
                        setPendingNote(item);
                        setShowPrivatePopup(true);
                      } else {
                        navigation.navigate('NoteDetailScreen', { note: item });
                      }
                    }}
                    activeOpacity={0.8}
                    style={{ width: '48%', marginBottom: 12 }}
                  >
                    <DairyCard
                      title={item.title}
                      emoji={item.emoji}
                      note={item.content}
                      imgSrc={item.image}
                      date={formattedDate}
                      isPrivate={item.isPrivate}
                      onPress={() => {
                        // Silme popupı vs entegre edilecekse buraya
                      }}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          ) : (
            <Text style={styles.emptyText}>Bu tarihe ait bir günlük bulunamadı.</Text>
          )}
        </View>
      </ScrollView>
      <PrivateDiaryPopup
        visible={showPrivatePopup}
        onClose={() => setShowPrivatePopup(false)}
        onSuccess={() => {
          setShowPrivatePopup(false);
          if (pendingNote) {
            navigation.navigate('NoteDetailScreen', { note: pendingNote });
            setPendingNote(null);
          }
        }}
      />
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 8,
    paddingTop: 12,
    marginTop: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
});