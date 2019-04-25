import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class HistoricoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { type, value } = this.props.data
    const bg = type == 'despesa' ? styles.despesaBackGround : styles.receitaBackground

    return (
      <View style={[styles.area, bg]}>
        <Text>{type}</Text>
        <Text>R$ {value}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  area: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: 40,
  },
  despesaBackGround: {
    backgroundColor: '#FF0000'
  },
  receitaBackground: {
    backgroundColor: '#00FF00'
  }
})
