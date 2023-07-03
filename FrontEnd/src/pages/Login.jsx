import { styled } from 'styled-components';
import { useDispatch } from 'react-redux';

import { colors, gradients, measures } from '../../config/cssValues';
import { loginUser } from '../../reducers/userSlice';
import Button from '../components/Button';

const LoginPage = () => {
  const dispatch = useDispatch();

  async function handleLogin(e) {
    e.preventDefault();

    const username = e.target['username'].value;
    const password = e.target['password'].value;

    if (!username || username.length <= 2) {
      console.error('invalid username!');
      return;
    }
    if (!password || password.length <= 2) {
      console.error('invalid password!');
      return;
    }

    const LogInUser = { username, password };
    const user = await dispatch(loginUser(LogInUser));

    localStorage.setItem('user', JSON.stringify(user));
  }

  return (
    <Login>
      <h1>Entre na sua conta</h1>
      <form
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <label htmlFor='username'>Username:</label>
        <input type='text' name='username' id='username' />
        <label htmlFor='password'>Password:</label>
        <input type='password' name='password' id='password' />
        <Button type='submit'>Login</Button>
      </form>
    </Login>
  );
};

const Login = styled.main`
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  border: 2px solid ${colors['green']};
  border-radius: ${measures['br-1']};
  padding: 2rem;

  width: 90%;
  max-width: 40rem;

  background: ${gradients['lg-v-white-black']};

  h1 {
    font-size: 1.75rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  form label {
    font-size: ${measures['text-size']};
    margin-top: 1rem;
  }

  form input {
    font-size: 1.6rem;
    height: 2.5rem;
    background-color: ${colors['content-bg-color']};
    border: none;
    color: white;
  }

  form button {
    margin-top: 2rem;
    align-self: center;
  }
`;

export default LoginPage;
