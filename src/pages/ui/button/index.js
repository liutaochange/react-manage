import React, { Component } from 'react';
import { Card, Button } from 'antd';
import styles from './style.module.less'
class Buttons extends Component {
  render() {
    return (
      <div className={styles.buttonwamp}>
        <Card title="基础按钮">
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
        </Card>
      </div>
    )
  }
}
export default Buttons;