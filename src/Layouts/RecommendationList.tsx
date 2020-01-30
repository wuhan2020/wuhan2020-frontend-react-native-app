import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, ListItem, Badge } from 'react-native-elements';
import momentjs from 'moment';
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

function Entry(props: EntryPropsType) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <ListItem
        onPress={() => setVisible(true)}
        Component={TouchableOpacity}
        title={<Text style={{ fontWeight: '800' }}>{props.title}</Text>}
        subtitle={
          <Text style={{ fontSize: 12, paddingTop: 3 }}>
            修改时间：
            {momentjs(props.modifyTime).format('YYYY-MM-DD hh:mm:ss')} from{' '}
            {props.operator}
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
          <View style={{ height: height - 150 }}>
            <WebView source={{ uri: props.linkUrl }} />
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

function RecommendationList(props: { data: any }) {
  return (
    <View>
      <Text
        style={{
          paddingLeft: 16,
          paddingTop: 16,
          fontSize: 22,
          fontWeight: '800',
        }}>
        推荐阅读
      </Text>
      {props.data.map((entry: EntryPropsType) => (
        <Entry key={entry.id} {...entry} />
      ))}
    </View>
  );
}

export default RecommendationList;
