import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.user);
  // TODO: if user is not admin then we should show them you are not admin.
  return currentUser && currentUser.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' replace={true} />
  );
};

export default OnlyAdminPrivateRoute;
