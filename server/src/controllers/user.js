const asyncHandler = require('express-async-handler')
const User = require('../models/user');
const Post = require('../models/post');
const { default: mongoose } = require('mongoose');

const getCurrent = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const user = await User.findById(_id).select('-refreshToken -password');
    return res.status(200).json({
        success: user ? true : false,
        user: user ? user : 'User not found'
    })
})

const createUser = asyncHandler(async (req, res) => {
    const { id, username, url, fullname, biography, profilePicUrl } = req.body;
    const email = username + '@gmail.com';
    const password = 12345678;
    const response = await User.create({ id, fullname, username, email, password, avatar: profilePicUrl, bio: biography, url })
    return res.status(200).json({
        success: response ? true : false,
        response,
        mes: response ? 'Create User successfully' : 'Create User was failed',
    })
})

const statusFollow = asyncHandler(async (req, res) => {
    const { id, fid } = req.query;
    try {
        // console.log(id, fid);
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ mes: 'User not found' });
        if (!user.followsCountArr.includes(fid)) return res.status(200).json({ success: false, mes: 'This account is not followed yet.' });
        return res.status(200).json({
            success: true,
            mes: 'This account was followed'
        })
    } catch (error) {
        console.log('error at status follow ' + error);
    }
})

const follow = asyncHandler(async (req, res) => {
    const { uid, pid } = req.body;
    if (!uid || !pid) {
        return res.status(400).json({ mes: 'uid and pid are required' });
    }
    try {
        const user = await User.findById(uid);
        if (!user) return res.status(404).json({ mes: 'User not found' });

        const post = await Post.findById(pid);
        const followedUser = await User.findOne({ username: post.ownerUsername });
        if (!followedUser) return res.status(404).json({ mes: 'User not found' });
        const followedUserId = followedUser._id.toString();

        const isAlreadyFollowing = user.followsCountArr.some(
            (followId) => followId.toString() === followedUserId
        );
        if (isAlreadyFollowing) {
            user.followsCountArr = user.followsCountArr.filter(
                (followId) => followId.toString() !== followedUserId
            );
            followedUser.followersCountArr = followedUser.followersCountArr.filter(
                (followerId) => followerId.toString() !== uid.toString()
            );
            await user.save();
            await followedUser.save();
            return res.status(200).json({
                success: true,
                mes: 'Unfollowed successfully'
            })
        } else {
            user.followsCountArr.push(new mongoose.Types.ObjectId(followedUserId));
            followedUser.followersCountArr.push(new mongoose.Types.ObjectId(uid));
            await user.save();
            await followedUser.save();
            return res.status(200).json({
                success: true,
                mes: 'Followed successfully'
            });
        }
    } catch (error) {
        console.log('error at follow ' + error);
    }
})

module.exports = {
    getCurrent,
    createUser,
    follow,
    statusFollow,
}