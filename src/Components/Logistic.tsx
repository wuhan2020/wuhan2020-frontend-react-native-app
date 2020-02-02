import React, {useState} from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import moment from 'moment';
import ContactList from './ContactList';
import Remark from './Remark';
import WebViewModal from './Webview';

type PropTypes = {
  item: LogisticType;
  onClick: (logistic: LogisticType) => void;
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

function Logistic({ item, onClick }: PropTypes) {
  const [visible, setVisible] = useState(false);

  return (
    <Card title={`${item.name} - ${item.area}`}>
      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitle}>发布于{moment(item.date).fromNow()}</Text>
      </View>
      <ContactList data={item.contacts} />
      <Remark remark={item.remark} />
      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <Button
          type="outline"
          title="查看详情"
          onPress={() => setVisible(true)}
        />
        <WebViewModal
          uri={item.url}
          title={`${item.name} - ${item.area}`}
          visible={visible}
          onClose={() => setVisible(false)}
        />
      </View>
    </Card>
  );
}

export default Logistic;
