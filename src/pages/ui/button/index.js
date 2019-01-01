import React, { Component } from "react";
import { Card, Button } from "antd";
import styles from "./style.module.less";
class Buttons extends Component {
  render() {
    return (
      <div className={styles.buttonwamp}>
        <Card title="基础按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
        </Card>
        <Card title="带图标按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary" shape="circle" icon="search" />
          <Button type="primary" icon="search">
            Search
          </Button>
          <Button shape="circle" icon="search" />
          <Button icon="search">Search</Button>
        </Card>
        <Card title="loading按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary" loading >loading</Button>
          <Button type="primary" loading size="small">
            Loading
          </Button>
          <Button shape="circle" loading />
          <Button shape="circle" icon="loading" type="primary"/>
        </Card>
      </div>
    );
  }
}
export default Buttons;
