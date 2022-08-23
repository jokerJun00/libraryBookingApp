import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, TouchableNativeFeedbackBase, Image } from 'react-native';
import {InputWithLabel, PickerWithLabel, AppButton} from '../components/UI';
import CheckBox from '@react-native-community/checkbox';
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
      isAvailable: true,
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
        headerStyle: {
          backgroundColor: '#1C3879',
        },
        headerTitleStyle: {
          color:'#fff',
        },
        headerLeft: () => (
          <BackButton parentProps={this.props} color="white"/>
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
      <View style={styles.container}>
        <ScrollView>
          <InputWithLabel
            container={styles.SectionContainer}
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            label={'Img URL'}
            placeholder={'Book Image Url '}
            value={this.state.Img}
            onChangeText={Img => {
              this.setState({Img});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            container={styles.SectionContainer}
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            placeholder={'Book Title'}
            label={'Title'}
            value={this.state.Title}
            onChangeText={Title => {
              this.setState({Title});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            container={styles.SectionContainer}
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            placeholder={'Book Author'}
            label={'Author'}
            value={this.state.Author}
            onChangeText={Author => {
              this.setState({Author});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            container={styles.DescriptionContainer}
            textLabelStyle={styles.TextLabel}
            textInputStyle={[styles.DescriptionTextInput, {height: 150, textAlignVertical: 'top'}]}
            placeholder={'Book Description'}
            multiline={true}
            label={'Description'}
            value={this.state.Description}
            onChangeText={Description => {
              this.setState({Description});
            }}
            orientation={'vertical'}
          />
          <InputWithLabel
            container={styles.SectionContainer}
            textLabelStyle={styles.TextLabel}
            textInputStyle={styles.TextInput}
            placeholder={'Book Price'}
            label={'Price'}
            value={this.state.Price}
            onChangeText={Price => {
              this.setState({Price});
            }}
            keyboardType={'numeric'}
            orientation={'vertical'}
          />
          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={this.state.Status=='Available'?true:false}
              tintColors={{ true: '#1C3879', false: '#C21010' }}
              onValueChange={isAvailable => {
                this.setState({isAvailable});
                let status = '01';
                this.setState({
                  Status:   this.state.isAvailable == false ?  'Not Available' : 'Available',
                })
              }}
            />
            <Text style={{color: '#1C3879'}}>Set this book to available</Text>
          </View>
          <View style={{height: 20}}></View>
          <TouchableOpacity  onPress={this._insert} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <View style={{heigth: 100}}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    heigth: '70%',
    paddingHorizontal: 10,
    backgroundColor: '#EEF2FF',
  },
  SectionContainer: {
    height: 80,
    margin: 5,
  },
  DescriptionContainer: {
    height: 180,
    margin: 5,
  },
  TextLabel: {
    flex: 1,
    marginLeft: 3,
    marginBottom: 5,
    fontSize: 15,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    color: '#000'
  },
  TextInput: {
    fontSize: 14,
    paddingLeft: 10,
    color: '#000',
    borderColor: '#607EAA',
    borderWidth: 1.5,
    borderRadius: 10,
  },
  DescriptionTextInput: {
    fontSize: 14,
    paddingLeft: 15,
    color: '#000',
    borderColor: '#607EAA',
    borderWidth: 1.5,
    borderRadius: 20,
  },
  pickerItemStyle: {
    fontSize: 20,
    color: '#000099',
  },
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
    backgroundColor: '#1C3879',
    bottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});