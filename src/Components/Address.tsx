import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import H3 from './H3';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
});

type PropTypes = {
  province: string;
  city: string;
  address: string;
};

function Address({ province, city, address }: PropTypes) {
  return (
    <View>
      <H3 title="地址" />
      <View style={styles.container}>
        <Text>{province || 'n/a'}</Text>
        <Text>{city || 'n/a'}</Text>
        <Text>{address || 'n/a'}</Text>
      </View>
    </View>
  );
}

export default Address;
