import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './Layouts/Home';
import SettingScreen from './Layouts/Settings';
import DataProvider from './context/Data';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Setting: { screen: SettingScreen },
});

const AppWithNavigation = createAppContainer(MainNavigator);

const App = () => (
  <DataProvider>
    <AppWithNavigation />
  </DataProvider>
);

export default App;
