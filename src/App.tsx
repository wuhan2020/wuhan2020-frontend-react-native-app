import React from 'react';
import { createAppContainer } from 'react-navigation';
import HomeScreen from './Layouts/Home';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Wuhan2020Screen from './Layouts/Wuhan2020';
import AboutScreen from './Layouts/About';
import MobilityScreen from './Layouts/Mobility';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import IconWMaterialIcons from 'react-native-vector-icons/MaterialIcons';

IconWMaterialIcons.loadFont();
Ionicons.loadFont();

const MainNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Wuhan2020: Wuhan2020Screen,
    // News: NewsScreen,
    Mobility: MobilityScreen,
    About: AboutScreen,
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
        } else if (routeName === 'Wuhan2020') {
          iconName = focused ? 'ios-heart' : 'ios-heart-empty';
        } else if (routeName === 'News') {
          iconName = 'ios-at';
        } else if (routeName === 'Mobility') {
          iconName = 'ios-train';
        } else if (routeName === 'About') {
          iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    navigationOptions: {
      gesturesEnabled: false,
    },
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  },
);

const App = createAppContainer(MainNavigator);

export default App;
