import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Button, ListItem, Badge } from 'react-native-elements';
import { formatTime } from '../utils';
const { height } = Dimensions.get('window');
import { colors } from '../Theme';
import H1 from '../Components/H1';

const styles = StyleSheet.create({
  button: { backgroundColor: colors.primary },
});

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
              {formatTime(props.modifyTime)}
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
        onDismiss={() => {
          setVisible(false);
        }}
        onRequestClose={() => {
          setVisible(false);
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

function Timeline(props: { data: any }) {
  return (
    <View>
      <View style={{ paddingLeft: 8 }}>
        <H1 title="最新新闻" />
      </View>
      {props.data.map((entry: EntryPropsType, i: number) => (
        <Entry key={entry.id} {...entry} latest={i === 0} />
      ))}
    </View>
  );
}

export default Timeline;
