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
const Gallery = lazy(() => import('@/pages/ui/gallery/index.js'));
const Carousels = lazy(() => import('@/pages/ui/carousel/index.js'));
const Login = lazy(() => import('@/pages/form/login/index.js'));
const Register = lazy(() => import('@/pages/form/register/index.js'));
const BaseTable = lazy(() => import('@/pages/table/baseTable/index.js'));
const HighTable = lazy(() => import('@/pages/table/highTable/index.js'));
const City = lazy(() => import('@/pages/city/manage/index.js'));
const Order = lazy(() => import('@/pages/order/index.js'));
const User = lazy(() => import('@/pages/user/index.js'));
const Bike = lazy(() => import('@/pages/bike/index.js'));
const Bar = lazy(() => import('@/pages/echarts/bar/index'));
const Pie = lazy(() => import('@/pages/echarts/pie/index'));
const Line = lazy(() => import('@/pages/echarts/line/index'));
const Rich = lazy(() => import('@/pages/rich/index'));
const Permission = lazy(() => import('@/pages/permission/index'));
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
                <Route exact path="/ui/gallery" component={props => <Gallery {...props} />} />
                <Route exact path="/ui/carousel" component={props => <Carousels {...props} />} />
                <Route exact path="/form/login" component={props => <Login {...props} />} />
                <Route exact path="/form/reg" component={props => <Register {...props} />} />
                <Route exact path="/table/basic" component={props => <BaseTable {...props} />} />
                <Route exact path="/table/high" component={props => <HighTable {...props} />} />
                <Route exact path="/city" component={props => <City {...props} />} />
                <Route exact path="/order" component={props => <Order {...props} />} />
                <Route exact path="/user" component={props => <User {...props} />} />
                <Route exact path="/bikeMap" component={props => <Bike {...props} />} />
                <Route exact path="/charts/bar" component={props => <Bar {...props} />} />
                <Route exact path="/charts/pie" component={props => <Pie {...props} />} />
                <Route exact path="/charts/line" component={props => <Line {...props} />} />
                <Route exact path="/rich" component={props => <Rich {...props} />} />
                <Route exact path="/permission" component={props => <Permission {...props} />} />
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
