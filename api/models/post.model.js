import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default:
        'https://b2203234.smushcdn.com/2203234/wp-content/uploads/2020/06/Blog-Post-e1592315549383.jpg?lossy=0&strip=1&webp=1',
    },
    category: {
      type: 'string',
      default: 'uncategorized',
    },
    slug: {
      type: 'string',
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);

export default Post;
