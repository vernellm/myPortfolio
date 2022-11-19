import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { withNavigation } from "react-navigation";

const NavBar = (props) => {
    return <View style={styles.row}>
        <TouchableOpacity onPress={ () => {props.navigation.navigate("Roster")} }>
            <Text style={styles.text}>Roster</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => {props.navigation.navigate("Adventure")} }>
            <Text style={styles.text}>Adventures</Text>
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    row : {
        flexDirection: 'row',
        justifyContent: 'space-evenly', 
    },
    text : {
        fontSize: 20,
        borderWidth: 1,
        paddingHorizontal: 61,
        paddingBottom: 40,

    }
});

export default withNavigation(NavBar);