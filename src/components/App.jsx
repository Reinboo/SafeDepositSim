import React from 'react';
import styled from 'styled-components';

import Screen from './Screen/index';
import Serial from './Serial';
import Keypad from './Keypad/index';

import messages from '../screenMessages';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      doorStatus: messages.top.unlocked,
      actionStatus: '',
      inputPasscode: '',
      backlightStatus: 'off',
    };

    this.handleKeywordUpdate = this.handleKeywordUpdate.bind(this);
  }

  handleKeywordUpdate(event) {
    const { inputPasscode } = this.state;

    if (inputPasscode.length < 6) {
      const keyFace = event.target.id;

      this.setState(prevState => ({
        inputPasscode: prevState.inputPasscode + keyFace,
      }));
    }

    this.setState({
      backlightStatus: 'on',
    });
    window.setTimeout(() => this.setState({ backlightStatus: 'off' }), 5000);
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
