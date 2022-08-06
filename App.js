import React , { Component } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View,
  Text,
  Image, 
  SafeAreaView,
  TouchableNativeFeedbackBase, 
  TouchableOpacity 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { back } from 'react-native/Libraries/Animated/Easing';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import HomeScreen from './frontend/screens/HomeScreen';
import BookListScreen from './frontend/screens/BookListScreen';
import BookingScreen from './frontend/screens/BookingScreen';
import BookDetailScreen from './frontend/screens/BookDetailScreen';

const Drawer = createDrawerNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator 
          drawerContent={props => <DrawerComponent {...props} />}
          screenOptions= {styles.drawerScreenOptions}
        >
          <Drawer.Screen
            name='Home'
            component={HomeScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='home-outline' size={20} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name='Book'
            component={BookListScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='list-outline' size={20} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name='Booking'
            component={BookingScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='list-outline' size={20} color={color} />
              )
            }}
          />
          <Drawer.Screen
            name='BookDetail'
            component={BookDetailScreen}
            options={{
              drawerIcon: ({color}) => (
                <Ionicons name='list-outline' size={20} color={color} />
              )
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
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
            <Text style={drawerStyles.userName}>User Name</Text>
          </View>

          <View style={drawerStyles.drawerItemList}>
            <DrawerItemList {...this.props} />
          </View>

        </DrawerContentScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerScreenOptions: {
    drawerActiveTintColor: '#EAE3D2',
    drawerActiveBackgroundColor: '#1C3879',
    drawerStyle: {
      backgroundColor: '#F9F5EB',
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
    headerTintColor: '#EAE3D2',
  },
});

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
    backgroundColor: '#EAE3D2',
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
    color: '#F9F5EB',
    textAlign: 'center',
  },
  drawerItemList: {
    backgroundColor: '#F9F5EB',
    flex: 1,
    paddingTop: 10,
  },
});