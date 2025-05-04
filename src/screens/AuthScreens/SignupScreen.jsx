import { StyleSheet, Text, View, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'

import CustomButton from '../../components/ui/CustomButton'
import CustomTextInput from '../../components/ui/CustomTextInput'

import { AuthContext } from '../../contexts/AuthContext'
import {handleSignup} from '../../firebase/auth'
import { SafeAreaView } from 'react-native-safe-area-context'


const SignupScreen = ({ navigation }) => {

  const { setIsAuth } = useContext(AuthContext)

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) return Alert.alert("Parolalar Eşleşmiyor!");
    try {
      await handleSignup(email, password, username)
      setIsAuth(true);
      Alert.alert(`Kayıt Başarılı! Hoş Geldin ${username}`)
    } catch (error) {
      Alert.alert("Kayıt Hatası: ", error.message)
    }

  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.image} source={require('../../../assets/diary.png')} />
        </View>
        {/* {width, height, placeholder, onChangeText} */}
        <View style={styles.inputContainer}>
          <CustomTextInput width='80%' height='40' placeholder='Kullanıcı Adı' secureTextEntry={false} onChangeText={setUsername} />
          <CustomTextInput width='80%' height='40' placeholder='E-mail' secureTextEntry={false} onChangeText={setEmail} />
          <CustomTextInput width='80%' height='40' placeholder='Şifre' secureTextEntry={true} onChangeText={setPassword} />
          <CustomTextInput width='80%' height='40' placeholder='Şifre' secureTextEntry={true} onChangeText={setConfirmPassword} />
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
            backgroundColor="#fff"
            textColor='black'
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default SignupScreen

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    marginBottom: 5
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: '20'
  },
  image: {
    width: '70%',
    height: '70%',
  }
})