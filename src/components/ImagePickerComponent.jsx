import { Image, StyleSheet, Button, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const ImagePickerComponent = ({ onImageSelected }) => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      onImageSelected(uri); // üst bileşene bildir
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Bir fotoğraf yükle" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 12,
    borderRadius: 10,
  },
});