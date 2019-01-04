import React, { PureComponent } from "react";
import { Card, Button, Modal } from "antd";
import styles from "./style.module.less";
class Modals extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showModal1: false,
      showModal2: false,
      showModal3: false,
      showModal4: false
    };
  }

  handleOpen = (arg) => {
    this.setState(() => ({
      [arg]: true
    }));
  }

  handleConfirm = (type) => {
    Modal[type]({
      title: '确认？',
      content: '你确定你学会了React了吗？',
      onOk() {
        console.log('Ok')
      },
      onCancel() {
        console.log('Cancel')
      }
    })
  }

  render() {
    return (
      <div className={styles.modals}>
        <Card title="基础按钮" style={{ marginBottom: "10px" }}>
          <Button type="primary" onClick={() => {this.handleOpen('showModal1')}}>Open</Button>
          <Button type="primary" onClick={() => {this.handleOpen('showModal2')}}>自定义页脚</Button>
          <Button type="primary" onClick={() => {this.handleOpen('showModal3')}}>顶部50px弹框</Button>
          <Button type="primary" onClick={() => {this.handleOpen('showModal4')}}>水平垂直居中</Button>
        </Card>
        <Card title="信息确认框" style={{ marginBottom: "10px" }}>
          <Button type="primary" onClick={() => {this.handleConfirm('confirm')}}>Confirm</Button>
          <Button type="primary" onClick={() => {this.handleConfirm('info')}}>Info</Button>
          <Button type="primary" onClick={() => {this.handleConfirm('success')}}>Success</Button>
          <Button type="primary" onClick={() => {this.handleConfirm('warning')}}>Warning</Button>
        </Card>
        <Modal
          title="Basic Modal"
          visible={this.state.showModal1}
          onCancel={() => {
            this.setState({
              showModal1: false
            })
          }}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal2}
          okText="好的"
          cancelText="算了"
          onCancel={() => {
            this.setState({
              showModal2: false
            })
          }}
        >
          <p>欢迎学习React高级课程</p>
        </Modal>
        <Modal
          title="React"
          style={{ top: 50 }}
          visible={this.state.showModal3}
          onCancel={() => {
            this.setState({
              showModal3: false
            })
          }}
        >
          <p>欢迎学习React高级课程</p>
        </Modal>
        <Modal
          title="React"
          visible={this.state.showModal4}
          onCancel={() => {
            this.setState({
              showModal4: false
            })
          }}
        >
          <p>欢迎学习React高级课程</p>
        </Modal>
      </div>
    );
  }
}
export default Modals;
