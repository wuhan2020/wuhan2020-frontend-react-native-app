import React, { useState } from 'react';
import { Text, View, Dimensions, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';

import WebViewModal from './Webview';
import H3 from './H3';
import { Donation as DonationType } from '../hooks/useWuhan2020';
import ContactList from './ContactList';
import Remark from './Remark';

const { width } = Dimensions.get('window');

type PropTypes = {
  item: DonationType;
};

function Item({ left, right }: { left: string; right: string }) {
  return (
    <View
      style={{
        paddingVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
      <View>
        <Text selectable>{left}</Text>
      </View>
      <View style={{ maxWidth: width * 0.5 }}>
        <Text selectable>{right}</Text>
      </View>
    </View>
  );
}

function Donation({ item }: PropTypes) {
  return (
    <Card title={`${item.name} （${item.status}）`}>
      <ContactList data={item.contacts} />
      <View>
        <H3 title="联系方式" />
        <View>
          {[
            { title: '地址', key: 'address' },
            { key: 'email', title: '邮箱' },
            { key: 'wechat', title: '微信' },
          ].map(({ title, key }) => (
            <Item key={key} left={title} right={item[key] || '无'} />
          ))}
        </View>
      </View>
      <View>
        <H3 title="银行信息" />
        <View>
          {item.bankAccounts.map(
            (bank: { name: string; bank: string; number: string }) => (
              <View
                style={{
                  paddingVertical: 5,
                }}>
                <Item left="名称" right={bank.name} />
                <Item left="银行" right={bank.bank} />
                <Item left="账号" right={bank.number} />
              </View>
            ),
          )}
        </View>
      </View>
      <Remark remark={item.remark} />

      <View style={{ paddingHorizontal: 30, paddingTop: 10 }}>
        <Button
          type="outline"
          title="查看详情"
          onPress={() => Linking.openURL(item.url)}
        />
      </View>
    </Card>
  );
}

export default Donation;
