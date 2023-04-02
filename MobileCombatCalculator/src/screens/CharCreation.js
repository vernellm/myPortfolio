import React, { useReducer } from 'react';
import { useState } from 'react';
import { Text, StyleSheet, View, Image, Button } from 'react-native';
import Attribute from "../components/Attribute";
import StatBox from "../components/StatBox";
import ConsoleLog from "../components/ConsoleLog";
import CombatOptions from '../components/CombatOptions';

// REDUCER
const reducer  = (state, action) => {
  // state looks like: {strength: number, health: number, magic:number}
  // action looks like: {type: "strength" || "health" || "magic" , payload: 20 || -20}
  switch(action.type) {
      case 'change_strength':
        return state.strength + action.payload < 0 || state.points <= 0 || state.points > 15
          ? state
          : {...state, strength: state.strength + action.payload}
      case 'change_health':
        return state.health + action.payload < 0 || state.points <= 0 || state.points > 15
          ? state
          : {...state, health: state.health + action.payload}
      case 'change_magic':
        return state.magic + action.payload < 0 || state.points <= 0 || state.points > 15
          ? state
          : {...state, magic: state.magic + action.payload}
      case 'change_points':
        return state.points <= 0 || state.points > 15 || (state.strength || state.health || state.magic) < 1
          ? {...state, points: 15}  
          : {...state, points: state.points + action.payload}
      case 'attack':
        return state.mHeal + action.payload < 0
          ? {...state, mHeal: 0} 
          : {...state, mHeal: state.mHeal + action.payload, health: state.health + (-1 * 5)}
      case 'fire':
        return state.mHeal + action.payload <= 0
        ? {...state, mHeal: 0} 
        : {...state, mHeal: state.mHeal / action.payload, health: state.health + (-1 * 5)}
      case 'heal': 
        return state.health + action.payload >= 100
        ? {...state, health: 100}
        : {...state, health: state.health + action.payload}
      default:
          return state;
  };
}

// GAME STATES
const STAT_SCREEN_STATE = "characterCreation";
const COMBAT_SCREEN_STATE = "fighting"; 


