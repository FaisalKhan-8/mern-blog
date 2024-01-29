import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateSuccess,
  updateFailure,
  signoutSuccess,
} from '../redux/user/userSlice';

const DashProfile = () => {
  const { currentUser, error, loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [formData, setFormData] = useState({});

  const filePickerRef = useRef();
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          'Could not upload image (File must be less than 2MB)'
        );
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };

  //form data functionality
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes were made');
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError('Uploading image...');
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };

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
    <>
      <div className='profile_container'>
        <h1>Profile</h1>
        <div>
          <form className='form-container' onSubmit={handleSubmit}>
            <input
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              ref={filePickerRef}
              style={{ display: 'none' }}
            />
            <div
              className={
                imageFileUploadProgress && imageFileUploadProgress < 100
                  ? 'opacity-img'
                  : 'profile-img'
              }
              onClick={() => filePickerRef.current.click()}>
              {/* // Progress Bar here... */}
              {imageFileUploadProgress && (
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${
                        imageFileUploadProgress / 100
                      })`,
                      strokeWidth: '10',
                      transition: 'transform 0.6s ease',
                    },
                    trail: {
                      stroke: '#fff',
                      strokeWidth: '10',
                      transition: 'transform 0.6s ease',
                    },
                  }}
                />
              )}
              <img
                src={imageFileUrl || currentUser.profilePicture}
                alt='user'
              />
            </div>
            {/* // for upload error handling */}
            {imageFileUploadError && (
              <div className='error-message'>
                <p>{imageFileUploadError}</p>
              </div>
            )}
            <div className='profile_input'>
              <input
                type='text'
                id='username'
                placeholder='username'
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
            </div>
            <div className='profile_input'>
              <input
                type='email'
                id='email'
                placeholder='Email'
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
            </div>
            <div className='profile_input'>
              <input
                type='password'
                id='password'
                placeholder='Password'
                onChange={handleChange}
              />
            </div>

            <button type='submit' className='profile_update_btn'>
              Update
            </button>
          </form>
          <div className='profile-d'>
            <span className='profile_delete_btn'>Delete Account</span>
            <span className='profile_delete_btn' onClick={handleSignOut}>
              Sign Out
            </span>
          </div>
        </div>
        {updateUserSuccess && (
          <div className='success-message'>
            <p>{updateUserSuccess}</p>
          </div>
        )}
        {updateUserError && (
          <div className='error-message'>
            <p>{updateUserError}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default DashProfile;
