import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import firebase from 'react-native-firebase'

export default class PreLoad extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static getDerivedStateFromProps(props) {
    if(firebase.auth().currentUser) {
      props.navigation.navigate('Interna')
    } else {
      props.navigation.navigate('Home')
    }

    return null
  }

  static navigationOptions = {
    header: null
  }

  render() {
    const imgBg = require('../assets/fundo.jpg')

    return (
      <ImageBackground source={imgBg} style={styles.bg}>
        <View style={styles.container}>
            <Text style={styles.title}>Fluxo de Caixa</Text>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: null
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
        backgroundColor: 'transparent'
    }
})
