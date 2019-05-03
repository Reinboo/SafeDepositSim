import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Screen from './Screen/index';
import Serial from './Serial';
import Keypad from './Keypad/index';
import setTimeout from '../timeout';

import messages from '../screenMessages';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeywordUpdate = this.handleKeywordUpdate.bind(this);
    this.processInput = this.processInput.bind(this);
    this.setPasscode = this.setPasscode.bind(this);

    this.state = {
      doorStatus: messages.top.unlocked,
      actionStatus: messages.main.ready,
      inputPasscode: '',
      passcode: '',
      backlightStatus: 'off',
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
        this.setState({
          passcode: inputPasscode,
          inputPasscode: '',
          actionStatus: messages.main.locking,
        });
        setTimeout(
          () => this.setState({
            doorStatus: messages.top.locked,
            actionStatus: '',
          }),
          3000, // Simulate mechanical locking process
        ).refresh();
      } else { // Passcode is too short
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
    }
  }

  async processInput() {
    const {
      inputPasscode,
      passcode,
      doorStatus,
      actionStatus,
      serialNumber,
    } = this.state;

    if (actionStatus === messages.main.service) {
      this.setState({ actionStatus: messages.main.validating, inputPasscode: '' });
      await axios.get(
        'https://9w4qucosgf.execute-api.eu-central-1.amazonaws.com/default/CR-JS_team_M02a',
        { params: { code: inputPasscode } },
      ).then((response) => {
        const respSerialNumber = response.data.sn.toString();
        if (serialNumber === respSerialNumber) {
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
            3000, // Simulate mechanical unlocking process
          ).refresh();
        }
      });
      return;
    }

    if (doorStatus === messages.top.locked) {
      if (inputPasscode.length === 6) {
        if (inputPasscode === passcode) {
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
            3000, // Simulate mechanical unlocking process
          ).refresh();
        } else if (inputPasscode === '000000') { // Access Service Mode
          this.setState({
            actionStatus: messages.main.service,
            inputPasscode: '',
          });
        } else { // Wrong passcode
          this.setState({
            inputPasscode: '',
            actionStatus: messages.main.error,
          });
          setTimeout(
            () => this.setState({
              actionStatus: '',
            }),
            1000,
          );
        }
      } else { // Passcode is too short
        this.setState({
          inputPasscode: '',
          actionStatus: messages.main.error,
        });
        setTimeout(
          () => this.setState({
            actionStatus: '',
          }),
          1200,
        ).refresh();
      }
    }
  }

  handleKeywordUpdate(event) {
    const {
      inputPasscode,
      idleTimeout,
      processInputTimeout,
    } = this.state;

    if (inputPasscode.length < 6) {
      const keyFace = event.target.id;

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

  render() {
    const {
      doorStatus,
      actionStatus,
      inputPasscode,
      backlightStatus,
    } = this.state;

    const screenMessage = inputPasscode || actionStatus;

    return (
      <Wrapper>
        <Panel>
          <Screen
            screenMessage={screenMessage}
            doorStatus={doorStatus}
            backlightStatus={backlightStatus}
          />
          <Keypad handleUpdate={this.handleKeywordUpdate} handleLock={this.setPasscode} />
          <Serial serialNumber="12345" />
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
