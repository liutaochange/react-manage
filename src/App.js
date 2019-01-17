import React, { PureComponent, lazy, Suspense } from 'react';
import { Layout } from 'antd';
import LeftNav from '@/components/leftnav/index.js';
import Header from '@/components/header/index.js';
import Footer from '@/components/footer/index.js';
import { Route, Switch, Redirect } from 'react-router-dom';
import Loading from '@/components/loading/index.js';
import './App.less';
const Home = lazy(() => import('@/pages/home/index.js'));
const Button = lazy(() => import('@/pages/ui/button/index.js'));
const Modal = lazy(() => import('@/pages/ui/modal/index.js'));
const Spin = lazy(() => import('@/pages/ui/spin/index.js'));
const Notification = lazy(() => import('@/pages/ui/notification/index.js'));
const Message = lazy(() => import('@/pages/ui/message/index.js'));
const Tabs = lazy(() => import('@/pages/ui/tabs/index.js'));
const { Sider, Content } = Layout;
class Admin extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: false
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
              margin: '24px 16px', padding: 24, background: '#fff', overflow: 'hidden', boxSizing: 'border-box', position: 'relative'
            }}
            >
            <Suspense fallback={<Loading />}>
              <Switch>
                <Route exact path="/home" component={props => <Home {...props} />} />
                <Route exact path="/ui/buttons" component={props => <Button {...props} />} />
                <Route exact path="/ui/modals" component={props => <Modal {...props} />} />
                <Route exact path="/ui/loadings" component={props => <Spin {...props} />} />
                <Route exact path="/ui/notification" component={props => <Notification {...props} />} />
                <Route exact path="/ui/messages" component={props => <Message {...props} />} />
                <Route exact path="/ui/tabs" component={props => <Tabs {...props} />} />
                <Redirect to="/home" />
              </Switch>
            </Suspense>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Admin;
