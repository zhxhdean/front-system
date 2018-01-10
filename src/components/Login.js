import React, {Component} from 'react';
import {
  Form,
  Icon,
  Input,
  Button,
  Checkbox,
  message
} from 'antd';

import '../css/login.css';

import api from '../service/login';

import {SUCCESS} from '../common/errcode';

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
          let username = values.userName;
          let password = values.passWord;
          api
            .login(username, password)
            .then(rsp => {
              if (rsp.code === SUCCESS) {
                message.success(rsp.msg)
              } else {
                message.error(rsp.msg)
              }
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
  }

  render() {
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 8
        }
      },
      wrapperCol: {
        xs: {
          span: 24
        },
        sm: {
          span: 16
        }
      }
    };
    return (
      <div>
        <Form className="login-form" onSubmit={this.handleLogin}>
          <FormItem label="账号" {...formItemLayout}>
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
          <FormItem label="密码" {...formItemLayout}>
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
                type="password"
                placeholder="请输入密码"/>
            )}
          </FormItem>
          <FormItem
            wrapperCol={{
            xs: {
              span: 24,
              offset: 0
            },
            sm: {
              span: 16,
              offset: 8
            }
          }}>
            {getFieldDecorator('remember', {
              initialValue: true,
              valuePropName: 'checked'
            })(
              <Checkbox>记住账号</Checkbox>
            )}
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
          </FormItem>
        </Form>

      </div>
    )
  }
}

const LoginForm = Form.create()(NormalLoginForm);
export default LoginForm;
