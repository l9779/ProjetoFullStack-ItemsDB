import { Outlet } from 'react-router-dom';
import { styled } from 'styled-components';

import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <PageContent>
        <Outlet />
      </PageContent>
    </>
  );
};

const PageContent = styled.div`
  padding: 10rem 2rem;
  height: 90vh;
  width: 100vw;
`;

export default Layout;
