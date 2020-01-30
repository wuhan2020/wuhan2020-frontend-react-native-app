import * as React from 'react';
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
} from 'react-native';
import { useState } from 'react';
import { ListItem, Button } from 'react-native-elements';
import WebView from 'react-native-webview';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  constainer: {
    padding: 16,
  },
  header: {
    fontSize: 22,
    fontWeight: '800',
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

function NewsScreen() {
  const { data } = React.useContext(NewsDataContext);

  return (
    <StatusBarSafeLayout>
      <View style={styles.constainer}>
        <Text style={styles.header}>新闻汇总</Text>
      </View>

      {data === null && <ActivityIndicator size="large" />}
      <ScrollView>
        {(data || []).map((entry: EntryPropsType) => (
          <Entry key={entry.sourceId} {...entry} />
        ))}
      </ScrollView>
    </StatusBarSafeLayout>
  );
}

NewsScreen.navigationOptions = {
  title: '新闻汇总',
};

const WithProvider = () => (
  <NewsDataContextProvider>
    <NewsScreen />
  </NewsDataContextProvider>
);

export default WithProvider;
