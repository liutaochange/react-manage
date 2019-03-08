import React, { PureComponent } from 'react';
import { Card, Form, Input, Button } from "antd";
import style from './style.module.less';
const FormItem = Form.Item;
class Login extends PureComponent {
  render() {
    let { getFieldDecorator } = this.props.form
    return (
      <div className={style.login}>
        <Card title="登录内联表单">
          <Form layout="inline">
            <FormItem>
              <Input placeholder="请输入用户名" type="text" />
            </FormItem>
            <FormItem>
              <Input placeholder="请输入密码" type="password" />
            </FormItem>
            <FormItem>
              <Button type="primary">提交</Button>
            </FormItem>
          </Form>
        </Card>
        <Card title="登录水平表单" style={{marginTop: '20px'}}>
          <Form layout="horizontal" style={{width: '300px'}}>
            <FormItem>
              {
                getFieldDecorator('user', {
                  initialValue: '黄老邪',
                  rules: [{
                    required: true,
                    message: '用户名不能为空'
                  }]
                })(
                  <Input placeholder="请输入用户名" type="text" />
                )
              }
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('password', {
                  initialValue: '123456',
                  rules: [{
                    required: true,
                    message: '密码名不能为空'
                  }]
                })(
                  <Input placeholder="请输入密码" type="password" />
                )
              }
              
            </FormItem>
            <FormItem>
              <Button type="primary">提交</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
const LoginForm =  Form.create()(Login);
export default LoginForm;