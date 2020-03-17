/**
 * 笑话 主页面
 * @flow
 */
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import {View, Text} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import Constant from '../config/Constant';
import StyleSheet from '../components/StyleSheet';

import Riddles from './joke/Riddles';
import Joke from './joke/Joke';

const styles = StyleSheet.create({
  // 解决ios上文字不垂直居中问题
  tabStyle: {
    ios: {
      height: 35,
    },
    android: {},
  },

  container: {
    flex: 1,
  },
});

const MaterialTopTab = createMaterialTopTabNavigator(
  {
    Joke: {
      screen: Joke,
      navigationOptions: {
        tabBarLabel: '笑话',
      },
    },
    Riddles: {
      screen: Riddles,
      navigationOptions: {
        tabBarLabel: '谜语',
      },
    },
  },
  {
    // 当两个TabNavigator嵌套时需要这样设置
    animationEnabled: false,
    swipeEnabled: false,
    // 按 back 键是否跳转到第一个Tab(首页)， none 为不跳转
    backBehavior: 'none',
    // 设置Tab标签的属性
    tabBarOptions: {
      // 共有属性
      showIcon: false,
      activeTintColor: Constant.activeColor, //label和icon的前景色 活跃状态下（选中）
      inactiveTintColor: Constant.primaryColor, //label和icon的前景色 活跃状态下（未选中）
      style: {
        // TabNavigator 的背景颜色
        backgroundColor: 'white',
      },
      indicatorStyle: {
        //标签指示器的样式对象（选项卡底部的行）。安卓底部会多出一条线，可以将height设置为0来暂时解决这个问题
        backgroundColor: Constant.activeColor,
      },
      labelStyle: {
        //文字的样式
        fontSize: 14,
      },
      tabStyle: styles.tabStyle,
    },
  },
);

const TabContainer = createAppContainer(MaterialTopTab);

class JokePage extends React.Component {
  constructor(props) {
    super(props);
  }

  renderLeftComponent() {
    return null;
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>笑话</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{
            backgroundColor: Constant.primaryColor,
            barStyle: 'light-content',
          }}
          backgroundColor={Constant.primaryColor}
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
          rightComponent={this.renderRightComponent()}
        />
        <View style={{flex: 1}}>
          <TabContainer />
        </View>
      </View>
    );
  }
}

export default JokePage;
