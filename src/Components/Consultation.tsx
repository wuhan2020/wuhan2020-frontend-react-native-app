import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import WebViewModal from './Webview';
import H3 from './H3';
import ContactList from './ContactList';
import moment from 'moment';

type PropTypes = {
  item: ConsultationType;
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

function Consultation({ item }: PropTypes) {
  const [visible, setVisible] = useState(false);

  return (
    <Card title={`${item.name}`}>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>发布于{moment(item.date).fromNow()}</Text>
      </View>
      <ContactList data={item.contacts} />
      <View>
        <H3 title="内容" />
        <Text style={{ marginVertical: 5 }}>{item.remark}</Text>
      </View>

      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
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

export default Consultation;
