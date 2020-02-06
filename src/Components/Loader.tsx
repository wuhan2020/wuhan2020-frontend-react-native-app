import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, Text, View } from 'react-native';

type PropTypes = {
  size?: 'large' | 'small';
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  text: {
    paddingVertical: 5,
  },
});

function Loader(props: PropTypes) {
  const [showText, setShowText] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    timer.current = setTimeout(() => {
      setShowText(true);
    }, 2200);
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator size={props.size || 'large'} color="red" />
      {showText ? (
        <Text style={styles.text}>数据量大，请耐心等待❤️</Text>
      ) : null}
    </View>
  );
}

export default Loader;
