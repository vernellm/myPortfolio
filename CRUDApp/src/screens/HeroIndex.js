import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, Button, TouchableOpacity } from 'react-native';
import NavBar from "../components/NavBar";
import { Context as HeroContext } from "../context/HeroContext";

const HeroIndex = (props) => {

    const {state, addHero} = useContext(HeroContext);

    return <View flex={1}>

        <Text style={styles.roster}>Roster</Text>
        
        <Button title="Add Hero" onPress={ () => {addHero()} }/>
        
        <FlatList 
            data = {state}
            keyExtractor={ (hero) => {return hero.id} }
            renderItem = { ({item}) => {
                return <TouchableOpacity onPress = { () => {props.navigation.navigate("Detail", {id: item.id})} }> 
                    <View style={styles.row}>
                        <Text style={styles.name}>Name: {item.Hname} | Level: {item.level} | Health: {item.currHealth}/{item.maxHealth} | Power: {item.power} ||| Gold: {item.gold}</Text>
                    </View>
                </TouchableOpacity> 
            } }
        />

        <NavBar style={styles.navbar}/>
    </View>
}

const styles = StyleSheet.create({
    row : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20, 
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: 'grey'  
    },
    name : {
        fontSize: 15
    },
    roster : {
        fontSize: 50,
        textAlign: 'center'
    },
    navbar: {
        justifyContent: 'flex-end',
    },
});

export default HeroIndex;