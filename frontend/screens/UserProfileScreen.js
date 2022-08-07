import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class UserProfileScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>This is user profile screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F5EB',
    justifyContent: 'center',
    alignItems: 'center',
  }
})

// note 
// this screen can be ignore first. 
// if there is no other screen can be use in drawer navigator then we might 
// just use this to have some screen to show functionality of drawer navigator