import React from 'react';
import styled from 'styled-components';

import Screen from './Screen/index';
import Serial from './Serial';
import Keypad from './Keypad/index';
import setTimeout from '../timeout';

import messages from '../screenMessages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doorStatus: messages.top.unlocked,
      actionStatus: '',
      inputPasscode: '',
      backlightStatus: 'off',
      validate: setTimeout(() => console.log('validating'), 1200),
      idle: setTimeout(() => this.setState({ backlightStatus: 'off' }), 5000),
    };

    this.handleKeywordUpdate = this.handleKeywordUpdate.bind(this);
  }

  handleKeywordUpdate(event) {
    const {
      inputPasscode,
      idle,
      validate,
    } = this.state;

    if (inputPasscode.length < 6) {
      const keyFace = event.target.id;

      this.setState(prevState => ({
        inputPasscode: prevState.inputPasscode + keyFace,
      }));
    }

    validate.refresh();
    idle.refresh();

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

    const screenMessage = actionStatus || inputPasscode;

    return (
      <Wrapper>
        <Panel>
          <Screen
            screenMessage={screenMessage}
            doorStatus={doorStatus}
            backlightStatus={backlightStatus}
          />
          <Keypad handleUpdate={this.handleKeywordUpdate} />
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
