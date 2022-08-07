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
import { createStackNavigator } from '@react-navigation/stack';
import { back } from 'react-native/Libraries/Animated/Easing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import HomeScreen from './frontend/screens/HomeScreen';
import BookListScreen from './frontend/screens/BookListScreen';
import BookingScreen from './frontend/screens/BookingScreen';
import BookDetailScreen from './frontend/screens/BookDetailScreen';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
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
              backgroundColor: '#F9F5EB',
              paddingLeft: 20,
            },
            headerTintColor: '#000',
          }}
        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='BookList'
            component={BookListScreen}
          />
          <Stack.Screen
            name='BookDetail'
            component={BookDetailScreen}
          />
          <Stack.Screen
            name='Booking'
            component={BookingScreen}
            options={{
              headerLeft: () => (
                <BackButton/>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

