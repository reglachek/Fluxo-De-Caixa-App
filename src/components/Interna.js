import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import firebase from 'react-native-firebase';

import HistoricoItem from './HistoricoItem'

export default class Interna extends Component {
  constructor(props) {
    super(props);
    this.state = {
      saldo: 0,
      historico: []
    };
  }

  static navigationOptions = {
    title: 'Interna',
    header: null
  }

  handleAddReceita = () => this.props.navigation.navigate('AddReceita')
  handleAddDespesa = () => this.props.navigation.navigate('AddDespesa')
  handleLogOut = () => {
    firebase.auth().signOut()

    this.props.navigation.navigate('Home')
  }

  componentDidMount() {
    const user = firebase.auth().currentUser

    if(user) {
      firebase.database().ref(`users/${user.uid}`).on('value', snapshot => {
        this.setState({ saldo: snapshot.val().saldo })
      })

      firebase.database().ref(`historico/${user.uid}`).on('value', snapshot => {
        let historico = []

        snapshot.forEach(childItem => {
          historico.push({
            key: childItem.key,
            type: childItem.val().type,
            value: childItem.val().value
          })
        })

        this.setState({ historico })
      })
    } else {
      props.navigation.navigate('Home')
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.saldoArea}>
          <Text style={styles.saldo}>Saldo: R$ {this.state.saldo}</Text>
        </View>

        <FlatList 
          data={this.state.historico}
          renderItem={({item}) => <HistoricoItem data={item} />}
          keyExtractor={item => `item-key-${item.key}`}
          style={styles.historico}
        />

        <View style={styles.botoesArea}>
          <Button title='Adicionar Receita' onPress={this.handleAddReceita} />
          <Button title='Adicionar Despesa' onPress={this.handleAddDespesa} />
          <Button title='Sair' onPress={this.handleLogOut} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  saldoArea: {
    paddingVertical: 20,
    backgroundColor: '#DDDDDD'
  },
  saldo: {
    textAlign: 'center',
    fontSize: 25,
  },
  historico: {
    flex: 1
  },
  botoesArea: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: '#DDDDDD',
  }
})
