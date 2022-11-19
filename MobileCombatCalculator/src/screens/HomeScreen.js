import React from 'react';
import { Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  return <Text style={styles.text}> My name is Vernell Mangum! The most exciting thing I did over the Summer is relax, which is something I have not done in ages! I dont have a favortie app but I do have a favorite type of app, which are productivity apps. They just make doing tasks easier or provide fuctionality that the OS otherwise does not provide! </Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
