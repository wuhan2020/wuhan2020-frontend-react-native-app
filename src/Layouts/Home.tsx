import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Echarts from 'react-native-echarts-map';
import { Button } from 'react-native-elements';

const { height } = Dimensions.get('window');

class Map extends Component {
  render() {
    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}',
      },
      visualMap: {
        min: 800,
        max: 50000,
        text: ['高', '低'],
        realtime: false,
        calculable: true,
        inRange: {
          color: ['lightskyblue', 'yellow', 'orangered'],
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
              borderColor: '#bbb', //区块的边框颜色
            },
            emphasis: {
              //鼠标hover样式
              label: {
                show: true,
                textStyle: {
                  color: '#fa4f04',
                },
              },
            },
          },
          data: [{ name: '四川', selected: true }],
        },
      ],
    };
    return (
      <View style={{ backgroundColor: 'white' }}>
        <Echarts option={option} height={height / 3} />
        <Button title="map works" loading />
      </View>
    );
  }
}

Map.navigationOptions = { title: 'Wuhan 2020 ❤️' };

export default Map;
