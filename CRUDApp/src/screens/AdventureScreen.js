import React, { useContext } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import CurrentAdventure from "../components/CurrentAdventure";
import NavBar from "../components/NavBar";
import { Context as HeroContext } from "../context/HeroContext";

// id: id, Hname: uName, maxHealth: maxHealth, currHealth: currHealth, level: level, power: power, gold: gold

const AdventureScreen = (props) => {

    const {state, advResult} = useContext(HeroContext);

    const theAdventure = generateAdventure();

    const message = {id: "Good job on your adventure! You gained 20 gold but you lost 1 health.",
        gId: "You failed on your adventure! You gained 5 gold but you lost 3 health."};

    return <View flex={1}>
        <Text style={styles.header}>Current Adventure</Text>

        <CurrentAdventure 
            name={theAdventure.name}
            chalLevel={theAdventure.challengeLevel}
        />

        <Text style={styles.text}>Who do you send?</Text>

        <FlatList 
            data = {state}
            keyExtractor={ (hero) => {return hero.id} }
            renderItem = { ({item}) => {
                return <TouchableOpacity onPress = { () => {
                    if (item.level >= theAdventure.challengeLevel) {
                        advResult(item.id, item.Hname, item.maxHealth, item.currHealth + (-1), item.level, item.power, item.gold + 20)
                        props.navigation.navigate("Detail", {message: message.id, id: item.id})
                    }
                    else {
                        advResult(item.id, item.Hname, item.maxHealth, item.currHealth + (-1 * 3), item.level, item.power, item.gold + 5)
                        props.navigation.navigate("Detail", {message: message.gId, id: item.id})
                    }
                } }> 
                    <View style={styles.row}>
                        <Text style={styles.name}>Name: {item.Hname} | Level: {item.level} | Health: {item.currHealth}/{item.maxHealth} | Power: {item.power} ||| Gold: {item.gold}</Text>
                    </View>
                </TouchableOpacity> 
            } }
        />

        <NavBar style={styles.navbar}/>
    </View>
}

/************************
 *                      *
 * ADVENTURE GENERATOR  *
 *                      *
 ************************/

 const generateAdventure = () => {
    let adventure = {};

    const adjectives = ["spooky", "scary", "dire", "awful", "miserable", "dangerous", "stinky",
        "tasteless", "irritating", "tedious", "annoying", "hopeless", "mysterious"]
    const locations = ["forest", "depths", "grove", "fields", "university", "back alley", "animal den"]
    const qualifiers = ["no hope", "no return", "hatred", "evil", "sorrow", "heartbreak"]
    const cities = ["Royal Woods", "The Loud House", "Flip's Food & Fuel", "Great Lakes City", "Great Lakes City Library", "Great Lakes City Zoo"]

    adventure.name = cities[Math.floor(Math.random() * cities.length)] + 
        ": The " + adjectives[Math.floor(Math.random() * adjectives. length)] + " " +
        locations[Math.floor(Math.random() * locations.length)] + " of " + 
        qualifiers[Math.floor(Math.random() * qualifiers.length)]

    adventure.challengeLevel = Math.floor(Math.random() * 10) + 1;

    return adventure;
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
    text : {
        fontSize: 25
    },
    name : {
        fontSize: 15
    },
    header : {
        fontSize: 30,
        textAlign: 'center'
    },
    navbar: {
        justifyContent: 'flex-end',
    },
});

export default AdventureScreen;