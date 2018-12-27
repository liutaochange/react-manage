import React, { PureComponent } from 'react';
import styles from './style.module.less';
class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        版权所有：黄老邪（推荐使用谷歌浏览器，可以获得更佳操作页面体验）
      </div>
    )
  }
}

export default Footer;