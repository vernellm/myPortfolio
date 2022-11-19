import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const HeroStats = (props) => {

    const [uName, setuName] = useState(props.initialValues.name);
    const [uLevel, setuLevel] = useState(props.initialValues.level);
    const [uHealth, setuHealth] = useState(props.initialValues.maxHealth);
    const [uCHealth, setuCHealth] = useState(props.initialValues.currHealth);
    const [uPower, setuPower] = useState(props.initialValues.power);
    const [uGold, setuGold] = useState(props.initialValues.gold);

    const levelUp = () => {
        setuName(props.initialValues.name);
        setuGold(uGold + -(10 * uLevel)); 
        setuPower(uPower + 2);
        setuHealth(uHealth + 2);
        setuCHealth(uCHealth + 2);
        setuLevel(uLevel + 1);
    }
    

    return <View flex={1}>
        <Text style={styles.Hname}>{uName}</Text>
        <Text style={styles.text}>Level: {uLevel}</Text>
        <Text style={styles.text}>Health: {uCHealth} / {uHealth}</Text>
        <Text style={styles.text}>Power: {uPower}</Text>
        <Text style={styles.text}>Gold: {uGold}</Text>

        <Button 
            title={`Level Up! (${10 * uLevel} Gold)`}
            onPress={ () => {levelUp();} }
        />

        <Button 
            title={"Save Changes"}
            onPress={ () => {props.onSubmit(uName, uHealth, uCHealth, uLevel, uPower, uGold);} }
        />
    </View>
}

const styles = StyleSheet.create({
    Hname: {
        fontSize: 50,
        textAlign: 'center',
        paddingBottom: 10,
        borderWidth: 2.5
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
    },
});

export default HeroStats;