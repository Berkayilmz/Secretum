import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Modal, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext'; // buraya dikkat
import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase/firebaseConfig';
import { handleGetNotes } from '../firebase/db.js';

import CustomButton from '../components/ui/CustomButton.jsx';
import DairyCard from '../components/ui/DairyCard.jsx';
import CustomHeader from '../components/layout/CustomHeader.jsx';
import DeleteNotePopup from '../components/popup/DeletNotePopup.jsx';

const HomeScreen = ({ navigation }) => {
  const { setIsAuth } = useContext(AuthContext);
  const  theme  = useTheme(); // tema verisini al
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [notes, setNotes] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      const checkEmailVerification = async () => {
        const user = auth.currentUser;
        if (user) {
          await user.reload();
          setShowVerificationModal(!user.emailVerified);
        }
      };
      checkEmailVerification();
    }, [])
  );

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const userNotes = await handleGetNotes();
        const sortedNotes = userNotes.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNotes(sortedNotes);
      } catch (error) {
        console.error("Notlar alınamadı", error.message);
      }
    };
    fetchNotes();
  }, [notes]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <CustomHeader title="Secretum" addButton={true} />

      <View style={styles.cardContainer}>
        <FlatList
          data={notes}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.cardContainer, { paddingBottom: 100 }]}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => {
            const formattedDate = new Date(item.date).toLocaleDateString('tr-TR');
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('NoteDetailScreen', { note: item })}
                activeOpacity={0.8}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <DairyCard
                  title={`${item.emoji || ''} ${item.title}`}
                  note={item.content}
                  imgSrc={item.image}
                  date={formattedDate}
                  onPress={() => {
                    setSelectedNoteId(item.id);
                    setShowDeletePopup(true);
                  }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      <Modal visible={showVerificationModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalText, { color: theme.text }]}>
              Güvenlik nedeniyle e-posta adresinizi onaylamanız gerekiyor. Lütfen e-posta kutunuzu kontrol edin.
            </Text>
            <CustomButton
              title="Tamam"
              width="100%"
              height={40}
              onPress={() => setShowVerificationModal(false)}
            />
          </View>
        </View>
      </Modal>

      <DeleteNotePopup
        visible={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        noteId={selectedNoteId}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    paddingHorizontal: 8,
    paddingTop: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    marginBottom: 16,
    textAlign: 'center',
  },
});