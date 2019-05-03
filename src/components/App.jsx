import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Screen from './Screen/index';
import Serial from './Serial';
import Keypad from './Keypad/index';
import setTimeout from '../timeout';

import messages from '../screenMessages';
import service from '../service.config';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeywordUpdate = this.handleKeywordUpdate.bind(this);
    this.processInput = this.processInput.bind(this);
    this.setPasscode = this.setPasscode.bind(this);

    this.state = {
      actionStatus: messages.main.ready,
      backlightStatus: 'off',
      doorStatus: messages.top.unlocked,
      inputPasscode: '',
      passcode: '',
      processInputTimeout: setTimeout(this.processInput, 1200),
      idleTimeout: setTimeout(
        () => this.setState({
          inputPasscode: '',
          backlightStatus: 'off',
        }),
        5000,
      ),
    };
  }

  setPasscode() {
    const { inputPasscode, doorStatus } = this.state;

    if (doorStatus === messages.top.unlocked) {
      if (inputPasscode.length === 6) {
        this.lock();
      } else { // Passcode is too short
        this.error();
      }
    }
  }

  async processInput() {
    const {
      inputPasscode,
      passcode,
      doorStatus,
      actionStatus,
    } = this.state;

    const {
      serialNumber,
      servicePasscode,
      validateUrl,
    } = service;

    if (actionStatus === messages.main.service) {
      this.setState({ actionStatus: messages.main.validating, inputPasscode: '' });
      await axios.get(
        validateUrl,
        { params: { code: inputPasscode } },
      ).then((response) => {
        const respSerialNumber = response.data.sn.toString();
        if (serialNumber === respSerialNumber) {
          this.unlock();
        } else {
          this.error();
        }
      });
      return;
    }

    if (doorStatus === messages.top.locked) {
      if (inputPasscode.length === 6) {
        if (inputPasscode === passcode) {
          this.unlock();
        } else if (inputPasscode === servicePasscode) { // Access Service Mode
          this.setState({
            actionStatus: messages.main.service,
            inputPasscode: '',
          });
        } else { // Wrong passcode
          this.error();
        }
      } else { // Passcode is too short
        this.error();
      }
    }
  }

  handleKeywordUpdate(event) {
    const {
      inputPasscode,
      idleTimeout,
      processInputTimeout,
      actionStatus,
    } = this.state;

    const keyFace = event.target.id;

    // Limit passcodes to 6 digits if service mode is not enabled,
    // otherwise it's unlimited (master password is of unknown length)
    if (actionStatus === messages.main.service || (inputPasscode.length < 6 && keyFace !== '*')) {
      this.setState(prevState => ({
        inputPasscode: prevState.inputPasscode + keyFace,
      }));
    }

    processInputTimeout.refresh();
    idleTimeout.refresh();

    this.setState({
      backlightStatus: 'on',
    });
  }

  error() {
    this.setState({
      inputPasscode: '',
      actionStatus: messages.main.error,
    });
    setTimeout(
      () => this.setState({
        actionStatus: messages.main.ready,
      }),
      1000,
    ).refresh();
  }

  unlock() {
    this.setState({
      inputPasscode: '',
      passcode: '',
      actionStatus: messages.main.unlocking,
    });
    setTimeout(
      () => this.setState({
        doorStatus: messages.top.unlocked,
        actionStatus: messages.main.ready,
      }),
      3000, // Simulate mechanical unlock process
    ).refresh();
  }

  lock() {
    this.setState(prevState => ({
      passcode: prevState.inputPasscode,
      inputPasscode: '',
      actionStatus: messages.main.locking,
    }));
    setTimeout(
      () => this.setState({
        doorStatus: messages.top.locked,
        actionStatus: '',
      }),
      3000, // Simulate mechanical locking process
    ).refresh();
  }


  render() {
    const {
      doorStatus,
      actionStatus,
      inputPasscode,
      backlightStatus,
    } = this.state;

    const { serialNumber } = service;

    const screenMessage = inputPasscode || actionStatus;

    return (
      <Wrapper>
        <Panel>
          <Screen
            screenMessage={screenMessage}
            doorStatus={doorStatus}
            backlightStatus={backlightStatus}
          />
          <Keypad
            handleUpdate={this.handleKeywordUpdate}
            handleLock={this.setPasscode}
            isServiceMode={actionStatus === messages.main.service}
          />
          <Serial serialNumber={serialNumber} />
        </Panel>
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  width: 100vw; height: 100vh;
  
  display: flex;
  justify-content: center;
  align-items: center;
  
  background-color: ${props => props.theme.bgColor};
  font-family: ${props => props.theme.fontNormal};
`;

const Panel = styled.div`
  width: 20rem; height: 31rem;
  max-width: 80vw;
  max-height: 90vh;
  padding: 1.5rem 2.5rem;
  border: 1px solid black;
  border-radius: 5px;
  
  position: relative;
  
  background-color: ${props => props.theme.panelBodyColor};
`;
