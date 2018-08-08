import React from 'react';
import { Button, Radio, Select, Progress, Tag } from 'antd';

import './BurnPage.css';

/* global nw */
const load = (nw || window).require;
const { Option } = Select;

const baudrateList = [
  100,
  300,
  600,
  1200,
  2400,
  4800,
  9600,
  14400,
  19200,
  38400,
  57600,
  115200,
  230400,
  380400,
  460800,
  921600
];

export default class BurnPage extends React.Component {
  constructor() {
    super();
    this.state = {
      showPart: 'control',
      coms: [], // {name: "com1", progress: 40}
      log: [
        '>test1',
        '>fdsowen thi sdfj',
        '>fdsowen thi sdfj fdsowen thi sdfj fdsowen thi sdfj fdsowen thi sdfj fdsowen thi sdfj'
      ],
      isDump: true,
      baudrate: 115200,
      file: ''
    };

    this.uploadRef = React.createRef();
    this.logRef = React.createRef();
    this.onHandleSelection = this.onHandleSelection.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onClickCOMButton = this.onClickCOMButton.bind(this);
    this.onChangeDump = this.onChangeDump.bind(this);
    this.onHandleLog = this.onHandleLog.bind(this);
    this.onHandleUpload = this.onHandleUpload.bind(this);
    this.onOpenUpload = this.onOpenUpload.bind(this);
    this.onBack = this.onBack.bind(this);

    // this.engine = load('engine');
    // this.engine.on('message', this.onHandleLog);

    // this.engine.on('new', device => {
    //   this.setState(pre => {
    //     const { coms } = pre;
    //     coms.push(device.path);
    //     return { coms };
    //   });
    // });
  }

  componentWillUnmount() {
    // TODO release resources
  }
  onHandleSelection(value) {
    this.setState({
      baudrate: value
    });
  }

  onHandleUpload(e) {
    const { files } = e.target;

    if (files && files.length > 0) {
      this.setState({
        file: files[0].name
      });
    }
  }

  onHandleLog() {
    const generateLog = inx => {
      setTimeout(() => {
        this.setState(
          pre => {
            const log = [...pre.log, `${inx} this is fake log, generated randomly`];
            return { log };
          },
          () => {
            this.logRef.current.scrollTop = Number.MAX_SAFE_INTEGER;
          }
        );
      }, 1000);
    };

    for (let i = 0; i < 100; i++) {
      generateLog(i);
    }
  }
  onChangeDump(e) {
    this.setState({
      isDump: e.target.value
    });
  }

  onOpenUpload() {
    this.uploadRef.current.click();
  }

  onStart() {
    if (!this.state.baudrate) {
      console.error('select Bautrate');
      return;
    }
    this.setState({
      showPart: 'result'
    });

    console.log(`engine.start('${this.state.file}', ${this.state.baudrate},  ${this.state.isDump};`);
    // this.engine.start(this.state.file, this.state.baudrate, this.state.isDump);

    for (let i = 1; i < 5; i++) {
      setTimeout(() => {
        this.setState(pre => {
          const { coms } = pre;
          coms.push({ name: `com${i}` });
          return { coms };
        });
      }, 1000);
    }
  }

  onClickCOMButton(e) {
    const { value } = e.target;
    const { coms } = this.state;
    let inx = -1;
    // eslint-disable-next-line
    if ((inx = coms.findIndex(com => com.name === value)) >= 0) {
      if (coms[inx].progress === undefined) {
        coms[inx].progress = 30;
        this.setState({
          coms: [...coms]
        });
      } else {
        //STOP
      }
    }
  }

  onBack() {
    // release resource first
    this.setState({
      coms: [],
      showPart: 'control'
    });
  }
  beforeUpload(e) {
    console.log(e);
  }

  updateAction(e) {
    console.log(e);
  }

  renderControll() {
    return (
      <div className="burn-frame">
        <div className="burn-line">
          <span className="line-label">Image :</span>
          <input
            type="file"
            onChange={this.onHandleUpload}
            ref={this.uploadRef}
            style={{ display: 'none' }}
          />
          <Button onClick={this.onOpenUpload}>Click to Upload</Button>
          <span className="file-name">{this.state.file}</span>
        </div>
        <div className="burn-line">
          <span className="line-label">Dump :</span>
          <Radio.Group defaultValue buttonStyle="solid" onChange={this.onChangeDump}>
            <Radio.Button value>是</Radio.Button>
            <Radio.Button value={false}>否</Radio.Button>
          </Radio.Group>
        </div>
        <div className="burn-line">
          <span className="line-label">Baudrate :</span>
          <Select defaultValue="115200" style={{ width: 120 }} onChange={this.onHandleSelection}>
            {baudrateList.map(bdrate => (
              <Option value={bdrate} key={bdrate}>
                {bdrate}
              </Option>
            ))}
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
    const { coms: buttons } = this.state;

    return (
      <div className="burn-frame">
        <span role="button" tabIndex="0" onClick={this.onBack} className="back">
          back
        </span>
        <div className="com-line" role="button" tabIndex="0" onClick={this.onClickCOMButton}>
          {buttons.map(button => (
            <Button
              key={button.name}
              value={button.name}
              type={button.progress === undefined ? 'primary' : ''}
            >
              {button.name}
            </Button>
          ))}
        </div>
        <div>
          {buttons.map(button => (
            <div key={button.name} className="prg-area">
              <span>{button.name}</span>
              <Progress percent={button.progress || 0} status="active" />
              <Tag color="blue">installing</Tag>
            </div>
          ))}
        </div>
        <div className="log-area" ref={this.logRef}>
          <div>{this.state.log.map((log, inx) => <p key={inx}>{log}</p>)}</div>
        </div>
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
