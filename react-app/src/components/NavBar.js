import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../store/session';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const dispatch = useDispatch();

  const userId = useSelector(state => state.session.user?.id);

  return (
    <div className='nav-bar'>
      {!userId && (
        <div className='unauth-user-nav'>
          <nav className='unauth-nav'>
            <div className='login-signup'>
              <NavLink to='/login' exact={true} activeClassName='active'>
                Login
              </NavLink>
              <NavLink to='/sign-up' exact={true} activeClassName='active'>
                Sign Up
              </NavLink>
            </div>
            <img className='tasky-logo' src="https://i.imgur.com/6AsCOz2.png" alt="Tasky Logo" />
            <button className="demo-login" onClick={async (e) => {
              e.preventDefault();
              await dispatch(login('demo@aa.io', 'password'))
            }}>Demo Login</button>
          </nav>
        </div>
      )
      }
      {userId && (
        <nav className='auth-user-nav'>
          <div></div>
          <img className='tasky-logo' src="https://i.imgur.com/6AsCOz2.png" alt="Tasky Logo" />
          <div>
            <LogoutButton />
          </div>
        </nav>
      )}
    </div>
  );
}

export default NavBar;
