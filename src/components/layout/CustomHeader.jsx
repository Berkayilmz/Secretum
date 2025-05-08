import { SafeAreaView, Platform, View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../contexts/ThemeContext'; // 🎯 Tema hook

const CustomHeader = ({ title, backButton, addButton }) => {
  const navigation = useNavigation();
  const theme = useTheme(); // 🎯 Tema verisini al

  return (
    <SafeAreaView style={[styles.headerContainer, { backgroundColor: theme.background }]}>
      <View style={styles.innerHeader}>
        {backButton ? (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: theme.surface }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={[styles.plus, { color: theme.text }]}>{'<'}</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}

        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>

        {addButton ? (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: theme.surface }]}
            onPress={() => navigation.navigate('AddNoteScreen')}
          >
            <Text style={[styles.plus, { color: theme.text }]}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 32 }} />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  navButton: {
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