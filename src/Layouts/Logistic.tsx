import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, RefreshControl } from 'react-native';
import Logistic from '../Components/Logistic';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useData from '../hooks/useData';

function LogisticLayout() {
  const [data, total, loading, fetchMore, refresh] = useData('logistics');
  const [refreshing, setRefreshing] = useState(false);

  const logistics: DonationType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: DonationType }) {
    return <Logistic item={item} />;
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
        keyExtractor={(item: DonationType) => String(item.id)}
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
