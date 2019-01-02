import React, { PureComponent } from "react";
import { Card, Button, Icon, Modal } from "antd";
import styles from "./style.module.less";
class Modals extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    };
  }

  showModal = () => {
    this.setState(() => ({ 
      visible: true
    }));
  }

  handleOk = () => {
    this.setState(() => ({ 
      visible: false
    }));
  }

  handleCancel = () => {
    this.setState(() => ({ 
      visible: false
    }));
  }

  render() {
    return (
      <div className={styles.buttonwamp}>
        <Card title="基础按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary" onClick={this.showModal}>
            Open Modal
          </Button>
        </Card>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}
export default Modals;
