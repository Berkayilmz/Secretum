import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/ui/CustomButton';
import { handleSignout } from '../firebase/auth';
import { auth } from '../firebase/firebaseConfig';

const ProfileScreen = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUserName(currentUser.displayName || '');
      setEmail(currentUser.email || '');
    }
  }, []);

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
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/profilePng/man.png')}
              style={styles.avatar}
            />
          </View>
        </ImageBackground>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>👤 Kullanıcı Adı</Text>
        <Text style={styles.value}>{userName}</Text>

        <Text style={styles.label}>📧 E-posta</Text>
        <Text style={styles.value}>{email}</Text>
      </View>

      <CustomButton
        title="Çıkış Yap"
        width={140}
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
    height: 260,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 60,
    position: 'relative',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.25)',
    zIndex: 1,
  },
  avatarWrapper: {
    position: 'absolute',
    bottom: 50,
    zIndex: 10,
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 80,
    elevation: 4,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 16,
    marginTop: 80,
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
});