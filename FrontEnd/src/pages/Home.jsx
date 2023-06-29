import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { colors, measures } from '../../config/cssValues';
import Button from '../components/Button';

const HomePage = () => {
  const [showMsg, setShowMsg] = useState(false);

  return (
    <Home>
      <h1>ItemDb App</h1>

      <section>
        <h2>Faça o Login</h2>
        <Link to={'login'}>
          <Button>Login</Button>
        </Link>
      </section>

      <section>
        <h2>Não tem conta? cadastre-se</h2>

        <Button onClick={() => setShowMsg(true)}>Cadastrar</Button>
        {showMsg && <h3>Nada nunca vai acontecer, talvez.</h3>}
      </section>
    </Home>
  );
};

const Home = styled.main`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  color: ${colors['white']};
  background-color: ${colors['main-bg-color']};

  section {
    padding: 2rem;
    border-radius: ${measures['br-1']};
    border: 2px solid ${colors['green']};
    width: 30rem;
    height: 15rem;
    font-size: 1.2rem;
  }

  section button {
    margin-top: 2.5rem;
  }

  h3 {
    padding: 0.5rem;
    color: ${colors['red']};
  }
`;

export default HomePage;
