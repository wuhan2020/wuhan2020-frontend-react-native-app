import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import { Button, ListItem, Badge } from 'react-native-elements';
import momentjs from 'moment';
const { height } = Dimensions.get('window');

type EntryPropsType = {
  latest: boolean;
  id: number;
  pubDateStr: string;
  title: string;
  summary: string;
  infoSource: string;
  sourceUrl: string;
  provinceId: string;
  provinceName: string;
  createdTime: number;
  modifyTime: number;
};

function Entry(props: EntryPropsType) {
  const [visible, setVisible] = useState(false);
  return (
    <View>
      <ListItem
        onPress={() => setVisible(true)}
        Component={TouchableOpacity}
        title={<Text style={{ fontWeight: '800' }}>{props.title}</Text>}
        subtitle={`${props.summary.slice(0, 50)}...`}
        leftAvatar={
          <View>
            {props.latest ? (
              <Badge
                value="最新"
                status="error"
                textStyle={{ fontSize: 13, fontWeight: 'bold' }}
              />
            ) : null}
            <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
              {props.pubDateStr}
            </Text>
            <Text style={{ fontSize: 12, color: '#717171' }}>
              {momentjs(props.modifyTime).format('h:mm:ss')}
            </Text>
          </View>
        }
        rightAvatar={
          <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}>
            <Text style={{ fontSize: 12, color: '#717171' }}>
              {props.infoSource}
            </Text>
          </View>
        }
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
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', paddingBottom: 20 }}>
              {props.title}
            </Text>
            <Text style={{ fontSize: 16, lineHeight: 22 }}>
              {props.summary}
            </Text>

            <View style={{ alignSelf: 'flex-end', paddingTop: 20 }}>
              <Text style={{ fontWeight: '800' }}>
                新闻来源：{props.infoSource}
              </Text>
              <Text style={{ fontWeight: '800' }}>
                时间：{props.pubDateStr}
              </Text>
            </View>
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

function Timeline(props: { data: any }) {
  return (
    <View>
      <Text
        style={{
          paddingLeft: 16,
          paddingTop: 16,
          fontSize: 22,
          fontWeight: '800',
        }}>
        最新新闻
      </Text>
      {props.data.map((entry: EntryPropsType, i: number) => (
        <Entry key={entry.id} {...entry} latest={i === 0} />
      ))}
    </View>
  );
}

export default Timeline;
