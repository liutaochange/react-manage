import React, { Component } from "react";
import { Card, Button } from "antd";
import styles from "./style.module.less";
class Buttons extends Component {
  render() {
    return (
      <div className={styles.buttonwamp}>
        <Card title="基础按钮" style={{marginBottom: '10px'}}>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
        </Card>
        <Card title="带图标按钮">
          <Button type="primary" shape="circle" icon="search" />
          <Button type="primary" icon="search">Search</Button>
          <Button shape="circle" icon="search" />
          <Button icon="search">Search</Button>
        </Card>
      </div>
    );
  }
}
export default Buttons;
