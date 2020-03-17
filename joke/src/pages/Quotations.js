/**
 * 鸡汤
 */

import React, {Component} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Header, Icon} from 'react-native-elements';

import Constant from '../config/Constant';
import ErrorView from '../components/ErrorView';
import Data from '../config/Data';

class Quotations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [], //数据
      refreshing: false, //当前的刷新状态
      loadMore: false, //当前上拉的状态
      error: false, //当前是不是／没有数据／网络错误／出错
    };
  }

  componentDidMount() {
    //参数拼接
    const url = Constant.quotations;
    this.requestData(url);
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
        <Text style={{color: '#000', fontSize: 24, color: '#fff'}}>鸡汤</Text>
      </View>
    );
  }

  render() {
    //根据当前状态 显示对于的控件
    const content = this.state.error ? <ErrorView /> : this.getFlatList();
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

        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.onRefresh();
          }}>
          {content}
        </TouchableOpacity>
      </View>
    );
  }

  getFlatList() {
    return (
      <FlatList
        style={{marginBottom: 5}}
        data={this.state.data}
        keyExtractor={this.keyExtractor}
        renderItem={this.getView}
        //下拉刷新，必须设置refreshing状态
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        //上拉加载
        onEndReachedThreshold={0.1}
        onEndReached={this.onEndReached}
      />
    );
  }

  /**
   * 给列表设置id
   * @param item
   * @param index
   * id 这先使用随机数
   */
  keyExtractor = (item, index) => Math.random() * 1000;

  /**
   * 下拉刷新
   */
  onRefresh = () => {
    //设置刷新状态为正在刷新
    this.setState({
      refreshing: true,
    });
    const url = Constant.quotations;
    this.requestData(url);
  };

  /**
   * 上拉加载
   * @param info {distanceFromEnd: number}
   */
  onEndReached = info => {
    if (info.distanceFromEnd > 0 && !this.state.loadMore) {
      this.setState({
        loadMore: true,
      });
      const url = Constant.quotations;
      this.requestData(url);
    }
  };

  /**
   * item
   * @returns {XML}
   */
  getView({item, index}) {
    //这里返回的就是每个Item
    return (
      <TouchableOpacity key={index} style={styles.item} activeOpacity={0.5}>
        <View>
          <Text style={styles.title} selectable={true}>
            {'　　' + item.english}
          </Text>
          <Text style={styles.content} selectable={true}>
            {'　　' + item.chinese}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  requestData(url) {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        //解析json数据
        const content = response['showapi_res_body'];
        const list = content['data'];
        //上拉加载中
        if (this.state.loadMore) {
          //生成一个新数组
          const newArray = this.state.data.concat(list);
          //往数据源中添加数据
          this.setState({
            data: newArray,
            loadMore: false,
          });
        } else {
          //下拉刷新中
          const hasData = list.length > 0;
          this.setState({
            data: list,
            error: !hasData,
            refreshing: false,
          });
        }
      })
      .catch(error => {
        let list = Data.quotations;
        //生成一个新数组
        const newArray = this.state.data.concat(list);
        //往数据源中添加数据
        this.setState({
          data: newArray,
          loadMore: false,
        });

        // if (error) {
        //   //网络错误处理
        //   this.setState({
        //     error: true,
        //     refreshing: false,
        //   });
        // }
      });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constant.background,
  },
  item: {
    // flexWrap: 'wrap',
    flexDirection: 'column',
    borderRadius: 5,
    backgroundColor: 'white',
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
  },
  title: {
    marginLeft: 10,
    marginTop: 10,
    marginRight: 10,
    color: Constant.textGray,
    alignItems: 'center',
    fontSize: 14,
  },
  content: {
    color: Constant.textBlack,
    marginTop: 8,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 8,
    fontSize: 14,
  },
});

export default Quotations;
