import React, {Component} from 'react';
import {StyleSheet, TextInput, Text, View, ScrollView, TouchableOpacity, TouchableNativeFeedbackBase } from 'react-native';
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
          placeholder={'Type Book Img Url Here'}
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
          placeholder={'Type Book Title Here'}
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
          placeholder={'Type Book Author Here'}
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
          placeholder={'Type Book Description Here'}
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
          placeholder={'Type Book Price Here'}
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
            value={this.state.isAvailable}
            tintColors={{ true: '#1C3879', false: '#C21010' }}
            onValueChange={isAvailable => {
              this.setState({isAvailable});
              let status = '01';

              this.state.isAvailable == false ? status = '02' : null;

              this.setState({
                Status: status,
              })
            }}
          />
          <Text style={{color: '#1C3879'}}>Set this book to available</Text>
        </View>
        <View style={{height: 50}}></View>
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
    padding: 20,
    backgroundColor: '#fff',
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
    fontSize: 14,
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
    borderRadius: 15,
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});