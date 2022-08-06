import React , { Component } from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  View,
  Text,
  Image, 
  SafeAreaView, 
  ImageBackground, 
  TouchableNativeFeedbackBase, 
  TouchableOpacity 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import HomeScreen from './frontend/screens/HomeScreen';
import BookListScreen from './frontend/screens/BookListScreen';

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
          <ImageBackground
            source={require('./assets/images/profile-background.jpg')}
            style={drawerStyles.imageBackground}
          >
            <Image
              style={drawerStyles.image}
              source={require('./assets/images/profile-picture.png')}
            />
            <Text style={drawerStyles.userName}>User Name</Text>
          </ImageBackground>

          <View style={drawerStyles.drawerItemList}>
            <DrawerItemList {...this.props} />
          </View>

        </DrawerContentScrollView>

        <View style={drawerStyles.bottomSection}>
          <TouchableOpacity>
            <Ionicons name='exit-outline' size={20} />
            <Text style={drawerStyles.bottomSectionText}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  drawerScreenOptions: {
    drawerActiveTintColor: '#EAE3D2',
    drawerActiveBackgroundColor: '#1C3879',
    drawerLabelStyle: {
      marginLeft: -24,
      fontFamily: 'PlayfairDisplay-Medium',
    },
  },
  drawerHeader: {
    headerTitle: 'Home',
    headerTitleStyle: {
      fontSize: 30,
      fontFamily: 'PlayfairDisplay-Bold',
    },
    headerStyle: {
      backgroundColor: '#1C3879',
    },
    headerTintColor: '#EAE3D2',
  }
});

const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    backgroundColor: '#F9F5EB',
  },
  imageBackground: {
    padding: 10,
  },
  image: {
    alignSelf: 'flex-end',
    width: 64,
    height: 64,
    marginLeft: 20,
  },
  userName: {
    fontSize: 20,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#F9F5EB',
    alignSelf: 'flex-end',
    marginLeft: 20,
  },
  drawerItemList: {
    backgroundColor: '#F9F5EB',
    flex: 1,
    paddingTop: 10,
  },
  bottomSection: {
    pading: 15,
    borderTopWidth: 1,
    borderTopColor: '#1C3879',
  },
  bottomSectionText: {
    marginLeft: 10,
    fontSize: 15,
    fontFamily: 'PlayfairDisplay-Regular',
  }
});