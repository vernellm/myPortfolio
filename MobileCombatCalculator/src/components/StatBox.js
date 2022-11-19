import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const StatBox = (props) => {
    return (
      <View style={styles.view}>
        <Text style={styles.text}>{props.title}</Text>
        <Text style={styles.text}>{props.health}</Text>
        <Text style={styles.text}>{props.strength}</Text>
        <Text style={styles.text}>{props.magic}</Text>
      </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'center',
    textDecorationLine: 'underline',
    paddingHorizontal: 45,
  },

  view: {
    borderWidth: 2,
  },
});

export default StatBox;