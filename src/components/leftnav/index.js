import React, { Component } from 'react';
import { Menu, Icon, Divider } from 'antd';
import menuList from '@/api/config';
import './style.less';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
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

  }
  render() {
    return (
      <div>
        <div className="logo">
          <img src={require('@/assets/images/logo-ant.svg')}/>
          <h1>Liutaochange</h1>
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <SubMenu key="sub1" title={<span><Icon type="mail" /><span>Navigation One</span></span>}>
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <Menu.Item key="2">
            <Icon type="video-camera" />
            <span>nav 2</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="upload" />
            <span>nav 3</span>
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default LeftNav
