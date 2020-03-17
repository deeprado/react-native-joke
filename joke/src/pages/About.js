import React, {Component} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import Banner from '../components/Banner';
import Constant from '../config/Constant';

import Data from '../config/Data';

class About extends Component {
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
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>关于</Text>
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

        <View style={{}}>
          {/*将banner数据设置给Banner组件*/}
          <Banner bannerData={Data.banners} />
        </View>

        <ScrollView>
          <View style={styles.aboutAuthor}>
            <Text style={styles.title}>作者</Text>
            {/*CSDN*/}
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: Constant.textBlack}}>　CSDN：</Text>
              <Text
                style={{color: Constant.activeColor}}
                onPress={() => {
                  this.props.navigation.navigate('WebPage', {
                    title: 'CSDN',
                    url: 'http://blog.csdn.net/scorpiusws',
                  });
                }}>
                http://blog.csdn.net/scorpiusws
              </Text>
            </View>
            {/*GitHub*/}
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <Text style={{color: Constant.textBlack}}>　GitHub：</Text>
              <Text
                style={{color: Constant.activeColor}}
                onPress={() => {
                  this.props.navigation.navigate('WebPage', {
                    title: 'GitHub',
                    url: 'https://github.com/deeprado',
                  });
                }}>
                https://github.com/deeprado
              </Text>
            </View>
            {/*Email*/}
            <View style={{flexDirection: 'row', marginTop: 3}}>
              <Text style={{color: Constant.textBlack}}>　Email：</Text>
              <Text style={{color: Constant.activeColor}}>
                2746143402@qq.com
              </Text>
            </View>
          </View>
          {/*源码地址*/}
          <View style={styles.aboutAuthor}>
            <Text style={styles.title}>源码</Text>
            <Text
              style={{color: Constant.activeColor}}
              onPress={() => {
                this.props.navigation.navigate('WebPage', {
                  title: '源码地址',
                  url: 'https://github.com/deeprado/react-native-joke',
                });
              }}>
              　https://github.com/deeprado/react-native-joke
            </Text>
          </View>
          {/*关于app*/}
          <View style={styles.aboutAuthor}>
            <Text style={styles.title}>应用</Text>
            <Text style={{color: Constant.textBlack}}>
              　温馨提示：建议WiFi状态下使用
            </Text>
            <Text style={{color: Constant.textBlack, marginTop: 5}}>
              　使用假数据
            </Text>
            <Text style={{color: Constant.textBlack, marginTop: 5}}>
              　使用到的Library
            </Text>
            <Text style={{color: Constant.textBlack}}>
              　　1.react-navigation
            </Text>
            <Text style={{color: Constant.textBlack}}>
              　　2.react-native-easy-toast
            </Text>
          </View>
          <View style={styles.bottom}>
            <Text style={{alignSelf: 'center', color: Constant.textGray}}>
              -我是有底线的-
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  aboutAuthor: {
    flex: 1,
    marginTop: 10,
    paddingTop: 8,
    paddingLeft: 20,
    paddingBottom: 8,
    backgroundColor: 'white',
  },
  bottom: {
    flex: 1,
    marginTop: 10,
    height: 40,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  title: {
    marginBottom: 8,
    fontSize: 18,
    color: Constant.textBlack,
  },
});

export default About;
