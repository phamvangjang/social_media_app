const asyncHandler = require('express-async-handler')
const Post = require('../models/post')
const Comment = require('../models/comment')

const getPosts = asyncHandler(async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const response = await Post.find().skip(skip).limit(Number(limit));
    const totalPosts = await Post.countDocuments();
    const hasMore = skip + response.length < totalPosts;
    return res.status(200).json({
        posts: response,
        hasMore,
        mess: response ? 'Has Post' : 'Can not get posts'
    })
})

const getCurentPost = asyncHandler(async (req, res) => {
    const { pid } = req.query;
    const response = await Post.findById(pid);
    return res.status(200).json({
        success: response ? true : false,
        post: response,
        mes: response ? 'Get post successfully' : 'Can not get post'
    })
})

const getCommentInPost = asyncHandler(async (req, res) => {
    const { pid } = req.params;

    try {
        const post = await Post.findById(pid);
        if (!post) {
            return res.status(404).json({
                success: false,
                mes: 'Post not found',
            });
        }

        const commentIds = post.comments.map(comment => comment.id);
        const detailedComments = await Promise.all(
            commentIds.map(id => Comment.findOne({ id }))
        );

        return res.status(200).json({
            success: true,
            comments: detailedComments,
            mes: 'Get comments successfully',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            mes: 'Error fetching comments',
        });
    }
})

const likePost = asyncHandler(async (req, res) => {
    const { uid, pid } = req.body;
    try {
        const post = await Post.findById(pid);
        if (!post) return res.status(404).json({ mes: 'Post not found' });
        const hasLike = post.arrayUserLike.includes(uid);
        if (hasLike) {
            post.arrayUserLike = post.arrayUserLike.filter(id => id.toString() !== uid);
            post.likesCount -= 1;
            await post.save();
            return res.status(200).json({ message: 'Removed post like successfully', post });
        } else {
            post.arrayUserLike.push(uid);
            post.likesCount += 1;
            await post.save();
            return res.status(200).json({ mes: 'Liked post successfully', post });
        }
    } catch (error) {
        console.log('error at like post: ' + error)
    }
})
module.exports = {
    getPosts,
    getCurentPost,
    getCommentInPost,
    likePost
}