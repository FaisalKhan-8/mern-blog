import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);

  const filePickerRef = useRef();

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
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploadError(
          'Could not upload image (file must be less than 2MB)'
        );
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <>
      <div className='profile_container'>
        <h1>Profile</h1>
        <div>
          <form className='form-container'>
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
      </div>
    </>
  );
};

export default DashProfile;
