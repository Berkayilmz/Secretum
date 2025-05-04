import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

const DairyCard = ({ title, note, imgSrc, date }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title} numberOfLines={1} ellipsizeMode='tail'>{title}</Text>
      <View style={styles.divider} />
      {imgSrc && (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: imgSrc }}
        />
      )}
      <Text style={styles.note} numberOfLines={3}>{note}</Text>
      <View style={styles.bottomView}>
        <Text style={styles.date}>{date}</Text>
        <TouchableOpacity>
          <FontAwesome name="trash-o" size={18} color="gray" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DairyCard;

const styles = StyleSheet.create({
  card: {
    width: 170, // sabit genişlik, ekranı doldurmak için uygun
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 2,
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
  },
  note: {
    marginTop: 10,
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
  },
});