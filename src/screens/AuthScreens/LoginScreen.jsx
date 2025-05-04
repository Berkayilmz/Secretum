import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import CustomButton from '../../components/ui/CustomButton'
import CustomTextInput from '../../components/ui/CustomTextInput'
import { AuthContext } from '../../contexts/AuthContext'

const LoginScreen = ({navigation}) => {
    const {setIsAuth} = useContext(AuthContext);
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require('../../../assets/diary.png')} />
            </View>
            {/* {width, height, placeholder, onChangeText} */}
            <View style={styles.inputContainer}>
                <CustomTextInput width='80%' height='40' placeholder='Kullanıcı Adı' secureTextEntry={false} />
                <CustomTextInput width='80%' height='40' placeholder='Şifre' secureTextEntry={true} />
            </View>
            <View style={styles.buttonContainer}>
                <CustomButton
                    title="GİRİŞ YAP"
                    width="80%"
                    height={40}
                    onPress={() => setIsAuth(true)}
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
        marginBottom:'20'
    },
    image: {
        width: '70%',
        height: '70%',
    }
})