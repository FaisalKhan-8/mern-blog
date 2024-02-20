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
      default: 'https://i.ibb.co/n0DQjcQ/postdefault-Img.jpg',
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
