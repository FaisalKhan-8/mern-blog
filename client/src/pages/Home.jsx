import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import PostCard from '../components/PostCard';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(posts);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/post/getPosts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <div className='Home-container'>
        <h1>Welcome to BeatBlog</h1>
        <p>
          Here you'll find a variety of articles and tutorials on topics such as
          web development, software engineering, and programming languages.
        </p>
        <Link
          to={'/search'}
          className='Home-link'>
          View all Posts
        </Link>
      </div>
      <div className='CallTOAction-home'>
        <CallToAction />
      </div>
      <div className='postCard-home'>
        {posts && posts.length > 0 && (
          <div className='postCard-container'>
            <h2>Recent posts</h2>
            <div className='postCard-post-container'>
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                />
              ))}
            </div>
            <Link
              to={'/search'}
              className='postCard-link'>
              <p>View all Posts</p>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
