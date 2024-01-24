import { useSelector } from 'react-redux';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className='profile_container'>
        <h1>Profile</h1>
        <form className='form-container'>
          <div className='profile-img'>
            <img src={currentUser.profilePicture} alt='user' />
          </div>
          <div className='profile_input'>
            <input
              type='text'
              id='username'
              placeholder='username'
              defaultValue={currentUser.username}
            />
          </div>
          <div className='profile_input'>
            <input
              type='email'
              id='email'
              placeholder='Email'
              defaultValue={currentUser.email}
            />
          </div>
          <div className='profile_input'>
            <input type='password' id='password' placeholder='Password' />
          </div>

          <button type='submit' className='profile_update_btn'>
            Update
          </button>
        </form>
        <div className='profile-d'>
          <span className='profile_delete_btn'>Delete Account</span>
          <span className='profile_delete_btn'>Sign Out</span>
        </div>
      </div>
    </>
  );
};

export default DashProfile;
