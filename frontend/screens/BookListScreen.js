import React, { Component } from 'react';
import { StyleSheet, Text, ScrollView, View, Button } from 'react-native';


export default class BookListScreen extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>This is Book List Screen</Text>
        <Button
          onPress={() => {
            this.props.navigation.navigate('BookDetail');
          }}
          title="Book Detail"
        ></Button>
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