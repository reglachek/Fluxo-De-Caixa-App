import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        email: '',
        password: '',
        isLoading: false,
        signInMessage: ''
      };
    }

    static navigationOptions = {
      title: 'Login',
      headerStyle: {
        backgroundColor: '#FFFF00'
      },
      headerTintColor: '#000000'
    }

    handleInputEmail = email => this.setState({ email }) 
    handleInputPassword = password => this.setState({ password })

    handleSignIn = () => {
      const { email, password } = this.state

      if(email, password) {
        this.setState({ isLoading: true })

        firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(erro => this.setState({ isLoading: false, signInMessage: erro.code }))
      } else {
        alert('Preencha todos os campos')
      }
    }

    componentDidMount() {
      if(firebase.auth().currentUser) {
        firebase.auth().signOut()
      }
      
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.props.navigation.navigate('Interna')

          this.setState({ isLoading: false })
        } 
      })
    }

    render() {
      const { isLoading, signInMessage } = this.state

      return (
          <View style={styles.container}>
              <Text>E-mail</Text>
              <TextInput 
                value={this.state.email}
                onChangeText={this.handleInputEmail}
                style={styles.input}
              />

              <Text>Password</Text>
              <TextInput 
                value={this.state.password}
                onChangeText={this.handleInputPassword}
                style={styles.input}
                secureTextEntry
              />

              {isLoading && <ActivityIndicator color='#FFFF00' size='large' />}
              {!isLoading && signInMessage != ''  && (
                <View>
                    <Button title='Sign Up' onPress={this.handleSignIn} />
                    <Text>{signInMessage}</Text> 
                </View>   
              )}
              {!isLoading && signInMessage == '' && <Button title='Sign In' onPress={this.handleSignIn} />}
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    justifyContent: 'center'
  },
  input: {
    height: 40,
    padding: 5,
    marginBottom: 10,
    backgroundColor: '#CCCCCC'
  }
})
