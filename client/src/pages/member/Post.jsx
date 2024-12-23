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
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DetailPost, Likes } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { likePost } from '@/store/user/userSlice';
const user_id = window.localStorage.getItem("user_id");

const Post = () => {
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
            await apis.apiLikePost({ uid: current?._id,pid:postId });
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
        <div>
            <InfiniteScroll
                dataLength={posts?.length}
                next={() => setPage((prevPage) => prevPage + 1)}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={!hasMore && <p className="text-center">No more posts</p>}
            >
                {posts?.map((el) => (
                    <div
                    
                        key={el._id}
                        className={`border border-gray-200 rounded-lg p-4 mb-2 ${
                            el.isLiked ? "bg-red-50" : "bg-white"
                        }`}
                    >
                        <div className="flex items-center mb-4">
                            <img
                                crossOrigin="anonymous"
                                src={el.ownerAvatar}
                                alt="avatar"
                                className="w-8 h-8 rounded-full mr-2 object-contain"
                            />
                            <span className="font-bold">{el.ownerUsername}</span>
                            <span className="text-gray-500 ml-2">{moment(el.timestamp).fromNow()}</span>
                        </div>
                        {el.type !== "Sidecar" ? (
                            <img
                                crossOrigin="anonymous"
                                src={el.displayUrl}
                                alt={el.alt}
                                className="w-full mb-4 object-contain"
                            />
                        ) : (
                            <Carousel>
                                <CarouselContent>
                                    {el.images.map((image, index) => (
                                        <CarouselItem key={index}>
                                            <img crossOrigin="anonymous" src={image} alt="" className="w-full object-contain" />
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        )}
                        <div className="flex items-center space-x-4 mb-2">
                            <span
                                className="cursor-pointer"
                                onClick={() => handleToggleLikePost(el._id)}
                            >
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
                            <i className="far fa-paper-plane cursor-pointer"></i>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                        <div className="text-sm font-bold mb-2">{`${formatComment(el.likesCount)} likes`}</div>
                                
                            </DialogTrigger>
                            <DialogContent className="w-[30%] h-[42%]">
                                <Likes data={{ id: el?.id, pid: el?._id, arrayUserLike: el?.arrayUserLike }} />
                            </DialogContent>
                        </Dialog>
                        <div className="text-sm">
                            <span className="font-bold">{el.ownerUsername}</span>
                            <p>
                                {el.caption.length > 165 ? (
                                    <>
                                        {el.caption.substr(0, 164)}{" "}
                                        <span className="cursor-pointer italic hover:underline">
                                            ...Xem them
                                        </span>
                                    </>
                                ) : (
                                    el.caption
                                )}
                            </p>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="text-sm text-gray-500 cursor-pointer">{`Xem tất cả ${formatComment(el?.commentsCount)} bình luận`}</div>
                            </DialogTrigger>
                            <DialogContent className="w-full h-[90%]">
                                <DetailPost data={{ id: el?.id, pid: el?._id, shortCode: el?.shortCode }} />
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
};


export default Post