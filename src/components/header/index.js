import React, { Component } from 'react';
import { Row, Col, Icon } from 'antd';
import moment from 'moment';
import { getWeather } from '@/api/index.js';
import styles from './style.module.less';
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '黄老邪',
      time: moment().format('YYYY年MM月DD日 HH:mm:ss'),
      weather: '',
      weatherUrl: ''
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.clock()
    }, 1000)
    getWeather().then((res) => {
      console.log(res)
      let weather = res[0].weather_data[0].weather;
      let pm2 = res[0].pm25;
      let weatherUrl = res[0].weather_data[0].dayPictureUrl;
      this.setState(() => ({
        weather: `天气状况：${weather}，pm指数：${pm2}`,
        weatherUrl
      }))
    }).catch((err)=> {
      console.log(err);
    })
  }
  clock = () => {
    this.setState(() => ({
      time: moment().format('YYYY年MM月DD日 HH:mm:ss')
    }))
  }
  render() {
    return (
      <div className={styles['header-wamp']}>
        <Icon
          className={styles.trigger}
          type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={this.props.toggle}
        />
        <Row className={styles['header-item']}>
          <Col span={24}>
            <span>欢迎： {this.state.userName}</span>
            <a href="www.baidu.com" >退出</a>
          </Col>
        </Row>
        <Row className={styles['header-item-weather']}>
          <Col span={4} className={styles.title}>首页</Col>
          <Col span={20} className={styles['header-text']}>
            <span>{this.state.time}</span>
            <img src={this.state.weatherUrl} alt=""/>
            <span>{this.state.weather}</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Header