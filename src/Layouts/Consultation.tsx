import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, RefreshControl, View } from 'react-native';
import Consultation from '../Components/Consultation';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useData from '../hooks/useData';

function ConsultationLayout() {
  const [data, total, loading, fetchMore, refresh] = useData('consultations');
  const [refreshing, setRefreshing] = useState(false);

  const consultations: DonationType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: DonationType }) {
    return <Consultation item={item} />;
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
        data={consultations}
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

ConsultationLayout.navigationOptions = {
  title: '义诊',
};

export default ConsultationLayout;
