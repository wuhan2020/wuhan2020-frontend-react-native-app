import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Modal,
  Dimensions,
} from 'react-native';
import useWuhan2020 from '../hooks/useWuhan2020';
import H1 from '../Components/H1';
import Hospital from '../Components/Hospital';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import { Button } from 'react-native-elements';
import HospitalDetail from '../Components/HospitalDetail';
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: { paddingLeft: 8, paddingBottom: 8 },
});

function Wuhan2020() {
  const [data, total, loading, fetchMore, refresh] = useWuhan2020(
    'https://vuqjf9paihid.leanapp.cn/supplies/requirement',
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelection] = useState<HospitalType | null>(null);

  const hospitals: HospitalType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function onClick(hospital: HospitalType) {
    setSelection(hospital);
  }
  function renderItem({ item }: { item: HospitalType }) {
    return <Hospital item={item} onClick={onClick} />;
  }

  return (
    <StatusBarSafeLayout>
      <View style={styles.header}>
        <H1 title="医院" />
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor="pink"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        onMomentumScrollEnd={fetchMore}
        keyExtractor={(item: HospitalType) => item.objectId}
        data={hospitals}
        renderItem={renderItem}
        ListFooterComponent={loading ? <Loader /> : null}
      />

      <Modal
        animationType="slide"
        presentationStyle="formSheet"
        transparent={false}
        onDismiss={() => {
          setSelection(null);
        }}
        onRequestClose={() => {
          setSelection(null);
        }}
        visible={selected !== null}>
        <View style={{ padding: 16, justifyContent: 'space-between' }}>
          <View style={{ height: height - 150 }}>
            {selected && <HospitalDetail item={selected} />}
          </View>
          <View>
            <Button
              title="关闭详情"
              onPress={() => {
                setSelection(null);
              }}
            />
          </View>
        </View>
      </Modal>
    </StatusBarSafeLayout>
  );
}

Wuhan2020.navigationOptions = {
  title: 'Wuhan2020',
};

export default Wuhan2020;
