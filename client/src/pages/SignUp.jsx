import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please fill out all fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        setLoading(false);
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        return navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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
            This is a demo project. You can sign up with your email and password
            or with Google
          </p>
        </div>
        {/* RIGHT  */}
        <div className='signUp-right'>
          <form className='signup-form' onSubmit={handleSubmit}>
            <div className='sign-up-form-container'>
              <label className='signup-label'>Your username</label>
              <input
                className='signup-input'
                type='text'
                id='username'
                placeholder='Username'
                onChange={handleChange}
              />
            </div>
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
                placeholder='Password'
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
                  <span>Loading...</span>{' '}
                </div>
              ) : (
                'Sign Up'
              )}
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

export default SignUp;
