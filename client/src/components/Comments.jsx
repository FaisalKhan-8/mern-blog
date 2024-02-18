import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { FaThumbsUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Comments = ({ comment, onLike }) => {
  const [user, setUser] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);
  return (
    <div className='comment-main-container'>
      <div className='comment_user'>
        <img
          className='comment_img'
          src={user.profilePicture}
          alt=''
        />
      </div>
      <div className='comment-content-container'>
        <div className='comment-text-container'>
          <span className='comment_span'>
            {user ? `@${user.username}` : 'anonymous user'}
          </span>
          <span className='comment-from-now'>
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className='content-para'>{comment.content}</p>
        <div className='comment-like-container'>
          <button
            className={`comment-like-button ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              'Liked-Button'
            }`}
            type='button'
            onClick={() => onLike(comment._id)}>
            <FaThumbsUp />
          </button>
          <p>
            {comment.numberOfLikes > 0 &&
              comment.numberOfLikes +
                ' ' +
                (comment.numberOfLikes === 1 ? 'like' : 'likes')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Comments;
