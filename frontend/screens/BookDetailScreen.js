import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import BackButton from '../components/BackButton';
import { FloatingAction } from 'react-native-floating-action';
import { _, } from 'lodash';

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
    this.db = SQLite.openDatabase(
      { name: 'bookdb' },
      this.openCallback,
      this.errorCallback,
    );
    this._queryByID = this._queryByID.bind(this);
    this._bookReturn = this._bookReturn.bind(this);
    this._delete = this._delete.bind(this);
  }

  _queryByID() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM book WHERE ID = ?', [this.state.book.ID], (tx, results) => {
        if (results.rows.length) {
          this.setState({ book : results.rows.raw()[0]});
        }
      })
    );
  }

  _bookReturn() {
    this.db.transaction(tx => {
        tx.executeSql('UPDATE book SET Status=? WHERE id = ?', ["Available",this.state.book.ID,]);
    });
    this._queryByID();
    this.props.route.params.refresh();
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
          Alert.alert("Delete the book successfully!");
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
      )
    })
    if(this.state.book.Status=="Not Available"){
      this.props.navigation.setOptions({
        headerRight: () => (
          <View style={headerStyles.returnButton}>
          <TouchableOpacity
            onPress={() => {
              this._bookReturn();
              Alert.alert('The book is returned successfully!');
            }}
          >
            <Text style={headerStyles.rentButtonText}>Return</Text>
          </TouchableOpacity>
        </View>
        )
      })
    }
    else if(this.state.book.Status=="Available"){
      this.props.navigation.setOptions({
        headerRight: () => (
          <View style={headerStyles.rentButton}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Booking', {
                book:this.state.book,
                refresh: this._queryByID,
                homeRefresh: this.props.route.params.refresh,
              });
            }}
          >
            <Text style={headerStyles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>
        )
      })
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEqual(prevState.book, this.state.book)) {
      this._queryByID();
      this.props.navigation.setOptions({
        headerShown: true,
        headerTitle: this.state.book.Title,
        headerLeft: () => (
          <BackButton parentProps={this.props} color="white" />
        )
      })

      if(this.state.book.Status=="Not Available"){
        this.props.navigation.setOptions({
          headerRight: () => (
            <View style={headerStyles.returnButton}>
            <TouchableOpacity
              onPress={() => {
                this._bookReturn();
                Alert.alert('The book is returned successfully!');
              }}
            >
              <Text style={headerStyles.rentButtonText}>Return</Text>
            </TouchableOpacity>
          </View>
          )
        })
      }
      else if(this.state.book.Status=="Available"){
        this.props.navigation.setOptions({
          headerRight: () => (
            <View style={headerStyles.rentButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Booking', {
                  book:this.state.book,
                  refresh: this._queryByID,
                  homeRefresh: this.props.route.params.refresh,
                });
              }}
            >
              <Text style={headerStyles.rentButtonText}>Rent</Text>
            </TouchableOpacity>
          </View>
          )
        })
      }
    }
  }

  openCallback() {
    console.log('database opened successfully');
  }

  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }

  render() {
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
                    this.props.navigation.navigate('UpdateBook', {
                      book : this.state.book,
                      refresh: this._queryByID,
                      homeRefresh: this.props.route.params.refresh,
                    });
                    break;
                  case 'delete':
                    this._delete();
                    break;
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
  returnButton: {
    width: 60,
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#808080',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginRight: 10,
  },
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