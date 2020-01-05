import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Layouts/Home';
import SettingScreen from './Layouts/Settings';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Setting: { screen: SettingScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
