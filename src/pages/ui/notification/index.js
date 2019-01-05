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
      message: '开启成功',
      description: '恭喜成功开启react学习的宝箱',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  openNotAutoClose = () => {
    notification.open({
      message: '开启成功',
      description: '恭喜成功开启react学习的宝箱,我可以自动关闭',
      duration: 3,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  }

  openNotificationWithIcon = (type) => {
    notification[type]({
      message: 'Notification Title',
      description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    });
  };

  render() {
    return (
      <div className={styles.notification}>
        <Card title="全局展示通知提醒信息" style={{ marginBottom: "10px" }}>
          <Button onClick={this.openNotification} type="primary">提醒</Button>
          <Button onClick={this.openNotAutoClose} type="primary">提醒3s自动关闭</Button>
        </Card>
        <Card title="自动关闭" style={{ marginBottom: "10px" }}>
          <Button onClick={() => this.openNotificationWithIcon('success')} type="primary">Success</Button>
          <Button onClick={() => this.openNotificationWithIcon('info')} type="primary">Info</Button>
          <Button onClick={() => this.openNotificationWithIcon('warning')} type="primary">Warning</Button>
          <Button onClick={() => this.openNotificationWithIcon('error')} type="primary">Error</Button>
        </Card>
      </div>
    );
  }
}
export default Notification;
