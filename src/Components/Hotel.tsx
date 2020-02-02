import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import moment from 'moment';
import Address from './Address';
import WebViewModal from './Webview';
import ContactList from './ContactList';

type PropTypes = {
  item: HotelType;
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

function Hotel({ item }: PropTypes) {
  const [visible, setVisible] = useState(false);
  const title = `${item.name} (${item.city})`;

  return (
    <Card title={title}>
      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <View style={styles.subtitleContainer}>
          <Text style={[styles.subtitle, { fontSize: 14 }]}>{item.city}</Text>
          <Text style={styles.subtitle}>
            发布于{moment(item.date).fromNow()}
          </Text>
        </View>
        <ContactList data={item.contacts} />
        <Address {...item} />
        <Button
          type="outline"
          title="查看详情"
          onPress={() => setVisible(true)}
        />
        <WebViewModal
          uri={item.url}
          title={`${item.name}`}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </Card>
  );
}

export default Hotel;
