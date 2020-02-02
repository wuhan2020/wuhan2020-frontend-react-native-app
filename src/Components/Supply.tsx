import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { colors } from '../Theme';

type PropTypes = {
  item: SupplyType;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '500',
  },
  subtitle: {
    fontSize: 12,
    width: '75%',
    color: colors.secondary,
  },
  container: {
    marginVertical: 4,
  },
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Hospital({ item }: PropTypes) {
  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.title}>
          {Number(item.count) > 1 ? item.count : '不限'}
        </Text>
      </View>
      <Text style={styles.subtitle}>{item.remark}</Text>
    </View>
  );
}

export default Hospital;
