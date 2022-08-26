import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TouchableNativeFeedbackBase, Image, Alert } from 'react-native';
import { InputWithLabel } from '../components/UI';
import CheckBox from '@react-native-community/checkbox';
import BackButton from '../components/BackButton';
import { LogBox } from "react-native";
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

let SQLite = require('react-native-sqlite-storage');

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === '' && (valid = false);
  });

  return valid;
};

export default class CreateScreen extends Component<Props>{
  constructor(props) {
    super(props);
    this.state = {
      Img: this.props.route.params.Image,
      Title: this.props.route.params.Title,
      Author: this.props.route.params.Author,
      Description: this.props.route.params.Description,
      Price: '',
      Status: 'Available',
      isAvailable: true,
      formErrors: {
        Img: '',
        Title: '',
        Author: '',
        Description: '',
        Price: '',
      }
    };
    this._insert = this._insert.bind(this);
    this.db = SQLite.openDatabase(
      { name: 'bookdb' },
      this.openDb,
      this.errorDb,
    );
  }

  handleSubmit = submit => {
    let formErrors = { ...this.state.formErrors };
    submit.preventDefault();

    if (formValid(this.state)) {
      Alert.alert("Create the book successfully!");
      this._insert();
      console.log("successful submiting")
    } else {
      formErrors.Img = this.state.Img === '' ? "Field cannot be empty" : "";
      formErrors.Title = this.state.Title === '' ? "Field cannot be empty" : "";
      formErrors.Author = this.state.Author === '' ? "Field cannot be empty" : "";
      formErrors.Description = this.state.Description === '' ? "Field cannot be empty" : "";
      formErrors.Price = this.state.Price === '' ? "Field cannot be empty" : "";
        if (isNaN(this.state.Price)) {formErrors.Price = "This field can only accept number";}
      this.setState({ formErrors });
      Alert.alert("FORM INVALID\nPlease complete the form.");
    }
  };

  handleChange = (value, field) => {
    let formErrors = { ...this.state.formErrors };
    switch (field) {
      case 'Img':
        formErrors.Img =
          value === '' ? "Field cannot be empty" : "";
          
        break;
      case 'Title':
        formErrors.Title =
          value === '' ? "Field cannot be empty" : "";
        break;
      case 'Author':
        formErrors.Author =
          value === '' ? "Field cannot be empty" : "";
        break;
      case 'Description':
        formErrors.Description =
          value === '' ? "Field cannot be empty" : "";
        break;
      case 'Price':
        formErrors.Price =
          value === '' ? "Field cannot be empty" : "";
        if (isNaN(value))
          formErrors.Price = "This field can only accept number";
        break;
      default:
        break;
    }
    this.setState({ formErrors });
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add New Book',
      headerStyle: {
        backgroundColor: '#1C3879',
      },
      headerTitleStyle: {
        color: '#fff',
      },
      headerLeft: () => (
        <BackButton parentProps={this.props} color="white" />
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
      ], error => {
        console.log('error on inserting data :' + error.message);
      });
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
    const { formErrors } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView>
          <View>
            <InputWithLabel
              className={formErrors.Img.length > 0 ? "error" : null}
              container={styles.SectionContainer}
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              label={'Img URL'}
              placeholder={'Type Book Img Url Here'}
              value={this.state.Img}
              onChangeText={Img => {
                this.handleChange(Img, 'Img');
                this.setState({ Img });
              }}
              orientation={'vertical'}
            />
            {formErrors.Img.length > 0 && (<Text style={styles.errorMessage}>{formErrors.Img}</Text>)}
          </View>

          <View>
            <InputWithLabel
              className={formErrors.Title.length > 0 ? "error" : null}
              container={styles.SectionContainer}
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Type Book Title Here'}
              label={'Title'}
              value={this.state.Title}
              onChangeText={Title => {
                this.handleChange(Title, 'Title');
                this.setState({ Title });
              }}
              orientation={'vertical'}
            />
            {formErrors.Title.length > 0 && (<Text style={styles.errorMessage}>{formErrors.Title}</Text>)}
          </View>

          <View>
            <InputWithLabel
              className={formErrors.Author.length > 0 ? "error" : null}
              container={styles.SectionContainer}
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Type Book Author Here'}
              label={'Author'}
              value={this.state.Author}
              onChangeText={Author => {
                this.handleChange(Author, 'Author');
                this.setState({ Author });
              }}
              orientation={'vertical'}
            />
            {formErrors.Author.length > 0 && (<Text style={styles.errorMessage}>{formErrors.Author}</Text>)}
          </View>

          <View>
            <InputWithLabel
              className={formErrors.Description.length > 0 ? "error" : null}
              container={styles.DescriptionContainer}
              textLabelStyle={styles.TextLabel}
              textInputStyle={[styles.DescriptionTextInput, { height: 150, textAlignVertical: 'top' }]}
              placeholder={'Type Book Description Here'}
              multiline={true}
              label={'Description'}
              value={this.state.Description}
              onChangeText={Description => {
                this.handleChange(Description, 'Description');
                this.setState({ Description });
              }}
              orientation={'vertical'}
            />
            {formErrors.Description.length > 0 && (<Text style={styles.errorMessage}>{formErrors.Description}</Text>)}
          </View>

          <View>
            <InputWithLabel
              className={formErrors.Price.length > 0 ? "error" : null}
              container={styles.SectionContainer}
              textLabelStyle={styles.TextLabel}
              textInputStyle={styles.TextInput}
              placeholder={'Type Book Price Here'}
              label={'Price'}
              value={this.state.Price.toString()}
              onChangeText={Price => {
                this.handleChange(Price, 'Price');
                this.setState({ Price });
              }}
              keyboardType={'numeric'}
              orientation={'vertical'}
            />
            {formErrors.Price.length > 0 && (<Text style={ styles.errorMessage }>{formErrors.Price}</Text>)}
          </View>

          <View style={styles.checkBoxContainer}>
            <CheckBox
              value={this.state.Status == 'Available' ? true : false}
              tintColors={{ true: '#1C3879', false: '#C21010' }}
              onValueChange={isAvailable => {
                this.setState({ isAvailable });
                this.setState({
                  Status: this.state.isAvailable == false ? 'Not Available' : 'Available',
                })
              }}
            />
            <Text style={{ color: '#1C3879' }}>Set this book to available</Text>
          </View>

          <View style={{ height: 50 }}></View>
          <TouchableOpacity onPress={this.handleSubmit} style={styles.button}>
            <Text style={styles.buttonText}>Save</Text>
          </TouchableOpacity>
          <View style={{ heigth: 100 }}></View>
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
  error: {
    borderWidth: 2,
    borderColor: '#ff0000',
  },
  errorMessage: {
    color: '#ff0000',
    fontSize: 15,
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