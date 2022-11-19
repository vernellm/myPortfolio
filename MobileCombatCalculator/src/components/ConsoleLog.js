import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ConsoleLog = (props) => {
  return (
    <View style={styles.view}>
        <Text style={styles.text}>{props.playerText}</Text>

        <Text style={styles.text}>{props.monsterText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    padding: 15,
  },

  view: {
    borderWidth: 3,
    padding: 20,
    marginTop: 70,
  },
});

export default ConsoleLog;