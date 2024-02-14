import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { FaTimes, FaCheck } from 'react-icons/fa';

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState('');
  const [DeleteMessage, setDeleteMessage] = useState('');

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          if (data.users.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        if (data.users.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${userIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => {
          return prev.filter((user) => user._id !== userIdToDelete);
        });
      } else {
        console.log(data.message);
      }
      setDeleteMessage(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='dash_user_container'>
      {currentUser.isAdmin && users.length > 0 ? (
        <>
          <table className='main-table'>
            <tr className='table-row'>
              <thead>Date created</thead>
              <thead>User Image</thead>
              <thead>Username</thead>
              <thead>Email</thead>
              <thead>Admin</thead>
              <thead>Delete</thead>
            </tr>
            {users.map((user) => (
              <tr key={user._id} className='table-row'>
                <td className='td-content'>
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className='td-content'>
                  <img
                    src={user.profilePicture}
                    alt={user.username}
                    style={{
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      marginTop: '5px',
                    }}
                  />
                </td>
                <td className='td-content'>{user.username}</td>
                <td className='td-content'>{user.email}</td>
                <td className='td-content'>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td className='td-content'>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setUserIdToDelete(user._id);
                    }}
                    type='button'
                    className='dash_post_delete_btn'>
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              type='button'
              className='dash_post_show_more_btn'>
              Show More
            </button>
          )}
        </>
      ) : (
        <p>You have no users yet!</p>
      )}

      {/* // modal here ... */}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <TiDelete className='modal-logo' />
            <h1>Delete User</h1>
            <p>Are you sure you want to delete this user?</p>
            <div className='modal-btn-container'>
              <button
                className='modal-btn'
                onClick={() => {
                  handleDeleteUser();
                }}>
                Yes, I'm sure
              </button>
              <button
                className='modal-btn'
                onClick={() => {
                  setShowModal(false);
                }}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {DeleteMessage && (
        <div className='success-message'>
          <p>{DeleteMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DashUsers;
