import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { colors, gradients } from '../../config/cssValues';
import { LogoutIcon, UserIcon } from '../../assets/icons';
import { logIn, logOut } from '../../reducers/userSlice';

const Header = () => {
  const [userMenu, setUserMenu] = useState(true);

  const dispatch = useDispatch();

  const { isLoggedIn, user } = useSelector((store) => store.user);

  useEffect(() => {
    if (localStorage.getItem('user')) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      dispatch(logIn(storedUser));
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
          <div>
            <button
              onClick={() => {
                setUserMenu(!userMenu);
              }}
            >
              <UserIcon />
            </button>
            {userMenu && (
              <div
                onFocus={() => console.log('focus!')}
                className='user-actions'
              >
                <h3>{user.username}</h3>
                <hr />
                <button
                  onClick={() => {
                    handleLogout();
                    setUserMenu(false);
                  }}
                >
                  <h3>Logout</h3>
                  <LogoutIcon />
                </button>
              </div>
            )}
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

  button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .links {
    display: flex;
    gap: 2.5rem;

    svg {
      width: 20px;
      color: ${colors['light-green']};
    }

    .user-actions {
      background-color: ${colors['content-bg-color']};
      border-radius: 4px;

      position: absolute;
      right: 5%;

      width: 125px;
      padding: 4px 8px;

      h3 {
        color: ${colors.white};
        font-size: 16px;
      }

      hr {
        margin: 4px 0;
      }

      button {
        display: flex;
        justify-content: space-between;
        width: 100%;

        svg {
          color: ${colors.white};
        }

        &:hover {
          h3,
          svg {
            color: ${colors.yellow};
          }
        }
      }
    }
  }
`;

export default Header;
