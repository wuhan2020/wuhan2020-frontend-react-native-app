import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, RefreshControl } from 'react-native';
import Logistic from '../Components/Logistic';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useWuhan2020 from '../hooks/useWuhan2020';
import { Logistical as LogisticalType } from 'wh-data-client';

function LogisticLayout() {
  const [data, , loading, refresh] = useWuhan2020<LogisticalType>('logistical');
  const [refreshing, setRefreshing] = useState(false);

  const logistics: LogisticalType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: LogisticalType }) {
    return <Logistic item={item} />;
  }

  return (
    <StatusBarSafeLayout>
      <FlatList
        refreshControl={
          <RefreshControl
            tintColor="red"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item: LogisticalType) => String(item.id)}
        data={logistics}
        renderItem={renderItem}
        ListFooterComponent={loading ? <Loader /> : null}
      />
    </StatusBarSafeLayout>
  );
}

LogisticLayout.navigationOptions = {
  title: '物流',
};

export default LogisticLayout;
