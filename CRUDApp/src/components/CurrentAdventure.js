import React from "react";
import { View, Text, StyleSheet } from 'react-native';

const CurrentAdventure = (props) => {

    return <View>
        <Text style={styles.title}>{props.name}</Text>
        <Text style={styles.text}>Challenge Level: {props.chalLevel}</Text>
    </View>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 50,
        textAlign: 'center',
        paddingBottom: 2,
        borderWidth: 2.5
    },
    text: {
        fontSize: 30,
        textAlign: 'center',
        padding: 15,
    },
});

export default CurrentAdventure;