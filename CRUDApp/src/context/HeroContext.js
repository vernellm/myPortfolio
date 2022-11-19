import createHDataContext from "./createHDataContext";

const heroReducer = (state, action) => {
    switch (action.type){
        case 'add_hero':
            const hero = generateNewHero();
            return [...state, {
                id: Math.floor(Math.random() * 9999),
                Hname: hero.name,
                level: hero.level,
                power: hero.power,
                maxHealth: hero.maxHP,
                currHealth: hero.realHP,
                gold: hero.gold
            } ]
        case 'level_up':
            return state.map( (hero) => {
                if (hero.id === action.payload.id) {
                    return action.payload;
                }
                else {
                    return hero;
                }
            } )
        default: 
            return state;
    }
}

const addHero = (dispatch) => {
    return () => {
        dispatch( {type: 'add_hero'} )
    }
}

const levelUp = (dispatch) => {
    return (id, uName, maxHealth, currHealth, level, power, gold, callback) => {
        dispatch( {type: 'level_up', payload: {id: id, Hname: uName, maxHealth: maxHealth, currHealth: currHealth, level: level, power: power, gold: gold}} )
        callback();
    }
}

const advResult = (dispatch) => {
    return (id, uName, maxHealth, currHealth, level, power, gold,) => {
        dispatch( {type: 'level_up', payload: {id: id, Hname: uName, maxHealth: maxHealth, currHealth: currHealth, level: level, power: power, gold: gold}} )
    }
}

/*******************
 *                 *
 * HERO GENERATOR  *
 *                 *
 *******************/

const generateNewHero = () => {
    let hero = {};
    hero.level = 1;

    let firstNameList = ["Lincoln", "Lori", "Leni", "Luna", "Luan", "Lynn", "Lucy", "Lana", "Lola", "Lisa", "Lily", "Rita"]

    let lastName = "Loud"

    hero.name = firstNameList[Math.floor(Math.random() * firstNameList.length)] + " " + lastName

    hero.gold = 100;
    hero.power = 5;
    hero.maxHP = 10;
    hero.realHP = 10;
    return hero;
}

export const {Context, Provider} = createHDataContext(heroReducer, {addHero: addHero, levelUp: levelUp, advResult: advResult}, []);