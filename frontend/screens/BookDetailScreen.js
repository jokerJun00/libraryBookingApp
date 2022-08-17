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
} from 'react-native';
import BackButton from '../components/BackButton';
import {FloatingAction} from 'react-native-floating-action';

let SQLite = require('react-native-sqlite-storage');

export default class BookDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookID: this.props.route.params.id,
      bookTitle: this.props.route.params.headerTitle,
      book: null,
    };
    console.log(this.state.bookID);
    this.db = SQLite.openDatabase(
      {name: 'bookdb'},
      this.openCallback,
      this.errorCallback,
    );
    this._queryByID = this._queryByID.bind(this);
  }

  _queryByID() {
    this.db.transaction(tx =>
      tx.executeSql('SELECT * FROM book WHERE ID = ?',[this.state.bookID],(tx, results) => {
        console.log("queryBYId:"+ results.rows.item(0));
        console.log("queryBYId:"+ results.rows.item(0).Title);
        if (results.rows.length) {
          this.setState({book: results.rows.item(0)});
        }
      })
    );
  }

  componentDidMount() {
    this._queryByID();
    console.log("componentDidMount");
  }

  openCallback() {
    console.log('database opened successfully');
  }
  errorCallback(err) {
    console.log('error in opening database: ' + err);
  }

  componentDidUpdate() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: this.state.bookTitle,
      headerLeft: () => (
        <BackButton parentProps={this.props} />
      ),
      headerRight: () => (
        <View style={headerStyles.rentButton}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Booking')}
          >
            <Text style={headerStyles.rentButtonText}>Rent</Text>
          </TouchableOpacity>
        </View>
      )
    })
  }

  render() {
    let book = this.state.book;
    return(
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require('../../assets/images/books-images/rich-dad-poor-dad.jpeg')}
        />

        {/* Book Detail Section */}
        <View style={styles.detailSection}>
          <DetailSectionText
            sectionTitle="Book Title"
            sectionContent={"Hello"}
          />
          <DetailSectionText
            sectionTitle="Author" 
            sectionContent={"Hello"}
          />
          <DetailSectionText
            sectionTitle="Publisher"
            sectionContent={"Hello"}
          />
          <DetailSectionText
            sectionTitle="Status"
            sectionContent={"Hello"}
          />
        </View>

        <View style={{height: 20}}></View>

        {/* Book Description Section */}
        <View style={styles.descriptionSection}>
          <Text>Description: </Text>
          <View style={{height: 30}}></View>
          <ScrollView>
            <Text style={styles.descriptionText}>{"Hello"}</Text>
          </ScrollView>
        </View>
        
      </View>
    );
  }
}

class DetailSectionText extends Component {
  render() {
    return(
      <View style={detailSectionTextStyles.container}>
        <Text style={[detailSectionTextStyles.detailSectionText, {flex: 0.2}]}>{this.props.sectionTitle}</Text>
        <Text style={[detailSectionTextStyles.detailSectionText, {flex: 0.05}]}> : </Text>
        <Text style={[detailSectionTextStyles.detailSectionText, {flex: 0.75}]}>{this.props.sectionContent}</Text>
      </View>
    );
  }
}

const headerStyles = StyleSheet.create({
  backButton: {
    paddingLeft: 10,
  },
  rentButton: {
    width: 80,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C3879',
    borderRadius: 10,
    marginRight: 10,
  },
  rentButtonText: {
    color: '#F9F5EB',
  }
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F5EB',
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