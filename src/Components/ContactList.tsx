import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import H3 from './H3';

const styles = StyleSheet.create({
  horizontalContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

type PropTypes = {
  data: Wuhan2020ContactType[];
};

function ContactList(props: PropTypes) {
  const { data } = props;
  return (
    <View>
      <H3 title={`联系人${data.length ? '' : '（无）'}`} />
      {data.length
        ? data.map(contact => (
            <View key={contact.tel} style={styles.horizontalContainer}>
              <Text>{contact.name || '未提供姓名'}</Text>
              <Text>电话：{contact.tel}</Text>
            </View>
          ))
        : null}
    </View>
  );
}

export default ContactList;
