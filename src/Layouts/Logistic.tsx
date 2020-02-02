import React, { useState } from 'react';
import StatusBarSafeLayout from './StatusBarSafeLayout';
import { FlatList, StyleSheet, RefreshControl, Dimensions } from 'react-native';
import Logistic from '../Components/Logistic';
import Loader from '../Components/Loader';
import { wait } from '../utils';
import useData from '../hooks/useData';

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({});

function LogisticLayout() {
  const [data, total, loading, fetchMore, refresh] = useData('logistics');
  const [refreshing, setRefreshing] = useState(false);
  const [selected, setSelection] = useState<LogisticType | null>(null);

  const logistics: LogisticType[] = data || [];

  function onRefresh() {
    setRefreshing(true);
    refresh();
    wait(2000).then(() => {
      setRefreshing(false);
    });
  }

  function onClick(logistic: LogisticType) {
    setSelection(logistic);
  }

  function renderItem({ item }: { item: LogisticType }) {
    return <Logistic item={item} onClick={onClick} />;
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
        keyExtractor={(item: LogisticType) => item.objectId}
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
