import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const Footer = () => {
  return (
    <div className='footer-main'>
      <div className='footer-left'>
        <Link className='footer-logo' to='/'>
          <span> BeaT </span>Blog
        </Link>
      </div>
      <div className='footer-title'>
        {/* About  */}
        <div>
          <h3>About</h3>
          <div className='footer-link'>
            {/* // TODO: Add a link to the individual blog */}
            <Link
              className='footer-individual-link'
              to='/about'
              target='_blank'
              rel='noopener noreferrer'>
              About
            </Link>
          </div>
          <div className='footer-link'>
            {/* // TODO: Add a link to the individual blog */}
            <Link
              className='footer-individual-link'
              to='/about'
              target='_blank'
              rel='noopener noreferrer'>
              BeatRow Blog
            </Link>
          </div>
        </div>
        {/* //follow  */}
        <div className='footer-title'>
          <div>
            <h3>Follow us</h3>
            <div className='footer-link'>
              {/* // TODO: Add a link to the individual blog */}
              <Link
                className='footer-individual-link'
                to='https://github.com/FaisalKhan-8'
                target='_blank'
                rel='noopener noreferrer'>
                Github
              </Link>
            </div>
            <div className='footer-link'>
              {/* // TODO: Add a link to the individual blog */}
              <Link
                className='footer-individual-link'
                to='/about'
                target='_blank'
                rel='noopener noreferrer'>
                Discord
              </Link>
            </div>
          </div>
        </div>
        {/* //Term and Policy  */}
        <div className=''>
          <div>
            <h3>Legal</h3>
            <div className='footer-link'>
              {/* // TODO: Add a link to the individual blog */}
              <Link
                className='footer-individual-link'
                to='#'
                target='_blank'
                rel='noopener noreferrer'>
                Privacy Policy
              </Link>
            </div>
            <div className='footer-link'>
              {/* // TODO: Add a link to the individual blog */}
              <Link className='footer-individual-link' to='#'>
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='footer-divider'>
        <div>
          <Link className='divider-link' to='#'>
            &#169; {new Date().getFullYear()} Beatrow blog
          </Link>
        </div>
        <div className='footer-icon'>
          <Link
            className='icon-link'
            to='https://github.com/FaisalKhan-8'
            target='_blank'>
            <FaGithub />
          </Link>
          <Link
            className='icon-link'
            to='https://github.com/FaisalKhan-8'
            target='_blank'>
            <FaLinkedin />
          </Link>
          <Link className='icon-link ' to='#' target='_blank'>
            <FaXTwitter />
          </Link>
          <Link className='icon-link ' to='#' target='_blank'>
            <FaInstagram />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
