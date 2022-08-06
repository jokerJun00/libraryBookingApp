import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';


export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
      <View style={styles.container}>
        <Text>This is Home Screen</Text>
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