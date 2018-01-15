import React, {Component} from 'react';
import {Form, Input, Button, notification} from 'antd';
import user from '../service/user';
import {SUCCESS, TOKEN_ERROR, NO_USER} from '../common/errcode';

class ProfileForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: {}
    }
  }
  
  componentDidMount() {
    user.get_user().then( rsp => {
      if(rsp.code === SUCCESS) {
        notification.success({
          message: '成功',
          description: '',
          duration: 2
        })
        this.setState({userInfo: rsp.userInfo});
      } else if (rsp.code === NO_USER) {
        notification.warning({
          message: '警告',
          description: '不存在用户',
          duration: 2
        });
      } else if (rsp.code === TOKEN_ERROR) {
        notification.error({
          message: '错误',
          description: '验证信息错误',
          duration: 2
        });
      }
      
    })
  }

  handleUserChange = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) =>{
      if(!err) {
        const newuserinfo = this.props.form.getFieldsValue();
        newuserinfo.id = this.state.userInfo.id;
        // 更新信息
        user.set_user(newuserinfo).then( rsp => {
          this.setState({userInfo: newuserinfo});
          if(rsp.code === SUCCESS) {
            notification.success({
              message: '成功',
              description: '',
              duration: 2
            })
          } else if (rsp.code === TOKEN_ERROR) {
            notification.error({
              message: '错误',
              description: '验证信息错误',
              duration: 2
            });
          } else {
            notification.warning({
              message: '警告',
              description: '个人信息更新失败',
              duration: 2
            });
          }
        })
      }
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
      <Form onSubmit={this.handleUserChange}>
        <Form.Item label="账号" {...formItemLayout}>
        { getFieldDecorator("username",{
          initialValue: this.state.userInfo.username
        })(
          <Input placeholder="账号" disabled/>
        )}
        </Form.Item>
        <Form.Item label="邮箱" {...formItemLayout}>
        { getFieldDecorator("email",{
          initialValue: this.state.userInfo.email,
          rules:[{type: 'email', message: '邮箱格式不准确'}]
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
        <Form.Item wrapperCol={ {xs: {offset: 2}, sm: {offset: 2}} }>
          <Button type="primary" htmlType="submit">确定</Button>
        </Form.Item>
      </Form>
    )
  }
}
const Profile = Form.create()(ProfileForm);
export default Profile;

