import React from 'react';
import { Text, TextProps } from 'react-native';

function TextSelectable(props: TextProps) {
  return <Text {...props} selectable />;
}

export default TextSelectable;
