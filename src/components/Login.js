import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';

import '../css/login.css';

const FormItem = Form.Item;
class NormalLoginForm extends Component {

  handleLogin = (e) => {
    e.preventDefault();
    this
      .props
      .form
      .validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form:', values);
        }
      })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <Form className="login-form" onSubmit={this.handleLogin}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '请输入你的账号!'
              }
            ]
          })(
            <Input
              prefix={< Icon type = "user" style = {{color:'rgba(0,0,0,.25)'}}/>}
              placeholder="请输入账号"/>
          )}
        </FormItem>
        <FormItem>
        {getFieldDecorator('passWord', {
            rules: [
              {
                required: true,
                message: '请输入你的密码!'
              }
            ]
          })(
            <Input
              prefix={< Icon type = "lock" style = {{color:'rgba(0,0,0,.25)'}}/>}
              type="password" placeholder="请输入密码"/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm;
