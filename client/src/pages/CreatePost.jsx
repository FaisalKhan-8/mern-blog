import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please provide a file');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '_' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageFileUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageFileUploadProgress(null);
      console.log(error);
    }
  };

  return (
    <div className='create_post_container'>
      <h1>Create a post</h1>

      <form className='create_post_form'>
        <div className='create_post_div'>
          <input type='text' id='title' placeholder='Title' required />
          <select>
            <option value='uncategorized'>Select a category</option>
            <option value='javascript'>JavaScript</option>
            <option value='nextjs'>NextJS</option>
            <option value='reactjs'>React Js</option>
          </select>
        </div>
        <div className='create-post-file-container'>
          <input
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button
            type='button'
            onClick={handleUploadImage}
            className={
              imageFileUploadProgress ? 'loading-btn' : 'post_upload_btn'
            }>
            {imageFileUploadProgress ? (
              <div className='loading-progress'>
                <CircularProgressbar
                  value={imageFileUploadProgress}
                  text={`${imageFileUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload image'
            )}
          </button>
        </div>

        {imageUploadError && (
          <div className='error-message'>
            <p>{imageUploadError}</p>
          </div>
        )}
        {formData.image && (
          <img className='upload-image' src={formData.image} alt='image' />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='react-quill'
        />

        <button type='submit' className='create_post_btn'>
          Publish
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
