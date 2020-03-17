/**
 *
 *  福利中的 小清新页面
 * @flow
 */
// 小清新

import React, {Component} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Image,
} from 'react-native';

import ErrorView from '../../components/ErrorView';
import Constant from '../../config/Constant';

import Data from '../../config/Data';

// 获取屏幕的宽度
const {width} = Dimensions.get('window');

// 当前页码
let page = 1;

export default class SmallFresh extends Component {
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
    const url = Constant.images + 'page=' + page + '&type=35';
    this.requestData(url);
  }

  getFlatList() {
    return (
      <FlatList
        data={this.state.data}
        style={styles.dataContainer}
        keyExtractor={this.keyExtractor}
        renderItem={this.getView}
        //下拉刷新，必须设置refreshing状态
        onRefresh={this.onRefresh}
        refreshing={this.state.refreshing}
        //指定为GridView效果，需要下面两个属性同时设置，且numColumns必须大于1
        numColumns={2}
        columnWrapperStyle={styles.columnWrapperStyle}
        //上拉加载
        onEndReachedThreshold={0.1}
        onEndReached={this.onEndReached}
      />
    );
  }

  requestData(url) {
    fetch(url)
      .then(response => response.json())
      .then(response => {
        //解析json数据
        const content = response['showapi_res_body'];
        //上拉加载中
        if (this.state.loadMore) {
          const newList = [];
          //对象for循环
          Object.keys(content).forEach(value => {
            //去除最后一个元素
            if (value !== 'ret_code') {
              newList.push(
                new this.ItemData(
                  content[value].title,
                  content[value].thumb,
                  content[value].url,
                ),
              );
            }
          });
          const newArray = this.state.data.concat(newList);
          this.setState({
            data: newArray,
            loadMore: false,
          });
        } else {
          const newList = [];
          //对象for循环
          Object.keys(content).forEach(value => {
            //去除最后一个元素
            if (value !== 'ret_code') {
              newList.push(
                new this.ItemData(
                  content[value].title,
                  content[value].thumb,
                  content[value].url,
                ),
              );
            }
          });
          //下拉刷新中
          const hasData = newList.length > 0;
          this.setState({
            data: newList,
            error: !hasData,
            refreshing: false,
          });
        }
      })
      .catch(error => {
        let newList = Data.smallFreshes;
        const newArray = this.state.data.concat(newList);
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

  // 存储每个item对象的数据
  ItemData(title, thumb, url) {
    this.title = title;
    this.thumb = thumb;
    this.url = url;
  }

  /**
   * 给列表设置id
   * @param item
   * @param index
   * id 这先使用随机数
   */
  keyExtractor = (item, index) => Math.random() * 1000;

  /**
   * item
   * @returns {XML}
   */
  getView = ({item}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          // 跳转至详情
          this.props.navigation.navigate('WebPage', {
            title: '图片详情',
            url: item.url,
          });
        }}>
        <Image source={item.thumb} style={styles.image} />
      </TouchableOpacity>
    );
  };

  /**
   * 下拉刷新
   */
  onRefresh = () => {
    //设置刷新状态为正在刷新
    page = 1;
    this.setState({
      refreshing: true,
    });
    const url = Constant.images + 'page=' + page + '&type=35';
    this.requestData(url);
  };

  /**
   * 上拉加载
   * @param info : {distanceFromEnd: number}
   */
  onEndReached = info => {
    if (info.distanceFromEnd > 0 && !this.state.loadMore) {
      page++;
      this.setState({
        loadMore: true,
      });
      const url = Constant.images + 'page=' + page + '&type=35';
      this.requestData(url);
    }
  };

  render() {
    //根据当前状态 显示对于的控件
    const content = this.state.error ? <ErrorView /> : this.getFlatList();
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Constant.background,
  },
  image: {
    height: 240,
    width: (width - 15) / 2,
    marginLeft: 3,
  },
  dataContainer: {
    backgroundColor: '#F5FCFF',
    marginTop: 5,
    marginRight: 3,
    marginBottom: 5,
  },
  xx: {borderWidth: 3, borderColor: '#F5FCFF'},
});
