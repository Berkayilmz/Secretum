import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';

const DairyCard = ({ title, emoji, note, imgSrc, date, isPrivate, onPress }) => {
  const theme = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <View style={styles.topSection}>
        <Text style={[styles.title, { color: theme.text }]} numberOfLines={1} ellipsizeMode="tail">
          {isPrivate ? '🔒' : `${emoji} ${title}`}
        </Text>

        <View style={[styles.divider, { backgroundColor: theme.border }]} />

        {imgSrc && (
          <Image
            style={styles.image}
            resizeMode="cover"
            source={
              isPrivate
                ? require('../../../assets/private-diary.png')
                : { uri: imgSrc }
            }
          />
        )}

        {!isPrivate && (
          <Text style={[styles.note, { color: theme.text }]} numberOfLines={2}>
            {note}
          </Text>
        )}
      </View>

      <View style={styles.bottomView}>
        <Text style={[styles.date, { color: theme.text }]}>{date}</Text>
        <TouchableOpacity onPress={onPress}>
          <FontAwesome name="trash-o" size={18} color={theme.text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DairyCard;

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    padding: 10,
    elevation: 3,
    height: 240,
    justifyContent: 'space-between',
  },
  topSection: {
    alignItems: 'center',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    marginBottom: 8,
    width: '100%',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  note: {
    marginTop: 10,
    fontSize: 14,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
  },
});