import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';


export default class BookingScreen extends Component {
  render() {
    return(
      <ScrollView style={styles.container}>
        <Text>This is Booking Screen</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F5EB',
    justifyContent: 'center',
    alignItems: 'center',
  }
})