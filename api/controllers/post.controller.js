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

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.userId }),
      ...(req.query.category && { category: req.category }),
      ...(req.query.postId && { _id: req.postId }),
      ...(req.query.searchTerm && {
        $or: [
          //: i means is a search term is lowercase or not does not matter.
          { title: { $regex: req.searchTerm, $options: 'i' } },
          { content: { $regex: req.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalPosts = await Post.countDocuments();

    // a month post should have created
    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthPosts = await Post.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      posts,
      totalPosts,
      lastMonthPosts,
    });
    console.log(posts);
  } catch (error) {
    next(error);
  }
};
