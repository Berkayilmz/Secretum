import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

import CustomHeader from '../components/layout/CustomHeader';
import EmojiKeyboard from '../components/ui/emojis/EmojiKeyborad';
import CustomTextInput from '../components/ui/CustomTextInput';
import CustomButton from '../components/ui/CustomButton';

import { handleUpdateNote } from '../firebase/db';

const NoteDetailScreen = ({ navigation }) => {
  const route = useRoute();
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [noteText, setNoteText] = useState(note?.content || '');
  const [image, setImage] = useState(note?.image || null);
  const [emoji, setEmoji] = useState(note?.emoji || '');
  const [docId, setDocId] = useState(note?.id || '');


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
    const updatedNote = {
      title,
      content: noteText,
      image: image,
      emoji,
    };
    try {
      await handleUpdateNote(docId, updatedNote);
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error("Günlük güncellenirken hata oluştu: ", error.message);
    }
    
  };


  return (
    <View style={styles.container}>
      <CustomHeader title="Not Detay" backButton={true} />
      <ScrollView contentContainerStyle={styles.content}>
        <CustomTextInput
          width="100%"
          placeholder={note?.title || 'Başlık giriniz'}
          value={title}
          onChangeText={setTitle}
        />

        <CustomTextInput
          width="100%"
          height={120}
          placeholder={note?.content || 'Günlüğünüzü buraya yazın...'}
          value={noteText}
          onChangeText={setNoteText}
        />

        <EmojiKeyboard onEmojiSelected={(e) => setEmoji(e)} />
        {emoji ? <Text style={styles.emoji}>{emoji}</Text> : null}

        <CustomButton
          title="Fotoğraf Yükle"
          width="100%"
          height={45}
          onPress={pickImage}
        />
        {image && <Image source={{ uri: image }} style={styles.image} />}

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

export default NoteDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  content: {
    padding: 16,
  },
  emoji: {
    fontSize: 48,
    textAlign: 'center',
    marginVertical: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 20,
  },
});