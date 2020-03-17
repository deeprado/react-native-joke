import React from 'react';
import {createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

// 引导页面
import WelcomePage from '../../pages/WelcomePage';
import JokePage from '../../pages/JokePage';
import Quotations from '../../pages/Quotations';
import GiftPage from '../../pages/GiftPage';
import About from '../../pages/About';

import WebPage from '../../pages/WebPage';

const switchNavigationOptions = {
  gesturesEnabled: true,
  headerTitle: null,
};

const commonNavigationOptions = {
  tabBarVisible: false,
  headerShown: false,
};

const bottomTabOptions = (tabBarTitle, {iconName, typeName}, navTitle) => {
  const tabBarLabel = tabBarTitle;
  const tabBarIcon = ({tintColor, focused}) => {
    return <Icon name={iconName} type={typeName} size={25} color={tintColor} />;
  };
  const headerTitle = navTitle;
  const headerTitleStyle = {fontSize: 22, color: 'white', alignSelf: 'center'};
  // header的style
  const headerStyle = {backgroundColor: '#4ECBFC'};
  const tabBarVisible = true;
  return {
    tabBarLabel,
    tabBarIcon,
    tabBarVisible,
    headerTitle,
    headerTitleStyle,
    headerStyle,
  };
};

const AppTabNavigator = createBottomTabNavigator(
  {
    JokePage: {
      screen: JokePage,
      navigationOptions: () =>
        bottomTabOptions('笑话', {
          iconName: 'smile',
          typeName: 'feather',
        }),
    },
    Quotations: {
      screen: Quotations,
      navigationOptions: () =>
        bottomTabOptions('鸡汤', {
          iconName: 'coffee',
          typeName: 'feather',
        }),
    },
    GiftPage: {
      screen: GiftPage,
      navigationOptions: () =>
        bottomTabOptions('福利', {iconName: 'gift', typeName: 'feather'}),
    },
    About: {
      screen: About,
      navigationOptions: () =>
        bottomTabOptions('关于', {iconName: 'codepen', typeName: 'feather'}),
    },
  },
  {
    initialRouteName: 'JokePage',
    tabBarOptions: {
      activeTintColor: '#FF9744',
      inactiveTintColor: 'gray',
    },
  },
);

let AppAllStack = createStackNavigator(
  {
    TabNavigator: {
      screen: AppTabNavigator,
      navigationOptions: commonNavigationOptions,
    },
    // H5
    WebPage: {
      screen: WebPage,
      navigationOptions: commonNavigationOptions,
    },
  },
  {
    initialRouteName: 'TabNavigator',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: true,
      headerTitle: null,
      headerShown: false,
    },
  },
);

const SplashStack = createSwitchNavigator(
  {
    SplashPage: {
      screen: WelcomePage,
      navigationOptions: switchNavigationOptions,
    },
    AppPage: {
      screen: AppAllStack,
      navigationOptions: switchNavigationOptions,
    },
  },
  {
    // mode: 'card',
    headerMode: 'none',
    initialRouteName: 'SplashPage',
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

// const prefix = 'qimao://';

export default SplashStack;
