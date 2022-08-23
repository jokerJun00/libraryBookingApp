import React, {Component} from 'react';
import {FlatList, Text, StyleSheet, View,TouchableOpacity} from 'react-native';
import {InputWithLabel} from '../components/UI';
import BackButton from '../components/BackButton';
import Clipboard from '@react-native-community/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class SearchDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeInfo: this.props.route.params.volumeInfo,
    };
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: this.state.volumeInfo.title,
      headerLeft: () => (
        <BackButton parentProps={this.props} color="white"/>),
    });
  }

  render() {
    let authors = this.state.volumeInfo.authors.join(',\n');
    let description = this.state.volumeInfo.description;
    console.log(authors);
    return (
      <View style={{flex: 1, margin: 10}}>
        <InputWithLabel
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          multiline={true}
          label="Authors:">
          {authors ? authors : 'No information'}
        </InputWithLabel>
            <TouchableOpacity style={styles.copyButton}
              onPress={() =>{Clipboard.setString(authors);alert('Copied into clipboard!')}}>
              <Ionicons name='copy-outline' size={20} />
            </TouchableOpacity>
        <InputWithLabel
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          multiline={true}
          label="Description:">
          {description ? description : 'No information'}
        </InputWithLabel>
        <TouchableOpacity style={styles.copyButton}
              onPress={() =>{Clipboard.setString(description);alert('Copied into clipboard!')}}>
              <Ionicons name='copy-outline' size={20} />
            </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  copyButton: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
    marginTop:-11,
  },
  label: {
    fontWeight: 'bold',
    color: 'darkblue',
    fontSize: 15,
  },

  input: {
    color: 'black',
  },
});