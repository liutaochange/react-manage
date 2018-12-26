import React, { Component } from 'react';
import { Row, Col } from 'antd';
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '黄老邪'
    }
  }
  render() {
    return (
      <div className='header-wamp'>
        <Row className='header-item'>
          <Col span={24}>
            <span>欢迎： {this.state.userName}</span>
            <a href="javascript:void(0)">退出</a>
          </Col>
        </Row>
        <Row className='header-item-wea'>
          <Col span={4}>首页</Col>
          <Col span={20}>
            <span>2018-12-26</span>
            <span>晴转多云</span>
          </Col>
        </Row>
      </div>
    )
  }
}
export default Header