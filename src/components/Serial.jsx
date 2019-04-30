import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Serial = ({ serialNumber }) => (
  <Wrapper>
    <span className="serial">
      S/N:
      {serialNumber}
    </span>
  </Wrapper>
);

Serial.propTypes = {
  serialNumber: PropTypes.number.isRequired,
};

const Wrapper = styled.div`
  position: absolute;
  bottom: .25rem; right: .25rem;

  .serial {
    font: .55rem ${props => props.theme.fontMedium};
    color: rgba(0, 0, 0, .5);
  }
`;

export default Serial;
