import React from 'react';
import { Layout, Menu} from 'antd';
import '../css/index.css';
import { Link} from 'react-router-dom';

const { Header, Content, Footer } = Layout;



const DefaultLayout = ({children}) => {
  let selectedKeys = ['1'];
  const url = window.location.href;
  if(url.includes('project')) {
    selectedKeys = ['2']
  } else if (url.includes('profile')) {
    selectedKeys = ['3']
  }

  return (
      <Layout className="layout">
        <Header>
          <div className="logo">此处放Logo</div>
          <Menu theme="dark" mode="horizontal" style={{ lineHeight: '64px' }} defaultSelectedKeys = {['1']} selectedKeys={selectedKeys}>
            <Menu.Item key="1"><Link to="/">首页</Link></Menu.Item>
            <Menu.Item key="2"><Link to="/project">项目</Link></Menu.Item>
            <Menu.Item key="3"><Link to="/profile">账户设置</Link></Menu.Item>
          </Menu>
        </Header>
        <Content style={{ background: '#fff', padding: 15, minHeight: 280 }}>
        {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Front ©2018 Created by XXX.com
        </Footer>
      </Layout>
    )
}

export default DefaultLayout;
  