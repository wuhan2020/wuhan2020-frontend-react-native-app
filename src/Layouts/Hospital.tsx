import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import {
  FlatList,
  StyleSheet,
  View,
  RefreshControl,
  Modal,
  Dimensions,
} from 'react-native';
import useWuhan2020 from '../hooks/useWuhan2020';
import Hospital from '../Components/Hospital';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import { Button } from 'react-native-elements';
import HospitalDetail from '../Components/HospitalDetail';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  header: { paddingLeft: 8, paddingBottom: 8 },
});

function HospitalLayout() {
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
        ListFooterComponent={
          loading ? (
            <View style={{ paddingTop: 20 }}>
              <Loader />
            </View>
          ) : null
        }
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

HospitalLayout.navigationOptions = {
  title: '医院',
};

export default HospitalLayout;
