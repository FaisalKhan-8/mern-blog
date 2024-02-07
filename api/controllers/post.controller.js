import Post from '../models/post.model.js';
import { ErrorHandle } from '../utils/ErrorHandle.js';

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(
      ErrorHandle(403, 'You do not have permission to create a post.')
    );
  }
  if (!req.body.title || !req.body.content) {
    return next(ErrorHandle(400, 'Title and content are required.'));
  }

  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
