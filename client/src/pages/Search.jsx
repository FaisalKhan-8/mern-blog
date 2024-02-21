import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';

const Search = () => {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'uncategorized',
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        category: categoryFromUrl,
        sort: sortFromUrl,
      });
    }

    //   fetching the posts from the search term results
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/api/post/getposts?${searchQuery}`);
        if (!res.ok) {
          setLoading(false);
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setLoading(false);
          if (data.posts.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebarData({
        ...sidebarData,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === 'sort') {
      const order = e.target.value || 'desc';
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === 'category') {
      const category = e.target.value || 'uncategorized';
      setSidebarData({
        ...sidebarData,
        category: category,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', sidebarData.searchTerm);
    urlParams.set('sort', sidebarData.sort);
    urlParams.set('category', sidebarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    try {
      const numberOfPosts = posts.length;
      const startIndex = numberOfPosts;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set('startIndex', startIndex);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setPosts([...posts, ...data.posts]);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='search-term-main'>
      <div className='search-term'>
        <form
          className='search-term-form-container'
          onSubmit={handleSubmit}>
          <div className='search-term-container'>
            <label>Search Term:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='Search...'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className='sort-container'>
            <label>Sort By:</label>
            <select
              id='sort'
              onChange={handleChange}
              value={sidebarData.sort}>
              <option value='desc'>Latest</option>
              <option value='asc'>Oldest</option>
            </select>
          </div>
          <div className='category-container'>
            <label>Category:</label>
            <select
              id='category'
              onChange={handleChange}
              value={sidebarData.category}>
              <option value='uncategorized'>Uncategorized</option>
              <option value='reactjs'>React.js</option>
              <option value='javascript'>JavaScript</option>
              <option value='nextjs'>Next.js</option>
            </select>
          </div>
          <button
            type='submit'
            className='search-btn'>
            Apply Filters
          </button>
        </form>
      </div>
      <div className='search-posts-container'>
        <h1>Posts results: </h1>
        {loading && (
          <div className='search-spinner-container'>
            <span className='search-loading-spinner'>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        )}
        <div className='search-container'>
          {!loading && posts.length === 0 && <p>No posts found.</p>}

          {!loading &&
            posts &&
            posts.map((post) => (
              <>
                <div className='search-post-container'>
                  <PostCard
                    key={post._id}
                    post={post}
                  />
                </div>
              </>
            ))}
        </div>

        {showMore && (
          <div className='show-more-container'>
            <button
              className='show-more-btn'
              onClick={handleShowMore}>
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
