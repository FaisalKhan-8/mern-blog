import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/dashboardComp';

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className='dashboard'>
      <div className=''>
        {/* side bar  */}
        <DashSidebar />
      </div>
      {/* profile...  */}
      <div>{tab === 'profile' && <DashProfile />}</div>
      {/* posts... */}
      <div>{tab === 'posts' && <DashPosts />}</div>
      {/* users... */}
      <div>{tab === 'users' && <DashUsers />}</div>
      {/* comments... */}
      <div>{tab === 'comments' && <DashComments />}</div>
      {/* dashboard components... */}
      <div>{tab === 'dash' && <DashboardComp />}</div>
    </div>
  );
};

export default Dashboard;
