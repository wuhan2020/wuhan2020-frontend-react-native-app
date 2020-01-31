import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';

function Wuhan2020() {
  const [loadingWebview, setLoading] = useState(true);
  return (
    <StatusBarSafeLayout>
      {loadingWebview ? <ActivityIndicator size="large" color="red" /> : null}
      <WebView
        onLoad={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        source={{ uri: 'https://wuhan2020.kaiyuanshe.cn' }}
      />
    </StatusBarSafeLayout>
  );
}

Wuhan2020.navigationOptions = {
  title: 'Wuhan2020',
};

export default Wuhan2020;
