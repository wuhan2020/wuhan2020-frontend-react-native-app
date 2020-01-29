import * as React from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { Text } from 'react-native';

function SettingScreen() {
  return (
    <StatusBarSafeLayout>
      <Text>Here will list the settings</Text>
    </StatusBarSafeLayout>
  );
}

SettingScreen.navigationOptions = {
  title: 'Settings',
};

export default SettingScreen;
