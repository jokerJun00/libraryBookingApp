import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity,Image } from 'react-native';
import { InputWithLabel } from '../components/UI';
import BackButton from '../components/BackButton';
import Clipboard from '@react-native-community/clipboard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {FloatingAction} from 'react-native-floating-action';

let SQLite = require('react-native-sqlite-storage');

const actions = [
  {
    text: 'Add',
    icon: require('../../assets/icons/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

export default class SearchDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      volumeInfo: this.props.route.params.volumeInfo,
    };
    this._query = this._query.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'bookdb', createFromLocation: '~db.sqlite'},
      this.openCallback,
      this.errorCallback,
    );
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: this.state.volumeInfo.title,
      headerLeft: () => (
        <BackButton parentProps={this.props} color="white" />),
    });
  }

  openCallback() {
    console.log('database open success');
  }

  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }

  _query() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM book ORDER BY Title', [], (tx, results) =>
        this.setState({books: results.rows.raw()}),
      ),
    );
  }

  render() {
    try{
      var authors = this.state.volumeInfo.authors.join(',\n');
    }catch(error){
      var authors = "No Author";
      console.log(error);
    };

    try{
      var description = this.state.volumeInfo.description.toString();
    }catch(error){
      var description = 'No Description';
      console.log(error);
    };

    try{
      var image = this.state.volumeInfo.imageLinks.thumbnail;
    }catch(error){
      var image = 'https://www.nypl.org/scout/_next/image?url=https%3A%2F%2Fdrupal.nypl.org%2Fsites-drupal%2Fdefault%2Ffiles%2Fstyles%2Fmax_width_960%2Fpublic%2Fblogs%2FJ5LVHEL.jpg%3Fitok%3DDkMp1Irh&w=1200&q=90';
      console.log(error);
    };
    console.log(image);

    return(
      <View style={{ flex: 1, margin: 10 }}>
        <Image
          style={styles.image}
          source={{ uri: image }}
        />
        <InputWithLabel
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          multiline={true}
          label="Authors:">
          {authors ? authors : 'No information'}
        </InputWithLabel>
        <TouchableOpacity style={styles.copyButton}
          onPress={() => { Clipboard.setString(authors); alert('Copied into clipboard!') }}>
          <Ionicons name='copy-outline' size={20} />
        </TouchableOpacity>
        <View>
          <FloatingAction
            actions={actions}
            overrideWithAction={true}
            color={'#607EAA'}
            
            onPressItem={() => {
              this.props.navigation.navigate('CreateBook', {
                Image:image,
                Title:this.state.volumeInfo.title,
                Author:authors,
                Description:description,
                refresh: this._query,

              });
            }}
          />
        </View>
        <InputWithLabel
          textInputStyle={styles.input}
          textLabelStyle={styles.label}
          editable={false}
          multiline={true}
          label="Description:">
          {description ? description : 'No information'}
        </InputWithLabel>
        <TouchableOpacity style={styles.copyButton}
          onPress={() => { Clipboard.setString(description); alert('Copied into clipboard!') }}>
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
    marginTop: -11,
  },
  label: {
    fontWeight: 'bold',
    color: 'darkblue',
    fontSize: 15,
  },
  image: {
    width: 150,
    height: 225,
    marginVertical: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  input: {
    color: 'black',
  },
});