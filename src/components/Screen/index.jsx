import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Main from './Main';

const Screen = ({ screenMessage, doorStatus, backlightStatus }) => (
  <Wrapper className={backlightStatus}>
    {doorStatus}
    <Main message={screenMessage} />
  </Wrapper>
);

Screen.propTypes = {
  screenMessage: PropTypes.string.isRequired,
  doorStatus: PropTypes.string.isRequired,
  backlightStatus: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  height: 7rem;
  padding: .5rem;
  border: 1px solid rgba(0, 0, 0, .35);
  border-radius: 5px;
  
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: space-between;
  
  background-color: ${props => props.theme.screenBacklightOffColor};  
  
  transition: background-color .2s linear,
              box-shadow .2s linear;
  
  &.on {
    background-color: ${props => props.theme.screenBacklightOnColor};  
    box-shadow: 0 0 10px 1px ${props => props.theme.screenBacklightOnColor};
  }
`;

export default Screen;
