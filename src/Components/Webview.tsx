import React, { useState } from 'react';
import { Modal, StyleSheet, View, Dimensions, Alert } from 'react-native';
import Loader from './Loader';
import { WebView } from 'react-native-webview';
import { colors } from '../Theme';
import { Button } from 'react-native-elements';
import H1 from './H1';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
  },
});

function WebViewModal({
  uri,
  title,
  visible,
  onClose,
}: {
  uri: string;
  title: string;
  visible: boolean;
  onClose: () => void;
}) {
  const [loadingWebview, setLoading] = useState(true);

  return (
    <Modal
      animationType="fade"
      presentationStyle="pageSheet"
      visible={visible}
      onRequestClose={onClose}>
      <View style={{ padding: 16, justifyContent: 'space-between' }}>
        <View style={{ height: height - 150 }}>
          <H1 title={title} />
          {loadingWebview ? (
            <View style={{ paddingVertical: 20 }}>
              <Loader />
            </View>
          ) : null}
          <WebView
            onLoad={() => setLoading(true)}
            onLoadEnd={() => setLoading(false)}
            source={{ uri }}
          />
        </View>
        <View>
          <Button
            buttonStyle={styles.button}
            title="关闭预览"
            onPress={onClose}
          />
        </View>
      </View>
    </Modal>
  );
}

export default WebViewModal;
