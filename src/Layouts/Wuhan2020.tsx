import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Dimensions } from 'react-native';
import { Button, ListItem, colors } from 'react-native-elements';

import HospitalLayout from './Hospital';
import LogisticLayout from './Logistic';
import DonationLayout from './Donation';
import HotelLayout from './Hotel';
import ConsultationLayout from './Consultation';
import { withNavigation } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  title: { fontSize: 20, fontWeight: '600' },
});

function ResourceList({ navigation }) {
  return (
    <View>
      <ListItem
        titleStyle={styles.title}
        key="hospital"
        title="医院"
        onPress={() => {
          navigation.navigate({ routeName: 'Hospital' });
        }}
        chevron
        bottomDivider
      />
      <ListItem
        titleStyle={styles.title}
        key="logistic"
        title="物流"
        onPress={() => {
          navigation.navigate({ routeName: 'Logistic' });
        }}
        bottomDivider
        chevron
      />
      <ListItem
        titleStyle={styles.title}
        key="donation"
        title="捐款"
        onPress={() => {
          navigation.navigate({ routeName: 'Donation' });
        }}
        bottomDivider
        chevron
      />
      <ListItem
        titleStyle={styles.title}
        key="consultation"
        title="义诊"
        onPress={() => {
          navigation.navigate({ routeName: 'Consultation' });
        }}
        bottomDivider
        chevron
      />
      <ListItem
        titleStyle={styles.title}
        key="hotel"
        title="指定接待酒店"
        onPress={() => {
          navigation.navigate({ routeName: 'Hotel' });
        }}
        chevron
      />
    </View>
  );
}

ResourceList.navigationOptions = {
  title: '物资分类',
};

const MyStack = createStackNavigator(
  {
    ResourceList: withNavigation(ResourceList),
    Hospital: HospitalLayout,
    Logistic: LogisticLayout,
    Donation: DonationLayout,
    Consultation: ConsultationLayout,
    Hotel: HotelLayout,
  },
  {
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

MyStack.navigationOptions = {
  title: 'Wuhan2020',
};

export default MyStack;
