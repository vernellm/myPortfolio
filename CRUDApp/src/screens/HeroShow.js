import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from 'react-native';
import HeroStats from "../components/HeroStats";
import NavBar from "../components/NavBar";
import { Context as HeroContext } from "../context/HeroContext";

const HeroShow = (props) => {
    const { state, levelUp } = useContext(HeroContext);

    const heroID = props.navigation.getParam("id");
    const message = props.navigation.getParam("message");

    const heroDetail = state.find( (hero) => {
        return heroID === hero.id;
    } )

    return <View flex={1}>
        <HeroStats
            onSubmit={ (uName, maxHealth, currHealth, level, power, gold) => {levelUp(heroID, uName, maxHealth, currHealth, level, power, gold, () => {props.navigation.pop()} )} }
            initialValues={ {
                name: heroDetail.Hname,
                maxHealth: heroDetail.maxHealth,
                currHealth: heroDetail.currHealth,
                level: heroDetail.level,
                power: heroDetail.power,
                gold: heroDetail.gold
            } } 
        />
        {!message
            ? null
            : <View>
                <Text style={styles.text}>{message}</Text>
            </View>
        }     
        <NavBar style={styles.navbar}/>
    </View>
}

const styles = StyleSheet.create({
    navbar: {
        justifyContent: 'flex-end',
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        paddingBottom: 175,
    },
});

export default HeroShow;