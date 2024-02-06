import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CreatePost = () => {
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
          <input type='file' accept='image/*' />
          <button type='button'>Upload image</button>
        </div>

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
