import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { FaTimes, FaCheck } from 'react-icons/fa';

const DashComments = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentIdToDelete, setCommentIdToDelete] = useState('');
  const [DeleteMessage, setDeleteMessage] = useState('');
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comment/getcomments`);
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          if (data.comments.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchComments();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = comments.length;
    try {
      const res = await fetch(
        `/api/comment/getcomments?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) => [...prev, ...data.comments]);
        if (data.comments.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeleteComment = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/comment/deleteComment/${commentIdToDelete}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (res.ok) {
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentIdToDelete)
        );
        setShowModal(false);
      } else {
        console.log(data.message);
      }
      setDeleteMessage(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='dash_comment_container'>
      {currentUser.isAdmin && comments.length > 0 ? (
        <>
          {/* //TODO : make it bg gray and not hover effect that field  */}
          <table className='main-table'>
            <tr className='table-row'>
              <thead>Date updated</thead>
              <thead>Comment content</thead>
              <thead>Number of likes</thead>
              <thead>PostId</thead>
              <thead>UserId</thead>
              <thead>Delete</thead>
            </tr>
            {comments.map((comment) => (
              <tr
                key={comment._id}
                className='table-row'>
                <td className='td-content'>
                  {new Date(comment.updatedAt).toLocaleDateString()}
                </td>
                <td className='td-content'>{comment.content}</td>
                <td className='td-content'>{comment.numberOfLikes}</td>
                <td className='td-content'>{comment.postId}</td>
                <td className='td-content'>{comment.userId}</td>
                <td className='td-content'>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
                    }}
                    type='button'
                    className='dash_post_delete_btn'>
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </table>
          {showMore && (
            <button
              onClick={handleShowMore}
              type='button'
              className='dash_post_show_more_btn'>
              Show More
            </button>
          )}
        </>
      ) : (
        <p className='no-content'>You have no comments yet!</p>
      )}

      {/* // modal here ... */}
      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <TiDelete className='modal-logo' />
            <h1>Delete Comment</h1>
            <p>Are you sure you want to delete this comment?</p>
            <div className='modal-btn-container'>
              <button
                className='modal-btn'
                onClick={() => {
                  handleDeleteComment();
                }}>
                Yes, I'm sure
              </button>
              <button
                className='modal-btn'
                onClick={() => {
                  setShowModal(false);
                }}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {DeleteMessage && (
        <div className='success-message'>
          <p>{DeleteMessage}</p>
        </div>
      )}
    </div>
  );
};

export default DashComments;
