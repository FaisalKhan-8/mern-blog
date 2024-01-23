import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowSmRight, HiUser } from 'react-icons/hi';

const DashSidebar = () => {
  return (
    <div className='sidebar'>
      <div className='sidebar-header'>
        <div className='sidebar-item'>
          <Link className='sidebar-link' to='/dashboard?tab=profile'>
            <div className='sidebar-elem'>
              <HiUser className='sidebar-icon' />
              Profile
              <label>user</label>
            </div>
          </Link>
          <Link className='sidebar-link' to='/sign-out'>
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
