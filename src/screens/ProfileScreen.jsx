import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

import CustomButton from '../components/ui/CustomButton';
import { handleSignout } from '../firebase/auth';
import { auth } from '../firebase/firebaseConfig';
import { useFocusEffect } from '@react-navigation/native';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const currentUser = auth.currentUser;
      if (currentUser) {
        setUserName(currentUser.displayName || '');
        setEmail(currentUser.email || '');
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
    <SafeAreaView style={styles.container}>
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

      <View style={styles.infoContainer}>
        <Text style={styles.label}>👤 Kullanıcı Adı</Text>
        <Text style={styles.value}>{userName}</Text>

        <Text style={styles.label}>📧 E-posta</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      {/* Bilgi Kutuları */}
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Toplam Günlük</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>03 Mayıs</Text>
          <Text style={styles.statLabel}>Son Giriş</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>5 gün</Text>
          <Text style={styles.statLabel}>En Uzun Seri</Text>
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
    backgroundColor: '#FAFAFA',
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
  avatarWrapper: {
    position: 'absolute',
    bottom: 90,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 80,
    elevation: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#eee',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    elevation: 2,
  },
  editText: {
    fontSize: 12,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
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
    color: '#888',
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    color: '#222',
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
    backgroundColor: '#fff',
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D2D2D',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
    textAlign: 'center',
  },
});