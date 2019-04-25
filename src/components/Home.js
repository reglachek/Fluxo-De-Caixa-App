import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableHighlight } from 'react-native';
import firebase from 'react-native-firebase'

export default class Home extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        saldoGeral: '...'
    };
  }

  static navigationOptions = {
    header: null
  }

  handleCadastrar = () => this.props.navigation.navigate('Cadastro')

  handleLogIn = () => this.props.navigation.navigate('Login')

  componentDidMount() {
    firebase.database().ref('users').on('value', usersSnapshot => {
        let saldoGeral = 0

        usersSnapshot.forEach(users => {
            users.forEach(userSaldo => saldoGeral += userSaldo.val())
        })

        this.setState({ saldoGeral })
    })
  }

  render() {
    const imgBg = require('../assets/fundo.jpg')

    return (
      <ImageBackground source={imgBg} style={styles.bg}>
        <View style={styles.container}>
            <Text style={styles.title}>Fluxo de Caixa</Text>

            <View style={styles.buttonArea}>
                <TouchableHighlight 
                    underlayColor='#CCCCCC' 
                    style={styles.button} 
                    onPress={this.handleCadastrar}
                >
                    <Text style={styles.btnText}>Cadastrar</Text>
                </TouchableHighlight>

                <TouchableHighlight 
                    underlayColor='#CCCCCC' 
                    style={styles.button} 
                    onPress={this.handleLogIn}
                >
                    <Text style={styles.btnText}>Log In</Text>
                </TouchableHighlight>
            </View>
            
            <View style={styles.numerosArea}>
                <Text>No momento administramos:</Text>
                <Text>R$ {this.state.saldoGeral}</Text>
            </View>
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
    },
    buttonArea: {
        marginTop: 30
    },
    button: {
        backgroundColor: '#bfb300',
        margin: 10,
        height: 40,
        width: 200,
        justifyContent: 'center'
    },
    numerosArea: {
        height: 80
    },
    btnText: {
        color: '#FFFFFF',
        textAlign: 'center'
    },
})
