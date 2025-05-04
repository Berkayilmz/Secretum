import { StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useContext, useState } from 'react'
import CustomButton from '../../components/ui/CustomButton'
import CustomTextInput from '../../components/ui/CustomTextInput'
import { AuthContext } from '../../contexts/AuthContext'
import { handleSignin } from '../../firebase/auth'

const LoginScreen = ({ navigation }) => {
    const { setIsAuth } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            await handleSignin(email, password);
            setIsAuth(true);
            Alert.alert(`Giriş Başarılı! Hoş Geldin!`)
        } catch (error) {
            Alert.alert('Giriş yaparken hata oluştu: ', error.message)
        }
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.container}>
                <View style={styles.imageContainer}>
                    <Image style={styles.image} source={require('../../../assets/diary.png')} />
                </View>
                {/* {width, height, placeholder, onChangeText} */}
                <View style={styles.inputContainer}>
                    <CustomTextInput width='80%' height='40' placeholder='E-Mail' secureTextEntry={false} onChangeText={setEmail} />
                    <CustomTextInput width='80%' height='40' placeholder='Şifre' secureTextEntry={true} onChangeText={setPassword} />
                </View>
                <View style={styles.buttonContainer}>
                    <CustomButton
                        title="GİRİŞ YAP"
                        width="80%"
                        height={40}
                        onPress={handleLogin}
                    />
                    <CustomButton
                        title="KAYIT OL"
                        width="80%"
                        height={40}
                        onPress={() => navigation.navigate('SignupScreen')}
                        backgroundColor="#888" // alternatif renk örneği
                    />
                </View>
            </View>
        </KeyboardAvoidingView>
            )


}

export default LoginScreen

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