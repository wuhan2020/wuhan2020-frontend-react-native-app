import * as React from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';

import { useNavigation } from 'react-navigation-hooks';

import { getToken } from '../utils';
import { Text, Button } from 'react-native';

const secret = '2vekyeam6jsulh46ih63uxn5vsnpqokk';

const HomeScreen = () => {
  const navigation = useNavigation();
  return (
    <StatusBarSafeLayout>
      <Text>{getToken(secret)}</Text>
      <Button
        title="To Settings"
        onPress={() => {
          navigation.navigate('Setting');
        }}
      />
    </StatusBarSafeLayout>
  );
};

HomeScreen.navigationOptions = { title: 'Welcome' };

export default HomeScreen;
