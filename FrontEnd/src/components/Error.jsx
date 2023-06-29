import { useRouteError } from 'react-router-dom';
import { styled } from 'styled-components';

import { colors } from '../../config/cssValues';

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
  span {
    color: ${colors.red};
  }
`;

export default Error;
