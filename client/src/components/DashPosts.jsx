import { useEffect, useState } from 'react';
import { TiDelete } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [PostIdToDelete, setPostIdToDelete] = useState('');
  const [DeleteMessage, setDeleteMessage] = useState('');

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;
    try {
      const res = await fetch(
        `/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prev) => [...prev, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleDeletePost = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${PostIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) => {
          return prev.filter((post) => post._id !== PostIdToDelete);
        });
      }
      setDeleteMessage(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='dash_post_container'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className='main-table'>
            <tr className='table-row-head '>
              <thead>Date updated</thead>
              <thead>Post image</thead>
              <thead>Post title</thead>
              <thead>Category</thead>
              <thead>Delete</thead>
              <thead>
                <span>Edit</span>
              </thead>
            </tr>
            {userPosts.map((post) => (
              <tr
                key={post._id}
                className='table-row'>
                <td className='td-content'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className='td-content'>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt='post image'
                      className='dash_post_image'
                    />
                  </Link>
                </td>
                <td className='td-content'>
                  <Link
                    className='td-link'
                    to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </td>
                <td className='td-content'>{post.category}</td>
                <td className='td-content'>
                  <span
                    onClick={() => {
                      setShowModal(true);
                      setPostIdToDelete(post._id);
                    }}
                    type='button'
                    className='dash_post_delete_btn'>
                    Delete
                  </span>
                </td>
                <td className='td-content'>
                  <Link
                    className='td-link'
                    to={`/update-post/${post._id}`}>
                    <span
                      type='button'
                      className='dash_post_edit_btn'>
                      Edit
                    </span>
                  </Link>
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
        <p>You have no posts yet!</p>
      )}

      <>
        {/* // modal here ... */}
        {showModal && (
          <div className='modal'>
            <div className='modal-content'>
              <TiDelete className='modal-logo' />
              <h1>Delete Post</h1>
              <p>Are you sure you want to delete this post?</p>
              <div className='modal-btn-container'>
                <button
                  className='modal-btn'
                  onClick={() => {
                    handleDeletePost();
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
      </>
    </div>
  );
};

export default DashPosts;
