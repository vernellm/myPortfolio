import { createAppContainer } from "react-navigation"; 
import { createStackNavigator } from "react-navigation-stack";
import React from "react";
import HeroIndex from "./src/screens/HeroIndex";
import HeroShow from "./src/screens/HeroShow";
import AdventureScreen from "./src/screens/AdventureScreen";
import { Provider as HeroProvider } from "./src/context/HeroContext";

const navigatior = createStackNavigator({
  Roster: HeroIndex,
  Detail: HeroShow,
  Adventure: AdventureScreen
},
  {
    initialRouteName: "Roster",
    defaultNavigationOptions: {
      title: "A Hero's Adventure Game?"
    }

  });

const App = createAppContainer(navigatior);

export default () => {
  return <HeroProvider>
    <App />
  </HeroProvider>
}
