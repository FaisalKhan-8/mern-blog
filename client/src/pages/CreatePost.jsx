import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import '/react-quill/dist/quill.snow.css';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [file, setFile] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/post/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='create_post_container'>
      <h1>Create a post</h1>

      <form
        className='create_post_form'
        onSubmit={handleSubmit}>
        <div className='create_post_div'>
          <input
            type='text'
            id='title'
            placeholder='Title'
            required
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }>
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
          <div className='error-message '>
            <p>{imageUploadError}</p>
          </div>
        )}
        {formData.image && (
          <img
            className='upload-image'
            src={formData.image}
            alt='image'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='react-quill'
          required
          onChange={(value) => {
            setFormData({
              ...formData,
              content: value,
            });
          }}
        />

        <button
          type='submit'
          className='create_post_btn'>
          Publish
        </button>
        {publishError && (
          <div className='error-message'>
            <p>{publishError}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePost;
