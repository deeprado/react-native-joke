import React, {Component} from 'react';
import {View, Image, Text, StyleSheet} from 'react-native';

/**
 * 当页面没有数据展示或者网络错误的时候显示这个组件
 */
import constant from '../config/Constant';

const noDataPng = require('../assets/images/no_data.png');

class ErrorView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={noDataPng} />
        <Text style={styles.text}>点击刷新</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eeeeee',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    fontSize: 14,
    color: constant.textBlack,
    marginTop: 15,
  },
});

export default ErrorView;
