import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class BackButton extends Component {
  constructor(props){
    super(props);
    this.iconColor = this.props.color ? (this.props.color == 'white'? '#fff' : '#000'): '#000';
  }

  render() {
    return(
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => this.props.parentProps.navigation.goBack()}>
          <Ionicons name='arrow-back-outline' size={35} color={this.iconColor} />
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