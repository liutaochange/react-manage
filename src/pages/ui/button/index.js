import React, { PureComponent } from "react";
import { Card, Button, Icon, Radio } from "antd";
import styles from "./style.module.less";
const ButtonGroup = Button.Group;
class Buttons extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      size: 'large'
    };
  }

  handleSizeChange = (e) => {
    this.setState(() => ({ 
      size: e.target.value 
    }));
  }
  render() {
    const { size } = this.state;
    return (
      <div className={styles.buttonwamp}>
        <Card title="基础按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button disabled>disabled</Button>
        </Card>
        <Card title="带图标按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary" shape="circle" icon="search" />
          <Button type="primary" icon="search">搜索</Button>
          <Button shape="circle" icon="search" />
          <Button icon="edit">编辑</Button>
          <Button icon="delete">删除</Button>
          <Button icon="plus">添加</Button>
        </Card>
        <Card title="loading按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary" loading >loading</Button>
          <Button type="primary" loading size="small">Loading</Button>
          <Button shape="circle" loading />
          <Button shape="circle" icon="loading" type="primary"/>
        </Card>
        <Card title="按钮组" style={{ marginBottom: "10px" }}>
          <ButtonGroup className={styles.btnGroup}>
            <Button>Cancel</Button>
            <Button>OK</Button>
          </ButtonGroup>
          <ButtonGroup className={styles.btnGroup}>
            <Button>L</Button>
            <Button>M</Button>
            <Button>R</Button>
          </ButtonGroup>
          <ButtonGroup className={styles.btnGroup}>
            <Button type="primary">
              <Icon type="left" />返回
            </Button>
            <Button type="primary">
              前进<Icon type="right" />
            </Button>
          </ButtonGroup>
          <ButtonGroup className={styles.btnGroup}>
            <Button type="primary" icon="cloud" />
            <Button type="primary" icon="cloud-download" />
          </ButtonGroup>
        </Card>
        <Card title="控制按钮尺寸" style={{ marginBottom: "10px" }}>
          <Radio.Group  value={size} onChange={this.handleSizeChange} style={{ marginRight: "15px" }}>
            <Radio  value="large">Large</Radio >
            <Radio  value="default">Default</Radio >
            <Radio  value="small">Small</Radio >
          </Radio.Group >
          <Button type="primary" size={size}>Primary</Button>
          <Button size={size}>Normal</Button>
          <Button type="dashed" size={size}>Dashed</Button>
          <Button type="danger" size={size}>Danger</Button>
        </Card>
      </div>
    );
  }
}
export default Buttons;
