import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Icon, notification, List, Breadcrumb} from 'antd';
import { EMPTY_UID, SUCCESS, TOKEN_ERROR} from '../common/errcode';

import project from '../service/project';


class Project extends Component {

  constructor(props) {
    super(props)
    this.state = {
      projects:[{app_id: 0}]
    }
  }

  componentDidMount() {
    project.get_project().then(rsp => {
      if(rsp.code === SUCCESS) {
        if(rsp.projects && rsp.projects.length > 0) {
          this.setState({projects: this.state.projects.concat(rsp.projects)})
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

  render() {
    return(
      <div>
        <div style={{margin: '20px 10px'}}>
        <Breadcrumb>
        <Breadcrumb.Item>
            <Link to="/">首页</Link>
         </Breadcrumb.Item>
         <Breadcrumb.Item>
          项目列表
        </Breadcrumb.Item>
        </Breadcrumb>
        </div>
        <List grid={{ gutter:16, xs: 2, sm: 3, md: 4, lg: 4, xl: 6 }} dataSource={this.state.projects} renderItem={item => (
          <List.Item>
           {
            item.app_id === 0
              ? (<div style = {{ width: 150, height: 100, border: '1px solid #eee', borderRadius: '5px', textAlign: 'center', lineHeight: '100px'}} >
                <Link to="/project/add" style={{
                  padding: '40px 35px'
                }}><Icon type="plus-circle-o"/> 创建项目</Link>
                </div>
              )
              : (
                <div style = {{ width: 150, height: 100, border: '1px solid #eee', borderRadius: '5px', textAlign: 'center', padding: '5px', display: 'table'}} >
                <Link
                  to={{
                  pathname: `/project/detail/${item.app_id}`
                }} style={{display: 'table-cell', verticalAlign: 'middle'}}>{item.app_name}</Link>
                </div>
              )
          } 
          </List.Item>
        )}/>
      </div>
    )
  }
}

export default Project;