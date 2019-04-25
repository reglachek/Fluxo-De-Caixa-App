import React, { Component } from 'react' 
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import firebase from 'react-native-firebase';

export default class AddReceita extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: ''
    };
  }

  static navigationOptions = {
    title: 'Adicionar Receita',
  }

  componentDidMount() {
    console.log(this.props)
  }

  handleInputValue = value => this.setState({ value })

  add = () => {
    const value = parseInt(this.state.value)

    if(value) {
      const userUid = firebase.auth().currentUser.uid
      const pathHistorico = firebase.database().ref('historico').child(userUid)
      const key = pathHistorico.push().key

      // Adicionando no histórico
      pathHistorico.child(key).set({
        type: 'receita',
        value
      },
      erro => {
        if(erro) {
          alert(erro.code)
        } else {
          const pathUser = firebase.database().ref(`users/${userUid}`)

          pathUser.once('value')
          .then(snapshot => {
            // Adicionando o novo valor do saldo
            pathUser.set({ saldo: snapshot.val().saldo + value }, erro => {
              if(erro) {
                alert(erro.code)
              } else {
                this.setState({ value: '' })

                this.props.navigation.goBack()
              }
            })
          })
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Quanto você quer adicionar ?</Text>

        <TextInput 
          style={styles.input}
          keyboardType='numeric'
          autoFocus
          value={this.state.value}
          onChangeText={this.handleInputValue}
        />

        <Button title='Adicionar' onPress={this.add} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  input: {
    height: 40,
    backgroundColor: '#DDDDDD',
    marginTop: 20,
  }
})
