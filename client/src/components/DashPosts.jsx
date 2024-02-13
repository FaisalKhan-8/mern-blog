import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
        const data = await res.json();
        if (res.ok) {
          setUserPosts(data.posts);
          // if (data.posts.length < 9) {
          //   setShowMore(false);
          // }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  return (
    <div className='dash_post_container'>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <table className='main-table'>
            <tr className='table-row'>
              <th>Date updated</th>
              <th>Post image</th>
              <th>Post title</th>
              <th>Category</th>
              <th>Delete</th>
              <th>
                <span>Edit</span>
              </th>
            </tr>
            {userPosts.map((post) => (
              <tr key={post._id} className='table-row'>
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
                  <Link className='td-link' to={`/post/${post.slug}`}>
                    {post.title}
                  </Link>
                </td>
                <td className='td-content'>{post.category}</td>
                <td className='td-content'>
                  <span type='button' className='dash_post_delete_btn'>
                    Delete
                  </span>
                </td>
                <td className='td-content'>
                  <Link className='td-link' to={`/update-post/${post._id}`}>
                    <span type='button' className='dash_post_edit_btn'>
                      Edit
                    </span>
                  </Link>
                </td>
              </tr>
            ))}
          </table>
        </>
      ) : (
        <p>You have no posts yet!</p>
      )}
    </div>
  );
};

export default DashPosts;
