import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Comment = (postId) => {
  const [comment, setComment] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {};

  return (
    <div className='comment_container'>
      {currentUser ? (
        <div className='comment_user'>
          <p>Signed in as: </p>
          <img
            src={currentUser.profilePicture}
            alt=''
          />
          <Link
            className='comment_link'
            to={'/dashboard?tab=profile'}>
            @{currentUser.email}
          </Link>
        </div>
      ) : (
        <div className='comment_not_login'>
          You must be logged in to comment.
          <Link
            className='comment_link_signin'
            to='/sign-in'>
            Sign In=
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className='comment_form'>
          <textarea
            className='comment_textarea'
            placeholder='Add a comment...'
            rows={3}
            maxLength={200}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className='comment_form_item'>
            <p>{200 - comment.length} characters remaining</p>
            <button
              type='submit'
              className='comment_button'>
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Comment;
