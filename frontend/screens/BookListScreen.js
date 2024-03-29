import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { FloatingAction } from 'react-native-floating-action';
import { _, } from 'lodash';

let SQLite = require('react-native-sqlite-storage');
const actions = [
  {
    text: 'Add',
    icon: require('../../assets/icons/add_icon.png'),
    name: 'add',
    position: 1,
  },
];

export default class BookListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      intervalRefresh: true,
    };
    this._query = this._query.bind(this);
    this._databasePrepare = this._databasePrepare.bind(this);
    this.db = SQLite.openDatabase(
      { name: 'bookdb', createFromLocation: '~db.sqlite' },
      this.openCallback,
      this.errorCallback,
    );
    this._query();
    setInterval(() => {
      this.setState(intervalRefresh => {
        console.log("refresh main list");
        this._query();
      })
    }, 10000);
  }

  componentDidMount() {
    this._databasePrepare();
    this._query();
  }

  _databasePrepare() {
    this.db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS book(ID INTEGER PRIMARY KEY AUTOINCREMENT, Img VARCHAR(255), Title VARCHAR(255) UNIQUE, Author VARCHAR(255), Description VARCHAR(255), Price INTEGER, Status VARCHAR(255))',
        [],
        (sqlTxn, res) => {
          console.log('Book Table Ready');
        },
        error => {
          console.log('Error on Creating Table ' + error.message);
        },
      );

      this.db.transaction(tx =>
        tx.executeSql(
          'SELECT * FROM book ORDER BY Title',
          [],
          (tx, results) => {
            if (results.rows.length == 0) {
              tx.executeSql(
                'INSERT INTO book(Img,Title,Author,Description,Price,Status) VALUES("https://kbimages1-a.akamaihd.net/b99c2e1f-5cdb-4b34-8a65-21f5deb57172/1200/1200/False/c-programming-language-3.jpg","C Programming Language","Brian Kernighan","This edition describes C as defined by the ANSI standard. This book is meant to help the reader learn how to program in C. The book assumes some familiarity with basic programming concepts like variables, assignment statements, loops, and functions. A novice programmer should be able to read along and pick up the language.","10","Not Available")',
                [], //insert dummy data so that the database is non-empty, to ease verification
                (tx, results) => {
                  if (results.rowsAffected > 0) {
                    console.log('dummy data inserted successfully');
                    this._query();
                  } else {
                    console.log('error in inserting data');
                  }
                },
              );
            } else {
              console.log('table non-empty, no insertion needed');
            }
          },
        ),
      );
    });
  }

  _query() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM book ORDER BY Title', [], (tx, results) =>
        this.setState({ books: results.rows.raw() }),
      ),
    );
  }

  openCallback() {
    console.log('database open success');
  }

  errorCallback(err) {
    console.log('Error in opening the database: ' + err);
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.books}
          extraData={this.state}
          showsVerticalScrollIndicator={true}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image style={styles.img} source={{ uri: item.Img }} />
              <View style={styles.columnContainer}>
                <Text style={styles.itemTitle}>{item.Title}{'\n'}</Text>
                <Text style={styles.itemSubtitle}>{item.Author}{'\n'}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    this.props.navigation.navigate('BookDetail', {
                      book: item,
                      refresh: this._query,
                    });
                  }}
                >
                  <Text style={styles.buttonText}>Book Detail</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => {
            return item.ID;
          }}
        />
        <View>
          <FloatingAction
            actions={actions}
            overrideWithAction={true}
            color={'#607EAA'}
            onPressItem={() => {
              this.props.navigation.navigate('CreateBook', {
                Image: '',
                Title: '',
                Author: '',
                Description: '',
                refresh: this._query,
              });
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  columnContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
    marginTop: -30,
  },
  button: {
    width: 130,
    height: 40,
    backgroundColor: '#607EAA',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemTitle: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  itemSubtitle: {
    fontSize: 18,
  },
  img: {
    alignSelf: 'flex-start',
    width: 140,
    height: 190,
    margin: 20,
    marginLeft: 10,
    marginRight: 40,
    borderRadius: 5,
  },
})

