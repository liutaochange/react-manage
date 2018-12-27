import React, { Component } from 'react';
import styles from './style.module.less';

class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <img src={require('@/assets/images/home.jpg')} alt="home" />
      </div>
    )
  }
}
export default Home;