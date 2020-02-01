import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, ListItem } from 'react-native-elements';
import { formatDate } from '../utils';
import { colors } from '../Theme';
import H1 from '../Components/H1';
const { height } = Dimensions.get('window');

type EntryPropsType = {
  id: number;
  createTime: number;
  modifyTime: number;
  contentType: number;
  title: string;
  imgUrl: string;
  linkUrl: string;
  operator: string;
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
});

function Entry(props: EntryPropsType) {
  const [visible, setVisible] = useState(false);
  const [loadingWebview, setLoading] = useState(true);

  return (
    <View>
      <ListItem
        onPress={() => setVisible(true)}
        Component={TouchableOpacity}
        title={<Text style={{ fontWeight: '800' }}>{props.title}</Text>}
        subtitle={
          <Text style={{ fontSize: 12, paddingTop: 3 }}>
            修改时间：
            {formatDate(props.modifyTime)} from {props.operator}
          </Text>
        }
        leftAvatar={{ source: { uri: props.imgUrl } }}
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
          {loadingWebview ? (
            <ActivityIndicator size="large" color="red" />
          ) : null}
          <View style={{ height: height - 150 }}>
            <WebView
              onLoad={() => setLoading(true)}
              onLoadEnd={() => setLoading(false)}
              source={{ uri: props.linkUrl }}
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

function RecommendationList(props: { data: any }) {
  return (
    <View>
      <View style={{ paddingLeft: 8 }}>
        <H1 title="推荐阅读" />
      </View>
      {props.data.map((entry: EntryPropsType) => (
        <Entry key={entry.id} {...entry} />
      ))}
    </View>
  );
}

export default RecommendationList;
