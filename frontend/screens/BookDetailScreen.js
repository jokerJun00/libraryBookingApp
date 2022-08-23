import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableNativeFeedbackBase,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import BackButton from '../components/BackButton';
import { FloatingAction } from 'react-native-floating-action';
import { Floatingbutt } from '../UI';

let SQLite = require('react-native-sqlite-storage');

const actions = [
  {
    text: "Edit",
    name: "edit",
    icon: require('../../assets/icons/edit_icon.png'),
    position: 1,
  },
  {
    text: "Delete",
    icon: require('../../assets/icons/delete_icon.jpg'),
    name: "delete",
    icon: require('../../assets/icons/delete_icon.jpg'),
    position: 2,
  },


];

export default class BookDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {

      book:this.props.route.params.book,

    };
    console.log(this.state.bookID);
    this.db = SQLite.openDatabase(
      { name: 'bookdb' },
      this.openCallback,
      this.errorCallback,
    );
    this._queryByID = this._queryByID.bind(this);
  }

  _queryByID() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM book WHERE ID = ?', [this.state.book.ID], (tx, results) => {
        console.log("queryBYId:" + results.rows.item(0).Title);
        console.log("queryBYId:" + results.rows.length);
        if (results.rows.length) {
          this.setState({ book : results.rows.raw()[0]});
        }
      })
    );
  }

  _delete() {
    Alert.alert('Confirm to delete ?', this.state.book.Title, [
      {
        text: 'No',
        onPress: () => { },
      },
      {
        text: 'Yes',
        onPress: () => {
          this.db.transaction(tx => {
            tx.executeSql('DELETE FROM book WHERE id = ?', [
              this.state.book.ID,
            ]);
          });
          this.props.route.params.refresh();
          this.props.navigation.goBack();
        },
      },
    ]);
  }

  componentDidMount() {
    this._queryByID();
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: this.state.book.Title,
      headerLeft: () => (
        <BackButton parentProps={this.props} color="white"/>
      ),
      headerRight: () => (
        <View style={headerStyles.rentButton}>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Booking', {
                book:this.state.book,
              });
            }}
          >
            <Text style={headerStyles.rentButtonText}>Rent</Text>
          </TouchableOpacity>

        </View>
      )
    })
  }

  openCallback() {
    console.log('database opened successfully');
  }
  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }


  render() {
    console.log(this.state.book);
    return (
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: this.state.book.Img }}
        />

        {/* Book Detail Section */}
        <View style={styles.detailSection}>
          <DetailSectionText
            sectionTitle="Book Title"
            sectionContent={this.state.book.Title}
          />
          <DetailSectionText
            sectionTitle="Author"
            sectionContent={this.state.book.Author}
          />
          <DetailSectionText
            sectionTitle="Status"
            sectionContent={this.state.book.Status}
          />
        </View>

        <View style={{ height: 20 }}></View>

        {/* Book Description Section */}
        <View style={styles.descriptionSection}>
          <Text>Description: </Text>
          <View style={{ height: 30 }}></View>
          <ScrollView>
            <Text style={styles.descriptionText}>{this.state.book.Description}</Text>
          </ScrollView>
        </View>
        <FloatingAction
            actions={actions}
            color={'#607EAA'}
            onPressItem={name => {
              if (name) {
                switch (name) {
                  case 'edit':
                    this.backgroundColor = '#449d44';
                    console.log(`selected button: edit button pressed`);

                    this.props.navigation.navigate('UpdateBook', {
                      book : this.state.book,
                      refresh: this._queryByID,
                      homeRefresh: this.props.route.params.refresh,
                    });
                    
                    break;
                  case 'delete':
                    console.log(`selected button: delete button pressed`);
                    this._delete();

                    break;
                  default:
                    console.log(`selected button: wtf button pressed`);
                }
              } else {
                this.backgroundColor = '#286090';
              }
            }}
          />
      </View>
    );
  }
}

class DetailSectionText extends Component {
  render() {
    return (
      <View style={detailSectionTextStyles.container}>
        <Text style={[detailSectionTextStyles.detailSectionText, { flex: 0.2 }]}>{this.props.sectionTitle}</Text>
        <Text style={[detailSectionTextStyles.detailSectionText, { flex: 0.05 }]}> : </Text>
        <Text style={[detailSectionTextStyles.detailSectionText, { flex: 0.75 }]}>{this.props.sectionContent}</Text>
      </View>
    );
  }
}

const headerStyles = StyleSheet.create({
  rentButton: {
    width: 60,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C3879',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
  rentButtonText: {
    color: '#fff',
    fontFamily: 'bold',
    fontSize: 16,
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: '7.5%',
  },
  image: {
    width: 150,
    height: 225,
    marginVertical: 25,
    borderRadius: 10,
    alignSelf: 'center',
  },
  descriptionSection: {
    paddingTop: 20,
    width: '100%',
    height: '40%',
  },
  descriptionText: {
    textAlign: 'justify',
    lineHeight: 25,
  }
})

const detailSectionTextStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  detailSectionText: {
    fontWeight: 'bold',
    color: '#000',
  },
})