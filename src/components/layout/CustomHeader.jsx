import { SafeAreaView, Platform, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = ({ title, backButton, addButton }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.headerContainer}>
      <View style={styles.innerHeader}>
        {backButton ? (
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('HomeScreen')}>
            <Text style={styles.plus}>{'<'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} /> // boşluk koruyucu, hizalama için
        )}

        <Text style={styles.title}>{title}</Text>

        {addButton ? (
          <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddNoteScreen')}>
            <Text style={styles.plus}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} /> // yine hizalama için boş kutu
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: '#fff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 1,
  },
  innerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;