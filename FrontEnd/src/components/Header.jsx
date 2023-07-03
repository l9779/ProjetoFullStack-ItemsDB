import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { colors, gradients } from '../../config/cssValues';
import { LogoutIcon, UserIcon } from '../../assets/icons';
import { logOut } from '../../reducers/userSlice';

const Header = () => {
  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const loggedUser = localStorage.getItem('user');
    }
  }, []);

  function handleLogout() {
    localStorage.clear();
    dispatch(logOut());
  }

  return (
    <NavBar>
      <Link to='/'>
        <h2>ItemDb App</h2>
      </Link>

      <div className='links'>
        <Link to={'/list'}>
          <h2>List</h2>
        </Link>

        {isLoggedIn ? (
          <div className='user'>
            <UserIcon />
            <h2>{user.username}</h2>
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              <LogoutIcon />
            </button>
          </div>
        ) : (
          <Link to={'/login'}>
            <h2>Login</h2>
          </Link>
        )}
      </div>
    </NavBar>
  );
};

const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;

  position: absolute;
  top: 0;

  width: 100vw;
  font-size: 1.2rem;

  padding: 2.5rem;
  background: ${gradients['lg-v-white-black']};

  a {
    color: ${colors['white']};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      color: ${colors['green']};
    }
  }

  .links {
    display: flex;
    gap: 2.5rem;

    svg {
      width: 20px;
    }

    .user {
      display: flex;
      gap: 5px;

      svg {
        color: ${colors['light-green']};
      }

      button {
        background: none;
        border: none;

        margin-left: 15px;
        width: 20px;

        cursor: pointer;

        svg {
          color: white;

          &:hover {
            color: ${colors.red};
          }
        }
      }
    }
  }
`;

export default Header;
