import React from 'react';
import { Menu } from 'antd';
import BurnPage from '../burn-page';
import './App.css';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      current: 'burn'
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({
      current: e.key
    });
  }
  renderMenu() {
    return (
      <div className="app-frame">
        <div className="app-menu">
          <span />
          <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal" theme="dark">
            <Menu.Item key="burn">burn</Menu.Item>
            <Menu.Item key="n1">Navigation One</Menu.Item>
            <Menu.Item key="n2">Navigation Two</Menu.Item>
            <Menu.Item key="n3">Navigation Three</Menu.Item>
          </Menu>
        </div>
        <div className="app-body">
          <div
            className="tab-container"
            style={{ display: this.state.current === 'burn' ? 'block' : 'none' }}
          >
            <BurnPage />
          </div>
          <div className="tab-container" style={{ display: this.state.current === 'n1' ? 'block' : 'none' }}>
            <span>navigation one page</span>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return <div>{this.renderMenu()}</div>;
  }
}
