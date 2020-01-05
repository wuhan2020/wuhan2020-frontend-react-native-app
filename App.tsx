global.Buffer = global.Buffer || require('buffer').Buffer;

import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Modal,
} from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import authenticator from 'otplib/authenticator';
import crypto from './crypto';

authenticator.options = { crypto };

const secret = '2vekyeam6jsulh46ih63uxn5vsnpqokk';

const token = authenticator.generate(secret);

const HomeScreen = ({ navigation }) => (
  <>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView>
      <Text>{token}</Text>
      <Button
        title="Go to Settings"
        onPress={() => {
          navigation.navigate('Setting');
        }}
      />
    </SafeAreaView>
  </>
);

HomeScreen.navigationOptions = { title: 'Welcome' };

const SettingScreen = () => {
  const [visible, toggleShow] = useState(true);
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Modal visible={visible} animationType="slide">
        <SafeAreaView>
          <View style={{ marginTop: 22 }}>
            <Text>Settings</Text>
            <Button title="close" onPress={() => toggleShow(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({});

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Setting: { screen: SettingScreen },
});

const App = createAppContainer(MainNavigator);

export default App;
