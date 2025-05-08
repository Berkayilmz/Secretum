import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext'; // 🎯 Tema hook
import { handleDeleteUser } from '../../firebase/auth';

const DeleteAccountPopup = ({ visible, onClose }) => {
  const theme = useTheme(); // 🎯 Tema verisi
  const [password, setPassword] = useState('');

  const handleDelete = async () => {
    try {
      await handleDeleteUser(password);
      Alert.alert('Başarılı', 'Hesabınız silindi.');
      onClose();
    } catch (error) {
      Alert.alert('Hata', error.message || 'Hesap silinemedi.');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={[styles.popup, { backgroundColor: theme.surface }]}>
          <Text style={[styles.title, { color: theme.text }]}>Hesabınızı Silmek Üzeresiniz</Text>
          <Text style={[styles.label, { color: theme.text }]}>Lütfen şifrenizi girin:</Text>
          <TextInput
            style={[styles.input, { color: theme.text, borderColor: theme.border, backgroundColor: theme.inputBackground }]}
            secureTextEntry
            placeholder="Şifre"
            placeholderTextColor={theme.placeholder}
            onChangeText={setPassword}
            value={password}
          />

          <View style={styles.buttons}>
            <TouchableOpacity style={[styles.cancelBtn, { backgroundColor: theme.cancel }]} onPress={onClose}>
              <Text style={styles.btnText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.btnText}>Sil</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteAccountPopup;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    borderRadius: 12,
    padding: 20,
    width: '85%',
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    textAlign: 'center',
  },
  label: {
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  deleteBtn: {
    backgroundColor: 'red',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});