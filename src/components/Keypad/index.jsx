import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Key from './Key';

const keyFaces = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '*', '0', 'L'];

const Keypad = ({ handleUpdate, handleLock }) => (
  <Wrapper>
    {keyFaces.map((value) => {
      if (value === 'L') {
        return (
          <Key keyFace={value} handleClick={handleLock} key={value} />
        );
      }
      return (
        <Key keyFace={value} handleClick={handleUpdate} key={value} />
      );
    })}
  </Wrapper>
);

Keypad.propTypes = {
  handleUpdate: PropTypes.func.isRequired,
  handleLock: PropTypes.func.isRequired,
};

const Wrapper = styled.div`
  margin: 1rem 0;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;

export default Keypad;
