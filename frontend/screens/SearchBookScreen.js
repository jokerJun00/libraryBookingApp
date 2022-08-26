import React, {Component} from 'react';
import { Alert, FlatList, StyleSheet, TouchableHighlight, Text, View, TextInput, TouchableNativeFeedback,} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


export default class SearchBookScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isFetching: false,
      Data: [],
      booksTitle: [],
    };
    this._load = this._load.bind(this);
  }

  _load() {
    let url ='https://www.googleapis.com/books/v1/volumes?q=' + this.state.keyword;
    this.setState({isFetching: true});
    fetch(url)
      .then(response => {
        if (!response.ok) {
          Alert.alert('Error', response.status.toString());
          throw Error('Error ' + response.status);
        }
        return response.json();
      })
      .then(response => {
        var volumeInf = response.items.map(o => ({volumeInfo: o.volumeInfo}));
        this.setState({Data: volumeInf});
        this.setState({isFetching: false});
      })
      .catch(error => {
        console.log(error);
      });
  }
  
  render() {
    return (
      <>
        <View style={{flexDirection: 'row'}}>
          <Ionicons size={55} name="search-outline"></Ionicons>
          <TextInput
            style={{flex: 2, textAlignVertical: 'center'}}
            onChangeText={
              keyword => this.setState({keyword},
              keyword? this._load : () =>{},
              
              )}
            placeholder="Enter keyword"></TextInput>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.Ripple('lightgrey', true, 60)}
            onPress={this._load}>
            <View
              style={{
                flex: 1,
                margin: 5,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'red',
              }}>
              <Text style={{textAlign: 'center', margin: 5, color: 'white'}}>
                Press to Search
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>

        <View style={styles.container}>
          <FlatList
            data={this.state.Data}
            showsVerticalScrollIndicator={true}
            refreshing={this.state.isFetching}
            onRefresh={this._load}
            renderItem={({item}) => (
              <TouchableHighlight
                underlayColor={'#cccccc'}
                onPress={() => {
                  this.props.navigation.navigate('SearchDetail', {
                    volumeInfo: item.volumeInfo,
                  });
                }}>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>{item.volumeInfo.title}</Text>
                </View>
              </TouchableHighlight>
            )}
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
  },
  item: {
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
});