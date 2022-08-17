import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView} from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../UI';
import BackButton from '../components/BackButton';

let common = require('../BookStatus');
let SQLite = require('react-native-sqlite-storage');

export default class CreateScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      Img: '',
      Title: '',
      Author: '',
      Description: '',
      Price: '',
      Status: '01',
    };
    this._insert = this._insert.bind(this);
    this.db = SQLite.openDatabase(
      {name: 'bookdb', createFromLocation: '~db.sqlite'},
      this.openDb,
      this.errorDb,
    );
  }

  componentDidMount() {
    this.props.navigation.setOptions({
        headerShown: true,
        headerTitle: 'Add New Book',
        headerLeft: () => (
          <BackButton parentProps={this.props} />
        ),
      });
  }

  _insert() {
    this.db.transaction(tx => {
      tx.executeSql('INSERT INTO book(Img,Title,Author,Description,Price,Status) VALUES(?,?,?,?,?,?)', [
        this.state.Img,
        this.state.Title,
        this.state.Author,
        this.state.Description,
        this.state.Price,
        this.state.Status,
      ]);
    });

    this.props.route.params.refresh();
    this.props.navigation.goBack();
  }

  openDb() {
    console.log('Database opened');
  }
  errorDb(err) {
    console.log('SQL Error: ' + err);
  }
  
  render() {
    return (
      <ScrollView style={styles.container}>
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          label={'Img URL'}
          placeholder={'Type Book Img Url Here'}
          value={this.state.Img}
          onChangeText={Img => {
            this.setState({Img});
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Type Book Title Here'}
          label={'Title'}
          value={this.state.Title}
          onChangeText={Title => {
            this.setState({Title});
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Type Book Author Here'}
          label={'Author'}
          value={this.state.Author}
          onChangeText={Author => {
            this.setState({Author});
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Type Book Description Here'}
          label={'Description'}
          value={this.state.Description}
          onChangeText={Description => {
            this.setState({Description});
          }}
          orientation={'vertical'}
        />
        <InputWithLabel
          textLabelStyle={styles.TextLabel}
          textInputStyle={styles.TextInput}
          placeholder={'Type Book Price Here'}
          label={'Price'}
          value={this.state.Price}
          onChangeText={Price => {
            this.setState({Price});
          }}
          keyboardType={'numeric'}
          orientation={'vertical'}
        />
        <PickerWithLabel
          textLabelStyle={styles.TextLabel}
          pickerItemStyle={styles.pickerItemStyle}
          label={'Status'}
          items={common.status}
          mode={'dialog'}
          selectedValue={this.state.Status}
          onValueChange={(itemValue, itemIndex) => {
            this.setState({Status: itemValue});
          }}
          orientation={'vertical'}
          textStyle={{fontSize: 24}}
        />
        <AppButton
          style={styles.button}
          title={'Save'}
          theme={'primary'}
          onPress={this._insert}
        />
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  TextLabel: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 3,
    textAlignVertical: 'center',
  },

  TextInput: {
    fontSize: 24,
    color: '#000099',
  },

  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
});