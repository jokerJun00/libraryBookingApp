import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, TouchableNativeFeedbackBase, View, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BackButton extends Component {
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
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

// Note 
// I wanted to use this button as a reusable button in header
// but currently i can not pass this.props.navigation to this component
// 
// according to documentation, we can use <BackButton navigation={this.props.navigation} /> to get navigation
// but i get undefined from this method.
//
// another might be workable method is to use import { useNavigation } from 'react-native/native';
// this allow use to get navigation by using const navigation = useNavigation();
// i still exploring this technique but current i just hard code BackButton in BookDetailScreen and BookingScreen

