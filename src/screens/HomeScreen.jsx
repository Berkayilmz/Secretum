import { StyleSheet, SafeAreaView, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

import CustomButton from '../components/ui/CustomButton.jsx';
import DairyCard from '../components/ui/DairyCard.jsx';
import CustomHeader from '../components/layout/CustomHeader.jsx';

import { notes } from '../../assets/tempData/data.js'


const HomeScreen = ({navigation}) => {
  const { setIsAuth } = useContext(AuthContext);
  const now = new Date();

  const day = String(now.getDate()).padStart(2, '0');      // 03
  const month = String(now.getMonth() + 1).padStart(2, '0'); // 05 (Ocak = 0)
  const year = String(now.getFullYear());         // 25

  const formattedDate = `${day}.${month}.${year}`;  // "03.05.25"


  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title="Secretum" addButton={true}/>

      <View style={styles.cardContainer}>

        <FlatList
          data={notes}
          numColumns={2}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardContainer}
          columnWrapperStyle={{ justifyContent: 'space-between' }} // BU SATIR ÖNEMLİ
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('NoteDetailScreen', { note: item })}
                activeOpacity={0.8}
                style={{ width: '48%', marginBottom: 12 }}
              >
                <DairyCard
                  title={item.title}
                  note={item.note}
                  imgSrc={item.imgSrc}
                  date={item.date}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>


    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  cardContainer: {
    paddingHorizontal: 8,
    paddingTop: 12,
  }
});

{/* <CustomButton
        title="ÇIKIŞ YAP"
        width="80%"
        height={40}
        onPress={() => setIsAuth(false)}
        backgroundColor='red'
      /> */}