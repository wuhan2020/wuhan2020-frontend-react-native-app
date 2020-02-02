import React from 'react';
import { Text, View } from 'react-native';
import H3 from './H3';

type PropTypes = {
  remark: string | null;
};

function Remark(props: PropTypes) {
  const { remark } = props;

  return (
    <View>
      <H3 title="其他信息" />
      <Text style={{ marginVertical: 5 }}>{remark || '无'}</Text>
    </View>
  );
}

export default Remark;
