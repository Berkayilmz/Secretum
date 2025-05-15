import * as SecureStore from 'expo-secure-store';
import CryptoJS from 'crypto-js';
import 'react-native-get-random-values';

const KEY_NAME = "user_encryption_key"

export const getEncryptionKey = async () => {
    let key = await SecureStore.getItemAsync(KEY_NAME);
    if (!key) {
        const randomString = Math.random().toString(36).slice(2) + Date.now().toString();
        key = CryptoJS.SHA256(randomString).toString(); // AES için hashlenmiş key
        await SecureStore.setItemAsync(KEY_NAME, key);
    }
    return key;
}