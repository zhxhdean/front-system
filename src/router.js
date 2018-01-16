import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/index.css';
import PrivateRoute from './common/privateroute';
import DefaultLayout from './components/Layout';
import Login from './components/Login';
import Index from './components/Index';
import Profile from './components/Profile';
import App from './App';
import Project from './components/Project';
import ProjectAdd from './components/ProjectAdd';
const Routers = () => {
  // 路由集合
  const routes = [
    {
      path: '/',
      main: Index,
      exact: true
    }, {
      path: '/profile',
      main: Profile,
      exact: true
    }, {
      path: '/app',
      main: App
    }, {
      path: '/project/add',
      main: ProjectAdd,
      exact: true
    }, {
      path: '/project/detail/:id',
      main: ProjectAdd,
      exact: true,
      strict: true
    }, {
      path: '/project',
      main: Project,
      exact: true
    }
  ]

  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <DefaultLayout>
        { routes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact} strict={route.strict} component={PrivateRoute(route.main)} />
                ))
        }
        </DefaultLayout>
      </Switch>
    </Router>
  )
}

export default Routers;
