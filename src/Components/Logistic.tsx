import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import moment from 'moment';
import ContactList from './ContactList';
import Remark from './Remark';
import WebViewModal from './Webview';
import { Logistical as LogisticType } from 'wh-data-client';
import H3 from './H3';

type PropTypes = {
  item: LogisticType;
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
});

function Logistic({ item }: PropTypes) {
  const [visible, setVisible] = useState(false);

  const title = `${item.name} - (${item.from} - ${item.dest})`;
  return (
    <Card title={title}>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>发布于{moment(item.date).fromNow()}</Text>
      </View>
      <ContactList data={item.contacts} />
      <Remark remark={item.remark} />

      <View>
        <H3 title="可否载人" />
        <Text style={{ marginVertical: 5 }}>
          {item.allowPersonal ? '是' : '否'}
        </Text>
      </View>
      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <Button
          type="outline"
          title="查看详情"
          onPress={() => setVisible(true)}
        />
        <WebViewModal
          uri={item.url}
          title={title}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </Card>
  );
}

export default Logistic;
