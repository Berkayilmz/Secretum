import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity, Modal, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { AuthContext } from '../contexts/AuthContext';
import { auth } from '../firebase/firebaseConfig';
import { handleGetNotes } from '../firebase/db.js';

import CustomButton from '../components/ui/CustomButton.jsx';
import DairyCard from '../components/ui/DairyCard.jsx';
import CustomHeader from '../components/layout/CustomHeader.jsx';

//import { notes } from '../../assets/tempData/data.js';

const HomeScreen = ({ navigation }) => {
  const { setIsAuth } = useContext(AuthContext);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [notes, setNotes] = useState(null);

  // 📌 Eposta doğrulama kontrolü
  useFocusEffect(
    React.useCallback(() => {
      const checkEmailVerification = async () => {
        const user = auth.currentUser;
        if (user) {
          await user.reload(); // kullanıcı verisini güncelle
          if (!user.emailVerified) {
            setShowVerificationModal(true);
          } else {
            setShowVerificationModal(false);
          }
        }
      };
      checkEmailVerification();
    }, [])
  );

  useEffect(()=>{
    const fetchNotes = async () => {
      try {
        const userNotes = await handleGetNotes();
        setNotes(userNotes);
      } catch (error) {
        console.error("Notlar alınamadı", error.message)
      }
    }
    fetchNotes();
  },[])

  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear());
  const formattedDate = `${day}.${month}.${year}`;

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Secretum" addButton={true} />

      <View style={styles.cardContainer}>
        <FlatList
          data={notes}
          numColumns={2}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.cardContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item }) => {
            const formattedDate = new Date(item.date).toLocaleDateString('tr-TR'); // 🔁 tarih formatı gg.aa.yyyy
          
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('NoteDetailScreen', { note: item })}
                activeOpacity={0.8}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <DairyCard
                  title={`${item.emoji || ''} ${item.title}`}   // 🔁 Emoji + Başlık
                  note={item.content}
                  imgSrc={item.image}
                  date={formattedDate}                          // 🔁 Formatlanmış tarih
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* 🔒 Email doğrulama uyarı modali */}
      <Modal
        visible={showVerificationModal}
        transparent
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
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
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 15,
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
});