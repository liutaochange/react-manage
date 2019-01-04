import React, { PureComponent } from "react";
import { Card, notification, Button } from "antd";
import styles from "./style.module.less";
class Notification extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    };
  }

  openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  render() {
    return (
      <div className={styles.notification}>
        <Card title="基础加载项" style={{ marginBottom: "10px" }}>
          <Button onClick={this.openNotification}>提醒</Button>
        </Card>
        <Card title="内容遮罩" style={{ marginBottom: "10px" }}>
          
        </Card>
      </div>
    );
  }
}
export default Notification;
