import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

const DashboardComp = () => {
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser.isAdmin) {
      fetchComments();
      fetchUsers();
      fetchPosts();
    }
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`/api/user/getusers?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setUsers(data.users);
        setTotalUsers(data.totalUsers);
        setLastMonthUsers(data.lastMonthUsers);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch(`/api/post/getposts?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setPosts(data.posts);
        setTotalPosts(data.totalPosts);
        setLastMonthPosts(data.lastMonthPosts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await fetch(`/api/comment/getcomments?limit=5`);
      const data = await res.json();
      if (res.ok) {
        setComments(data.comments);
        setTotalComments(data.totalComments);
        setLastMonthComments(data.lastMonthComments);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className='dash_main_container'>
        <div className='dash_sub_container'>
          <div className='dash_container'>
            <div className='dash_comp_container'>
              <div className='dash_comp_header_container'>
                <h3>Total Users</h3>
                <p>{totalUsers}</p>
              </div>
              <HiOutlineUserGroup className='dash_user_icon' />
            </div>
            <div className='dash_comp_text_container'>
              <span className='comp_span'>
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className='comp_text'>Last month</div>
            </div>
          </div>
          {/* // Comments  */}
          <div className='dash_container'>
            <div className='dash_comp_container'>
              <div className='dash_comp_header_container'>
                <h3>Total Comments</h3>
                <p>{totalComments}</p>
              </div>
              <HiAnnotation
                style={{ backgroundColor: 'rgb(79 70 229)' }}
                className='dash_user_icon'
              />
            </div>
            <div className='dash_comp_text_container'>
              <span className='comp_span'>
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className='comp_text'>Last month</div>
            </div>
          </div>

          {/* // Posts here.. */}
          <div className='dash_container'>
            <div className='dash_comp_container'>
              <div className='dash_comp_header_container'>
                <h3>Total Posts</h3>
                <p>{totalPosts}</p>
              </div>
              <HiDocumentText
                className='dash_user_icon'
                style={{ backgroundColor: 'rgb(236 72 153)' }}
              />
            </div>
            <div className='dash_comp_text_container'>
              <span className='comp_span'>
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className='comp_text'>Last month</div>
            </div>
          </div>
        </div>
      </div>
      {/* // Recent  column section  */}
      <div className='dash-recent-main-container'>
        {/* // Recent users column section  */}
        <div className='dash-recent-user'>
          <div className='dash-recent-user-container'>
            <h1>Recent users</h1>
            <button className='dash_comp_btn'>
              <Link
                className='dash_comp_link'
                to={'/dashboard?tab=users'}>
                See all
              </Link>
            </button>
          </div>
          <table>
            <thead className=''>
              <tr className='dash-table-head'>
                <th>User image</th>
                <th>Username</th>
              </tr>
            </thead>
            {users &&
              users.map((user) => (
                <tbody
                  key={user._id}
                  className='dash-tbody'>
                  <tr className='dash-trow'>
                    <td>
                      <img
                        src={user.profilePicture}
                        alt={user.username}
                        className='dash-table-image'
                      />
                    </td>
                    <td>{user.username}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        {/* // Recent comment column section  */}
        <div className='dash-recent-user'>
          <div className='dash-recent-user-container'>
            <h1 style={{ fontSize: '14px' }}>Recent comments</h1>
            <button className='dash_comp_btn'>
              <Link
                className='dash_comp_link'
                to={'/dashboard?tab=comments'}>
                See all
              </Link>
            </button>
          </div>
          <table>
            <thead className=''>
              <tr className='dash-table-head'>
                <th>Comment content</th>
                <th>Likes</th>
              </tr>
            </thead>
            {comments &&
              comments.map((comment) => (
                <tbody
                  key={comment._id}
                  className='dash-tbody'>
                  <tr className='dash-trow'>
                    <td>
                      <p className='content-para'>{comment.content}</p>
                    </td>
                    <td>{comment.numberOfLikes}</td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
        {/* // Recent posts column section  */}
        <div className='dash-recent-user'>
          <div className='dash-recent-user-container'>
            <h1>Recent posts</h1>
            <button className='dash_comp_btn'>
              <Link
                className='dash_comp_link'
                to={'/dashboard?tab=posts'}>
                See all
              </Link>
            </button>
          </div>
          <table>
            <thead className=''>
              <tr className='dash-table-head'>
                <th>Post image</th>
                <th>Post title</th>
                <th>Post category</th>
              </tr>
            </thead>
            {posts &&
              posts.map((post) => (
                <tbody
                  key={post._id}
                  className='dash-tbody'>
                  <tr className='dash-trow'>
                    <td>
                      <img
                        src={post.image}
                        alt={post.title}
                        className='dash-table-image'
                      />
                    </td>
                    <td className='content-para'>{post.title}</td>
                    <td style={{ fontSize: '12px', padding: '10px' }}>
                      {post.category}
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      </div>
    </>
  );
};
export default DashboardComp;
