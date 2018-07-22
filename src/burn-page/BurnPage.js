import React from 'react';
import { Upload, Button, Radio, Select, Progress, Tag } from 'antd';

import './BurnPage.css';

const { Option } = Select;

export default class BurnPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showPart: 'control',
      coms: [],
      log: [
        '>test1',
        '>fdsowen thi sdfj',
        '>fdsowen thi sdfj fdsowen thi sdfj fdsowen thi sdfj fdsowen thi sdfj fdsowen thi sdfj'
      ],
      isDump: false,
      ratio: null
    };

    this.onHandleSelection = this.onHandleSelection.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onClickCOMButton = this.onClickCOMButton.bind(this);
    this.onChangeDump = this.onChangeDump.bind(this);
  }

  onHandleSelection(value) {
    this.setState({
      ratio: value
    });
  }

  onHandleLog() {
    const log = ['new log', ...this.state.log];
    this.setState({
      log
    });
  }
  onChangeDump(e) {
    this.setState({
      isDump: e.target.value
    });
  }

  onStart() {
    if (!this.state.ratio) {
      console.error('select ratio');
      return;
    }
    this.setState({
      showPart: 'result'
    });
  }

  onClickCOMButton(e) {
    const { value } = e.target;

    if (this.state.coms.indexOf(value) >= 0) {
      return;
    }

    const coms = [...this.state.coms, value];
    this.setState({
      coms
    });
  }

  renderControll() {
    return (
      <div className="burn-frame">
        <div className="burn-line">
          <span className="line-label">Image :</span>
          <Upload>
            <Button>Click to Upload</Button>
          </Upload>
        </div>
        <div className="burn-line">
          <span className="line-label">Dump :</span>
          <Radio.Group defaultValue={false} buttonStyle="solid" onChange={this.onChangeDump}>
            <Radio.Button value={true}>是</Radio.Button>
            <Radio.Button value={false}>否</Radio.Button>
          </Radio.Group>
        </div>
        <div className="burn-line">
          <span className="line-label">Build Ratio :</span>
          <Select style={{ width: 120 }} onChange={this.onHandleSelection}>
            <Option value="100">100</Option>
            <Option value="200">200</Option>
          </Select>
        </div>
        <div className="burn-line">
          <Button type="primary" onClick={this.onStart} className="start-btn">
            Start
          </Button>
        </div>
      </div>
    );
  }
  renderResult() {
    const buttons = ['com1', 'com2', 'com3', 'com4'];

    return (
      <div className="burn-frame">
        <div className="com-line" onClick={this.onClickCOMButton}>
          {buttons.map(button => (
            <Button key={button} value={button} type={this.state.coms.indexOf(button) >= 0 ? 'primary' : ''}>
              {button}
            </Button>
          ))}
        </div>
        <div>
          {this.state.coms.map(com => (
            <div key={com} className="prg-area">
              <span>{com}</span>
              <Progress percent={50} status="active" />
              <Tag color="blue">installing</Tag>
            </div>
          ))}
        </div>
        <div className="log-area">{this.state.log.map((log, inx) => <p key={inx}>{log}</p>)}</div>
      </div>
    );
  }
  render() {
    return (
      <div>
        <div style={{ display: this.state.showPart === 'control' ? 'block' : 'none' }}>
          {this.renderControll()}
        </div>
        <div style={{ display: this.state.showPart === 'result' ? 'block' : 'none' }}>
          {this.renderResult()}
        </div>
      </div>
    );
  }
}
