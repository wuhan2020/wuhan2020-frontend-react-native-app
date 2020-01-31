import React, {
  useState,
  useContext,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {
  View,
  SafeAreaView,
  Dimensions,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import DataProvider, { DataContext } from '../context/Data';

import Timeline from './Timeline';
import RecommendationList from './RecommendationList';
import { ECharts } from 'react-native-echarts-wrapper';
import { wait } from '../utils';

const { height, width } = Dimensions.get('window');

const piecesMap = {
  confirmedCount: [
    { max: 1, color: '#fcfcfc', label: '< 1' },
    { min: 1, max: 9, color: '#F08F7F' },
    { min: 10, max: 99, color: '#E26061' },
    { min: 100, max: 499, color: '#C34548' },
    { min: 500, max: 1000, color: '#9C2F31' },
    { min: 1000, color: '#731919' },
  ],
  suspectedCount: [
    { max: 1, color: '#fcfcfc', label: '< 1' },
    { min: 1, max: 4, color: '#F08F7F' },
    { min: 5, max: 9, color: '#E26061' },
    { min: 10, max: 49, color: '#C34548' },
    { min: 50, max: 99, color: '#9C2F31' },
    { min: 100, color: '#731919' },
  ],
  curedCount: [
    { max: 1, color: '#fcfcfc', label: '< 1' },
    { min: 1, max: 4, color: '#F08F7F' },
    { min: 5, max: 9, color: '#E26061' },
    { min: 10, max: 49, color: '#C34548' },
    { min: 50, max: 99, color: '#9C2F31' },
    { min: 100, color: '#731919' },
  ],
  deadCount: [
    { max: 1, color: '#fcfcfc', label: '< 1' },
    { min: 1, max: 4, color: '#F08F7F' },
    { min: 5, max: 9, color: '#E26061' },
    { min: 10, max: 49, color: '#C34548' },
    { min: 50, max: 99, color: '#9C2F31' },
    { min: 100, color: '#731919' },
  ],
};
const titleMap = {
  confirmedCount: '（确诊）',
  suspectedCount: '（疑似）',
  curedCount: '（治愈）',
  deadCount: '（致死）',
};
const filterList = [
  'confirmedCount',
  'suspectedCount',
  'curedCount',
  'deadCount',
];

function Map() {
  const { data, refresh } = useContext(DataContext);
  const [selectedIndex, setIndex] = useState(0);
  const filter = filterList[selectedIndex];
  const [refreshing, setRefreshing] = useState(false);

  let mapData = data || [];

  const total = {
    confirmedCount: 0,
    suspectedCount: 0,
    curedCount: 0,
    deadCount: 0,
  };

  const webviewRef = useRef(null);
  useEffect(function() {
    if (webviewRef.current) {
      webviewRef.current.setOption({
        title: {
          text: `疫情地图${titleMap[filter]}`,
        },
        tooltip: {
          trigger: 'item',
          formatter: '{b}',
        },
        visualMap: {
          pieces: piecesMap[filter],
          showLabel: true,
          realtime: true,
          inRange: {
            color: ['yellow', 'red'],
          },
        },
        series: [
          {
            name: '中国',
            type: 'map',
            map: 'china',
            selectedMode: 'single', //multiple多选
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  textStyle: {
                    color: '#231816',
                  },
                },
                areaStyle: { color: '#B1D0EC' },
                color: '#B1D0EC',
                borderColor: '#bbb',
              },
              emphasis: {
                label: {
                  show: false,
                  textStyle: {
                    color: '#fa4f04',
                  },
                },
              },
            },
            data: mapData,
          },
        ],
      });
    }
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    refresh();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing, refresh]);

  if (data) {
    let formatted = [];

    data.getAreaStat.forEach(entry => {
      total.confirmedCount = total.confirmedCount + entry.confirmedCount;
      total.curedCount = total.curedCount + entry.curedCount;
      total.deadCount = total.deadCount + entry.deadCount;
      total.suspectedCount = total.suspectedCount + entry.suspectedCount;

      formatted = formatted.concat([
        {
          name: entry.provinceShortName,
          value: entry[filter],
        },
      ]);
    });

    mapData = formatted;
  }

  const option = {
    title: {
      text: `疫情地图${titleMap[filter]}`,
    },
    tooltip: {
      trigger: 'item',
      formatter: '{b}',
    },
    visualMap: {
      pieces: piecesMap[filter],
      showLabel: true,
      realtime: true,
      inRange: {
        color: ['yellow', 'red'],
      },
    },
    series: [
      {
        name: '中国',
        type: 'map',
        map: 'china',
        selectedMode: 'single', //multiple多选
        itemStyle: {
          normal: {
            label: {
              show: false,
              textStyle: {
                color: '#231816',
              },
            },
            areaStyle: { color: '#B1D0EC' },
            color: '#B1D0EC',
            borderColor: '#bbb',
          },
          emphasis: {
            label: {
              show: false,
              textStyle: {
                color: '#fa4f04',
              },
            },
          },
        },
        data: mapData,
      },
    ],
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{
          flex: 1,
        }}
        refreshControl={
          <RefreshControl
            tintColor="pink"
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={{ backgroundColor: 'white' }}>
          {mapData.length ? (
            <View style={{ flex: 1 }}>
              <View style={{ height: 300 }}>
                <ECharts
                  ref={webviewRef}
                  option={option}
                  backgroundColor="#fcfcfc"
                />
              </View>
              <ButtonGroup
                onPress={setIndex}
                selectedIndex={selectedIndex}
                buttons={[
                  `确诊 (${total.confirmedCount})`,
                  `疑似 (${total.suspectedCount})`,
                  `治愈 (${total.curedCount})`,
                  `致死 (${total.deadCount})`,
                ]}
                containerStyle={{ height: 50 }}
              />
              {data && data.getTimelineService && (
                <Timeline data={data.getTimelineService} />
              )}
              {data && data.getIndexRecommendList && (
                <RecommendationList data={data.getIndexRecommendList} />
              )}
            </View>
          ) : (
            <View style={{ flex: 1, width, height }}>
              <ActivityIndicator
                size="large"
                color="red"
                style={{ marginTop: height / 3 }}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const WithProvider = () => (
  <DataProvider>
    <Map />
  </DataProvider>
);

WithProvider.navigationOptions = { title: '主页' };

export default WithProvider;
