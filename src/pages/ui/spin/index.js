import React, { PureComponent } from "react";
import { Card, Alert, Spin, Icon } from "antd";
import styles from "./style.module.less";
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Spins extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    };
  }

  render() {
    return (
      <div className={styles.Spins}>
        <Card title="基础加载项" style={{ marginBottom: "10px" }}>
          <Spin indicator={antIcon} className={styles.spinItem}/>
          <Spin size="small" className={styles.spinItem}/>
          <Spin size="large" className={styles.spinItem}/>
        </Card>
        <Card title="内容遮罩" style={{ marginBottom: "10px" }}>
          <Spin indicator={antIcon}>
            <Alert
              message="Alert message title"
              description="Further details about the context of this alert."
              type="info"
            />
          </Spin>
        </Card>
      </div>
    );
  }
}
export default Spins;
