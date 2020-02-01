import React, { useContext, useCallback } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import NewsDataContextProvider, { NewsDataContext } from '../context/NewsData';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useState } from 'react';
import { ListItem, Button } from 'react-native-elements';
import WebView from 'react-native-webview';
import { uniqBy } from 'lodash';
import { wait } from '../utils';
import { colors } from '../Theme';
import H1 from '../Components/H1';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  constainer: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
  },
  button: {
    backgroundColor: colors.primary,
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
              buttonStyle={styles.button}
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

function NewsScreen() {
  const { data, loading, fetchMore, refresh } = useContext(NewsDataContext);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refresh();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing, refresh]);

  const news = uniqBy(data || [], 'sourceId');

  return (
    <StatusBarSafeLayout>
      <View style={styles.constainer}>
        <H1 title="新闻汇总" />
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl
            tintColor="pink"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onMomentumScrollEnd={fetchMore}>
        {news.map((entry: EntryPropsType) => (
          <Entry key={entry.sourceId} {...entry} />
        ))}
        {loading ? <ActivityIndicator size="large" color="red" /> : null}
      </ScrollView>
    </StatusBarSafeLayout>
  );
}

const WithProvider = () => (
  <NewsDataContextProvider>
    <NewsScreen />
  </NewsDataContextProvider>
);

WithProvider.navigationOptions = {
  title: '新闻汇总',
};

export default WithProvider;
