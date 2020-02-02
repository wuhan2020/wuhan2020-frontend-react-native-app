import React, { useContext, useCallback } from 'react';
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
  RefreshControl,
} from 'react-native';
import { useState } from 'react';
import { ListItem, Button } from 'react-native-elements';
import WebView from 'react-native-webview';
import { groupBy } from 'lodash';
import { wait } from '../utils';
import { colors } from '../Theme';
import H1 from '../Components/H1';
import WebViewModal from '../Components/Webview';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  constainer: {},
  button: {
    backgroundColor: colors.primary,
  },
  header: {
    paddingLeft: 8,
    paddingBottom: 8,
  },
  subheader: {
    padding: 16,
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
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

function Mobility({ item }: { item: EntryType }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <ListItem
        onPress={() => setVisible(true)}
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
      <WebViewModal
        title={`${item.t_pos_start} - ${item.t_pos_end}`}
        uri={item.source}
        visible={visible}
        onClose={() => setVisible(false)}
      />
    </View>
  );
}

function MobilityScreen() {
  const { data, loading, refresh } = useContext(MobilityDataContext);
  const [refreshing, setRefreshing] = useState(false);

  function keyExtractor(item: EntryType) {
    return String(item.id);
  }

  function renderItem({ item }: { item: EntryType }) {
    return <Mobility item={item} />;
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refresh();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing, refresh]);

  return (
    <StatusBarSafeLayout>
      <View>
        <SectionList
          keyExtractor={keyExtractor}
          refreshing={loading}
          refreshControl={
            <RefreshControl
              tintColor="pink"
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          renderItem={renderItem}
          sections={toSection(data)}
          renderSectionHeader={({ section: { title } }) => (
            <View style={{ backgroundColor: '#eee' }}>
              <Text style={styles.subheader}>{title}</Text>
            </View>
          )}
          ListEmptyComponent={<ActivityIndicator size="large" color="red" />}
          ListHeaderComponent={
            <View style={styles.header}>
              <H1 title="确诊患者相同行程查询" />
            </View>
          }
        />
      </View>
    </StatusBarSafeLayout>
  );
}

const WithProvider = () => (
  <MobilityDataContextProvider>
    <MobilityScreen />
  </MobilityDataContextProvider>
);

WithProvider.navigationOptions = {
  title: '同程查询',
};

export default WithProvider;
