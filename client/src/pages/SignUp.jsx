import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className='signUp-container'>
      <div className='signup-main-container'>
        {/* LEFT  */}
        <div className='signUp-left'>
          <Link className='signup-logo' to='/'>
            <span> BeaT </span>Blog
          </Link>
          <p>
            This is a demo project. You can sign up with your email and password
            or with Google
          </p>
        </div>
        {/* RIGHT  */}
        <div className='signUp-right'>
          <form className='signup-form'>
            <div className='sign-up-form-container'>
              <label className='signup-label'>Your username</label>
              <input
                className='signup-input'
                type='text'
                id='username'
                placeholder='Username'
              />
            </div>
            <div className='sign-up-form-container'>
              <label className='signup-label'>Your Email</label>
              <input
                className='signup-input'
                type='text'
                id='email'
                placeholder='Email'
              />
            </div>
            <div className='sign-up-form-container'>
              <label className='signup-label'>Your Password</label>
              <input
                className='signup-input'
                type='text'
                id='password'
                placeholder='Password'
              />
            </div>
            <button type='submit' className='signup-btn'>
              Sign Up
            </button>
          </form>
          <div className='signup-text'>
            <span>
              Already have an account?{' '}
              <Link to='/sign-in' className='signup-text-span'>
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
