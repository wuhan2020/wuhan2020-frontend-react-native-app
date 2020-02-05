import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, RefreshControl, View } from 'react-native';
import Hotel from '../Components/Hotel';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useWuhan2020, { TravelHotel } from '../hooks/useWuhan2020';

function HotelLayout() {
  const [data, , loading, refresh] = useWuhan2020<TravelHotel>('travel_hotel');
  const [refreshing, setRefreshing] = useState(false);

  const hotels: HotelType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function renderItem({ item }: { item: HotelType }) {
    return <Hotel item={item} />;
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
        keyExtractor={(item: HotelType) => String(item.id)}
        data={hotels}
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

HotelLayout.navigationOptions = {
  title: '指定接待酒店',
};

export default HotelLayout;
