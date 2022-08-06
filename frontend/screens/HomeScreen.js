import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <ScrollView style={styles.container}>
        <Text>This is Home Screen</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F5EB',
  }
})