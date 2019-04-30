import React from 'react';
import styled from 'styled-components';

import Key from './Key';

const keyFaces = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '*', '0', 'L'];

const Keypad = () => (
  <Wrapper>
    {keyFaces.map(value => (
      <Key keyFace={value} />
    ))}
  </Wrapper>
);

const Wrapper = styled.div`
  margin: 1rem 0;

  display: grid;
  grid-template-rows: repeat(4, 1fr);
  grid-template-columns: repeat(3, 1fr);
`;

export default Keypad;
