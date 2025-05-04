import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import CustomHeader from '../components/layout/CustomHeader';
import EmojiKeyboard from '../components/ui/emojis/EmojiKeyborad';

import { notes } from '../../assets/tempData/data.js';

const NoteDetailScreen = ({navigation}) => {
  const route = useRoute();
  const note = route.params?.note;

  const [title, setTitle] = useState(note?.title || '');
  const [noteText, setNoteText] = useState(note?.note || '');
  const [image, setImage] = useState(note?.imgSrc || null);
  const [emoji, setEmoji] = useState(note?.emoji || '');

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

  const handleSave = () => {
    const newNote = {
      title,
      note: noteText,
      imgSrc: image,
      date: note?.date || new Date().toISOString().slice(0, 10),
      emoji: emoji || "", // undefined olmasını engeller
    };
    console.log('Kaydedilen not:', newNote);
    navigation.navigate('HomeScreen')
  }

  return (
    <View style={{ flex: 1 }}>
      <CustomHeader title="Not Detay" backButton={true} />
      <ScrollView contentContainerStyle={styles.container}>
        <TextInput
          placeholder="Başlık"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Günlüğünü buraya yaz..."
          multiline
          style={styles.textArea}
          value={noteText}
          onChangeText={setNoteText}
        />
        
        <EmojiKeyboard onEmojiSelected={(e) => setEmoji(e)}/>

        <Button title="Bir fotoğraf yükle" onPress={pickImage} />

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <View style={styles.saveButton}>
          <Button title="Kaydet" onPress={handleSave} />
        </View>
      </ScrollView>
    </View>
  );
};

export default NoteDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
  saveButton: {
    marginTop: 20,
  },
});