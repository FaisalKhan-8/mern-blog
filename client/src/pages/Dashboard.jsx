import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';

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
    </div>
  );
};

export default Dashboard;
