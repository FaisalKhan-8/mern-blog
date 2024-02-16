import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comments from './Comments';

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [commentError, setCommentError] = useState('');

  console.log(comments);

  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) {
      setCommentError('Comment is too long');
      return;
    }
    if (!comment) {
      setCommentError('Please enter a comment');
      return;
    }
    try {
      const res = await fetch('/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment('');
        setCommentError(null);
        setComments([...comments, data]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };

  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComment/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getComments();
  }, [postId]);

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
          {/* // error message handle here.. */}
          {commentError && (
            <div className='error-message-comment'>
              <p>{commentError}</p>
            </div>
          )}
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
      {comments.length === 0 ? (
        <p className='comment_no_comments'>No comments yet.</p>
      ) : (
        <>
          <div className='comments_text_con'>
            <p>Comments</p>
            <div className='comments_p'>
              <p> {comments.length} </p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comments
              key={comment._id}
              comment={comment}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default CommentSection;
