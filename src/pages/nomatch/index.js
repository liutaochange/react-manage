import React, { Component } from 'react';
import styles from './style.module.less';
class Nomatch extends Component {
  render() {
    return (
      <div className={styles.nomatch}>
        <section><h1>404</h1><p>你要找的页面不存在<a href="/">返回首页</a></p></section>
      </div>
    )
  }
}
export default Nomatch;