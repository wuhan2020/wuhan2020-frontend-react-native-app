import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, Dimensions } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import Supply from './Supply';
import moment from 'moment';
import HospitalDetail from './HospitalDetail';
const { height } = Dimensions.get('window');
import { Hospital as HospitalType } from 'wh-data-client';

type PropTypes = {
  item: HospitalType;
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

function Hospital({ item }: PropTypes) {
  const { supplies } = item;
  const [visible, setVisible] = useState(false);
  return (
    <Card title={item.name}>
      <View style={styles.subtitleContainer}>
        <Text style={[styles.subtitle, { fontSize: 14 }]}>
          {item.city} - {item.province || ''}
        </Text>
        <Text style={styles.subtitle}>{item.district}</Text>
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
        <Button
          type="outline"
          title="查看详情"
          onPress={() => setVisible(true)}
        />
        <Modal
          animationType="fade"
          presentationStyle="formSheet"
          transparent={false}
          onDismiss={() => {
            setVisible(false);
          }}
          onRequestClose={() => {
            setVisible(false);
          }}
          visible={visible}>
          <View style={{ padding: 16, justifyContent: 'space-between' }}>
            <View style={{ height: height - 150 }}>
              <HospitalDetail item={item} />
            </View>
            <View>
              <Button
                title="关闭详情"
                onPress={() => {
                  setVisible(false);
                }}
              />
            </View>
          </View>
        </Modal>
      </View>
    </Card>
  );
}

export default Hospital;
