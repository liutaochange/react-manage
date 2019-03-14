import React, { PureComponent } from 'react';
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
import style from './style.module.less';
const FormItem = Form.Item;
class Login extends PureComponent {
  handleSubmit = () => {
    let values = this.props.form.getFieldsValue()
    this.props.form.validateFields((err) => {
      if (!err) {
        message.success(`${values.user} 恭喜你，您通过本次表单组件学习，当前密码为：${values.password}`)
      }
    })
  }

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
                  <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" type="text" />
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
                  <Input prefix={<Icon type="lock"/>} placeholder="请输入密码" type="password" />
                )
              }
              
            </FormItem>
            <FormItem>
              {
                getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                  rules: [{
                    required: true,
                    message: '请记住密码'
                  }]
                })(
                  <Checkbox>记住密码</Checkbox>
                )
              }
              <a href="http://baidu.com" style={{float: 'right'}}>忘记密码</a>
            </FormItem>
            <FormItem>
              <Button type="primary" onClick = {this.handleSubmit}>提交</Button>
            </FormItem>
          </Form>
        </Card>
      </div>
    )
  }
}
const LoginForm =  Form.create()(Login);
export default LoginForm;