const CharCreation = () => {

  // COMBAT PHRASES
  const FIRE_P = "Fire Style: Fire Ball Justsu! You've cut the monster's health in half!";
  const MAGIC_P = "Your magic allows you to heal yourself! You've gained +10 health!";

  const M_A_REBUTTLE = "The Alien counter attacks! Dealing 5 damage!";
  const M_F_REBUTTLE = "The Alien is somewhat heat resistent, he responds by chuckling and dealing 5 damage.";
  const M_M_REBUTTLE = "The Alien is questioning why you didn't attack. He stares at you in confusion..."; 

  const DEFAULT_PLAYER = "A zesty alien creature wants to duel!";
  const DEFAULT_MONSTER = "Foolish human, prepare for your demise!";

  const END_GAME_P = "You have defeated the zesty alien creature!!"
  const END_GAME_M = "I'll get you next time!!";

  const PLAYER_L = "The zesty alien creature has defeated you!"
  const MONSTER_W = "MUAHAHAHAHAHAHAHAHA!!!"

  const [attackLog, setAttackLog] = useState(DEFAULT_PLAYER);
  const [rebutLog, setRebutLog] = useState(DEFAULT_MONSTER);
  
  const [gameState, setGameState] = useState(STAT_SCREEN_STATE);
  var whatToDisplay;
  
  const [state, dispatch] = useReducer(reducer, {strength: 0, health: 100, magic:0, points:15, mStre: 5, mHeal: 100, mMagi: 5});

  const {strength, health, magic, points, mStre, mHeal, mMagi} = state;

  const ATTACK_P = `You used the sword of death! You've dealt ${strength} damage!`;

  switch(gameState) {
    case STAT_SCREEN_STATE:
      whatToDisplay = 
        <View style={styles.view}>
          <Text style={styles.text}> Choose Your Attributes! </Text>

          <Attribute title={`STRENGTH: ${strength}`}
            onIncrease = { () => { 
              dispatch( {type: "change_strength", payload: 1} ); 
              dispatch( {type: "change_points", payload: -1 * 1} );
            } }
            onDecrease = { () => { 
              dispatch( {type: "change_strength", payload: -1 * 1} );
              dispatch( {type: "change_points", payload: 1} );
            } }
          />
          <Attribute title={`HEALTH: ${health}`}
            onIncrease = {() => { 
              dispatch( {type: "change_health", payload: 1} ); 
              dispatch( {type: "change_points", payload: -1 * 1} );
            }}
            onDecrease = {() => { 
              dispatch( {type: "change_health", payload: -1 * 1} ); 
              dispatch( {type: "change_points", payload: 1} );
            }}
          />
          <Attribute title={`MAGIC: ${magic}`}
            onIncrease = {() => { 
              dispatch( {type: "change_magic", payload: 1} ); 
              dispatch( {type: "change_points", payload: -1 * 1} );
            }}
            onDecrease = {() => { 
              dispatch( {type: "change_magic", payload: -1 * 1} );
              dispatch( {type: "change_points", payload: 1} );
            }}
          />

          <Text style={styles.points}>Points Remaining: {points}</Text>

          {state.points == 0 
            ? <Button style={styles.button} 
                title={"Nice job... Now we FIGHT!!!"} 
                onPress = {() => {setGameState(COMBAT_SCREEN_STATE);}}/> 
            : null}
        </View>
      break;
    case COMBAT_SCREEN_STATE:
      whatToDisplay = 
        <View style={styles.view}>
          <View style={styles.view1}>
            <StatBox style={styles.statbox}
              title={"Monster Stats"}
              health={`Health: ${mHeal}`}
              strength={`Strength: ${mStre}`}
              magic={`Magic: ${mMagi}`}
            />
            <StatBox style={styles.statbox}
              title={"Player Stats"}
              health={`Health: ${health}`}
              strength={`Strength: ${strength}`}
              magic={`Magic: ${magic}`}
            />
          </View>

          {state.mHeal > 0 & state.health > 0
            ? <View> 
                <Image style={styles.image} source={require('../../assets/alienWizard.png')}/>
                <Text style={styles.monText}> Zesty Alien Creature! </Text>
                <ConsoleLog
                  playerText={attackLog}
                  monsterText={rebutLog}
                />
              </View>
            : state.health < 1 & state.mHeal > 0
            ? <View> 
                <Image style={styles.image} source={require('../../assets/alienWizard.png')}/>
                <Text style={styles.monText}> Zesty Alien Creature! </Text>
                <ConsoleLog
                  playerText={PLAYER_L}
                  monsterText={MONSTER_W}
                />
              </View> 
            : state.mHeal < 1 & state.health > 0
            ?  <View> 
                <Image style={styles.image} source={require('../../assets/monsterDead.png')}/>
                <Text style={styles.monText}> The Zesty Alien Creature Has Perished!! </Text>
                <ConsoleLog
                  playerText={END_GAME_P}
                  monsterText={END_GAME_M}
                />
              </View>
            : null
              
          }


          <CombatOptions 
            attackPress={() => {
              dispatch( {type: "attack", payload: -1 * state.strength} );
              setAttackLog(ATTACK_P);
              setRebutLog(M_A_REBUTTLE);
            }}
            firePress={() => {
              dispatch( {type: "fire", payload: 2} );
              setAttackLog(FIRE_P);
              setRebutLog(M_F_REBUTTLE);
            }}
            healPress={() => {
              dispatch( {type: "heal", payload: 10} );
              setAttackLog(MAGIC_P);
              setRebutLog(M_M_REBUTTLE);
            }}
          />


        </View>
      break;
  }
  
  return whatToDisplay
};

const styles = StyleSheet.create({
  text: {
    fontSize: 50,
    textAlign: 'center',
  },

  button: {
    paddingBottom: 50,
  },

  monText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'purple',
  },

  image: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width : 150,
    height : 150,
  },

  points: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
  },

  view: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  view1: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
});

export default CharCreation;