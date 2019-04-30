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
  text-align: right;
  font: 2rem ${props => props.theme.fontMedium};
`;

export default Main;
