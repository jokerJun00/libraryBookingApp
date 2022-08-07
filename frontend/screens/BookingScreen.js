import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Image,
  TouchableNativeFeedbackBase, 
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Dialog, { DialogTitle, DialogFooter, DialogButton, DiaglogContent, DialogContent } from 'react-native-popup-dialog';

// reminder
// 1. need to develop logic for dialog pop up to display successful / fail message
//    since the database logic havent develop yet so I did not create the logic.
//    You can create the logic in "Confirm My Rent" button
// 2. need to develop logic to create data in database

export default class BookingScreen extends Component {
  constructor(props) {
    super(props);

    let issueDate = this.formatDate(new Date());

    this.state = {
      issueDate: issueDate,
      returnDate: "select date",
      openPicker: false,
      openDialog: false,
      rentSuccess: false,
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: 'Rich Dad Poor Dad',
      headerLeft: () => (
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons name='arrow-back-outline' size={35} color='#000'/>
        </TouchableOpacity>
      </View>
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

  render() {
    // default return date = 1 week after rented
    let returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 7);

    // maximum rent date = 30 days
    let maximumDate = new Date();
    maximumDate.setDate(maximumDate.getDate() + 30);

    return(
      <View style={styles.container}>
        {/* return date date picker */}
        <DatePicker
          modal
          mode='date'
          title={"Select return date"}
          date={returnDate}
          minimumDate={new Date()} // minimum date = issue date
          maximumDate={maximumDate}
          open={this.state.openPicker}
          onConfirm={(data) => {
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

        {/* diaglog */}
        <Dialog
          visible={this.state.openDialog}
          dialogTitle={
            <DialogTitle 
              title={ this.state.rentSuccess ? "You successfully rent the book!" : "Something went wrong!"} 
            />
          }
          footer={
            <DialogFooter>
              <DialogButton
                text="OK"
                onPress={() => {
                  this.setState({
                    openDialog: false,
                  })
                }}
              />
            </DialogFooter>
          }
          onTouchOutside={() => {
            this.setState({
              openDialog: false,
            });
          }}
        >
          <DialogContent>
            <Text>{
              this.state.rentSuccess 
              ? "You action has been record."
              : "Maximum rent date is 30 days.\nMore than 30 days is not acceptable"
            }</Text>
          </DialogContent>
        </Dialog>

        {/* book image  */}
        <Image
          style={styles.image}
          source={require('../../assets/images/books-images/rich-dad-poor-dad.jpeg')}
        />

        <TouchableOpacity 
          style={styles.backButton}
        >
          <Ionicons name='arrow-back-outline' color={'#fff'}/>
        </TouchableOpacity>

        {/* booking detail section */}
        <View style={styles.bookingDetailSection}>
          <Text style={styles.bookTitle}>Rich Dad Poor Dad</Text>
          
          <View style={{height: 40}}></View>

          {/* issue date */}
          <View style={styles.dateSection}>
            <Text style={styles.text}>Issue date:</Text>

            <View style={styles.selectSection}>
              <Text style={styles.text}>{this.state.issueDate}</Text>
              <View style={{width: 15}}></View>
              <Ionicons name='calendar-outline' size={20} />
            </View>
          </View>

          <View style={{height: 40}}></View>

          {/* return date  */}
          <View style={styles.dateSection}>
            <Text style={styles.text}>Return date:</Text>

            <View style={styles.selectSection}>
              <Text style={[styles.text, {color: '#1C3879'}]}>{this.state.returnDate}</Text>
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

          <View style={{height: '20%'}}></View>

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => {
              // develop logic to check if the data create successfully or not here
              this.setState( {
                openDialog: true,
                // rentSuccess: true / false,
              })
            }}
          >
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
    backgroundColor: '#F9F5EB',
    flex: 1,
  },
  image: {
    width: '100%',
    height: 500,
  },
  backButton: {
    width: '100%',
    zIndex: 1,
    top: 20,
  },
  bookingDetailSection: {
    backgroundColor: '#F9F5EB',
    height: '60%',
    width: '100%',
    position: 'absolute',
    zIndex: 1,
    bottom: 0,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 20,
  },
  bookTitle: {
    fontSize: 35,
    fontFamily: 'PlayfairDisplay-Bold',
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
    height: 60,
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#F9F5EB',
    fontSize: 20,
  }
})