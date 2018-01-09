import React, {Component} from 'react';
import logo from './logo.svg';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import {LocaleProvider, Button, DatePicker} from 'antd';

import './App.css';


class App extends Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <div className="App-intro">
            <Button type="primary">button</Button>
            <DatePicker/>
          </div>
        </div>
      </LocaleProvider>
    );
  }
}

export default App;
