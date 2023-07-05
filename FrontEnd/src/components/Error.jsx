import { useRouteError } from 'react-router-dom';
import { styled } from 'styled-components';

import { colors, measures } from '../../config/cssValues';

const Error = () => {
  const error = useRouteError();

  console.log('Error: ', error);
  return (
    <ErrorComp>
      <h1>
        <span className='red'>Error</span> - {error.message}
      </h1>
    </ErrorComp>
  );
};

const ErrorComp = styled.div`
  background-color: ${colors['error-bg']};
  border: 1px solid ${colors.red};
  color: ${colors['error-text']};
  border-radius: ${measures['br-1']};

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 15px 0;
  margin: 0 5px 10px 5px;

  h1,
  pre,
  h2 {
    font-size: 1.6rem;
  }
`;

export default Error;
