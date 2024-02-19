import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';
import PostCard from '../components/PostCard';

const PostPage = () => {
  const { postSlug } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [post, setPost] = useState(null);
  const [recentPosts, setRecentPosts] = useState(null);

  useEffect(() => {
    fetchPost();
  }, [postSlug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
      const data = await res.json();
      if (!res.ok) {
        setError(true);
        setLoading(false);
        return;
      }
      if (res.ok) {
        setError(false);
        setPost(data.posts[0]);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const res = await fetch(`/api/post/getposts?limit=3`);
        const data = await res.json();
        if (res.ok) {
          setRecentPosts(data.posts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecentPosts();
  }, []);

  if (loading) {
    return (
      <div className='spinner-container'>
        <span className='loading-spinner'>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </div>
    );
  }
  return (
    <main className='main_container'>
      <h1 className='post-heading'>{post && post.title}</h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className='category-link'>
        <button className='category-button'> {post && post.category} </button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className='post-img'
      />
      <div className='post-createdAt'>
        <span> {post && new Date(post.createdAt).toLocaleDateString()} </span>
        <span style={{ fontStyle: 'italic' }}>
          {post && (post.content.length / 1000).toFixed(0)} mins read
        </span>
      </div>
      <div
        className='post-content'
        dangerouslySetInnerHTML={{ __html: post && post.content }}></div>
      <div className='action_container'>
        <CallToAction />
      </div>
      <CommentSection postId={post._id} />

      <div className='Recent_articles'>
        <h1>Recent articles</h1>
        <div className='recent_articles_container'>
          {recentPosts &&
            recentPosts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
              />
            ))}
        </div>
      </div>
    </main>
  );
};

export default PostPage;
