import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../components/ui/CustomButton'
import ThemeToggleButton from '../components/ThemeToggleButton';
import { useTheme } from '../contexts/ThemeContext';
import { handleGetUserNoteStats } from '../firebase/db';
import { handleSignout } from '../firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [stats, setStats] = useState({
    totalCount: 0,
    lastNoteDate: null,
    longestStreak: 0,
  });

  useFocusEffect(
    useCallback(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
        handleGetUserNoteStats()
          .then(setStats)
          .catch(err => console.error("İstatistik alınırken hata: ", err.message));
      }
    }, [])
  );

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.headerWrapper}>
        <ImageBackground
          source={require('../../assets/dairyProfile.png')}
          style={styles.headerBackground}
          resizeMode="cover"
          imageStyle={{ borderRadius: 20 }}
        >
          <View style={styles.overlay} />
          <Image
            source={profileImage ? { uri: profileImage } : require('../../assets/profilePng/man.png')}
            style={styles.avatar}
          />
        </ImageBackground>
      </View>

      <View style={[styles.infoContainer, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: theme.text }]}>👤 Kullanıcı Adı</Text>
        <Text style={[styles.value, { color: theme.text }]}>{userName}</Text>

        <Text style={[styles.label, { color: theme.text }]}>📧 E-posta</Text>
        <Text style={[styles.value, { color: theme.text }]}>{email}</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={[styles.statBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.statValue, { color: theme.text }]}>{stats.totalCount}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Toplam Günlük</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.statValue, { color: theme.text }]}>
            {stats.lastNoteDate
              ? new Date(stats.lastNoteDate).toLocaleDateString("tr-TR", { day: "2-digit", month: "long" })
              : "-"}
          </Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>Son Giriş</Text>
        </View>
        <View style={[styles.statBox, { backgroundColor: theme.card }]}>
          <Text style={[styles.statValue, { color: theme.text }]}>{stats.longestStreak}</Text>
          <Text style={[styles.statLabel, { color: theme.text }]}>En Uzun Seri</Text>
        </View>
      </View>

      <CustomButton
        title="Profil Düzenle"
        width="100%"
        height={45}
        onPress={() => navigation.navigate('EditProfileScreen', { userName, email })}
      />
      <CustomButton
        title="Çıkış Yap"
        width="100%"
        height={45}
        onPress={handleSignout}
      />
      
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    justifyContent: 'space-between',
  },
  headerWrapper: {
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 20,
  },
  headerBackground: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.25)',
    zIndex: 1,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoContainer: {
    padding: 24,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    fontWeight: '700',
    fontSize: 14,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  statBox: {
    flex: 1,
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
});