import React, { Component } from 'react';
import { Menu } from 'antd';
import menuList from '@/api/config';
import styles from './style.module.less';
const SubMenu = Menu.SubMenu;
class LeftNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: null
    }
  }
  componentDidMount() {
    let node = this.renderMenu(menuList);
    this.setState({
      menuTreeNode: node
    })
  }
  // 菜单渲染
  renderMenu = (list) => {
    return list.map((item) => {
      if (item.children) {
        return (
          <SubMenu  key={item.key} title={item.title}>
            { this.renderMenu(item.children) }
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.key} title={item.title}>{item.title}</Menu.Item>
      )
    })
  }
  render() {
    return (
      <div>
        <div className={styles.logo}>
          <img src={require('@/assets/images/logo-ant.svg')} alt=""/>
          <h1>Liutaochange</h1>
        </div>
        <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
          {this.state.menuTreeNode}
        </Menu>
      </div>
    )
  }
}
export default LeftNav
