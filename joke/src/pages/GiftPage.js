import React from 'react';

import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import StyleSheet from '../components/StyleSheet';
import Constant from '../config/Constant';

import SmallFresh from './gift/SmallFresh';
import LiteraryStyle from './gift/LiteraryStyle';
import BigLegs from './gift/BigLegs';

class GiftPage extends React.Component {
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
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>福利</Text>
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
          <ScrollableTabView>
            <SmallFresh tabLabel="小清新" navigation={this.props.navigation} />
            <LiteraryStyle
              tabLabel="文艺范"
              navigation={this.props.navigation}
            />
            <BigLegs tabLabel="大长腿" navigation={this.props.navigation} />
          </ScrollableTabView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GiftPage;
