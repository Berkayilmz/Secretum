import CryptoJS from 'crypto-js';
import { getEncryptionKey } from '../helpers/authHelper';
import 'react-native-get-random-values';

export const encryptText = async (text) => {
    const key = await getEncryptionKey();
    const encrypted = CryptoJS.AES.encrypt(text, key).toString();
    return encrypted;
}

export const decryptText = async (encryptedText) => {
    const key = await getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedText, key);
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedText
}