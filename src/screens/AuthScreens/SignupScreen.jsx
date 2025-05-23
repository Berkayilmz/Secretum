import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useState } from 'react';

import CustomButton from '../../components/ui/CustomButton';
import CustomTextInput from '../../components/ui/CustomTextInput';

import { AuthContext } from '../../contexts/AuthContext';
import { handleSignup, handleVerification } from '../../firebase/auth';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../contexts/ThemeContext';

const SignupScreen = ({ navigation }) => {
  const { setIsAuth } = useContext(AuthContext);
  const theme = useTheme();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) return Alert.alert("Parolalar Eşleşmiyor!");
    try {
      await handleSignup(email, password, username);
      setIsAuth(true);
      handleVerification();
      Alert.alert(`Kayıt Başarılı! Hoş Geldin ${username}`);
    } catch (error) {
      Alert.alert("Kayıt Hatası: ", error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../../assets/diary.png')} />
        </View>

        <View style={styles.inputContainer}>
          <CustomTextInput width='80%' height={40} placeholder='Kullanıcı Adı' secureTextEntry={false} onChangeText={setUsername} />
          <CustomTextInput width='80%' height={40} placeholder='E-mail' secureTextEntry={false} onChangeText={setEmail} />
          <CustomTextInput width='80%' height={40} placeholder='Şifre' secureTextEntry={true} onChangeText={setPassword} />
          <CustomTextInput width='80%' height={40} placeholder='Şifre Tekrar' secureTextEntry={true} onChangeText={setConfirmPassword} />
        </View>

        <View style={styles.buttonContainer}>
          <CustomButton
            title="KAYIT OL"
            width="80%"
            height={40}
            onPress={handleRegister}
          />
          <CustomButton
            title="GOOGLE İLE GİRİŞ YAP"
            width="80%"
            height={40}
            onPress={() => console.log("Google Giriş")}
            backgroundColor={theme.card}
            textColor={theme.text}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
  },
  image: {
    width: '70%',
    height: '70%',
  },
});