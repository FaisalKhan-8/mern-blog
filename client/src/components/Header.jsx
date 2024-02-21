import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  // signout functions here....
  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  // search functions here....
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <nav className='nav-main'>
      <div>
        <Link
          className='nav-logo'
          to='/'>
          <span> BeaT </span>Blog
        </Link>
      </div>
      <div>
        <form
          onSubmit={handleSubmit}
          className='search-bar'>
          <input
            className='header-input'
            type='text'
            placeholder='Search...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type='submit'>
            <AiOutlineSearch className='search-icon' />
          </button>
        </form>
      </div>
      <div className='nav-link'>
        <ul
          className={`${navbarOpen ? 'show-menu' : 'large-nav'}`}
          onClick={() => {
            setNavbarOpen(false);
          }}>
          <li>
            <Link
              className='link'
              to='/'>
              Home
            </Link>
          </li>
          <li>
            <Link
              className='link'
              to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link
              className='link'
              to='/projects'>
              Projects
            </Link>
          </li>
          {theme === 'light' ? (
            <button
              className='btn2'
              onClick={() => dispatch(toggleTheme())}>
              <FaMoon />
            </button>
          ) : (
            <button
              className='btn2'
              onClick={() => dispatch(toggleTheme())}>
              <FaSun className='light-mode-button' />
            </button>
          )}
        </ul>
      </div>

      <button
        className='btn1'
        onClick={handleSubmit}>
        <AiOutlineSearch />
      </button>
      {/* //dropdown menu... */}
      {currentUser ? (
        <div className='dropdown'>
          <div className='avatar '>
            <img
              src={currentUser.profilePicture}
              alt='user '
            />
          </div>
          <div className='dropdown-content'>
            <span>
              <span className='user-text'>username: </span>{' '}
              {currentUser.username}
            </span>
            <span> {currentUser.email}</span>
            <Link
              className='dropdown-link'
              to={'/dashboard?tab=profile'}>
              Profile
            </Link>
            <hr />
            <Link
              className='dropdown-link'
              onClick={handleSignOut}>
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
