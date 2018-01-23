import React, {Component} from 'react';
import {Form, Input, Button, notification, Breadcrumb} from 'antd';
import {Link} from 'react-router-dom';
import { EMPTY_UID, SUCCESS, TOKEN_ERROR} from '../common/errcode';

import project from '../service/project';

class ProjectAddForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      projectInfo: {
      }
    }
  }

  componentDidMount() {
    const id = +(this.props.match.params.id || 0);
    project.get_project({app_id: id}).then(rsp => {
      if(rsp.code === SUCCESS) {
        if(rsp.projects && rsp.projects.length === 1) {
          this.setState({projectInfo: rsp.projects[0]})
          notification.success({
            message: '成功',
            description: '项目信息加载成功',
            duration: 1
          })
        }
      } else if (rsp.code === EMPTY_UID) {
        notification.warning({
          message: '警告',
          description: '缺少用户数据!',
          duration: 2
        })
      }else if (rsp.code === TOKEN_ERROR) {
        notification.error({
          message: '错误',
          description: '验证信息错误!',
          duration: 2
        });
      } else {
        notification.error({
          message: '错误',
          description: '项目信息获取失败!',
          duration: 2
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const id = +(this.props.match.params.id || 0);

    this.props.form.validateFields((err, values) => {
      if(!err) {
        console.log(values);
        values.app_id = id;

        project.set_project(values).then(rsp => {
          if (rsp.code === SUCCESS) {
            notification.success({
              message: '成功',
              description: (id > 0 ? '项目修改成功' : '项目新建成功!'),
              duration: 1
            })
          } else if (rsp.code === EMPTY_UID) {
            notification.warning({
              message: '警告',
              description: '缺少用户数据!',
              duration: 2
            })
          } else if (rsp.code === TOKEN_ERROR) {
            notification.error({
              message: '错误',
              description: '验证信息错误!',
              duration: 2
            });
          } else {
            notification.error({
              message: '错误',
              description: '项目新建失败!',
              duration: 2
            })
          }
        }).catch(err => {
          console.log(err)
        });
      }
    })
  }
  render() {

    const { TextArea } = Input;
    const {getFieldDecorator} = this.props.form;
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
        }
      }
    }
    return (
      <div>
        <div style={{margin: '20px 10px'}}>
        <Breadcrumb>
        <Breadcrumb.Item>
            <Link to="/">首页</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
            <Link to="/project">项目列表</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          项目
        </Breadcrumb.Item>
        </Breadcrumb>
        </div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Item label="名称" {...formItemLayout}>
          {
            getFieldDecorator('app_name',{
              rules:[{
                required: true,
                message: '项目名称必须输入'
              }],
              initialValue: this.state.projectInfo.app_name
            })(<Input placeholder="请输入项目名称" />)
          }
          </Form.Item>
          <Form.Item label="token" {...formItemLayout}>
          {
            getFieldDecorator('token',{
              initialValue: this.state.projectInfo.token
            })(<Input disabled placeholder="创建后自动生成" />)
          }
          </Form.Item>
          <Form.Item label="描述" {...formItemLayout}>
          {
            getFieldDecorator('description', {
              initialValue: this.state.projectInfo.description
            })(<TextArea placeholder="请输入项目名称" rows={4}/>)
          }
          </Form.Item>
          <Form.Item label="域名" {...formItemLayout}>
          {
            getFieldDecorator('domain', {
              initialValue: this.state.projectInfo.domain
            })(<Input placeholder="请输入域名" />)
          }
          </Form.Item>
          <Form.Item wrapperCol={ {xs: {offset: 2}, sm: {offset: 2}} }>
          <Button type="primary" htmlType="submit">确定</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const ProjectAdd = Form.create()(ProjectAddForm);
export default ProjectAdd;
