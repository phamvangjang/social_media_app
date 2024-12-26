import React, { useEffect, useState } from 'react';
import * as apis from '../apis';
import { useNavigate, useParams } from 'react-router-dom';
import { Comments, Likes } from '.';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { formatComment } from '@/utils/helpers';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';
import { likePost } from '@/store/user/userSlice';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Dialog, DialogContent, DialogTrigger } from './ui/dialog';

const DetailPost = ({ data }) => {
    const [statusFollow, setStatusFollow] = useState(false);
    const { current } = useSelector((state) => state.user);
    const [comments, setComments] = useState([]);
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState('');
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const dispatch = useDispatch();
    const { id: shortCodeId } = useParams(); // Destructure `id` from `useParams`
    const [sid, setsid] = useState(shortCodeId); // Initialize state with `shortCode.id`

    const fetchPost = async () => {
        try {
            const response = await apis.apiGetPost(pid);
            setPost(response.post);

        } catch (error) {
            console.error('Error fetching post:', error);
        }
    };



    useEffect(() => {
        const fetchPostByShortCode = async () => {
            try {
                console.log(`Fetching post for shortcode: ${sid}`);
                const response = await apis.apiGetPostsByShortCode(sid);
                console.log(response);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };

        if (sid) fetchPostByShortCode();
    }, [sid]); // Dependency on `sid`
    const pid = post?._id;
    // Fetch comments
    const fetchComment = async () => {
        try {
            const response = await apis.apiGetComments(post._id);
            if (response?.success) setComments(response?.comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    // Check follow status
    // const statusFollowFunc = async () => {
    //     const statusData = { id: current?._id, fid: post?.ownerId };
    //     try {
    //         const { id, fid } = statusData;
    //         console.log(statusData);
    //         const response = await apis.apiStatusFollow(id, fid);
    //         if (response.success) setStatusFollow(response.success);
    //     } catch (error) {
    //         console.error('Error checking follow status:', error);
    //     }
    // };

    // // Toggle follow/unfollow
    // const toggleFollow = async (pid) => {
    //     const uid = current?._id;
    //     const payload = { uid, pid };
    //     try {
    //         const response = await apis.apiFollow(payload);
    //         if (response?.mes === 'Unfollowed successfully') setStatusFollow(false);
    //         else if (response?.mes === 'Followed successfully') setStatusFollow(true);
    //     } catch (error) {
    //         console.error('Error toggling follow:', error);
    //     }
    // };

    // Add comment
    const handleAddComment = async () => {
        // console.log(newComment);

        // Kiểm tra nếu comment trống
        if (!newComment.trim()) {
            console.warn("Comment cannot be empty");
            return;
        }

        try {
            // Gửi request thêm comment đến API
            const response = await apis.apiCommentPost({
                pid, // ID của bài viết
                text: newComment, // Nội dung comment
                ownerUsername: current.username, // Tên người dùng hiện tại
                ownerProfilePicUrl: current?.avatar, // Avatar của người dùng hiện tại
                ownerId: current._id, // ID của người dùng hiện tại
            });

            // Kiểm tra phản hồi từ server
            if (response?.mes === 'Comment added successfully' && response?.comment) {
                // Cập nhật danh sách comments
                setComments([...comments, response.comment]);
                // Xóa nội dung comment vừa nhập
                setNewComment('');
            } else {
                console.error("Failed to add comment:", response?.mes);
            }
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };


    // Effects
    useEffect(() => {
        if (pid) {
            fetchPost();
            fetchComment();
            // if (!posts) {
            // }
            // statusFollowFunc();
        }
    }, [pid]);

    // console.log(posts)

    useEffect(() => {
        if (data?.shortCode) navigate(`/p/${data?.shortCode}`);
    }, [data?.shortCode]);

    const handleToggleLikePost = async (postId) => {
        dispatch(likePost({ postId }));
        setPosts((prevPosts) =>
            prevPosts.map((post) =>
                post._id === postId
                    ? {
                        ...post,
                        isLiked: post.arrayUserLike.includes(user_id),
                        likesCount: current?.likePostId.includes(postId)
                            ? post.likesCount - 1
                            : post.likesCount + 1,
                        // Cập nhật lại arrayUserLike
                        arrayUserLike: post.arrayUserLike.includes(user_id)
                            ? post.arrayUserLike.filter((el) => el !== user_id)
                            : [...post.arrayUserLike, user_id],
                    }
                    : post
            )
        );

        try {
            await apis.apiLikePost({ uid: current?._id, pid: postId });
        } catch (error) {
            console.error("Failed to toggle like:", error);
            // Khôi phục trạng thái nếu API thất bại
            setPosts((prevPosts) =>
                prevPosts.map((post) =>
                    post._id === postId
                        ? { ...post, isLiked: !post.isLiked, likesCount: post.isLiked ? post.likesCount + 1 : post.likesCount - 1 }
                        : post
                )
            );
        }
    };

    return (
        <div className="w-[90%] grid grid-cols-3 h-full items-center justify-center">
            <div className='col-span-2'>
                {post?.type !== "Sidecar" ? (
                    <img
                        crossOrigin="anonymous"
                        src={post?.images}
                        alt={"post"}
                        className="w-[600px] mb-4 object-contain h-auto min-h-[400px]"
                    />
                ) : (
                    <Carousel>
                        <CarouselContent>
                            {post?.images.map((image, index) => (
                                <CarouselItem key={index}>
                                    <img
                                        crossOrigin="anonymous"
                                        src={image}
                                        alt=""
                                        className="object-cover w-full max-h-[620px] flex items-center justify-center" />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='left-4' />
                        <CarouselNext className='right-4' />
                    </Carousel>
                )}
            </div>

            {/* Content Section */}
            <div className="flex-1 flex-col justify-between p-2 h-full relative">
                <div className="flex flex-col">
                    {/* Header */}
                    <div className="flex flex-col">
                        <div className="flex items-center">
                            <img
                                crossOrigin="anonymous"
                                // src="https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-19/118982623_353024589077161_7490638455124782637_n.jpg?stp=dst-jpg_tt6&_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=ejpoFY0pDsAQ7kNvgHoajPq&_nc_gid=60ae2c75195147dfabaf16d95bc0bc66&edm=AP4sbd4BAAAA&ccb=7-5&oh=00_AYCKcYOfOVyE-GkUBkEYfjJCBtpALC4lKNKMmr0s3YY51A&oe=6749CAE8&_nc_sid=7a9f4b"
                                src={post?.ownerAvatar}
                                alt="Profile"
                                className="w-10 h-10 rounded-full mr-3"
                            />
                            <div>
                                <div className="font-bold">
                                    {post?.ownerUsername}
                                    <i className="fas fa-check-circle text-blue-500 ml-2 mr-2"></i>

                                </div>
                            </div>
                            <i className="fas fa-ellipsis-h ml-auto"></i>
                        </div>
                        <div className="mt-3 border-gray-200 border-b-[1px]"></div>
                    </div>

                    {/* Comments */}
                    <Comments data={{ post: post, comments: comments }} />
                </div>

                {/* Footer */}
                <div className="flex flex-col absolute bottom-0 w-full">
                    <span className="mb-1 border-gray-200 border-b-[1px]"></span>
                    <div className="pb-2">

                        <div className="flex items-center space-x-4 mb-2">
                            <span
                                className="cursor-pointer"
                                onClick={() => handleToggleLikePost(post._id)}
                            >
                                {current?.likePostId.includes(post._id) ? (
                                    <FaHeart size={26} color="#ff2929" />
                                ) : (
                                    <CiHeart size={26} />
                                )}
                            </span>
                            <i className="far fa-comment cursor-pointer"></i>
                            <i className="far fa-paper-plane cursor-pointer"></i>
                        </div>
                    </div>
                    {/* <Dialog>
                            <DialogTrigger asChild>
                                <div className="text-gray-500 text-sm font-bold">{`${formatComment(
                                    post?.likesCount
                                )} lượt thích`}</div>
                            </DialogTrigger>
                            <DialogContent className="w-[40%] h-[50%]">
                                <Likes data={{ id: post?.id, pid: post?._id, arrayUserLike: post?.arrayUserLike }} />
                            </DialogContent>
                        </Dialog> */}
                    <div className='flex items-start flex-col gap-2'>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="text-gray-500 text-sm font-bold cursor-pointer">{`${formatComment(
                                    post?.likesCount
                                )} lượt thích`}
                                </div>
                            </DialogTrigger>
                            <DialogContent className='w-[40%] h-[60%]'>
                                <Likes data={{ id: post?.id, pid: post?._id, arrayUserLike: post?.arrayUserLike }} />
                            </DialogContent>
                        </Dialog>
                        <div className="text-gray-500 text-sm">{moment(post?.timestamp).fromNow()}</div>
                    </div>
                    <div className="mt-4 flex justify-between w-full">
                        <input
                            type="text"
                            placeholder="Thêm bình luận..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full border-none focus:outline-none"
                        />
                        <button
                            className="text-blue-500"
                            onClick={handleAddComment}
                        >
                            Đăng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailPost;
