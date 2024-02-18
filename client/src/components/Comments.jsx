import { useEffect, useState } from 'react';
import moment from 'moment';
import { FaThumbsUp, FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from 'react-icons/md';
import { useSelector } from 'react-redux';

const Comments = ({ comment, onLike, onEdit }) => {
  const [user, setUser] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);

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

  const handleEdit = async () => {
    setIsEditing(true);
    setEditedContent(comment.content);
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`/api/comment/editComment/${comment._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: editedContent,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        onEdit(comment, editedContent);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

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

        {isEditing ? (
          <>
            <textarea
              className='comment_textarea-edit'
              onChange={(e) => setEditedContent(e.target.value)}
              value={editedContent}
            />
            <div className='comment_edit_item'>
              <button
                type='button'
                onClick={handleSave}
                className='btn-edit'>
                Save
              </button>
              <button
                type='button'
                className='btn-delete'
                onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
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
              {currentUser &&
                (currentUser._id === comment.userId || currentUser.isAdmin) && (
                  <>
                    <button
                      type='button'
                      onClick={handleEdit}
                      className='comment-edit-button'>
                      <FaEdit />
                    </button>
                    <button
                      type='button'
                      // onClick={() => onDelete(comment._id)}
                      className='comment-delete-button'>
                      <MdDeleteForever />
                    </button>
                  </>
                )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Comments;
