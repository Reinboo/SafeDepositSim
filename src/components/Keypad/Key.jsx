import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Key = ({ keyFace, handleClick }) => (
  <Wrapper type="button" id={keyFace} onClick={handleClick}>
    {keyFace}
  </Wrapper>
);

Key.propTypes = {
  keyFace: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

const Wrapper = styled.button`
  width: 4rem; height: 4rem;
  margin: .5rem;
  border: 1px solid rgba(0, 0, 0, .5);
  border-radius: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${props => props.theme.buttonColor};
  box-shadow: 1px 1px 3px 0 rgba(0, 0, 0, .5);
  cursor: pointer;
  font: 2.5rem ${props => props.theme.fontMedium};
  color: ${props => props.theme.buttonTextColor};
  
  transition: background-color .2s linear;
  
  &:hover {
    background-color: ${props => props.theme.buttonColorPressed};
  }
`;

export default Key;
