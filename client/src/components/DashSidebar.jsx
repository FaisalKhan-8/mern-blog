import React from 'react';
import { Link } from 'react-router-dom';
import {
  HiAnnotation,
  HiArrowSmRight,
  HiChartPie,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUser,
} from 'react-icons/hi';
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
          {currentUser && currentUser.isAdmin && (
            <Link
              className='sidebar-link'
              to='/dashboard?tab=dash'>
              <div className='sidebar-elem'>
                <HiChartPie className='sidebar-icon' />
                Dashboard
              </div>
            </Link>
          )}
          <Link
            className='sidebar-link'
            to='/dashboard?tab=profile'>
            <div className='sidebar-elem'>
              <HiUser className='sidebar-icon' />
              Profile
              <label> {currentUser.isAdmin ? 'Admin' : 'User'}</label>
            </div>
          </Link>
          {currentUser.isAdmin && (
            <Link
              to='/dashboard?tab=posts'
              className='sidebar-link'>
              <div className='sidebar-elem'>
                <HiDocumentText className='sidebar-icon' />
                Posts
              </div>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link
              to='/dashboard?tab=users'
              className='sidebar-link'>
              <div className='sidebar-elem'>
                <HiOutlineUserGroup className='sidebar-icon' />
                Users
              </div>
            </Link>
          )}
          {currentUser.isAdmin && (
            <Link
              to='/dashboard?tab=comments'
              className='sidebar-link'>
              <div className='sidebar-elem'>
                <HiAnnotation className='sidebar-icon' />
                Comments
              </div>
            </Link>
          )}
          <Link
            className='sidebar-link'
            onClick={handleSignOut}>
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
