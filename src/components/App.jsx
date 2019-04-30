import React from 'react';
import styled from 'styled-components';

import Screen from './Screen/index';
import Serial from './Serial';
import Keypad from './Keypad/index';

const App = () => {
  const [keyword, setKeyword] = React.useState('');

  const handleKeywordUpdate = (event) => {
    if (keyword.length < 6) {
      const keyFace = event.target.id;
      setKeyword(keyword + keyFace);
    }
  };

  return (
    <Wrapper>
      <Panel>
        <Screen keyword={keyword} />
        <Keypad handleUpdate={handleKeywordUpdate} />
        <Serial serialNumber="12345" />
      </Panel>
    </Wrapper>
  );
};

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

export default App;
