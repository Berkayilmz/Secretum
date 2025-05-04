import { StyleSheet,  } from 'react-native'
import React, { useContext, useState } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/AuthScreens/LoginScreen';
import BottomBar from '../components/layout/BottomBar'
import SignupScreen from '../screens/AuthScreens/SignupScreen'

import { AuthContext } from '../contexts/AuthContext';
import NoteDetailScreen from '../screens/NoteDetailScreen';

const Stack = createNativeStackNavigator();


const AppNavigator = () => {
    const {isAuth} = useContext(AuthContext);

    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {isAuth ? 
                (
                  <>
                    <Stack.Screen name='HomeScreen' component={BottomBar}/>
                    <Stack.Screen name='NoteDetailScreen' component={NoteDetailScreen}/>
                  </>
                )
                :
                (
                <>
                  <Stack.Screen name='LoginScreen' component={LoginScreen} />
                  <Stack.Screen name='SignupScreen' component={SignupScreen} />
                </>
                )
            }
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

export default AppNavigator

const styles = StyleSheet.create({})