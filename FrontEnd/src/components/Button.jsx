import { styled } from 'styled-components';

import { colors, measures } from '../../config/cssValues';

const Button = styled.button`
  font-size: ${measures['text-size']};
  font-weight: 600;

  background-color: ${colors['main-bg-color']};
  color: ${colors['white']};
  border: solid 2px ${colors['green']};

  padding: 1rem;
  width: 10rem;
  border-radius: ${measures['br-2']};

  cursor: pointer;

  transition: all 150ms ease-in-out;

  &:hover {
    background-color: ${colors['content-bg-color']};
    color: ${colors['white']};
    border-color: ${colors['white']};
  }

  &:active {
    color: ${colors['green']};
    border-color: ${colors['green']};
    background-color: ${colors['main-bg-color']};
  }
`;

export default Button;
