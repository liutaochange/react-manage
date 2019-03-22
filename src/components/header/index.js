import React, { PureComponent } from 'react';
import { Row, Col, Icon } from 'antd';
import moment from 'moment';
import { getWeather } from '@/api/index.js';
import { withRouter } from 'react-router-dom';
import styles from './style.module.less';
class Header extends PureComponent {
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
    const { menuType } = this.props;
    return (
      <div className={styles['header-wamp']}>
        {
          menuType ? '' : (
            <Icon
              className={styles.trigger}
              type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.props.toggle}
            />
          )
        }
        <Row className={ menuType ? styles['header-top'] : styles['header-item']}>
          {
            menuType ? (
              <Col span={6}>
                <div className={styles['header-logo']}>
                  <img src={require('@/assets/images/logo-ant.svg')} alt="" />
                  <h1>Liutaochange 管理系统</h1>
                </div>
              </Col>
            ) : ''
          }
          <Col span={menuType ? 18 : 24}>
            <span>欢迎： {this.state.userName}</span>
            <a href="www.baidu.com" >退出</a>
          </Col>
        </Row>
        {
          menuType ? '' : (
            <Row className={styles['header-item-weather']}>
              <Col span={4} className={styles.title}>{this.props.location.pathname === '/home' ? '首页' : ''}</Col>
              <Col span={20} className={styles['header-text']}>
                <span>{this.state.time}</span>
                <img src={this.state.weatherUrl} alt=""/>
                <span>{this.state.weather}</span>
              </Col>
            </Row>
          )
        }
      </div>
    )
  }
}
export default withRouter(Header)