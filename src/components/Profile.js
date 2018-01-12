import React, {Component} from 'react';
import {Form, Input, Button} from 'antd';
import user from '../service/user';

class ProfileForm extends Component {

  state = {
    userInfo: {}
  }
  componentDidMount() {
    user.get_user().then( rsp => {
      this.setState({userInfo: rsp})
    })
  }

  render() {
    const { getFieldDecorator} = this.props.form;
    //xs < 576px ,sm >= 576px ,md >=768px ,lg >=992px ,xl >=1200px ,xxl >=1600px
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol:{
        xs: {
          span: 24
        },
        sm: {
          span: 16
        },
        md: {
         span: 14
        },
        lg: {
         span: 12
        },
        xl: {
          span: 10
        },
        xxl: {
          span: 8
        }
    }};
    return (
      <Form>
        <Form.Item label="账号" {...formItemLayout}>
        { getFieldDecorator("userName",{
          initialValue: this.state.userInfo.userName
        })(
          <Input placeholder="账号" disabled/>
        )}
        </Form.Item>
        <Form.Item label="邮箱" {...formItemLayout}>
        { getFieldDecorator("email",{
          initialValue: this.state.userInfo.email
        })(
          <Input placeholder="请输入邮箱"/>
        )}
        </Form.Item>
        <Form.Item label="手机" {...formItemLayout}>
        { getFieldDecorator("phone",{
          initialValue: this.state.userInfo.phone
        })(
          <Input placeholder="请输入手机"/>
        )}
        </Form.Item>
        <Form.Item label="公司" {...formItemLayout}>
        { getFieldDecorator("company",{
          initialValue: this.state.userInfo.company
        })(
          <Input placeholder="请输入公司"/>
        )}
        </Form.Item>
        <Form.Item label="职位" {...formItemLayout}>
        { getFieldDecorator("job",{
          initialValue: this.state.userInfo.job
        })(
          <Input placeholder="请输入职位"/>
        )}
        </Form.Item>
      </Form>
    )
  }
}
const Profile = Form.create()(ProfileForm);
export default Profile;

