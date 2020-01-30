import React from 'react';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './Layouts/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SettingScreen from './Layouts/Settings';
import NewsScreen from './Layouts/News';
import MobilityScreen from './Layouts/Mobility';
import DataProvider from './context/Data';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IconWMaterialIcons from 'react-native-vector-icons/MaterialIcons';

IconWMaterialIcons.loadFont();
Ionicons.loadFont();

const MainNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    News: NewsScreen,
    Mobility: MobilityScreen,
    Settings: SettingScreen,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = focused ? 'ios-home' : 'ios-home';
          // Sometimes we want to add badges to some icons.
          // You can check the implementation below.
          // IconComponent = HomeIconWithBadge;
        } else if (routeName === 'Settings') {
          iconName = focused ? 'ios-list-box' : 'ios-list';
        } else if (routeName === 'News') {
          iconName = 'ios-at';
        } else if (routeName === 'Mobility') {
          iconName = 'ios-train';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const AppWithNavigation = createAppContainer(MainNavigator);

const App = () => (
  <DataProvider>
    <AppWithNavigation />
  </DataProvider>
);

export default App;
