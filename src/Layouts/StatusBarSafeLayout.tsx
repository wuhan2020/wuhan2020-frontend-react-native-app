import * as React from 'react';
import { StatusBar, SafeAreaView, StatusBarStyle } from 'react-native';

type PropTypes = {
  children: React.ReactNode;
  barStyle?: StatusBarStyle;
};

function Home(props: PropTypes) {
  const barStyle = props.barStyle || 'dark-content';
  return (
    <>
      <StatusBar barStyle={barStyle} />
      <SafeAreaView style={{ flex: 1 }}>{props.children}</SafeAreaView>
    </>
  );
}

export default Home;
