import React , { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { LogBox } from "react-native";
import 'react-native-gesture-handler';
LogBox.ignoreLogs(["EventEmitter.removeListener"]);

import BookListScreen from './frontend/screens/BookListScreen';
import BookingScreen from './frontend/screens/BookingScreen';
import BookDetailScreen from './frontend/screens/BookDetailScreen';
import UserProfileScreen from './frontend/screens/UserProfileScreen';
import CreateBookScreen from './frontend/screens/CreateBookScreen';
import UpdateBookScreen from './frontend/screens/UpdateBookScreen';
import SearchBookScreen from './frontend/screens/SearchBookScreen';
import SearchDetailScreen from './frontend/screens/SearchDetailScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export default class App extends Component {
  render() {
    return(
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='TabHome'
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
            name='TabHome'
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
            component={UpdateBookScreen}></Stack.Screen>
          <Stack.Screen
            name='SearchBook'
            component={SearchBookScreen}></Stack.Screen>
          <Stack.Screen
            name='SearchDetail'
            component={SearchDetailScreen}></Stack.Screen>
          <Stack.Screen
            name='Booking'
            component={BookingScreen}></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
  
class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator 
        initialRouteName={'DrawerHome'}
        screenOptions={{
          tabBarActiveTintColor: '#1C6DD0',
          tabBarActiveBackgroundColor: '#E8F9FD',
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
          name="DrawerHome"
          component={DrawerNavigator}
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

class DrawerNavigator extends Component {
  render() {
    return(
      <Drawer.Navigator
        drawerContent={props => <DrawerComponent {...props} />}
        screenOptions= {{
          drawerActiveTintColor: '#fff',
          drawerActiveBackgroundColor: '#1C3879',
          drawerStyle: {
            backgroundColor: '#fff',
          },
          drawerLabelStyle: {
            marginLeft: -24,
          },
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
        <Drawer.Screen
          name='BookList'
          component={BookListScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name='list-outline' size={20} color={color} />
            )
          }}
        />
        <Drawer.Screen
          name='SearchInfo'
          component={SearchBookScreen}
          options={{
            drawerIcon: ({color}) => (
              <Ionicons name='search-outline' size={20} color={color} />
            )
          }}
        />
      </Drawer.Navigator>
    );
  }
}

class DrawerComponent extends Component {
  render() {
    return(
      <View style={drawerStyles.container}>
        <DrawerContentScrollView 
          {...this.props}
          contentContainerStyle={drawerStyles.contentContainerStyle}
        >
          <View style={drawerStyles.background}>
            <View style={drawerStyles.imageBackground}>
              <Image
                style={drawerStyles.image}
                source={require('./assets/images/profile-picture.png')}
              />
            </View>
            <Text style={drawerStyles.userName}>Lim Choon Kiat</Text>
          </View>

          <View style={drawerStyles.drawerItemList}>
            <DrawerItemList {...this.props} />
          </View>
        </DrawerContentScrollView>
      </View>
    );
  }
}

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: '#1C3879',
  },
  background: {
    backgroundColor: '#1C3879',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    width: 70,
    height: 70,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  userName: {
    fontSize: 18,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#fff',
    textAlign: 'center',
  },
  drawerItemList: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 10,
  },
});