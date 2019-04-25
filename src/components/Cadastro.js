import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import firebase from 'react-native-firebase';

export default class Cadastro extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isLoading: false,
            signUpMessage: ''
        };
    }

    static navigationOptions = {
        title: 'Cadastro',
        headerStyle: {
            backgroundColor: '#FFFF00'
        },
        headerTintColor: '#000000'
    }

    handleInputEmail = email => this.setState({ email }) 
    handleInputPassword = password => this.setState({ password })

    handleSignUp = () => {
        const { email, password } = this.state

        if(email, password) {
            this.setState({ isLoading: true })

            firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(erro => this.setState({ isLoading: false, signUpMessage: erro.code }))
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
                let signUpMessage = ''

                firebase.database().ref('users').child(user.uid).set({
                    saldo: 0
                }, error => {
                    if(error) {
                        signUpMessage = error
                    } else {
                        this.props.navigation.navigate('Interna')
                    }

                    this.setState({ isLoading: false, signUpMessage })
                })
            }
        })
    }

    render() {
        const { isLoading, signUpMessage } = this.state

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
                {!isLoading && signUpMessage != ''  && (
                    <View>
                        <Button title='Sign Up' onPress={this.handleSignUp} />
                        <Text>{signUpMessage}</Text> 
                    </View>   
                )}
                {!isLoading && signUpMessage == '' && <Button title='Sign Up' onPress={this.handleSignUp} />}
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
