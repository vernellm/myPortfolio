import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const CombatOptions = (props) => {
  return (
    <View style={styles.view}>
        <TouchableOpacity onPress={props.attackPress}>
            <Image style={styles.image} source={require('../../assets/attackIcon.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.firePress}>
            <Image style={styles.image} source={require('../../assets/fireIcon.png')}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={props.healPress}>
            <Image style={styles.image} source={require('../../assets/healIcon.png')}/>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },

  view: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 50,
  },

  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width : 50,
    height : 50,
  },

});

export default CombatOptions;