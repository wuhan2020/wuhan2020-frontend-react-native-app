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

const styles = StyleSheet.create({
  header: { paddingLeft: 8, paddingBottom: 8 },
});

function HospitalLayout() {
  const [data, total, loading, fetchMore, refresh] = useWuhan2020(
    'https://vuqjf9paihid.leanapp.cn/supplies/requirement',
  );
  const [refreshing, setRefreshing] = useState(false);

  const hospitals: HospitalType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: HospitalType }) {
    return <Hospital item={item} />;
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
    </StatusBarSafeLayout>
  );
}

HospitalLayout.navigationOptions = {
  title: '医院',
};

export default HospitalLayout;
