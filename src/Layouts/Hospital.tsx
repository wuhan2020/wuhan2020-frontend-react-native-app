import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, View, RefreshControl } from 'react-native';
import useWuhan2020 from '../hooks/useWuhan2020';
import Hospital from '../Components/Hospital';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import { Hospital as HospitalType } from 'wh-data-client';

function HospitalLayout() {
  const [data, , loading, refresh] = useWuhan2020<HospitalType>('hospital');
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
        keyExtractor={(item: HospitalType) => String(item.id)}
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
