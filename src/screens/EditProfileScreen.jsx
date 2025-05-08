import { StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation, useRoute } from '@react-navigation/native';

import CustomButton from '../components/ui/CustomButton';
import CustomTextInput from '../components/ui/CustomTextInput';
import DeleteAccountPopup from '../components/popup/DeleteAccountPopup';
import CustomHeader from '../components/layout/CustomHeader';
import { AuthContext } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

import { handleUpdateUser, handleUpdatePassword, handleDeleteUser } from '../firebase/auth';

const EditProfileScreen = () => {
    const route = useRoute();
    const { userName: initialUserName, email: initialEmail } = route.params || {};
    const theme = useTheme();

    const [userName, setUserName] = useState(initialUserName || '');
    const [email, setEmail] = useState(initialEmail || '');
    const [profileImage, setProfileImage] = useState(null);
    const [deleteVisible, setDeleteVisible] = useState(false);

    const { setIsAuth } = useContext(AuthContext);

    const navigation = useNavigation();

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

    const handleSave = async () => {
        try {
            await handleUpdateUser(userName, email);
            Alert.alert("Başarılı", "Bilgileriniz güncellendi.");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Hata", error.message);
        }
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
            <View style={styles.headerWrapper}>
                <TouchableOpacity style={[styles.backButton, { backgroundColor: theme.card }]} onPress={() => navigation.goBack()}>
                    <Text style={[styles.backButtonText, { color: theme.text }]}>←</Text>
                </TouchableOpacity>

                <ImageBackground
                    source={require('../../assets/dairyProfile.png')}
                    style={styles.headerBackground}
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 20 }}
                >
                    <View style={styles.overlay} />
                    <TouchableOpacity style={styles.avatarWrapper} onPress={pickImage}>
                        <Image
                            source={profileImage ? { uri: profileImage } : require('../../assets/profilePng/man.png')}
                            style={styles.avatar}
                        />
                        <TouchableOpacity style={styles.editButton} onPress={pickImage}>
                            <Text style={styles.editText}>✏️</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </ImageBackground>
            </View>

            <View style={[styles.infoContainer, { backgroundColor: theme.card }]}>
                <Text style={[styles.label, { color: theme.text }]}>👤 Kullanıcı Adı</Text>
                <CustomTextInput
                    width="100%"
                    placeholder={userName}
                    onChangeText={setUserName}
                />

                <Text style={[styles.label, { color: theme.text }]}>📧 E-posta</Text>
                <CustomTextInput
                    width="100%"
                    placeholder={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.statsContainer}>
                <View style={[styles.statBox, { backgroundColor: theme.card }]}>
                    <Text style={[styles.statValue, { color: theme.text }]}>12</Text>
                    <Text style={styles.statLabel}>Toplam Günlük</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: theme.card }]}>
                    <Text style={[styles.statValue, { color: theme.text }]}>03 Mayıs</Text>
                    <Text style={styles.statLabel}>Son Giriş</Text>
                </View>
                <View style={[styles.statBox, { backgroundColor: theme.card }]}>
                    <Text style={[styles.statValue, { color: theme.text }]}>5 gün</Text>
                    <Text style={styles.statLabel}>En Uzun Seri</Text>
                </View>
            </View>

            <CustomButton
                title="Şifre Sıfırlama E-postası Gönder"
                width="100%"
                height={45}
                onPress={() => {
                    try {
                        handleUpdatePassword(email);
                        Alert.alert("Şifre Sıfırlama Talebiniz E-Posta Adresinize İletilmiştir!");
                    } catch (error) {
                        console.error(error.message);
                    }
                }}
            />

            <CustomButton
                title="Bilgilerimi Kaydet"
                width="100%"
                height={45}
                onPress={handleSave}
            />

            <CustomButton
                title="Hesabımı Sil"
                width="100%"
                height={45}
                onPress={() => setDeleteVisible(true)}
                backgroundColor='red'
            />

            <DeleteAccountPopup
                visible={deleteVisible}
                onClose={() => setDeleteVisible(false)}
                onDeleteSuccess={() => setIsAuth(false)}
            />
        </SafeAreaView>
    );
};

export default EditProfileScreen;

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
    backButton: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
    },
    backButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
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
        color: '#777',
        marginTop: 4,
        textAlign: 'center',
    },
});