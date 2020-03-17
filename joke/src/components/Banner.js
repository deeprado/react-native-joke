/**
 * 使用ScrollView实现的一个ViewPager效果
 *
 *@author 阿钟
 */

import React, {Component} from 'react';
import {
  View,
  Image,
  Text,
  Dimensions,
  ScrollView,
  StyleSheet,
} from 'react-native';

//获取屏幕的宽度和高度
const {width} = Dimensions.get('window');
import constant from '../config/Constant';

class Banner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //当前显示的下标
      position: 0,
      // 定时器的间隔时间
      duration: props.duration || 2000,
      bannerData: props.bannerData || [],
    };
  }

  // 绘制完成，开启定时器
  componentDidMount() {
    this.startTimer();
  }

  // 结束计时器
  componentWillUnmount(nextProps, nextState) {
    clearInterval(this.timer);
  }

  startTimer() {
    //1.拿到ScrollView
    let scrollView = this.scrollView;
    this.timer = setInterval(() => {
      //设置圆点的下标
      let curr = this.state.position;
      if (curr + 1 > this.state.bannerData.length - 1) {
        curr = 0;
      } else {
        curr++;
      }
      //更新状态机，更新当前下标
      this.setState({
        position: curr,
      });
      //滚动ScrollView，1.求出水平方向的平移量  offsetX = curr * width
      scrollView.scrollTo({x: curr * width, y: 0, animated: true});
    }, this.state.duration);
  }

  // 获取轮播图显示的图片
  getImages() {
    let images = [];
    for (let i = 0; i < this.props.bannerData.length; i++) {
      images.push(
        <View key={i}>
          {
            <Image
              source={{uri: this.props.bannerData[i]}}
              style={styles.image}
            />
          }
        </View>,
      );
    }
    return images;
  }

  // 获取左下角的4个圆点
  getIndicators() {
    let circles = [];
    for (let i = 0; i < this.props.bannerData.length; i++) {
      circles.push(
        <Text
          key={i}
          style={
            i === this.state.position ? styles.selected : styles.unselected
          }>
          &bull;
        </Text>, //&bull; html转义字符
      );
    }
    return circles;
  }

  // 重写这个函数，系统已有的函数
  onAnimationEnd(v) {
    //1.求出水平方向的偏移量
    let offsetX = v.nativeEvent.contentOffset.x;
    //2.根据偏移量求出当前的页数  width为图片的宽度（banner的宽度 ）
    let position = Math.round(offsetX / width);
    //3.更新状态机, 刷新圆点
    this.setState({
      position: position,
    });
    clearInterval(this.timer);
    this.startTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          ref={scrollView => (this.scrollView = scrollView)}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          pagingEnabled={true} //自动分页
          //滚动动画结束时调用此函数。一帧滚动结束
          onMomentumScrollEnd={v => this.onAnimationEnd(v)}
          //手指按下的时候，停止计时器
          onTouchStart={() => clearInterval(this.timer)}>
          {/*显示轮播图的图片内容*/}
          {this.getImages()}
        </ScrollView>
        {/*生成底部的圆点指示器*/}
        <View style={styles.indicator}>{this.getIndicators()}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 240,
  },
  // 底部指示器的样式
  indicator: {
    width: width,
    height: 40,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: width,
    height: 240,
  },
  selected: {
    marginLeft: 10,
    fontSize: 30,
    color: constant.activeColor,
  },
  unselected: {
    marginLeft: 10,
    fontSize: 30,
    color: 'white',
  },
});

export default Banner;
