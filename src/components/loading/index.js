import React, { PureComponent } from 'react';
import styles from './style.module.less';
import { Spin, Icon } from 'antd';
const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;
class Loading extends PureComponent {
  render() {
    return (
      <div className={styles.loading}>
        <Spin indicator={antIcon} className={styles.spin} />
      </div>
    )
  }
}
export default Loading;
