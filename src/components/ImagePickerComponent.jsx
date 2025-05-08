import { Image, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from './CustomButton'; // varsayım: aynı klasörde veya yolu değiştir

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
      <CustomButton
        title="Fotoğraf Yükle"
        width="100%"
        height={45}
        onPress={pickImage}
      />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 12,
  },
});