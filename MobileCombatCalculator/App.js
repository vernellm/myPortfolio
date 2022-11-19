import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import CharCreation from "./src/screens/CharCreation";

const navigator = createStackNavigator(
  {
    Home: WelcomeScreen,
    Character: CharCreation,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
