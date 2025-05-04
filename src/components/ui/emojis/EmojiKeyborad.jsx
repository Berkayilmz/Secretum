import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import EmojiPicker from 'rn-emoji-keyboard';

export default function EmojiKeyboard({ onEmojiSelected }) {
  const [isOpen, setIsOpen] = useState(false);

  const handlePick = (emojiObject) => {
    onEmojiSelected(emojiObject.emoji); // sadece emojiyi al
    setIsOpen(false);
  };

  return (
    <View>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />

      <TouchableOpacity
        onPress={() => setIsOpen(true)}
        style={{
          backgroundColor: '#007bff',
          padding: 10,
          borderRadius: 8,
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', textAlign: 'center' }}>Emoji Seç</Text>
      </TouchableOpacity>
    </View>
  );
}