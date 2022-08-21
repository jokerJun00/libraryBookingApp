import React , { Component } from 'react';
import {
  StyleSheet,
  ScrollView, 
  View,
  Text,
  Image, 
  SafeAreaView,
  TouchableNativeFeedbackBase, 
  TouchableOpacity,
  Button,
} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { back } from 'react-native/Libraries/Animated/Easing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from "react-native";
import 'react-native-gesture-handler';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import HomeScreen from './frontend/screens/HomeScreen';
import BookListScreen from './frontend/screens/BookListScreen';
import BookingScreen from './frontend/screens/BookingScreen';
import BookDetailScreen from './frontend/screens/BookDetailScreen';
import UserProfileScreen from './frontend/screens/UserProfileScreen';
import CreateBookScreen from './frontend/screens/CreateBookScreen';
import UpdateBookScene from './frontend/screens/UpdateBookScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{
            headerShown: false,
            headerTitleStyle: {
              fontSize: 20,
              fontFamily: 'PlayfairDisplay-Bold',
            },
            headerStyle: {
              backgroundColor: '#1C3879',
            },
            headerTintColor: '#fff',
          }}>
          <Stack.Screen
            name='Home'
            component={TabNavigator}></Stack.Screen>
          <Stack.Screen
            name='BookList'
            component={BookListScreen}></Stack.Screen>
          <Stack.Screen
            name='CreateBook'
            component={CreateBookScreen}></Stack.Screen>
          <Stack.Screen
            name='BookDetail'
            component={BookDetailScreen}></Stack.Screen>
          <Stack.Screen
            name='UpdateBook'
            component={UpdateBookScene}></Stack.Screen>
          <Stack.Screen
            name='Booking'
            component={BookingScreen}
            options={{
              headerLeft: () => (
                <BackButton/>
              ),
            }}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
      
    );
  }
}
  
class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator 
        initialRouteName={'Home'}
        screenOptions={{
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: 'PlayfairDisplay-Bold',
          },
          headerStyle: {
            backgroundColor: '#1C3879',
          },
          headerTintColor: '#fff',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ 
            headerShown: false, 
            tabBarIcon: () => {
              return(
                <Ionicons name='home' size={20} color={'#607EAA'}></Ionicons>
              )
            } 
          }}
        />
        <Tab.Screen 
          name="Profile" 
          component={UserProfileScreen} 
          options={{ 
            tabBarIcon: () => {
              return(
                <Ionicons name='person' size={20} color={'#607EAA'}></Ionicons>
              )
            }
          }}
        />
      </Tab.Navigator>
    );
  }
}

