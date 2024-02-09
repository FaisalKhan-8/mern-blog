import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowSmRight, HiDocumentText, HiUser } from 'react-icons/hi';
import { signoutSuccess } from '../redux/user/userSlice';

import { useDispatch, useSelector } from 'react-redux';

const DashSidebar = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // signout functions here....
  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-item'>
          <Link className='sidebar-link' to='/dashboard?tab=profile'>
            <div className='sidebar-elem'>
              <HiUser className='sidebar-icon' />
              Profile
              <label> {currentUser.isAdmin ? 'Admin' : 'User'}</label>
            </div>
          </Link>
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts' className='sidebar-link'>
              <div className='sidebar-elem'>
                <HiDocumentText className='sidebar-icon' />
                Posts
              </div>
            </Link>
          )}
          <Link className='sidebar-link' onClick={handleSignOut}>
            <div className='sidebar-elem'>
              <HiArrowSmRight className='sidebar-icon' />
              Sign Out
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashSidebar;
