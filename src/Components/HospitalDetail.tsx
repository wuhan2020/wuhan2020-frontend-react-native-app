import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import { colors } from '../Theme';
import Supply from './Supply';
import moment from 'moment';
import H1 from './H1';
import H2 from './H2';
import { ScrollView } from 'react-native-gesture-handler';

type PropTypes = {
  item: HospitalType;
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 12,
    color: colors.secondary,
  },
  horizontalContainer: {
    paddingVertical: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    paddingVertical: 5,
  },
  supplyInfo: {
    fontSize: 15,
    fontWeight: '600',
  },
});

function HospitalDetail({ item }: PropTypes) {
  const { supplies, contacts, creator } = item;

  return (
    <ScrollView>
      <H1 title={item.hospital} />
      <View style={styles.horizontalContainer}>
        <Text style={[styles.subtitle, { fontSize: 14 }]}>{item.city}</Text>
        <Text style={styles.subtitle}>
          发布于{moment(item.createdAt).fromNow()}
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{ paddingVertical: 4 }}>
          <H2 title="联系人" />
        </View>
        <View>
          {contacts.map(contact => (
            <View style={styles.horizontalContainer}>
              <Text>{contact.name}</Text>
              <Text>电话：{contact.phone}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ paddingVertical: 4 }}>
          <H2 title="地址" />
        </View>
        <Text>{item.address}</Text>
      </View>
      <View style={styles.container}>
        <View style={{ paddingVertical: 4 }}>
          <H2 title="创建人" />
        </View>
        <Text>用户名：{creator.username}</Text>
        <Text>
          电话：{creator.mobilePhoneNumber} (
          {creator.mobilePhoneVerified ? '已验证' : '未验证'})
        </Text>
      </View>
      <View style={styles.container}>
        <View style={{ paddingVertical: 4 }}>
          <H2 title="物资清单" />
        </View>
        <View>
          {supplies.map(supply => (
            <Supply item={supply} />
          ))}
        </View>
      </View>
      <View style={styles.container}>
        <View style={{ paddingVertical: 4 }}>
          <H2 title="其他信息" />
        </View>
        <Text>{item.remark ? item.remark : '没有其他信息'}</Text>
      </View>
    </ScrollView>
  );
}

export default HospitalDetail;
