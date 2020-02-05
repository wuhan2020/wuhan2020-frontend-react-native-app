import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, RefreshControl, View } from 'react-native';
import Consultation from '../Components/Consultation';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useWuhan2020, { Clinic } from '../hooks/useWuhan2020';

function ConsultationLayout() {
  const [data, , loading, refresh] = useWuhan2020<Clinic>('clinic');
  const [refreshing, setRefreshing] = useState(false);

  const clinics: Clinic[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: Clinic }) {
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
        keyExtractor={(item: Clinic) => String(item.id)}
        data={clinics}
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
