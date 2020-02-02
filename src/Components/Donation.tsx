import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { colors } from '../Theme';
import WebViewModal from './Webview';
import H3 from './H3';

type PropTypes = {
  item: DonationType;
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

function Donation({ item }: PropTypes) {
  const [visible, setVisible] = useState(false);

  const infoSplit = item.info
    .split('\r\n')
    .concat(item.info.split('\n'))
    .map(s => s.trim())
    .filter(Boolean);

  return (
    <Card title={`${item.name}`}>
      <View>
        <H3 title="方式" />
        <Text style={{ marginVertical: 5 }}>{item.method}</Text>
      </View>
      <View>
        <H3 title="状态" />
        <Text style={{ marginVertical: 5 }}>{item.status}</Text>
      </View>
      <View>
        <H3 title="内容" />
        <View>
          {(infoSplit || []).map((line, i) => (
            <Text key={i}>{line}</Text>
          ))}
        </View>
        <Text style={{ marginVertical: 5 }}>{item.status}</Text>
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

export default Donation;
