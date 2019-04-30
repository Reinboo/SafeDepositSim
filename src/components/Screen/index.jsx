import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Main from './Main';

import messages from '../../screenMessages';

const Screen = ({ keyword }) => {
  const status = messages.top.unlocked;
  return (
    <Wrapper>
      {status}
      <Main message={keyword} />
    </Wrapper>
  );
};

Screen.propTypes = {
  keyword: PropTypes.string.isRequired,
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
  
  &.on {
    box-shadow: 0 0 10px 1px ${props => props.theme.screenBacklightOnColor};
  }
`;

export default Screen;
