import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

const SignIn = () => {
  const [formData, setFormData] = useState({});

  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill out all fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        return navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='signUp-container'>
      <div className='signup-main-container'>
        {/* LEFT  */}
        <div className='signUp-left'>
          <Link className='signup-logo' to='/'>
            <span> BeaT </span>Blog
          </Link>
          <p>
            This is a demo project. You can sign in with your email and password
            or with Google
          </p>
        </div>
        {/* RIGHT  */}
        <div className='signUp-right'>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='sign-up-form-container'>
              <label className='signup-label'>Your Email</label>
              <input
                className='signup-input'
                type='email'
                id='email'
                placeholder='name@example.com'
                onChange={handleChange}
              />
            </div>
            <div className='sign-up-form-container'>
              <label className='signup-label'>Your Password</label>
              <input
                className='signup-input'
                type='password'
                id='password'
                placeholder='********'
                onChange={handleChange}
              />
            </div>
            <button type='submit' className='signup-btn' disabled={loading}>
              {loading ? (
                <div>
                  <span className='lds-ripple'>
                    <span></span>
                    <span></span>
                  </span>
                  <span>Loading...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          <div className='signup-text'>
            <span>
              Don't have an account?{' '}
              <Link to='/sign-up' className='signup-text-span'>
                Sign Up
              </Link>
            </span>
          </div>
          {errorMessage && (
            <div className='error-message'>
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
