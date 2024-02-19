import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className='PostCard_container'>
      <Link to={`/post/${post.slug}`}>
        <img
          src={post.image}
          alt={post.title}
        />
      </Link>
      <div className='PostCard_item'>
        <p ellipsis={{ rows: 3, expandable: true }}>{post.title}</p>
        <span>{post.category}</span>
        <Link
          to={`/post/${post.slug}`}
          className='PostCard_link'>
          Read article
        </Link>
      </div>
    </div>
  );
};

export default PostCard;
