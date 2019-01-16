import React, { PureComponent } from "react";
import { Card, message, Button } from "antd";
import styles from "./style.module.less";
class Message extends PureComponent {
  handleOpen = (type) => {
    message[type]('This is a message of global');
  }

  render() {
    return (
      <div className={styles.tabs}>
        <Card title="全局提示" style={{ marginBottom: "10px" }}>
          <Button type="primary" onClick={() => {this.handleOpen('success')}}>success</Button>
          <Button type="primary" onClick={() => {this.handleOpen('error')}}>error</Button>
          <Button type="primary" onClick={() => {this.handleOpen('info')}}>info</Button>
          <Button type="primary" onClick={() => {this.handleOpen('warning')}}>warning</Button>
          <Button type="primary" onClick={() => {this.handleOpen('loading')}}>loading</Button>
        </Card>
      </div>
    );
  }
}
export default Message;
