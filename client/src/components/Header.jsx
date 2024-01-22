import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const location = useLocation().pathname;
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  return (
    <nav className='nav-main'>
      <div>
        <Link className='nav-logo' to='/'>
          <span> BeaT </span>Blog
        </Link>
      </div>
      <div>
        <form className='search-bar'>
          <input className='header-input' type='text' placeholder='Search...' />
          <AiOutlineSearch className='search-icon' />
        </form>
      </div>
      <div className='nav-link'>
        <ul
          className={`${navbarOpen ? 'show-menu' : 'large-nav'}`}
          onClick={() => {
            setNavbarOpen(false);
          }}>
          <li>
            <Link className='link' to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link className='link' to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link className='link' to='/projects'>
              Projects
            </Link>
          </li>
          {theme === 'light' ? (
            <button className='btn2' onClick={() => dispatch(toggleTheme())}>
              <FaMoon />
            </button>
          ) : (
            <button className='btn2' onClick={() => dispatch(toggleTheme())}>
              <FaSun className='light-mode-button' />
            </button>
          )}
        </ul>
      </div>

      <button className='btn1'>
        <AiOutlineSearch />
      </button>
      {/* //dropdown menu... */}
      {currentUser ? (
        <div className='dropdown'>
          <div className='avatar '>
            <img src={currentUser.profilePicture} alt='user ' />
          </div>
          <div className='dropdown-content'>
            <span>
              <span className='user-text'>username: </span>{' '}
              {currentUser.username}
            </span>
            <span> {currentUser.email}</span>
            <Link className='dropdown-link' to={'/dashboard?tab=profile'}>
              Profile
            </Link>
            <hr />
            <Link className='dropdown-link' to='/sign-out'>
              Sign Out
            </Link>
          </div>
        </div>
      ) : (
        <Link to='/sign-in'>
          <button className='btn3 '>Sign In</button>
        </Link>
      )}

      <div>
        <button
          className='toggle-btn'
          onClick={() => setNavbarOpen((prev) => !prev)}>
          {navbarOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
