import React, { Component } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView,
  Image,
  Button,
} from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);

export default class BookListScreen extends Component { 
  constructor(props){
    super(props);
    this.state = {
      bookTitle: "Rich Dad, Poor Dad",
      bookAuthor: "Robert Kiyosaki, Sharon Lechter",
    };
  }

  render() {
    return(
      <ScrollView>
      <View style={styles.container}>
        <Image
          style={styles.img}
          source={require('../../assets/images/books-images/rich-dad-poor-dad.jpeg')}
        />
        <View style={styles.columnContainer}>
          <Text style={styles.Title}>
            {this.state.bookTitle}{'\n'}
          </Text>
          <Text style={styles.Author}>
            {this.state.bookAuthor}{'\n'}{'\n'}
          </Text>
          <View style={styles.buttons}>
            <Button 
              title="Book Detail"
              onPress={() => {
                this.props.navigation.navigate('BookDetail');
              }}
            />
          </View>
        </View>
        <Separator />
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F5EB',
    justifyContent: 'center',
    flex: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
  columnContainer: {
    flexDirection: 'column',
    paddingTop: 10,
    paddingRight: 10,
    justifyContent: 'center',
    flex: 1,
  },
  img: {
    alignSelf: 'flex-start',
    width: 140,
    height: 190,
    margin: 20,
    borderRadius: 5,
  },
  Title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  Author: {
    fontSize: 15,
  },
  buttons: {
    width: 140,
    height: 40,
    borderRadius: 15,
    paddingRight: 0,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
})

