let posts = [
    {id: 1, title: 'Post One'},
    {id: 2, title: 'Post Two'},
    {id: 3, title: 'Post Three'},
];

// @desc    Get all posts
// @route   GET /api/posts
export const getAllPosts = (req, res, next) => {
    const limit = parseInt(req.query.limit);
    if (isNaN(limit) || limit <= 0) {
        return res.status(200).json(posts);
    }
    return res.status(200).json(posts.slice(0, limit));
};

// @desc    Get single post
// @route   GET /api/posts/:id
export const getPost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`Post with ${id} not found`);
        error.status = 404;
        return next(error);
    }
    return res.status(200).json(post);
};

// @desc    Create a new post
// @route   POST /api/posts
export const createPost = (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
    };
    if (!newPost.title) {
        const error = new Error('Post must have a title');
        error.status = 400;
        return next(error);
    }
    posts.push(newPost);
    return res.status(200).json(newPost);
};

// @desc    Update a post
// @route   PUT /api/posts/:id
export const updatePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => post.id === id);
    if (!post) {
        const error = new Error(`Post with ${id} not found`);
        error.status = 404;
        return next(error);
    }
    post.title = req.body.title;
    return res.status(200).json(post);
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
    const id = parseInt(req.params.id);
    const post = posts.find((post) => posts.id === id);
    if (!post) {
        const error = new Error(`Post with ${id} not found`);
        error.status = 404;
        return next(error);
    }
    posts = posts.filter((post) => post.id !== id);
    return res.status(200).json({message: `Post with id ${id} deleted successfully`});
};
