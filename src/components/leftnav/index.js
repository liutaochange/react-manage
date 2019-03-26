import React, { PureComponent } from "react";
import { Menu } from "antd";
import menuList from "@/api/config";
import { connect } from "react-redux";
import { menuSwitch } from "@/redux/action/index";
import styles from "./style.module.less";
import { NavLink } from "react-router-dom";
class LeftNav extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      menuTreeNode: this.renderMenu(menuList),
      selectKey: ""
    };
  }
  // 菜单渲染
  renderMenu = list => {
    return list.map(item => {
      if (item.children) {
        return (
          <Menu.SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </Menu.SubMenu>
        );
      }
      return (
        <Menu.Item key={item.key} title={item.title}>
          <NavLink to={item.key}>{item.title}</NavLink>
        </Menu.Item>
      );
    });
  };
  handleClick = item => {
    const { dispatch } = this.props
    dispatch(menuSwitch(item.item.props.title))
    this.setState({
      selectKey: item.key
    });
  };
  render() {
    return (
      <div>
        <div className={styles.logo}>
          <img src={require("@/assets/images/logo-ant.svg")} alt="" />
          <h1>Liutaochange</h1>
        </div>
        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          onClick={this.handleClick}
        >
          {this.state.menuTreeNode}
        </Menu>
      </div>
    );
  }
}
export default connect()(LeftNav);
