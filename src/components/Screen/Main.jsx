import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Main = ({ message }) => (
  <Wrapper>
    <span>{message}</span>
  </Wrapper>
);

Main.propTypes = {
  message: PropTypes.string.isRequired,
};

const Wrapper = styled.div`
  position: absolute;
  bottom: .5rem; right: .5rem;
  text-align: right;
  font: 1.5rem ${props => props.theme.fontMedium};
`;

export default Main;
