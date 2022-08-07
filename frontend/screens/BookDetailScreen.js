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
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-date-picker';
import Dialog, { DialogTitle, DialogFooter, DialogButton, DiaglogContent, DialogContent } from 'react-native-popup-dialog';

// should use this Button for header
// import BackButton from '../Components/BackButton';

// reminder 
// 2. modify book detail section

export default class BookDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      bookTitle: "Rich Dad, Poor Dad",
      bookAuthor: "Robert Kiyosaki, Sharon Lechter",
      publisher: "Warner Business Books",
      status: "Available",
      bookDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget metus vitae leo venenatis imperdiet pellentesque a urna. Integer gravida sollicitudin risus, ut fringilla erat semper et. Mauris dictum bibendum erat, sed mattis tellus fringilla non. Duis posuere diam convallis ex ullamcorper sollicitudin. Sed rhoncus consectetur est, finibus sollicitudin enim consectetur ut. Donec rhoncus, arcu id mollis maximus, lacus risus egestas libero, ac efficitur lectus nisl et eros. Aenean ultricies augue ac luctus tincidunt. Curabitur eu euismod tortor. Aenean nunc eros, dignissim at pellentesque at, interdum ut sapien. Curabitur blandit neque at nibh placerat, quis venenatis nulla cursus. Nam sit amet vestibulum leo, sed dictum dui. Donec condimentum facilisis faucibus. Donec magna arcu, luctus nec ex ut, lacinia pulvinar lectus. Duis dui quam, tincidunt et commodo ut, tincidunt non purus.",
    }
  }

  componentDidMount() {
    this.props.navigation.setOptions({
      headerShown: true,
      headerTitle: this.state.bookTitle,
      headerLeft: () => (
        <View style={headerStyles.backButton}>
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
        >
          <Ionicons name='arrow-back-outline' size={35} color='#000'/>
        </TouchableOpacity>
      </View>
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
            sectionContent={this.state.bookTitle}
          />
          <DetailSectionText
            sectionTitle="Author" 
            sectionContent={this.state.bookAuthor}
          />
          <DetailSectionText
            sectionTitle="Publisher"
            sectionContent={this.state.publisher}
          />
          <DetailSectionText
            sectionTitle="Status"
            sectionContent={this.state.status}
          />
        </View>

        <View style={{height: 20}}></View>

        {/* Book Description Section */}
        <View style={styles.descriptionSection}>
          <Text>Description: </Text>
          <View style={{height: 30}}></View>
          <ScrollView>
            <Text style={styles.descriptionText}>{this.state.bookDescription}</Text>
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