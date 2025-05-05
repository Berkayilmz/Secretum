import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Image,
    ScrollView,
    Text,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomHeader from '../components/layout/CustomHeader';
import EmojiKeyboard from '../components/ui/emojis/EmojiKeyborad';
import CustomTextInput from '../components/ui/CustomTextInput';
import CustomButton from '../components/ui/CustomButton';

import {handleAddNote} from '../firebase/db';

const AddNoteScreen = ({ navigation }) => {
    const [title, setTitle] = useState('');
    const [noteText, setNoteText] = useState('');
    const [image, setImage] = useState(null);
    const [emoji, setEmoji] = useState('');

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        try {
            await handleAddNote(title,noteText,emoji,image);
            console.log("Not eklendi");
            navigation.navigate('HomeScreen');
        } catch (error) {
            console.error("Not eklenirken hata oluştu:", error);
        }   
    };

    return (
        <View style={styles.container}>
            <CustomHeader title="Yeni Not" backButton={true} />
            <ScrollView contentContainerStyle={styles.content}>
                <CustomTextInput
                    width="100%"
                    placeholder="Başlık gir..."
                    onChangeText={setTitle}
                />

                <CustomTextInput
                    width="100%"
                    placeholder="Günlüğünü buraya yaz..."
                    onChangeText={setNoteText}
                    height={120}
                />

                <EmojiKeyboard onEmojiSelected={(e) => setEmoji(e)} />
                <View style={styles.emojiStyle}>
                    {emoji ? <Text style={styles.emojiDisplay}>{emoji}</Text> : null}
                </View>

                <View style={styles.button}>
                    <CustomButton
                        title="Fotoğraf Yükle"
                        width="100%"
                        height={45}
                        onPress={pickImage}
                    />
                    {image && <Image source={{ uri: image }} style={styles.image} />}

                </View>
                <CustomButton
                    title="Kaydet"
                    width="100%"
                    height={45}
                    onPress={handleSave}
                />
            </ScrollView>
        </View>
    );
};

export default AddNoteScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9',
    },
    content: {
        padding: 16,
    },
    sectionTitle: {
        marginTop: 16,
        fontWeight: '600',
        fontSize: 16,
        marginBottom: 6,
        color: '#444',
    },
    emojiDisplay: {
        fontSize: 48,           // Emoji boyutu
        textAlign: 'center',    // Metni ortala
        marginVertical: 16,     // Üst-alt boşluk
    },
    emojiStyle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 12,
        marginBottom: 20,
    },
    button:{
        marginTop: 5
    },
});