import React, { PureComponent } from "react";
import { Card, message, Tabs, Icon } from "antd";
import styles from "./style.module.less";
const TabPane = Tabs.TabPane;
class Message extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      newTabIndex: 0,
      panes: [
        {
          title: 'Tab 1',
          content: 'Tab 1',
          key: '1'
        },
        {
          title: 'Tab 2',
          content: 'Tab 2',
          key: '2'
        },
        {
          title: 'Tab 3',
          content: 'Tab 3',
          key: '3'
        }
      ],
      activeKey: '1'
    }
  }

  onChange = (activeKey) => {
    this.setState({
      activeKey
    })
  }

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.state.newTabIndex++}`;
    panes.push({ title: activeKey, content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }
  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  handleCallback = (key) => {
    message.info("Hi,您选择了页签：" + key)
  }

  render() {
    return (
      <div className={styles.tabs}>
        <Card title="Tab页签" style={{ marginBottom: "10px" }}>
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab="Tab 1" key="1">欢迎学习React课程</TabPane>
            <TabPane tab="Tab 2" key="2" disabled>欢迎学习React课程</TabPane>
            <TabPane tab="Tab 3" key="3">React是一个非常受欢迎的MV*框架</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" style={{ marginBottom: "10px" }}>
          <Tabs defaultActiveKey="1" onChange={this.handleCallback}>
            <TabPane tab={<span><Icon type="plus" />Tab 1</span>} key="1">欢迎学习React课程</TabPane>
            <TabPane tab={<span><Icon type="edit" />Tab 2</span>} key="2">欢迎学习React课程</TabPane>
            <TabPane tab={<span><Icon type="delete" />Tab 3</span>} key="3">React是一个非常受欢迎的MV*框架</TabPane>
          </Tabs>
        </Card>
        <Card title="Tab带图的页签" style={{ marginBottom: "10px" }}>
          <Tabs
            onChange={this.onChange}
            activeKey={this.state.activeKey}
            type="editable-card"
            onEdit={this.onEdit}
          >
            {
              this.state.panes.map((panel) => {
                return <TabPane
                  tab={panel.title}
                  key={panel.key}

                >react项目实战</TabPane>
              })
            }
          </Tabs>
        </Card>
      </div>
    );
  }
}
export default Message;
