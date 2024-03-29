import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker'
import BackButton from '../components/BackButton';
let SQLite = require('react-native-sqlite-storage');

export default class BookingScreen extends Component {
  constructor(props) {
    super(props);
    let issueDate = this.formatDate(new Date());
    this._update = this._update.bind(this);

    this.state = {
      issueDate: issueDate,
      returnDate: "select date",
      openPicker: false,
      book:this.props.route.params.book,
    }

    this.db = SQLite.openDatabase(
        { name: 'bookdb'},
        this.openDb,
        this.errorDb,
    );
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: this.state.book.Title,
      headerLeft: () => (
        <BackButton parentProps={this.props} color="white" />
      ),
    })
  }

  // dateObject must be Date() object
  formatDate = (dateObject) => {
    let date = dateObject.getDate();
    let month = dateObject.getMonth() + 1;
    let year = dateObject.getFullYear();
    return date + "/" + month + "/" + year;
  }

  _update() {
    this.db.transaction(tx => {
        tx.executeSql('UPDATE book SET Status=? WHERE id = ?', ["Not Available",this.state.book.ID]);
    });
    this.props.route.params.refresh();
    this.props.route.params.homeRefresh();
  }

  openDb() {
    console.log('Database opened');
  }

  errorDb(err) {
      console.log('SQL Error: ' + err);
  }

  render() {
    // default return date = next day
    let returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 1);

    // minimum rent date = 1 day
    let minimumDate = new Date();
    minimumDate.setDate(minimumDate.getDate()+1);

    return(
      <View style={styles.container}>
        {/* return date date picker */}
        <DatePicker
          modal
          mode='date'
          title={"Select return date"}
          date={returnDate}
          minimumDate={minimumDate}
          open={this.state.openPicker}
          onConfirm={(data) => {
            console.log(data);
            let returnDate = this.formatDate(data);
            this.setState({
              returnDate: returnDate,
              openPicker: false,
            })
          }}
          onCancel={() => {
            this.setState({
              openPicker: false,
            });
          }}
        />

        {/* book image  */}
        <Image
          style={styles.image}
          source={{uri:this.state.book.Img}}
        />

        <TouchableOpacity style={styles.backButton}>
          <Ionicons name='arrow-back-outline' color={'#fff'}/>
        </TouchableOpacity>

        {/* booking detail section */}
        <View style={styles.bookingDetailSection}>
          <Text style={styles.bookTitle}>{this.state.book.Title}</Text>

          <View style={{height: 30}}></View>

          {/* issue date */}
          <View style={styles.dateSection}>
            <Text style={styles.text}>Issue date:</Text>
            <View style={styles.selectSection}>
              <Text style={styles.text}>{this.state.issueDate.toString()}</Text>
              <View style={{width: 15}}></View>
              <Ionicons name='calendar-outline' size={20} />
            </View>
          </View>

          <View style={{height: 30}}></View>

          {/* return date  */}
          <View style={styles.dateSection}>
            <Text style={styles.text}>Return date:</Text>
            <View style={styles.selectSection}>
              <Text style={[styles.text, {color: '#1C3879'}]}>{this.state.returnDate.toString()}</Text>
              <View style={{width: 15}}></View>
              <TouchableOpacity
                onPress={ () => {
                  this.setState({
                    openPicker: true,
                  })
                }}
              >
                <Ionicons name='calendar-outline' size={20} color={'#1C3879'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{height: '10%'}}></View>


          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => {

              if(this.state.returnDate=="select date"){
                Alert.alert("Please choose the return date!");
              }
              else{
                this._update();
                Alert.alert("You have rent successfully!");
                this.props.navigation.goBack();
              }
          }}>
            <Text style={styles.buttonText}>Confirm My Rent</Text>
          </TouchableOpacity>    
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    paddingLeft: 10,
  },
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 400,
  },
  backButton: {
    width: '100%',
    zIndex: 1,
    top: 20,
  },
  bookingDetailSection: {
    backgroundColor: '#fff',
    height: '60%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
  },
  bookTitle: {
    fontSize: 35,
    fontFamily: 'PlayfairDisplay-Bold',
    color: '#000'
  },
  dateSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#1C3879',
    borderRadius: 30,
    height: 50,
    width: '75%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',  
    bottom: 12,
  },
  buttonText: {
    color: '#F9F5EB',
    fontSize: 20,
  }
})