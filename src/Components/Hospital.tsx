import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import Supply from './Supply';
import moment from 'moment';

type PropTypes = {
  item: HospitalType;
  onClick: (hospital: HospitalType) => void;
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 12,
    color: colors.secondary,
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supplyContainer: {
    paddingVertical: 5,
  },
  supplyInfo: {
    fontSize: 15,
    fontWeight: '600',
  },
});

function Hospital({ item, onClick }: PropTypes) {
  const { supplies } = item;
  return (
    <Card title={item.hospital}>
      <View style={styles.subtitleContainer}>
        <Text style={[styles.subtitle, { fontSize: 14 }]}>{item.city}</Text>
        <Text style={styles.subtitle}>
          发布于{moment(item.createdAt).fromNow()}
        </Text>
      </View>
      <View style={styles.supplyContainer}>
        <View>
          {supplies.slice(0, 3).map(supply => (
            <Supply item={supply} />
          ))}
          {supplies.length - 3 > 0 ? (
            <Text style={styles.supplyInfo}>
              +{supplies.length - 3}项其他物资
            </Text>
          ) : null}
        </View>
      </View>
      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <Button type="outline" title="查看详情" onPress={() => onClick(item)} />
      </View>
    </Card>
  );
}

export default Hospital;
