import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';

const Attribute = (props) => {
  return (
    <View style={styles.view}>
        <TouchableOpacity onPress={props.onDecrease}>
            <Image style={styles.image} source={require('../../assets/minusSign.png')}/> 
        </TouchableOpacity>
        <Text>{props.title}</Text>
        <TouchableOpacity onPress={props.onIncrease}>
            <Image style={styles.image} source={require('../../assets/plusSign.png')}/>
        </TouchableOpacity>
    </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    alignSelf: 'center',
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

export default Attribute;