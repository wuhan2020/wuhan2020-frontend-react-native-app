import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, RefreshControl, View } from 'react-native';
import Donation from '../Components/Donation';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useData from '../hooks/useData';

function DonationLayout() {
  const [data, total, loading, fetchMore, refresh] = useData('donations');
  const [refreshing, setRefreshing] = useState(false);

  const donations: DonationType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: DonationType }) {
    return <Donation item={item} />;
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
        data={donations}
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

DonationLayout.navigationOptions = {
  title: '捐款',
};

export default DonationLayout;
