import React, { PureComponent } from 'react';
import { Layout } from 'antd';
import LeftNav from '@/components/leftnav/index.js';
import Header from '@/components/header/index.js';
import Footer from '@/components/footer/index.js';
import './App.less';
const { Sider, Content } = Layout;
class Admin extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false,
    }
  }

  toggle = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed
    }));
  }

  render() {
    return (
      <div className='containter'>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={this.state.collapsed}
          >
            <LeftNav />
          </Sider>
          <Layout>
            <Header type={this.state.collapsed} toggle={this.toggle} />
            <Content style={{
              margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280,
            }}
            >
            {this.props.children}
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Admin;
