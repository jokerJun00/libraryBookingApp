import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export default class BookingScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>This is Booking Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F5EB',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  }
})