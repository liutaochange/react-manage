import React, { PureComponent } from 'react';
import { Card, Form, Input, Button } from "antd";
import style from './style.module.less';
const FormItem = Form.Item;
class Login extends PureComponent {
  render() {
    return (
      <div className={style.login}>
        <Card title="行内内联表单">
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
      </div>
    )
  }
}
export default Login;