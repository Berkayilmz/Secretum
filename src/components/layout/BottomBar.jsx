import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext'; // Tema context'i

import HomeScreen from '../../screens/HomeScreen';
import CalendarScreen from '../../screens/CalendarScreen';
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const BottomBar = () => {
  const theme = useTheme(); // 🎯 Tema verisini al

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Ana Sayfa') {
            iconName = 'home-outline';
          } else if (route.name === 'Takvim') {
            iconName = 'calendar-outline';
          } else if (route.name === 'Profil') {
            iconName = 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          borderTopColor: theme.border || '#ccc',
        },
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary || 'gray',
        tabBarLabelStyle: {
          fontWeight: '600',
        },
      })}
    >
      <Tab.Screen name="Ana Sayfa" component={HomeScreen} />
      <Tab.Screen name="Takvim" component={CalendarScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomBar;