import * as React from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import MobilityDataContextProvider, {
  MobilityDataContext,
} from '../context/MobilityData';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  SectionList,
} from 'react-native';
import { useState } from 'react';
import { ListItem, Button, Card } from 'react-native-elements';
import WebView from 'react-native-webview';
import { groupBy } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';
import { formatTime } from '../utils';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  constainer: {},
  header: {
    padding: 16,
    fontSize: 22,
    fontWeight: '800',
  },
  subheader: {
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    color: '#717171',
    paddingVertical: 8,
  },
});

type EntryPropsType = {
  sourceId: string;
  url: string;
  content: string;
  sendTime: string;
  fromName: string;
};

function Entry(props: EntryPropsType) {
  const [visible, setVisible] = useState(false);
  const [loadingWebview, setLoading] = useState(true);
  return (
    <View>
      <ListItem
        onPress={() => setVisible(true)}
        Component={TouchableOpacity}
        title={
          <Text style={{ fontWeight: '800' }}>
            {props.content.slice(0, 50)}
          </Text>
        }
        subtitle={
          <View
            style={{
              paddingTop: 4,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{ fontSize: 12 }}>时间： {props.sendTime}</Text>
            <Text style={{ fontSize: 12 }}>来源： {props.fromName}</Text>
          </View>
        }
        rightIcon={{ name: 'unfold-more' }}
      />
      <Modal
        animationType="fade"
        presentationStyle="pageSheet"
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}>
        <View style={{ padding: 16, justifyContent: 'space-between' }}>
          <View style={{ height: height - 150 }}>
            {loadingWebview ? (
              <ActivityIndicator size="large" color="red" />
            ) : null}
            <WebView
              onLoad={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{ uri: props.url }}
            />
          </View>
          <View>
            <Button
              title="关闭预览"
              onPress={() => {
                setVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const typeMap = {
  1: { label: '飞机' },
  2: { label: '火车' },
  3: { label: '地铁' },
  4: { label: '长途客车/大巴' },
  5: { label: '公交车' },
  6: { label: '出租车' },
  7: { label: '轮船' },
  8: { label: '其他' },
};

const toSection = (data = []) => {
  const grouped = groupBy(data, 't_date');

  let rst = [];

  Object.keys(grouped).forEach(key => {
    rst = rst.concat({
      title: key,
      data: grouped[key],
    });
  });

  return rst;
};

type EntryType = {
  id: number;
  t_date: string;
  t_start: string;
  t_end: string;
  t_type: number;
  t_no: string;
  t_memo: string;
  t_no_sub: string;
  t_pos_start: string;
  t_pos_end: string;
  source: string;
  who: string;
  verified: number;
  created_at: string;
  updated_at: string;
};

function MobilityScreen() {
  const { data, loading } = React.useContext(MobilityDataContext);
  const [selection, setSelection] = useState(null);
  const [loadingWebview, setLoading] = useState(true);

  function keyExtractor(item: EntryType) {
    return String(item.id);
  }

  function renderItem({ item }: { item: EntryType }) {
    return (
      <View>
        <ListItem
          onPress={() => setSelection(item)}
          title={
            <Text
              style={{
                fontWeight: '800',
              }}>{`${item.t_pos_start} - ${item.t_pos_end}`}</Text>
          }
          subtitle={
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <Text style={{ fontSize: 12 }}>{item.t_no}</Text>
                <Text style={{ fontSize: 12 }}>{item.who}</Text>
              </View>
              {Boolean(item.t_memo) && (
                <Text style={{ color: '#717171' }}>({item.t_memo})</Text>
              )}
            </View>
          }
          leftAvatar={
            <View style={{ width: 50 }}>
              <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                {typeMap[item.t_type].label}
              </Text>
            </View>
          }
          rightIcon={{ name: 'unfold-more' }}
        />
      </View>
    );
  }

  return (
    <StatusBarSafeLayout>
      <View style={styles.constainer}>
        <SectionList
          refreshing={loading}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          sections={toSection(data)}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ backgroundColor: '#eee' }}>
              <Text style={styles.subheader}>{title}</Text>
            </View>
          )}
          ListEmptyComponent={<ActivityIndicator size="large" />}
          ListHeaderComponent={
            <Text style={styles.header}>确诊患者相同行程查询</Text>
          }
        />
      </View>

      {selection && (
        <Modal
          animationType="fade"
          presentationStyle="pageSheet"
          visible={selection !== null}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{ padding: 16, justifyContent: 'space-between' }}>
            <View style={{ height: height - 150 }}>
              <Text
                style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 20 }}>
                {`${selection.t_pos_start} - ${selection.t_pos_end}`}
              </Text>
              {loadingWebview ? (
                <ActivityIndicator size="large" color="red" />
              ) : null}
              <WebView
                onLoad={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
                source={{ uri: selection.source }}
              />
            </View>

            <View>
              <Button
                title="关闭预览"
                onPress={() => {
                  setSelection(null);
                  setLoading(true);
                }}
              />
            </View>
          </View>
        </Modal>
      )}
    </StatusBarSafeLayout>
  );
}

MobilityScreen.navigationOptions = {
  title: '同程查询',
};

const WithProvider = () => (
  <MobilityDataContextProvider>
    <MobilityScreen />
  </MobilityDataContextProvider>
);

export default WithProvider;
