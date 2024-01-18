import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';
import { RxHamburgerMenu, RxCross1 } from 'react-icons/rx';

const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const location = useLocation().pathname;

  return (
    <nav className='nav-main'>
      <div>
        <Link className='nav-logo' to='/'>
          <span> BeaT </span>Blog
        </Link>
      </div>
      <div>
        <form className='search-bar'>
          <input type='text' placeholder='Search...' />
          <AiOutlineSearch className='search-icon' />
        </form>
      </div>
      <div className='nav-link'>
        <ul className={`${navbarOpen ? 'show-menu' : 'large-nav'}`}>
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

          <Link to='/sign-in'>
            <button className='btn3'>Sign In</button>
          </Link>
          <button className='btn2'>
            <FaMoon />
          </button>
        </ul>
      </div>
      <button className='btn1'>
        <AiOutlineSearch />
      </button>
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
