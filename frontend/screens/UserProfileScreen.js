import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default class UserProfileScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userName: "Lim Choon Kiat",
      email: "choonkiatlim@1utar.my",
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.imageBackground}>
          <Image style={styles.image} source={require('../../assets/images/profile-picture.png')} />
        </View>

        <View style={{height: 10}}></View>
        <View style={userDetailTextStyles.divider} />
        <View style={{height: 30}}></View>

        {/* user detail section */}
        <UserDetailText title="User Name" content={this.state.userName} />
        <UserDetailText title="Email" content={this.state.email}/>
      </View>
    );
  }
}

class UserDetailText extends Component {
  render() {
    return (
      <View style={userDetailTextStyles.container}>
        <Text style={userDetailTextStyles.title}>{this.props.title}</Text>
        <Text style={userDetailTextStyles.content}>{this.props.content}</Text>
        <View style={userDetailTextStyles.divider}/>
      </View>
    );
  }
}

const userDetailTextStyles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  content: {
    fontSize: 20,
  },
  divider: {
    marginTop: 30,
    borderColor: '#EAE3D2',
    borderWidth: 1,
    height: 1,
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingLeft: 30,
    paddingRight: 30,
  },
  imageBackground: {
    width: 165,
    height: 165,
    borderRadius: 82.5,
    borderWidth: 3,
    borderColor: '#1C3879',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image:{
    width: 150,
    height: 150,
    borderRadius: 50,
  }
})