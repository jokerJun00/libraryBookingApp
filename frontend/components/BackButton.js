import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TouchableNativeFeedbackBase, View, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BackButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.props.parentProps.navigation.goBack()}
        >
          <Ionicons name='arrow-back-outline' size={35} color='#000'/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 10,
  }
})

