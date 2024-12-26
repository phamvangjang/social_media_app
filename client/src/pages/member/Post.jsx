import React, { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import * as apis from '../../apis'
import moment from 'moment';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { formatComment } from '@/utils/helpers';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DetailPost, Likes, Share } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { likePost } from '@/store/user/userSlice';
const user_id = window.localStorage.getItem("user_id");

const Post = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { current } = useSelector((state) => state.user);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const dispatch = useDispatch();
    const fetchPosts = async () => {

        try {
            const response = await apis.apiGetPosts({ params: { page, limit: 2 } });
            setPosts((prevPosts) => [...prevPosts, ...response?.posts]);
            setHasMore(response?.hasMore);
        } catch (error) {
            console.log("Error fetching posts:", error);
        }
    };
    useEffect(() => {
        fetchPosts();
    }, [page, current]);
    // Theo dõi URL để fetch dữ liệu

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

    const handleToggleExpand = (index) => {
        setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div>
            <InfiniteScroll
                dataLength={posts?.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={!hasMore && <p className="text-center">No more posts</p>}>
                {posts?.map((el, index) => (
                    <div
                        key={el._id}
                        className={`border border-gray-200 rounded-lg p-4 mb-2 ${el.isLiked ? "bg-red-50" : "bg-white"}`}>
                        <div className="flex items-center mb-4">
                            <img
                                crossOrigin="anonymous"
                                src={`${el.ownerAvatar}`}
                                alt={`${el._id}`}
                                className="w-8 h-8 rounded-full mr-2 object-contain" />
                            <span className="font-bold">{el.ownerUsername}</span>
                            <span className="text-gray-500 ml-2">{moment(el.timestamp).fromNow()}</span>
                        </div>
                        {el.type !== "Sidecar" ? (
                            <img
                                crossOrigin="anonymous"
                                src={el.images}
                                alt={el.alt}
                                className="w-full mb-4 object-contain"
                            />
                        ) : (
                            <Carousel>
                                <CarouselContent>
                                    {el.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img
                                                crossOrigin="anonymous"
                                                src={image}
                                                alt={`Post ${index}`}
                                                className="w-full object-contain" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className='left-4' />
                                <CarouselNext className='right-4' />
                            </Carousel>
                        )}

                        <div className="flex items-center mt-2 space-x-4 mb-2">
                            <span
                                className="cursor-pointer"
                                onClick={() => handleToggleLikePost(el._id)}>
                                {current?.likePostId.includes(el._id) ? (
                                    <FaHeart size={26} color="#ff2929" />
                                ) : (
                                    <CiHeart size={26} />
                                )}
                            </span>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <i className="far fa-comment cursor-pointer"></i>
                                </DialogTrigger>
                                <DialogContent className="w-full h-[90%]">
                                    <DetailPost data={{ id: el?.id, pid: el?._id, shortCode: el?.shortCode }} />
                                </DialogContent>
                            </Dialog>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <i className="far fa-paper-plane cursor-pointer"></i>
                                </DialogTrigger>
                                <DialogContent className="w-[40%] h-[60%]">
                                    <Share data={{ id: el?.id, pid: el?._id, shortCode: el?.shortCode }} />
                                </DialogContent>
                            </Dialog>

                        </div>

                        {/* Show model list user likes post */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="text-sm font-bold mb-2 cursor-pointer">{`${formatComment(el.likesCount)} likes`}</div>
                            </DialogTrigger>
                            <DialogContent className="w-[40%] h-[50%]">
                                <Likes data={{ id: el?.id, pid: el?._id, arrayUserLike: el?.arrayUserLike }} />
                            </DialogContent>
                        </Dialog>

                        {/* Toggle Post's caption */}
                        <div className="text-sm">
                            <span className="font-bold">{el.ownerUsername}</span>
                            <p>
                                {expandedIndex === index ? (<>
                                    {el?.caption}{' '}
                                    <span className="cursor-pointer italic hover:underline" onClick={() => handleToggleExpand(index)}>
                                        Thu gọn
                                    </span>
                                </>) : (<>
                                    {el?.caption.length > 165 ? (
                                        <>
                                            {el?.caption.substr(0, 164)}{' '}
                                            <span className="cursor-pointer italic hover:underline" onClick={() => handleToggleExpand(index)}>
                                                ...Xem thêm
                                            </span>
                                        </>
                                    ) : (
                                        el?.caption
                                    )}
                                </>)}
                            </p>
                        </div>

                        {/* Show comment */}
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="text-sm text-gray-500 cursor-pointer">{`Xem tất cả ${formatComment(el?.commentsCount)} bình luận`}</div>
                            </DialogTrigger>
                            <DialogContent className="w-full h-[90%]">
                                <DetailPost data={{ id: el?._id, pid: el?._id, shortCode: el?.shortCode }} />
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};


export default Post