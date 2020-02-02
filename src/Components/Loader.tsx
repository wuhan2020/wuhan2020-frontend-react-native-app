import React from 'react';
import { ActivityIndicator } from 'react-native';

type PropTypes = {
  size?: 'large' | 'small';
};

function Loader(props: PropTypes) {
  return <ActivityIndicator size={props.size || 'large'} color="red" />;
}

export default Loader;
