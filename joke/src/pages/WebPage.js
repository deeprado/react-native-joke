import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';
import {Header, Icon} from 'react-native-elements';

import Constant from '../config/Constant';

class WebPage extends Component {
  constructor(props) {
    super(props);
    let params = props.navigation.state.params;
    this.state = {
      url: props.url || params.url || 'https://www.baidu.com',
      title: props.title || params.title || '百度',
    };
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.navigation.goBack();
  }

  renderLeftComponent() {
    return (
      <Icon
        name="left"
        color="#9D9D9D"
        type="antdesign"
        onPress={this.goBack}
      />
    );
  }

  renderRightComponent() {
    return null;
  }

  renderCenterComponent() {
    return (
      <View>
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>
          {this.state.title}
        </Text>
      </View>
    );
  }

  renderHeader = () => {
    return (
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
    );
  };
  render() {
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <WebView
          source={{
            uri: this.state.url,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebPage;
