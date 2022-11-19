import React from 'react';
import { Text, StyleSheet, View, Image, Button } from 'react-native';
import { clickProps } from 'react-native-web/dist/cjs/modules/forwardedProps';

const WelcomeScreen = (props) => {
  return (
    <View style={styles.view}>
        <Text style={styles.text}>Welcome to The Gauntlet!!!!</Text>
        <Image style={styles.image} source={require('../../assets/swordAndShield.jpg')}/>
        <Button 
            title={"Enter Here...at your own risk!"}
            onPress = {() => {props.navigation.navigate("Character")}}
        />
    </View>);
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    textAlign: 'center',
  },

  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width : 375,
    height : 375
  },

  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
});

export default WelcomeScreen;